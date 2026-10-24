/**
 * Event Server Actions
 * Thin transport layer: handles authentication, validation, and delegates to eventService.
 */

"use server";

import type { EventFormData } from "@/lib/validations";
import type { ApiResponse } from "@/types/data.types";
import type {
  SerializedEventDetailResponse,
  PaginatedEventsResponse,
} from "@/types/serialized.types";
import { requireAuth } from "@/lib/auth-helper";
import {
  createEventService,
  getEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} from "@/lib/services/eventService";

/**
 * Create a new event with uploaded images
 */
export async function createEvent(
  formData: EventFormData
): Promise<ApiResponse<{ eventId: string }>> {
  const authError = await requireAuth<{ eventId: string }>();
  if (authError) return authError;

  try {
    const { eventId } = await createEventService(formData);

    return {
      success: true,
      message: "Event created successfully",
      data: { eventId },
    };
  } catch (error) {
    console.error("[Events:createEvent] Action failed:", error);
    return {
      success: false,
      message: "Failed to create event",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get all events with pagination and registration counts
 */
export async function getEvents(
  page = 1,
  limit = 10
): Promise<ApiResponse<PaginatedEventsResponse>> {
  try {
    const data = await getEventsService({ page, limit });

    return {
      success: true,
      message: "Events fetched successfully",
      data,
    };
  } catch (error) {
    console.error("[Events:getEvents] Action failed:", error);
    return {
      success: false,
      message: "Encountered error fetching events",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get event details by ID with registrations and reminders
 */
export async function getEventById(
  eventId: string
): Promise<ApiResponse<SerializedEventDetailResponse>> {
  try {
    const data = await getEventByIdService(eventId);

    if (!data) {
      return {
        success: false,
        message: "Event not found",
        error: "Event not found",
      };
    }

    return {
      success: true,
      message: "Event fetched successfully",
      data,
    };
  } catch (error) {
    console.error("[Events:getEventById] Action failed:", error);
    return {
      success: false,
      message: "Encountered error fetching event",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Update event with optional image uploads
 */
export async function updateEvent(
  eventId: string,
  formData: Partial<EventFormData>
): Promise<ApiResponse<never>> {
  const authError = await requireAuth<never>();
  if (authError) return authError;

  try {
    const updated = await updateEventService(eventId, formData);

    if (!updated) {
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
    console.error("[Events:updateEvent] Action failed:", error);
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
export async function deleteEvent(
  eventId: string
): Promise<ApiResponse<never>> {
  const authError = await requireAuth<never>();
  if (authError) return authError;

  try {
    const { deleted } = await deleteEventService(eventId);

    if (!deleted) {
      return {
        success: false,
        message: "Event not found",
      };
    }

    return {
      success: true,
      message: "Event deleted successfully",
    };
  } catch (error) {
    console.error("[Events:deleteEvent] Action failed:", error);
    return {
      success: false,
      message: "Failed to delete event",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
