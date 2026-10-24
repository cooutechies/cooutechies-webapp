/**
 * eventService.ts
 *
 * Single source of truth for all Event database queries and business logic.
 * Server-only module used by Server Actions and SSR pages.
 */

import { ObjectId, type Filter, type Document } from "mongodb";
import { connectToDatabase } from "@/lib/db";
import { COLLECTIONS, ACTIVITY_ACTIONS, PAGINATION } from "@/lib/constants";
import { escapeRegex } from "@/lib/utils";
import { serializeEvent, serializeEvents, serializeEventRegistrations, serializeEmailLogs } from "@/lib/serializers";
import type { EventFormData } from "@/lib/validations";
import type {
  SerializedEvent,
  PaginatedEventsResponse,
  SerializedEventDetailResponse,
} from "@/types/serialized.types";

export interface GetEventsOptions {
  page?: number;
  limit?: number;
  search?: string;
}

/**
 * Get all events with pagination and registration counts
 * Uses a single aggregation pipeline with $lookup to eliminate N+1 query bottlenecks
 */
export async function getEventsService(
  options: GetEventsOptions = {}
): Promise<PaginatedEventsResponse> {
  const page = Math.max(1, options.page || PAGINATION.DEFAULT_PAGE);
  const limit = Math.min(PAGINATION.MAX_LIMIT, options.limit || PAGINATION.DEFAULT_LIMIT);
  const skip = (page - 1) * limit;

  const { db } = await connectToDatabase();
  const eventsCollection = db.collection(COLLECTIONS.EVENTS);

  const matchFilter: Filter<Document> = {};
  if (options.search?.trim()) {
    matchFilter.title = { $regex: escapeRegex(options.search.trim()), $options: "i" };
  }

  const [rawEvents, total] = await Promise.all([
    eventsCollection
      .aggregate([
        { $match: matchFilter },
        { $sort: { date: -1 } },
        { $skip: skip },
        { $limit: limit },
        {
          $lookup: {
            from: COLLECTIONS.EVENT_REGISTRATIONS,
            localField: "_id",
            foreignField: "eventId",
            as: "registrations",
          },
        },
        {
          $addFields: {
            registrationCount: { $size: "$registrations" },
          },
        },
        {
          $project: {
            registrations: 0,
          },
        },
      ])
      .toArray(),
    eventsCollection.countDocuments(matchFilter),
  ]);

  return {
    events: serializeEvents(rawEvents),
    total,
    pages: Math.ceil(total / limit) || 1,
    currentPage: page,
  };
}

/**
 * Get event details by ID with registrations and email reminders in parallel
 */
export async function getEventByIdService(
  eventId: string
): Promise<SerializedEventDetailResponse | null> {
  if (!ObjectId.isValid(eventId)) {
    return null;
  }

  const { db } = await connectToDatabase();
  const objectId = new ObjectId(eventId);

  const eventDoc = await db.collection(COLLECTIONS.EVENTS).findOne({ _id: objectId });
  if (!eventDoc) {
    return null;
  }

  const registrationsCollection = db.collection(COLLECTIONS.EVENT_REGISTRATIONS);
  const remindersCollection = db.collection(COLLECTIONS.EMAIL_LOGS);

  const [registrations, reminders] = await Promise.all([
    registrationsCollection.find({ eventId: objectId }).sort({ registeredAt: -1 }).toArray(),
    remindersCollection.find({ eventId: objectId }).sort({ sentAt: -1 }).toArray(),
  ]);

  return {
    event: serializeEvent(eventDoc),
    registrations: serializeEventRegistrations(registrations),
    reminders: serializeEmailLogs(reminders),
    registrationCount: registrations.length,
  };
}

/**
 * Create a new event and log the activity
 */
