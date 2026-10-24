/**
 * registrationService.ts
 *
 * Single source of truth for all Community and Event registrations.
 * Enforces business invariants: uniqueness, capacity limits, and confirmation triggers.
 */

import { ObjectId, type Filter, type Document } from "mongodb";
import { connectToDatabase } from "@/lib/db";
import { COLLECTIONS, ACTIVITY_ACTIONS, PAGINATION } from "@/lib/constants";
import { escapeRegex } from "@/lib/utils";
import {
  serializeCommunityRegistration,
  serializeCommunityRegistrations,
  serializeEventRegistration,
  serializeEventRegistrations,
} from "@/lib/serializers";
import {
  sendCommunityWelcomeEmailService,
  sendEventConfirmationEmailService,
} from "./emailService";
import type { RegistrationFormData } from "@/lib/validations";
import type {
  SerializedCommunityRegistration,
  SerializedEventRegistration,
  PaginatedRegistrationsResponse,
  PaginatedEventRegistrationsResponse,
} from "@/types/serialized.types";

export interface RegisterCommunityMemberInput extends RegistrationFormData {
  school?: string;
}

/**
 * Register a new community member (with email uniqueness invariant)
 */
class ServiceError extends Error {
  code?: string;
  constructor(message: string, code?: string) {
    super(message);
    this.name = "ServiceError";
    this.code = code;
  }
}

export async function registerCommunityMemberService(
  data: RegisterCommunityMemberInput
): Promise<{ registrationId: string; registration: SerializedCommunityRegistration }> {
  const { db } = await connectToDatabase();
  const registrationsCollection = db.collection(COLLECTIONS.REGISTRATIONS);
  const activitiesCollection = db.collection(COLLECTIONS.ACTIVITIES);

  const normalizedEmail = data.email.toLowerCase().trim();

  // Invariant: Verify email does not already exist
  const existing = await registrationsCollection.findOne({ email: normalizedEmail });
  if (existing) {
    throw new ServiceError("This email is already registered", "EMAIL_EXISTS");
  }

  const registrationDoc = {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: normalizedEmail,
    department: data.department.trim(),
    level: data.level,
    campus: data.campus,
    techSkills: data.techSkills || "",
    aspiringSkills: data.aspiringSkills || "",
    reason: data.reason,
    school: data.school || "Chukwuemeka Odumegwu Ojukwu University",
    status: "approved",
    createdAt: new Date(),
  };

  const result = await registrationsCollection.insertOne(registrationDoc);

  await activitiesCollection.insertOne({
    action: ACTIVITY_ACTIONS.MEMBER_REGISTERED,
    details: `${data.firstName} ${data.lastName} joined the community`,
    createdAt: new Date(),
  });

  // Asynchronously trigger confirmation email (does not block registration)
  sendCommunityWelcomeEmailService({
    firstName: data.firstName,
    email: normalizedEmail,
  }).catch((err) => console.error("[RegistrationService:WelcomeEmail]", err));

  return {
    registrationId: result.insertedId.toString(),
    registration: serializeCommunityRegistration({ _id: result.insertedId, ...registrationDoc }),
  };
}

export interface GetCommunityRegistrationsOptions {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  level?: string;
  campus?: string;
}

/**
 * Get paginated community registrations with search and filtering
 */
export async function getCommunityRegistrationsService(
  options: GetCommunityRegistrationsOptions = {}
): Promise<PaginatedRegistrationsResponse> {
  const page = Math.max(1, options.page || PAGINATION.DEFAULT_PAGE);
  const limit = Math.min(PAGINATION.MAX_LIMIT, options.limit || PAGINATION.DEFAULT_LIMIT);
  const skip = (page - 1) * limit;

  const { db } = await connectToDatabase();
  const registrationsCollection = db.collection(COLLECTIONS.REGISTRATIONS);

  const filter: Filter<Document> = {};

  if (options.search?.trim()) {
    const query = options.search.trim();
    const safeQuery = escapeRegex(query);
    filter.$or = [
      { firstName: { $regex: safeQuery, $options: "i" } },
      { lastName: { $regex: safeQuery, $options: "i" } },
      { email: { $regex: safeQuery, $options: "i" } },
    ];
  }

  if (options.department?.trim()) filter.department = options.department.trim();
  if (options.level?.trim()) filter.level = options.level.trim();
  if (options.campus?.trim()) filter.campus = options.campus.trim();

  const [rawDocs, total] = await Promise.all([
    registrationsCollection.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).toArray(),
    registrationsCollection.countDocuments(filter),
  ]);

  return {
    registrations: serializeCommunityRegistrations(rawDocs),
    total,
    pages: Math.ceil(total / limit) || 1,
    currentPage: page,
  };
}

