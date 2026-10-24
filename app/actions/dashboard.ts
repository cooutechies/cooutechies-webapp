/**
 * Dashboard Server Actions
 * Thin transport layer: handles authentication and delegates to dashboardService.
 */

"use server";

import { requireAuth } from "@/lib/auth-helper";
import type {
  DashboardStats,
  ApiResponse,
  ActivityLogPaginatedResponse,
} from "@/types/data.types";
import {
  getDashboardMetricsService,
  getRecentActivitiesService,
} from "@/lib/services/dashboardService";

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
  const authError = await requireAuth<DashboardStats>();
  if (authError) return authError;

  try {
    const metrics = await getDashboardMetricsService();

    return {
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        totalEvents: metrics.totalEvents,
        upcomingEvents: metrics.upcomingEvents,
        totalRegistrations: metrics.totalRegistrations,
        emailsSentLast7Days: metrics.emailsSentLast7Days,
      },
    };
  } catch (error) {
    console.error("[Dashboard:getDashboardStats] Action failed:", error);
    return {
      success: false,
      message: "Failed to fetch dashboard stats",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get activity log with pagination
 */
export async function getActivityLog(
  page: number = 1,
  limit: number = 5
): Promise<ApiResponse<ActivityLogPaginatedResponse>> {
  const authError = await requireAuth<ActivityLogPaginatedResponse>();
  if (authError) return authError;

  try {
    const { activities, total, pages } = await getRecentActivitiesService(page, limit);

    return {
      success: true,
      message: "Activity log fetched successfully",
      data: {
        activities,
        total,
        page,
        limit,
        totalPages: pages,
      },
    };
  } catch (error) {
    console.error("[Dashboard:getActivityLog] Action failed:", error);
    return {
      success: false,
      message: "Failed to fetch activity log",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
