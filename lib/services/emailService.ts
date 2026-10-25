/**
 * emailService.ts
 *
 * Centralized service for all outbound emails via Amazon SES.
 * Handles rendering, batching, error recovery, deduplication, and audit logging.
 */

import { ObjectId, type Filter, type Document } from "mongodb";
import { connectToDatabase } from "@/lib/db";
import { COLLECTIONS, ACTIVITY_ACTIONS, EMAIL_TYPES } from "@/lib/constants";
import { serializeEmailLogs } from "@/lib/serializers";
import {
  sendSesSingleEmail,
  sendSesBccBroadcast,
} from "@/lib/email/sesDispatcher";
import ConfirmationEmail from "@/components/email-templates/ConfirmationEmail";
import EventConfirmationEmail from "@/components/email-templates/EventConfirmationEmail";
import EventAnnouncementEmail from "@/components/email-templates/event-announcement-email";
import EventReminderEmail from "@/components/email-templates/event-reminder-email";
import CustomBroadcastEmail from "@/components/email-templates/custom-broadcast-email";
import type { SerializedEmailLog } from "@/types/serialized.types";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export interface SendCommunityWelcomeOptions {
  firstName: string;
  email: string;
}

/**
 * Send welcome confirmation email to new community member via Amazon SES
 */
export async function sendCommunityWelcomeEmailService({
  firstName,
  email,
}: SendCommunityWelcomeOptions): Promise<{ success: boolean; resendId?: string }> {
  try {
    const result = await sendSesSingleEmail({
      to: email,
      subject: "Welcome to COOU Techies! 🚀",
      reactElement: ConfirmationEmail({ firstName }),
    });

    if (!result.success) {
      console.error("[EmailService:Welcome] SES error:", result.error);
      return { success: false };
    }

    const { db } = await connectToDatabase();
    await db.collection(COLLECTIONS.EMAIL_LOGS).insertOne({
      emailType: EMAIL_TYPES.COMMUNITY_WELCOME,
      recipientEmail: email,
      recipientCount: 1,
      trigger: "auto",
      sentAt: new Date(),
      subject: "Welcome to COOU Techies! 🚀",
      sesMessageId: result.messageId,
      resendId: result.messageId, // Backward compatibility for existing logs
    });

    return { success: true, resendId: result.messageId };
  } catch (error) {
    console.error("[EmailService:Welcome] Unexpected dispatch error:", error);
    return { success: false };
  }
}

export interface SendEventConfirmationOptions {
  firstName: string;
  lastName?: string;
  email: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventDescription?: string;
  eventId: string;
}

/**
 * Send event registration confirmation ticket email via Amazon SES
 */
export async function sendEventConfirmationEmailService(
  options: SendEventConfirmationOptions
): Promise<{ success: boolean; resendId?: string }> {
  try {
    const result = await sendSesSingleEmail({
      to: options.email,
      subject: `Registration Confirmed: ${options.eventTitle} 🎟️`,
      reactElement: EventConfirmationEmail({
        firstName: options.firstName,
        eventTitle: options.eventTitle,
        eventDate: options.eventDate,
        eventTime: options.eventTime,
        eventLocation: options.eventLocation,
        eventDescription: options.eventDescription || "",
      }),
    });

    if (!result.success) {
      console.error("[EmailService:EventConfirmation] SES error:", result.error);
      return { success: false };
    }

    const { db } = await connectToDatabase();
    await db.collection(COLLECTIONS.EMAIL_LOGS).insertOne({
      emailType: EMAIL_TYPES.EVENT_CONFIRMATION,
      eventId: new ObjectId(options.eventId),
      recipientEmail: options.email,
      recipientCount: 1,
      trigger: "auto",
      sentAt: new Date(),
      subject: `Registration Confirmed: ${options.eventTitle} 🎟️`,
      sesMessageId: result.messageId,
      resendId: result.messageId,
    });

    return { success: true, resendId: result.messageId };
  } catch (error) {
    console.error("[EmailService:EventConfirmation] Unexpected dispatch error:", error);
    return { success: false };
  }
}

/**
 * Send event announcement to community members using Strategy A (BCC Chunking)
 */
