/**
 * Event Server Actions
 * Handles all event CRUD operations with S3 image uploads
 * Images are uploaded in parallel before database insertion
 */

"use server";

import { connectToDatabase } from "@/lib/db";
import { type EventFormData } from "@/lib/validations";
import { ApiResponse } from "@/types/data.types";
import { ObjectId } from "mongodb";

/**
 * Create a new event
 * Images are already uploaded to S3 from the client
 */
export async function createEvent(
  formData: EventFormData
): Promise<ApiResponse<{ eventId: string }>> {
  try {
    // Connect to database
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection<Event>("events");

    // Create event document (images already uploaded, just save URLs)
    const event: Omit<Event, "_id"> = {
      title: formData.title,
      description: formData.description,
      date: new Date(formData.date),
      location: formData.location,
      coverImage: formData.coverImage,
      maxAttendees: formData.maxAttendees,
      duration: formData.duration,
      speakers: formData.speakers || [],
      createdAt: new Date(),
      updatedAt: new Date(),
      announcementSent: false,
    };

    // Insert event into database
    const result = await eventsCollection.insertOne(event);

    // Log activity for audit trail
    const activitiesCollection = db.collection("activities");
    await activitiesCollection.insertOne({
      action: "event_created",
      eventId: result.insertedId,
      details: `Event "${formData.title}" created`,
      createdAt: new Date(),
    });

    return {
      success: true,
      message: "Event created successfully",
      data: { eventId: result.insertedId.toString() },
    };
  } catch (error) {
    console.error("[Events] Create failed:", error);
    return {
      success: false,
      message: "Failed to create event",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get all events with pagination
 */
export async function getEvents(page = 1, limit = 10) {
  try {
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection<Event>("events");

    const skip = (page - 1) * limit;

    // Fetch events and total count in parallel
    const [events, total] = await Promise.all([
      eventsCollection
        .find({})
        .sort({ date: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      eventsCollection.countDocuments({}),
    ]);

    const registrationsCollection = db.collection("eventRegistrations");

    // Enhance events with registration counts
    const eventsWithCounts = await Promise.all(
      events.map(async (event) => {
        const registrationCount = await registrationsCollection.countDocuments({
          eventId: event._id,
        });
        return {
          ...event,
          registrationCount,
        };
      })
    );

    return {
      success: true,
      data: {
        events: eventsWithCounts,
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("[Events] Get failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get event details by ID
 */
export async function getEventById(eventId: string) {
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(eventId)) {
      return {
        success: false,
        error: "Invalid event ID",
      };
    }

    const { db } = await connectToDatabase();
    const eventsCollection = db.collection<Event>("events");

    // Fetch event from database
    const event = await eventsCollection.findOne({
      _id: new ObjectId(eventId),
    });

    if (!event) {
      return {
        success: false,
        error: "Event not found",
      };
    }

    // Fetch related data in parallel
    const registrationsCollection = db.collection("eventRegistrations");
    const remindersCollection = db.collection("email_reminders");

    const [registrations, reminders] = await Promise.all([
      registrationsCollection.find({ eventId: event._id }).toArray(),
      remindersCollection.find({ eventId: event._id }).toArray(),
    ]);

    return {
      success: true,
      data: {
        event,
        registrations,
        reminders,
        registrationCount: registrations.length,
      },
    };
  } catch (error) {
    console.error("[Events] Get by ID failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Update event with optional S3 image uploads
 * Only uploads new images (base64 strings), preserves existing S3 URLs
 */
export async function updateEvent(
  eventId: string,
  formData: Partial<EventFormData>
): Promise<ApiResponse> {
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(eventId)) {
      return {
        success: false,
        message: "Invalid event ID",
      };
    }

    // Prepare array of new images to upload (only base64 strings)
    const imagesToUpload: string[] = [];
    const imageDescriptions: string[] = [];

    // Check if cover image is new (base64) or existing (URL)
    let coverImageUrl = formData.coverImage;
    if (formData.coverImage && formData.coverImage.startsWith("data:")) {
      imagesToUpload.push(formData.coverImage);
      imageDescriptions.push(`cover-${Date.now()}.jpg`);
    }

    // Check speaker images for new uploads
    const speakerImageIndexes: number[] = [];
    if (formData.speakers && formData.speakers.length > 0) {
      formData.speakers.forEach((speaker, index) => {
        if (speaker.photo && speaker.photo.startsWith("data:")) {
          imagesToUpload.push(speaker.photo);
          imageDescriptions.push(`speaker-${index}-${Date.now()}.jpg`);
          speakerImageIndexes.push(index);
        }
      });
    }

    // Upload new images to S3 in parallel
    let uploadedUrls: string[] = [];
    if (imagesToUpload.length > 0) {
      try {
        uploadedUrls = await uploadMultipleFilesToS3(
          imagesToUpload,
          imageDescriptions
        );
      } catch (uploadError) {
        console.error("[Events] Image upload failed:", uploadError);
        return {
          success: false,
          message: "Failed to upload images to S3",
          error:
            uploadError instanceof Error
              ? uploadError.message
              : "Unknown upload error",
        };
      }
    }

    // Replace base64 images with S3 URLs
    if (formData.coverImage?.startsWith("data:") && uploadedUrls.length > 0) {
      coverImageUrl = uploadedUrls[0];
    }

    // Replace speaker photo base64 with S3 URLs
    const updatedSpeakers = formData.speakers?.map((speaker, index) => {
      const speakerUploadIndex = speakerImageIndexes.indexOf(index);
      if (speakerUploadIndex !== -1 && speaker.photo?.startsWith("data:")) {
        const urlIndex =
          speakerUploadIndex +
          (formData.coverImage?.startsWith("data:") ? 1 : 0);
        return {
          ...speaker,
          photo: uploadedUrls[urlIndex] || speaker.photo,
        };
      }
      return speaker;
    });

    // Prepare update data
    const updateData = {
      ...formData,
      coverImage: coverImageUrl,
      speakers: updatedSpeakers,
      date: formData.date ? new Date(formData.date) : undefined,
      updatedAt: new Date(),
    };

    // Remove undefined values
    Object.keys(updateData).forEach(
      (key) =>
        updateData[key as keyof typeof updateData] === undefined &&
        delete updateData[key as keyof typeof updateData]
    );

    // Update event in database
    const { db } = await connectToDatabase();
    const eventsCollection = db.collection<Event>("events");

    const result = await eventsCollection.updateOne(
      { _id: new ObjectId(eventId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return {
        success: false,
        message: "Event not found",
      };
    }

    return {
      success: true,
      message: "Event updated successfully",
    };
  } catch (error) {
    console.error("[Events] Update failed:", error);
    return {
      success: false,
      message: "Failed to update event",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Delete event and all related data
 */
export async function deleteEvent(eventId: string): Promise<ApiResponse> {
  try {
    // Validate ObjectId format
    if (!ObjectId.isValid(eventId)) {
      return {
        success: false,
        message: "Invalid event ID",
      };
    }

    const { db } = await connectToDatabase();
    const eventsCollection = db.collection("events");

    // Delete event from database
    const result = await eventsCollection.deleteOne({
      _id: new ObjectId(eventId),
    });

    if (result.deletedCount === 0) {
      return {
        success: false,
        message: "Event not found",
      };
    }

    // Clean up related data in parallel
    await Promise.all([
      db
        .collection("eventRegistrations")
        .deleteMany({ eventId: new ObjectId(eventId) }),
      db
        .collection("email_reminders")
        .deleteMany({ eventId: new ObjectId(eventId) }),
      db
        .collection("email_logs")
        .deleteMany({ eventId: new ObjectId(eventId) }),
    ]);

    return {
      success: true,
      message: "Event deleted successfully",
    };
  } catch (error) {
    console.error("[Events] Delete failed:", error);
    return {
      success: false,
      message: "Failed to delete event",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