export interface RegisterForEventInput {
  eventId: string;
  firstName: string;
  lastName: string;
  email: string;
  eventTitle?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  eventDescription?: string;
}

/**
 * Register an attendee for an event with capacity & uniqueness invariants
 */
export async function registerForEventService(
  data: RegisterForEventInput
): Promise<{ registrationId: string; registration: SerializedEventRegistration }> {
  if (!ObjectId.isValid(data.eventId)) {
    throw new Error("Invalid event ID");
  }

  const { db } = await connectToDatabase();
  const eventObjectId = new ObjectId(data.eventId);
  const eventsCollection = db.collection(COLLECTIONS.EVENTS);
  const eventRegistrationsCollection = db.collection(COLLECTIONS.EVENT_REGISTRATIONS);
  const activitiesCollection = db.collection(COLLECTIONS.ACTIVITIES);

  const event = await eventsCollection.findOne({ _id: eventObjectId });
  if (!event) {
    throw new Error("Event not found");
  }

  const normalizedEmail = data.email.toLowerCase().trim();

  // Invariant 1: Check if user is already registered for this event
  const existingRegistration = await eventRegistrationsCollection.findOne({
    eventId: eventObjectId,
    email: normalizedEmail,
  });

  if (existingRegistration) {
    throw new ServiceError("This email is already registered for this event", "EMAIL_EXISTS");
  }

  // Invariant 2: Capacity check (if maxAttendees is specified)
  if (typeof event.maxAttendees === "number" && event.maxAttendees > 0) {
    const currentCount = await eventRegistrationsCollection.countDocuments({ eventId: eventObjectId });
    if (currentCount >= event.maxAttendees) {
      throw new ServiceError("This event has reached full capacity", "EVENT_FULL");
    }
  }

  const registrationDoc = {
    eventId: eventObjectId,
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: normalizedEmail,
    status: "registered",
    registeredAt: new Date(),
    createdAt: new Date(),
  };

  const result = await eventRegistrationsCollection.insertOne(registrationDoc);

  await activitiesCollection.insertOne({
    action: ACTIVITY_ACTIONS.EVENT_REGISTERED,
    eventId: eventObjectId,
    details: `${data.firstName} ${data.lastName} registered for "${event.title}"`,
    createdAt: new Date(),
  });

  // Asynchronously trigger confirmation email
  sendEventConfirmationEmailService({
    firstName: data.firstName,
    lastName: data.lastName,
    email: normalizedEmail,
    eventId: data.eventId,
    eventTitle: event.title,
    eventDate: new Date(event.date).toLocaleDateString(),
    eventTime: event.duration || "TBA",
    eventLocation: event.location,
    eventDescription: event.description,
  }).catch((err) => console.error("[RegistrationService:EventConfirmationEmail]", err));

  return {
    registrationId: result.insertedId.toString(),
    registration: serializeEventRegistration({ _id: result.insertedId, ...registrationDoc }),
  };
}

/**
 * Get paginated event registrations for a specific event
 */
export async function getEventRegistrationsService(
  eventId: string,
  page = 1,
  limit = 10
): Promise<PaginatedEventRegistrationsResponse> {
  if (!ObjectId.isValid(eventId)) {
    throw new Error("Invalid event ID");
  }

  const skip = (page - 1) * limit;
  const { db } = await connectToDatabase();
  const eventObjectId = new ObjectId(eventId);
  const eventRegistrationsCollection = db.collection(COLLECTIONS.EVENT_REGISTRATIONS);

  const [rawDocs, total] = await Promise.all([
    eventRegistrationsCollection.find({ eventId: eventObjectId }).sort({ registeredAt: -1 }).skip(skip).limit(limit).toArray(),
    eventRegistrationsCollection.countDocuments({ eventId: eventObjectId }),
  ]);

  return {
    registrations: serializeEventRegistrations(rawDocs),
    total,
    pages: Math.ceil(total / limit) || 1,
    currentPage: page,
  };
}

/**
 * Export all community registrations for CSV export
 */
export async function exportAllCommunityRegistrationsService(): Promise<SerializedCommunityRegistration[]> {
  const { db } = await connectToDatabase();
  const rawDocs = await db.collection(COLLECTIONS.REGISTRATIONS).find({}).sort({ createdAt: -1 }).toArray();
  return serializeCommunityRegistrations(rawDocs);
}