export async function sendEventAnnouncementEmailService(
  eventId: string
): Promise<{ success: boolean; recipientCount: number; message: string }> {
  if (!ObjectId.isValid(eventId)) {
    throw new Error("Invalid event ID");
  }

  const { db } = await connectToDatabase();
  const event = await db.collection(COLLECTIONS.EVENTS).findOne({ _id: new ObjectId(eventId) });
  if (!event) {
    throw new Error("Event not found");
  }

  const registrations = await db
    .collection(COLLECTIONS.REGISTRATIONS)
    .find({}, { projection: { email: 1, firstName: 1 } })
    .toArray();

  if (registrations.length === 0) {
    return {
      success: true,
      recipientCount: 0,
      message: "No registered community members to notify",
    };
  }

  const emails = registrations.map((r) => r.email).filter(Boolean);
  const eventImage = typeof event.coverImage === "string" ? event.coverImage : event.coverImage?.url;
  const registrationLink = `${BASE_URL}/events/${event._id}`;

  const broadcastResult = await sendSesBccBroadcast({
    recipients: emails,
    subject: `New Event: ${event.title} 🚀`,
    reactElement: EventAnnouncementEmail({
      eventTitle: event.title,
      eventDescription: event.description,
      eventDate: new Date(event.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      eventLocation: event.location,
      eventImage,
      registrationLink,
    }),
  });

  await Promise.all([
    db.collection(COLLECTIONS.EMAIL_LOGS).insertOne({
      eventId: event._id,
      emailType: EMAIL_TYPES.EVENT_ANNOUNCEMENT,
      recipientCount: emails.length,
      trigger: "manual",
      sentAt: new Date(),
      subject: `New Event: ${event.title} 🚀`,
      sesMessageIds: broadcastResult.messageIds,
    }),
    db.collection(COLLECTIONS.EVENTS).updateOne(
      { _id: event._id },
      { $set: { announcementSent: true, announcementSentAt: new Date() } }
    ),
    db.collection(COLLECTIONS.ACTIVITIES).insertOne({
      action: ACTIVITY_ACTIONS.ANNOUNCEMENT_SENT,
      eventId: event._id,
      details: `Announcement sent to ${emails.length} members for "${event.title}"`,
      createdAt: new Date(),
    }),
  ]);

  return {
    success: broadcastResult.success,
    recipientCount: emails.length,
    message: `Announcement successfully dispatched to ${emails.length} members!`,
  };
}

/**
 * Send automated or manual event reminder (with deduplication invariant check)
 */
export async function sendEventReminderEmailService(
  eventId: string,
  timeFrame: "1-week" | "3-days" | "tomorrow" | "today"
): Promise<{ success: boolean; recipientCount: number }> {
  if (!ObjectId.isValid(eventId)) {
    throw new Error("Invalid event ID");
  }

  const { db } = await connectToDatabase();
  const eventObjectId = new ObjectId(eventId);

  // Invariant: Check if reminder already sent for this event and timeframe
  const existingLog = await db.collection(COLLECTIONS.EMAIL_LOGS).findOne({
    eventId: eventObjectId,
    emailType: EMAIL_TYPES.EVENT_REMINDER,
    timeFrame,
  });

  if (existingLog) {
    return { success: true, recipientCount: 0 };
  }

  const [event, attendees] = await Promise.all([
    db.collection(COLLECTIONS.EVENTS).findOne({ _id: eventObjectId }),
    db.collection(COLLECTIONS.EVENT_REGISTRATIONS).find({ eventId: eventObjectId }).toArray(),
  ]);

  if (!event || attendees.length === 0) {
    return { success: true, recipientCount: 0 };
  }

  const eventLink = `${BASE_URL}/events/${eventId}`;
  const validAttendees = attendees.filter((a) => Boolean(a.email));

  // Send reminders individually to personalize recipient name
  const messageIds: string[] = [];
  for (const attendee of validAttendees) {
    const res = await sendSesSingleEmail({
      to: attendee.email,
      subject: `Reminder: ${event.title} is coming up! ⏰`,
      reactElement: EventReminderEmail({
        recipientName: attendee.firstName || "Attendee",
        eventTitle: event.title,
        eventDate: new Date(event.date).toLocaleDateString(),
        eventLocation: event.location,
        timeFrame,
        eventLink,
      }),
    });
    if (res.messageId) messageIds.push(res.messageId);
  }

  await Promise.all([
    db.collection(COLLECTIONS.EMAIL_LOGS).insertOne({
      eventId: eventObjectId,
      emailType: EMAIL_TYPES.EVENT_REMINDER,
      timeFrame,
      recipientCount: validAttendees.length,
      trigger: "auto",
      sentAt: new Date(),
      subject: `Reminder: ${event.title} is coming up! ⏰`,
      sesMessageIds: messageIds,
    }),
    db.collection(COLLECTIONS.ACTIVITIES).insertOne({
      action: ACTIVITY_ACTIONS.REMINDER_SENT,
      eventId: eventObjectId,
      details: `${timeFrame} reminder sent to ${validAttendees.length} attendees for "${event.title}"`,
      createdAt: new Date(),
    }),
  ]);

  return { success: true, recipientCount: validAttendees.length };
}

/**
 * Send custom broadcast email authored with TipTap editor using Strategy A (BCC Chunking)
 */
export async function sendCustomBroadcastService({
  subject,
  htmlContent,
}: {
  subject: string;
  htmlContent: string;
  recipientType?: "all" | "community" | "event-attendees";
}): Promise<{ success: boolean; recipientCount: number }> {
  const { db } = await connectToDatabase();

  const members = await db
    .collection(COLLECTIONS.REGISTRATIONS)
    .find({}, { projection: { email: 1 } })
    .toArray();

  const emails = members.map((m) => m.email).filter(Boolean);

  if (emails.length === 0) {
    return { success: true, recipientCount: 0 };
  }

  const broadcastResult = await sendSesBccBroadcast({
    recipients: emails,
    subject,
    reactElement: CustomBroadcastEmail({
      subject,
      htmlContent,
    }),
  });

  await Promise.all([
    db.collection(COLLECTIONS.EMAIL_LOGS).insertOne({
      emailType: EMAIL_TYPES.CUSTOM_BROADCAST,
      recipientCount: emails.length,
      trigger: "manual",
      sentAt: new Date(),
      subject,
      htmlContentLength: htmlContent.length,
      sesMessageIds: broadcastResult.messageIds,
    }),
    db.collection(COLLECTIONS.ACTIVITIES).insertOne({
      action: ACTIVITY_ACTIONS.BROADCAST_SENT,
      details: `Custom broadcast "${subject}" sent to ${emails.length} recipients`,
      createdAt: new Date(),
    }),
  ]);

  return { success: broadcastResult.success, recipientCount: emails.length };
}

/**
 * Get paginated email logs
 */
export async function getEmailLogsService(
  options: { page?: number; limit?: number; eventId?: string } = {}
): Promise<{ logs: SerializedEmailLog[]; total: number; pages: number }> {
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(50, options.limit || 10);
  const skip = (page - 1) * limit;

  const { db } = await connectToDatabase();
  const filter: Filter<Document> = {};
  if (options.eventId && ObjectId.isValid(options.eventId)) {
    filter.eventId = new ObjectId(options.eventId);
  }

  const [rawLogs, total] = await Promise.all([
    db
      .collection(COLLECTIONS.EMAIL_LOGS)
      .find(filter)
      .sort({ sentAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    db.collection(COLLECTIONS.EMAIL_LOGS).countDocuments(filter),
  ]);

  return {
    logs: serializeEmailLogs(rawLogs),
    total,
    pages: Math.ceil(total / limit) || 1,
  };
}

export type TimeFrame = "1-week" | "3-days" | "tomorrow" | "today";

/**
 * Get reminder sent status for all timeframes
 */
export async function getRemindersSentStatusService(
  eventId: string
): Promise<Record<TimeFrame, boolean>> {
  const status: Record<TimeFrame, boolean> = {
    "1-week": false,
    "3-days": false,
    tomorrow: false,
    today: false,
  };

  if (!ObjectId.isValid(eventId)) return status;

  const { db } = await connectToDatabase();
  const reminderLogs = await db
    .collection(COLLECTIONS.EMAIL_LOGS)
    .find({
      eventId: new ObjectId(eventId),
      emailType: EMAIL_TYPES.EVENT_REMINDER,
    })
    .toArray();

  reminderLogs.forEach((log: Record<string, unknown>) => {
    const tf = typeof log.timeFrame === "string" ? log.timeFrame : undefined;
    if (tf && tf in status) {
      status[tf as TimeFrame] = true;
    }
  });

  return status;
}

/**
 * Check if event announcement has already been sent
 */
export async function hasAnnouncementBeenSentService(
  eventId: string
): Promise<boolean> {
  if (!ObjectId.isValid(eventId)) return false;

  const { db } = await connectToDatabase();
  const event = await db
    .collection(COLLECTIONS.EVENTS)
    .findOne({ _id: new ObjectId(eventId) }, { projection: { announcementSent: 1 } });

  return event?.announcementSent === true;
}
