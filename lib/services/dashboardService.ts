/**
 * dashboardService.ts
 *
 * Single source of truth for dashboard metrics and admin activity feed.
 */

import { connectToDatabase } from "@/lib/db";
import { COLLECTIONS } from "@/lib/constants";
import { serializeActivityLogs, serializeEvents } from "@/lib/serializers";
import type { SerializedActivityLog, SerializedEvent } from "@/types/serialized.types";

export interface DashboardMetrics {
  totalEvents: number;
  upcomingEvents: number;
  totalRegistrations: number;
  emailsSentLast7Days: number;
  totalEventAttendees: number;
}

/**
 * Get aggregated dashboard statistics
 */
export async function getDashboardMetricsService(): Promise<DashboardMetrics> {
  const { db } = await connectToDatabase();
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    totalEvents,
    upcomingEvents,
    totalRegistrations,
    emailsSentLast7Days,
    totalEventAttendees,
  ] = await Promise.all([
    db.collection(COLLECTIONS.EVENTS).countDocuments({}),
    db.collection(COLLECTIONS.EVENTS).countDocuments({ date: { $gte: now } }),
    db.collection(COLLECTIONS.REGISTRATIONS).countDocuments({}),
    db.collection(COLLECTIONS.EMAIL_LOGS).countDocuments({ sentAt: { $gte: sevenDaysAgo } }),
    db.collection(COLLECTIONS.EVENT_REGISTRATIONS).countDocuments({}),
  ]);

  return {
    totalEvents,
    upcomingEvents,
    totalRegistrations,
    emailsSentLast7Days,
    totalEventAttendees,
  };
}

/**
 * Get paginated recent activities
 */
export async function getRecentActivitiesService(
  page = 1,
  limit = 5
): Promise<{ activities: SerializedActivityLog[]; total: number; pages: number }> {
  const skip = (page - 1) * limit;
  const { db } = await connectToDatabase();
  const activitiesCollection = db.collection(COLLECTIONS.ACTIVITIES);

  const [rawActivities, total] = await Promise.all([
    activitiesCollection
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray(),
    activitiesCollection.countDocuments({}),
  ]);

  return {
    activities: serializeActivityLogs(rawActivities),
    total,
    pages: Math.ceil(total / limit) || 1,
  };
}

/**
 * Get upcoming events summary for dashboard
 */
export async function getUpcomingEventsSummaryService(
  limit = 5
): Promise<SerializedEvent[]> {
  const { db } = await connectToDatabase();
  const rawEvents = await db
    .collection(COLLECTIONS.EVENTS)
    .find({ date: { $gte: new Date() } })
    .sort({ date: 1 })
    .limit(limit)
    .toArray();

  return serializeEvents(rawEvents);
}
