/**
 * Dashboard TanStack Query Hooks
 * Manages server state for dashboard statistics and activity logs
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardStats, getActivityLog } from "@/app/actions/dashboard";
import type {
  DashboardStats,
  ActivityLogPaginatedResponse,
} from "@/types/data.types";

export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  activities: () => [...dashboardKeys.all, "activities"] as const,
  activityList: (page: number, limit: number) =>
    [...dashboardKeys.activities(), { page, limit }] as const,
};

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: dashboardKeys.stats(),
    queryFn: async () => {
      const response = await getDashboardStats();

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch dashboard stats");
      }

      return response.data;
    },
    staleTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
  });
}

export function useActivityLog(page: number = 1, limit: number = 5) {
  return useQuery<ActivityLogPaginatedResponse>({
    queryKey: dashboardKeys.activityList(page, limit),
    queryFn: async (): Promise<ActivityLogPaginatedResponse> => {
      const response = await getActivityLog(page, limit);

      if (!response.success || !response.data) {
        throw new Error(response.error || "Failed to fetch activity log");
      }

      return response.data;
    },
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: true,
  });
}
