/**
 * Registrations TanStack Query Hooks
 * Manages server state for community registrations
 */

"use client";

import { useQuery } from "@tanstack/react-query";
import { getCommunityRegistrations } from "@/app/actions/registrations";

export const registrationsKeys = {
  all: ["registrations"] as const,
  list: (page: number, limit: number) =>
    [...registrationsKeys.all, { page, limit }] as const,
};

export function useCommunityRegistrations(
  page: number = 1,
  limit: number = 10
) {
  return useQuery({
    queryKey: registrationsKeys.list(page, limit),
    queryFn: async () => {
      const result = await getCommunityRegistrations(page, limit);
      if (!result.success || !result.data) {
        throw new Error(result.error || "Failed to fetch registrations");
      }

      if ("registrations" in result.data) {
        return {
          registrations: result.data.registrations,
          total: result.data.total,
          pages: result.data.pages,
          currentPage: result.data.currentPage,
        };
      }

      throw new Error("Invalid response format");
    },
    staleTime: 30 * 1000,
    refetchOnWindowFocus: true,
  });
}
