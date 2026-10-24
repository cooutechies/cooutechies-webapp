/**
 * emailService.ts
 *
 * Centralized service for all outbound emails via Resend.
 * Handles rendering, batching, error recovery, deduplication, and audit logging.
 */

import { Resend } from "resend";
import { ObjectId, type Filter, type Document } from "mongodb";
import { connectToDatabase } from "@/lib/db";
import { COLLECTIONS, ACTIVITY_ACTIONS, EMAIL_TYPES } from "@/lib/constants";
import { serializeEmailLogs } from "@/lib/serializers";
import ConfirmationEmail from "@/components/email-templates/ConfirmationEmail";
import EventConfirmationEmail from "@/components/email-templates/EventConfirmationEmail";
import EventAnnouncementEmail from "@/components/email-templates/event-announcement-email";
import EventReminderEmail from "@/components/email-templates/event-reminder-email";
import CustomBroadcastEmail from "@/components/email-templates/custom-broadcast-email";
import type { SerializedEmailLog } from "@/types/serialized.types";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "COOU Techies <team@cooutechies.org>";
const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export interface SendCommunityWelcomeOptions {
  firstName: string;
  email: string;
}

/**
 * Send welcome confirmation email to new community member
 */
export async function sendCommunityWelcomeEmailService({
  firstName,
  email,
}: SendCommunityWelcomeOptions): Promise<{ success: boolean; resendId?: string }> {
  if (!resend) {
    console.warn("[EmailService] RESEND_API_KEY not configured — skipping welcome email.");
    return { success: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Welcome to COOU Techies! 🚀",
      react: ConfirmationEmail({ firstName }),
    });

    if (error) {
      console.error("[EmailService:Welcome] Resend error:", error);
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
      resendId: data?.id,
    });

    return { success: true, resendId: data?.id };
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
 * Send event registration confirmation ticket email
 */
export async function sendEventConfirmationEmailService(
  options: SendEventConfirmationOptions
): Promise<{ success: boolean; resendId?: string }> {
  if (!resend) {
    console.warn("[EmailService] RESEND_API_KEY not configured — skipping event confirmation email.");
    return { success: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.email,
      subject: `Registration Confirmed: ${options.eventTitle} 🎟️`,
      react: EventConfirmationEmail({
        firstName: options.firstName,
        eventTitle: options.eventTitle,
        eventDate: options.eventDate,
        eventTime: options.eventTime,
        eventLocation: options.eventLocation,
        eventDescription: options.eventDescription || "",
      }),
    });

    if (error) {
      console.error("[EmailService:EventConfirmation] Resend error:", error);
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
      resendId: data?.id,
    });

    return { success: true, resendId: data?.id };
  } catch (error) {
    console.error("[EmailService:EventConfirmation] Unexpected dispatch error:", error);
    return { success: false };
  }
}

/**
 * Send event announcement to community members
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
    return { success: true, recipientCount: 0, message: "No registered community members to notify" };
  }

  const emails = registrations.map((r) => r.email).filter(Boolean);
  const eventImage = typeof event.coverImage === "string" ? event.coverImage : event.coverImage?.url;
  const registrationLink = `${BASE_URL}/events/${event._id}`;

  if (resend) {
    // Send in batches of 50 to respect Resend rate limits
    const batchSize = 50;
    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      await resend.emails.send({
        from: FROM_EMAIL,
        to: batch,
        subject: `New Event: ${event.title} 🚀`,
        react: EventAnnouncementEmail({
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
    }
  } else {
    console.info(
      `[EmailService:Dev] RESEND_API_KEY not configured. Announcement for "${event.title}" would be sent to ${emails.length} recipients.`
    );
  }

  await Promise.all([
    db.collection(COLLECTIONS.EMAIL_LOGS).insertOne({
      eventId: event._id,
      emailType: EMAIL_TYPES.EVENT_ANNOUNCEMENT,
      recipientCount: emails.length,
      trigger: "manual",
      sentAt: new Date(),
      subject: `New Event: ${event.title} 🚀`,
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

  return { success: true, recipientCount: emails.length, message: "Announcement sent successfully" };
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

  if (resend) {
    // Send to attendees
    for (const attendee of attendees) {
      if (!attendee.email) continue;
      await resend.emails.send({
        from: FROM_EMAIL,
        to: attendee.email,
        subject: `Reminder: ${event.title} is coming up! ⏰`,
        react: EventReminderEmail({
          recipientName: attendee.firstName || "Attendee",
          eventTitle: event.title,
          eventDate: new Date(event.date).toLocaleDateString(),
          eventLocation: event.location,
          timeFrame,
          eventLink,
        }),
      });
    }
  } else {
    console.info(
      `[EmailService:Dev] RESEND_API_KEY not configured. ${timeFrame} reminder for "${event.title}" would be sent to ${attendees.length} recipients.`
    );
  }

  await Promise.all([
    db.collection(COLLECTIONS.EMAIL_LOGS).insertOne({
      eventId: eventObjectId,
      emailType: EMAIL_TYPES.EVENT_REMINDER,
      timeFrame,
      recipientCount: attendees.length,
      trigger: "auto",
      sentAt: new Date(),
      subject: `Reminder: ${event.title} is coming up! ⏰`,
    }),
    db.collection(COLLECTIONS.ACTIVITIES).insertOne({
      action: ACTIVITY_ACTIONS.REMINDER_SENT,
      eventId: eventObjectId,
      details: `${timeFrame} reminder sent to ${attendees.length} attendees for "${event.title}"`,
      createdAt: new Date(),
    }),
  ]);

  return { success: true, recipientCount: attendees.length };
}

/**
 * Send custom broadcast email authored with TipTap editor
 */
export async function sendCustomBroadcastService({
  subject,
  htmlContent,
  recipientType = "all",
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

  if (resend) {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: emails,
      subject,
      react: CustomBroadcastEmail({
        subject,
        htmlContent,
      }),
    });
  } else {
    console.info(
      `[EmailService:Dev] RESEND_API_KEY not configured. Broadcast "${subject}" would be sent to ${emails.length} recipients.`
    );
  }

  await Promise.all([
    db.collection(COLLECTIONS.EMAIL_LOGS).insertOne({
      emailType: EMAIL_TYPES.CUSTOM_BROADCAST,
      recipientCount: emails.length,
      trigger: "manual",
      sentAt: new Date(),
      subject,
      htmlContentLength: htmlContent.length,
    }),
    db.collection(COLLECTIONS.ACTIVITIES).insertOne({
      action: ACTIVITY_ACTIONS.BROADCAST_SENT,
      details: `Custom broadcast "${subject}" sent to ${emails.length} recipients`,
      createdAt: new Date(),
    }),
  ]);

  return { success: true, recipientCount: emails.length };
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
    db.collection(COLLECTIONS.EMAIL_LOGS).find(filter).sort({ sentAt: -1 }).skip(skip).limit(limit).toArray(),
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

