/**
 * Email Server Actions
 * Thin transport layer: handles authentication, validation, and delegates to emailService.
 */

"use server";

import { requireAuth } from "@/lib/auth-helper";
import {
  sendEventAnnouncementEmailService,
  sendEventReminderEmailService,
  sendCustomBroadcastService,
  getEmailLogsService,
  getRemindersSentStatusService,
  hasAnnouncementBeenSentService,
  type TimeFrame,
} from "@/lib/services/emailService";
import type { SerializedEmailLog } from "@/types/serialized.types";


interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
  recipientCount?: number;
}

/**
 * Send event announcement to community members (Admin only)
 */
export async function sendEventAnnouncement(
  eventId: string,
  _eventData?: any
): Promise<EmailResponse> {
  const authError = await requireAuth<never>();
  if (authError) {
    return {
      success: false,
      message: "Authentication required",
      error: authError.error,
    };
  }

  try {
    const result = await sendEventAnnouncementEmailService(eventId);

    return {
      success: true,
      message: result.message,
      recipientCount: result.recipientCount,
    };
  } catch (error) {
    console.error("[EmailAction:sendEventAnnouncement] Action failed:", error);
    return {
      success: false,
      message: "Failed to send announcement email",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send time-aware reminder to event attendees (Admin only)
 */
export async function sendEventReminder(
  eventId: string,
  recipientsOrTimeFrame?: any,
  _eventData?: any,
  timeFrame?: TimeFrame
): Promise<EmailResponse> {
  const authError = await requireAuth<never>();
  if (authError) {
    return {
      success: false,
      message: "Authentication required",
      error: authError.error,
    };
  }

  try {
    const targetTimeFrame: TimeFrame =
      typeof recipientsOrTimeFrame === "string"
        ? (recipientsOrTimeFrame as TimeFrame)
        : timeFrame || "1-week";

    const result = await sendEventReminderEmailService(eventId, targetTimeFrame);

    return {
      success: true,
      message: `${targetTimeFrame} reminder sent successfully`,
      recipientCount: result.recipientCount,
    };
  } catch (error) {
    console.error("[EmailAction:sendEventReminder] Action failed:", error);
    return {
      success: false,
      message: "Failed to send reminder email",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Send custom broadcast email created in TipTap builder (Admin only)
 */
export async function sendCustomBroadcast(
  subjectOrData:
    | string
    | {
        subject: string;
        content?: string;
        htmlContent?: string;
        recipientType?: "all" | "community" | "event-attendees";
        scheduledFor?: Date | null;
      },
  htmlContentParam?: string
): Promise<EmailResponse> {
  const authError = await requireAuth<never>();
  if (authError) {
    return {
      success: false,
      message: "Authentication required",
      error: authError.error,
    };
  }

  try {
    const subject =
      typeof subjectOrData === "string" ? subjectOrData : subjectOrData.subject;
    const content =
      typeof subjectOrData === "string"
        ? htmlContentParam || ""
        : subjectOrData.content || subjectOrData.htmlContent || "";
    const recipientType =
      typeof subjectOrData === "object" ? subjectOrData.recipientType : "all";

    if (!subject?.trim()) {
      return { success: false, message: "Subject is required", error: "VALIDATION_ERROR" };
    }
    if (!content?.trim()) {
      return { success: false, message: "Content is required", error: "VALIDATION_ERROR" };
    }

    const result = await sendCustomBroadcastService({
      subject: subject.trim(),
      htmlContent: content,
      recipientType,
    });

    return {
      success: true,
      message: "Broadcast sent successfully",
      recipientCount: result.recipientCount,
    };
  } catch (error) {
    console.error("[EmailAction:sendCustomBroadcast] Action failed:", error);
    return {
      success: false,
      message: "Failed to send custom broadcast",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get reminder sent status for all timeframes (Admin only)
 */
export async function getRemindersSentStatus(eventId: string): Promise<{
  success: boolean;
  data?: Record<TimeFrame, boolean>;
  error?: string;
}> {
  const authError = await requireAuth<never>();
  if (authError) {
    return { success: false, error: authError.error };
  }

  try {
    const data = await getRemindersSentStatusService(eventId);
    return { success: true, data };
  } catch (error) {
    console.error("[EmailAction:getRemindersSentStatus] Action failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get email history for recent sends (Admin only)
 */
export async function getEmailHistory(limit = 50): Promise<{
  success: boolean;
  data?: SerializedEmailLog[];
  error?: string;
}> {
  const authError = await requireAuth<never>();
  if (authError) {
    return { success: false, error: authError.error };
  }

  try {
    const { logs } = await getEmailLogsService({ limit });
    return { success: true, data: logs };
  } catch (error) {
    console.error("[EmailAction:getEmailHistory] Action failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Check if announcement was already sent for a specific event
 */
export async function hasAnnouncementBeenSent(eventId: string): Promise<boolean> {
  try {
    return await hasAnnouncementBeenSentService(eventId);
  } catch (error) {
    console.error("[EmailAction:hasAnnouncementBeenSent] Action failed:", error);
    return false;
  }
}
