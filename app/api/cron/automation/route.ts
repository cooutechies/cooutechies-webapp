/**
 * Vercel Cron Job for Email Automation
 * Runs daily to send scheduled reminder and thank-you emails
 *
 * Documentation: https://vercel.com/docs/cron-jobs
 *
 * This endpoint is automatically called by Vercel at the scheduled time.
 * No manual intervention needed - just make sure:
 * 1. vercel.json has the cron schedule configured
 * 2. Environment variables are set (MONGODB_URL, RESEND_API_KEY, etc.)
 */

import { connectToDatabase } from "@/lib/db";
import type { ObjectId } from "mongodb";
import {
  generateEventReminderEmail,
  generateThankYouEmail,
} from "@/lib/email-templates";
import type { Event, Registration, EmailLog } from "@/types/data.types";

export async function GET(request: Request) {
  // Verify request is from Vercel
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    console.log("[CRON] Automation job started");
    const { db } = await connectToDatabase();
    const now = new Date();

    // Get all events
    const eventsCollection = db.collection<Event>("events");
    const events = await eventsCollection.find({}).toArray();

    let emailsSent = 0;
    let emailsFailed = 0;

    for (const event of events) {
      const eventId = event._id;

      // Calculate days until event
      const daysUntilEvent = Math.ceil(
        (event.date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      );
      const daysSinceEvent = Math.ceil(
        (now.getTime() - event.date.getTime()) / (1000 * 60 * 60 * 24)
      );

      // Check if event is upcoming or recent
      const isUpcoming = daysUntilEvent > 0 && daysUntilEvent <= 7;
      const isRecent = daysSinceEvent >= 0 && daysSinceEvent <= 7;

      // Process reminders (1 week and 1 day before)
      if (isUpcoming) {
        for (const daysOffset of [7, 1]) {
          if (daysUntilEvent === daysOffset) {
            const emailSent = await sendReminderEmail(
              db,
              eventId,
              event,
              daysOffset
            );
            if (emailSent) emailsSent++;
            else emailsFailed++;
          }
        }
      }

      // Process thank-you emails (1 day after)
      if (isRecent && daysSinceEvent === 1) {
        const emailSent = await sendThankYouEmail(db, eventId, event);
        if (emailSent) emailsSent++;
        else emailsFailed++;
      }
    }

    console.log(
      `[CRON] Automation job completed. Sent: ${emailsSent}, Failed: ${emailsFailed}`
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: `Cron job completed. Emails sent: ${emailsSent}, Failed: ${emailsFailed}`,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[CRON] Automation job failed:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * Send reminder email if not already sent
 */
async function sendReminderEmail(
  db: any,
  eventId: ObjectId,
  event: Event,
  daysOffset: number
): Promise<boolean> {
  try {
    const emailLogsCollection = db.collection<EmailLog>("email_logs");

    // Check if already sent
    const alreadySent = await emailLogsCollection.findOne({
      eventId,
      emailType: "reminder",
      daysBeforeEvent: daysOffset,
    });

    if (alreadySent) {
      console.log(
        `[CRON] Reminder already sent for event ${eventId} (${daysOffset} days before)`
      );
      return false;
    }

    // Get all registrations for this event
    const registrationsCollection =
      db.collection<Registration>("registrations");
    const registrations = await registrationsCollection
      .find({ eventId })
      .toArray();

    if (registrations.length === 0) {
      console.log(`[CRON] No registrations for event ${eventId}`);
      return false;
    }

    // Build email
    const recipients = registrations.map((r) => r.email);
    const html = generateEventReminderEmail({
      eventTitle: event.title,
      eventDate: event.date.toLocaleDateString(),
      eventLocation: event.location,
      firstName: registrations[0]?.firstName || "there",
    });

    // Send via Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || "noreply@cooutechies.com",
        to: recipients,
        subject: `Reminder: ${event.title}`,
        html,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.statusText}`);
    }

    // Log email
    await emailLogsCollection.insertOne({
      eventId,
      emailType: "reminder",
      trigger: "auto",
      recipientCount: recipients.length,
      sentAt: new Date(),
      subject: `Reminder: ${event.title}`,
      daysBeforeEvent: daysOffset,
    } as any);

    console.log(
      `[CRON] Reminder sent for event ${eventId} to ${recipients.length} recipients`
    );
    return true;
  } catch (error) {
    console.error("[CRON] Reminder email failed:", error);
    return false;
  }
}

/**
 * Send thank-you email if not already sent
 */
async function sendThankYouEmail(
  db: any,
  eventId: ObjectId,
  event: Event
): Promise<boolean> {
  try {
    const emailLogsCollection = db.collection<EmailLog>("email_logs");

    // Check if already sent
    const alreadySent = await emailLogsCollection.findOne({
      eventId,
      emailType: "thank-you",
    });

    if (alreadySent) {
      console.log(`[CRON] Thank-you email already sent for event ${eventId}`);
      return false;
    }

    // Get all registrations
    const registrationsCollection =
      db.collection<Registration>("registrations");
    const registrations = await registrationsCollection
      .find({ eventId })
      .toArray();

    if (registrations.length === 0) {
      return false;
    }

    // Build email
    const recipients = registrations.map((r) => r.email);
    const html = generateThankYouEmail({
      eventTitle: event.title,
      firstName: registrations[0]?.firstName || "there",
    });

    // Send via Resend
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL || "noreply@cooutechies.com",
        to: recipients,
        subject: `Thank you for attending ${event.title}`,
        html,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.statusText}`);
    }

    // Log email
    await emailLogsCollection.insertOne({
      eventId,
      emailType: "thank-you",
      trigger: "auto",
      recipientCount: recipients.length,
      sentAt: new Date(),
      subject: `Thank you for attending ${event.title}`,
    } as any);

    console.log(
      `[CRON] Thank-you email sent for event ${eventId} to ${recipients.length} recipients`
    );
    return true;
  } catch (error) {
    console.error("[CRON] Thank-you email failed:", error);
    return false;
  }
}
