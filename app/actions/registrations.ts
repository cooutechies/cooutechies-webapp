/**
 * Registration Server Actions
 * Thin transport layer: handles authentication, validation, and delegates to registrationService.
 */

"use server";

import {
  registrationSchema,
  eventRegistrationSchema,
  type RegistrationFormData,
  type EventRegistrationData,
} from "@/lib/validations";
import type {
  PaginatedEventRegistrationsResponse,
  PaginatedRegistrationsResponse,
  SerializedCommunityRegistration,
} from "@/types/serialized.types";
import { requireAuth } from "@/lib/auth-helper";
import type { ApiResponse } from "@/types/data.types";
import {
  registerCommunityMemberService,
  getCommunityRegistrationsService,
  registerForEventService,
  getEventRegistrationsService,
  exportAllCommunityRegistrationsService,
} from "@/lib/services/registrationService";

interface RegistrationResponseData {
  registrationId: string;
}

/**
 * Submit a new community registration (Public endpoint)
 */
export async function submitRegistration(
  formData: RegistrationFormData
): Promise<ApiResponse<RegistrationResponseData>> {
  try {
    const validatedData = registrationSchema.parse(formData);
    const { registrationId } = await registerCommunityMemberService(validatedData);

    return {
      success: true,
      message: "Registration successful! Check your email for confirmation.",
      data: { registrationId },
    };
  } catch (error: any) {
    console.error("[Registrations:submitRegistration] Action failed:", error);

    if (error?.code === "EMAIL_EXISTS") {
      return {
        success: false,
        message: "This email is already registered",
        error: "EMAIL_EXISTS",
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Registration failed. Please try again.",
      error: "REGISTRATION_ERROR",
    };
  }
}

/**
 * Get all community registrations with serialization (Admin only)
 */
export async function getCommunityRegistrations(
  page = 1,
  limit = 20
): Promise<ApiResponse<PaginatedRegistrationsResponse>> {
  const authError = await requireAuth<PaginatedRegistrationsResponse>();
  if (authError) return authError;

  try {
    const data = await getCommunityRegistrationsService({ page, limit });

    return {
      success: true,
      message: "Community registrations fetched successfully",
      data,
    };
  } catch (error) {
    console.error("[Registrations:getCommunityRegistrations] Action failed:", error);
    return {
      success: false,
      message: "Failed to fetch community registrations",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get registrations for a specific event with serialization (Admin only)
 */
export async function getEventRegistrations(
  eventId: string,
  page = 1,
  limit = 20
): Promise<ApiResponse<PaginatedEventRegistrationsResponse>> {
  const authError = await requireAuth<PaginatedEventRegistrationsResponse>();
  if (authError) return authError;

  try {
    const data = await getEventRegistrationsService(eventId, page, limit);

    return {
      success: true,
      message: "Event registrations fetched successfully",
      data,
    };
  } catch (error) {
    console.error("[Registrations:getEventRegistrations] Action failed:", error);
    return {
      success: false,
      message: "Failed to fetch event registrations",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Submit event registration (Public endpoint)
 */
export async function submitEventRegistration(
  formData: EventRegistrationData & {
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    eventDescription?: string;
  }
): Promise<ApiResponse<RegistrationResponseData>> {
  try {
    const validatedData = eventRegistrationSchema.parse(formData);

    const { registrationId } = await registerForEventService({
      eventId: validatedData.eventId,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      eventTitle: formData.eventTitle,
      eventDate: formData.eventDate,
      eventTime: formData.eventTime,
      eventLocation: formData.eventLocation,
      eventDescription: formData.eventDescription,
    });

    return {
      success: true,
      message: "Event registration successful! Check your email for your confirmation ticket.",
      data: { registrationId },
    };
  } catch (error: any) {
    console.error("[Registrations:submitEventRegistration] Action failed:", error);

    if (error?.code === "EMAIL_EXISTS") {
      return {
        success: false,
        message: "This email is already registered for this event",
        error: "EMAIL_EXISTS",
      };
    }

    if (error?.code === "EVENT_FULL") {
      return {
        success: false,
        message: "This event has reached maximum capacity",
        error: "EVENT_FULL",
      };
    }

    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to register for event",
      error: "REGISTRATION_ERROR",
    };
  }
}

/**
 * Export all registrations (Admin only)
 */
export async function exportRegistrations(): Promise<
  ApiResponse<SerializedCommunityRegistration[]>
> {
  const authError = await requireAuth<SerializedCommunityRegistration[]>();
  if (authError) return authError;

  try {
    const data = await exportAllCommunityRegistrationsService();

    return {
      success: true,
      message: "Registrations exported successfully",
      data,
    };
  } catch (error) {
    console.error("[Registrations:exportRegistrations] Action failed:", error);
    return {
      success: false,
      message: "Failed to export registrations",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