export async function createEventService(
  formData: EventFormData
): Promise<{ eventId: string; event: SerializedEvent }> {
  const { db } = await connectToDatabase();
  const eventsCollection = db.collection(COLLECTIONS.EVENTS);
  const activitiesCollection = db.collection(COLLECTIONS.ACTIVITIES);

  const newEvent = {
    title: formData.title,
    description: formData.description,
    date: new Date(formData.date),
    location: formData.location,
    coverImage: formData.coverImage,
    duration: formData.duration,
    speakers: (formData.speakers || []).map((speaker) => ({
      name: speaker.name,
      role: speaker.role,
      bio: speaker.bio || "",
      photo: speaker.photo || null,
    })),
    ...(formData.maxAttendees ? { maxAttendees: formData.maxAttendees } : {}),
    createdAt: new Date(),
    updatedAt: new Date(),
    announcementSent: false,
  };

  const result = await eventsCollection.insertOne(newEvent);

  await activitiesCollection.insertOne({
    action: ACTIVITY_ACTIONS.EVENT_CREATED,
    eventId: result.insertedId,
    details: `Event "${formData.title}" created`,
    createdAt: new Date(),
  });

  return {
    eventId: result.insertedId.toString(),
    event: serializeEvent({ _id: result.insertedId, ...newEvent }),
  };
}

/**
 * Update an existing event and log the activity
 */
export async function updateEventService(
  eventId: string,
  formData: Partial<EventFormData>
): Promise<SerializedEvent | null> {
  if (!ObjectId.isValid(eventId)) {
    throw new Error("Invalid event ID format");
  }

  const { db } = await connectToDatabase();
  const objectId = new ObjectId(eventId);
  const eventsCollection = db.collection(COLLECTIONS.EVENTS);
  const activitiesCollection = db.collection(COLLECTIONS.ACTIVITIES);

  const updateFields: Record<string, unknown> = {
    updatedAt: new Date(),
  };

  if (formData.title !== undefined) updateFields.title = formData.title;
  if (formData.description !== undefined) updateFields.description = formData.description;
  if (formData.date !== undefined) updateFields.date = new Date(formData.date);
  if (formData.location !== undefined) updateFields.location = formData.location;
  if (formData.coverImage !== undefined) updateFields.coverImage = formData.coverImage;
  if (formData.duration !== undefined) updateFields.duration = formData.duration;
  if (formData.maxAttendees !== undefined) updateFields.maxAttendees = formData.maxAttendees;
  if (formData.speakers !== undefined) {
    updateFields.speakers = formData.speakers.map((speaker) => ({
      name: speaker.name,
      role: speaker.role,
      bio: speaker.bio || "",
      photo: speaker.photo || null,
    }));
  }

  const result = await eventsCollection.findOneAndUpdate(
    { _id: objectId },
    { $set: updateFields },
    { returnDocument: "after" }
  );

  if (!result) {
    return null;
  }

  await activitiesCollection.insertOne({
    action: ACTIVITY_ACTIONS.EVENT_UPDATED,
    eventId: objectId,
    details: `Event "${result.title}" updated`,
    createdAt: new Date(),
  });

  return serializeEvent(result);
}

/**
 * Delete an event, cascade remove associated registrations, and log activity
 */
export async function deleteEventService(
  eventId: string
): Promise<{ deleted: boolean; title?: string }> {
  if (!ObjectId.isValid(eventId)) {
    throw new Error("Invalid event ID format");
  }

  const { db } = await connectToDatabase();
  const objectId = new ObjectId(eventId);
  const eventsCollection = db.collection(COLLECTIONS.EVENTS);
  const activitiesCollection = db.collection(COLLECTIONS.ACTIVITIES);

  const eventToDelete = await eventsCollection.findOne({ _id: objectId });
  if (!eventToDelete) {
    return { deleted: false };
  }

  await Promise.all([
    eventsCollection.deleteOne({ _id: objectId }),
    db.collection(COLLECTIONS.EVENT_REGISTRATIONS).deleteMany({ eventId: objectId }),
    activitiesCollection.insertOne({
      action: ACTIVITY_ACTIONS.EVENT_DELETED,
      eventId: objectId,
      details: `Event "${eventToDelete.title}" deleted`,
      createdAt: new Date(),
    }),
  ]);

  return { deleted: true, title: eventToDelete.title };
}
