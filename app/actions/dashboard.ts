/**
 * Dashboard Statistics Server Actions
 * Aggregates data for the dashboard overview
 * Provides real-time metrics and activity feed
 */

"use server";

import { connectToDatabase } from "@/lib/db";
import { ActivityLog, DashboardStats } from "@/types/data.types";

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const { db } = await connectToDatabase();
    const now = new Date();

    // Calculate stats in parallel
    const [totalEvents, totalRegistrations, emailsLast7Days] =
      await Promise.all([
        db.collection("events").countDocuments({}),
        db.collection("registrations").countDocuments({}),
        db.collection("email_logs").countDocuments({
          sentAt: {
            $gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
          },
        }),
      ]);

    // Calculate upcoming events
    const upcomingEvents = await db.collection("events").countDocuments({
      date: { $gte: now },
    });

    return {
      totalEvents,
      upcomingEvents,
      totalRegistrations,
      emailsSentLast7Days: emailsLast7Days,
    };
  } catch (error) {
    console.error("[Dashboard] Stats fetch failed:", error);
    return {
      totalEvents: 0,
      upcomingEvents: 0,
      totalRegistrations: 0,
      emailsSentLast7Days: 0,
    };
  }
}

/**
 * Get activity log (recent actions)
 */
export async function getActivityLog(limit = 10) {
  try {
    const { db } = await connectToDatabase();
    const activitiesCollection = db.collection<ActivityLog>("activities");

    const activities = await activitiesCollection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return {
      success: true,
      data: activities,
    };
  } catch (error) {
    console.error("[Dashboard] Activity log fetch failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
