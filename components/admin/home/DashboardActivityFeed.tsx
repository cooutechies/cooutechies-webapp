"use client";

import { Activity, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ActivityItem {
  _id: string;
  action: string;
  details: string;
  createdAt: string;
}

interface DashboardActivityFeedProps {
  activities: ActivityItem[];
  totalActivities: number;
  totalPages: number;
  currentPage: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
}

export function DashboardActivityFeed({
  activities,
  totalActivities,
  totalPages,
  currentPage,
  isLoading,
  onPageChange,
  itemsPerPage,
}: DashboardActivityFeedProps) {
  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  const handleNextPage = () => {
    if (canGoNext) onPageChange(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (canGoPrev) onPageChange(currentPage - 1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 2) endPage = 4;
      if (currentPage >= totalPages - 1) startPage = totalPages - 3;

      if (startPage > 2) pages.push("ellipsis-start");
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push("ellipsis-end");
      pages.push(totalPages);
    }

    return pages;
  };

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalActivities);

  return (
    <div className="glass rounded-2xl overflow-hidden border-glow">
      <div className="border-b border-border/50 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold text-foreground">
                Recent Activity
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Latest updates and events
              </p>
            </div>
          </div>

          {totalActivities > 0 && (
            <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
              {totalActivities}{" "}
              {totalActivities === 1 ? "activity" : "activities"}
            </div>
          )}
        </div>
      </div>

      <div className="p-6">
        {isLoading ? (
          <div className="space-y-0 min-h-[400px]">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex items-start gap-4 py-5 border-b border-border/30 last:border-0"
              >
                <div className="h-8 w-8 rounded-xl shrink-0 mt-0.5 bg-muted animate-pulse" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  <div className="h-3 w-40 bg-muted animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : totalActivities === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="p-4 rounded-2xl bg-muted/50 mb-4">
              <Activity className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <p className="text-muted-foreground text-sm font-medium">
              No recent activity yet
            </p>
            <p className="text-muted-foreground/70 text-xs mt-1">
              Activity will appear here once events occur
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-0 min-h-[400px]">
              {activities.map((activity) => {
                const isSuccess =
                  activity.action.includes("created") ||
                  activity.action.includes("sent");
                const StatusIcon = isSuccess ? CheckCircle2 : AlertCircle;
                const statusColor = isSuccess
                  ? "text-green-600 dark:text-green-400"
                  : "text-blue-600 dark:text-blue-400";
                const statusBg = isSuccess
                  ? "bg-green-500/20"
                  : "bg-blue-500/20";

                return (
                  <div
                    key={activity._id}
                    className="flex items-start gap-4 py-5 border-b border-border/30 last:border-0 group hover:bg-muted/30 -mx-4 px-4 rounded-lg transition-all duration-200"
                  >
                    <div
                      className={`p-2 rounded-xl ${statusBg} group-hover:scale-110 transition-transform duration-200 shrink-0 mt-0.5`}
                    >
                      <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground capitalize mb-1">
                        {activity.action.replace(/_/g, " ")}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {activity.details}
                      </p>
                      <p className="text-xs text-muted-foreground/80 mt-2 flex items-center gap-1.5">
                        <Clock className="h-3 w-3" />
                        {new Date(activity.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-6 pt-6 border-t border-border/50">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-muted-foreground">
                    Showing {startIndex} to {endIndex} of {totalActivities}{" "}
                    activities
                  </p>

                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={handlePrevPage}
                          className={
                            !canGoPrev
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>

                      {getPageNumbers().map((page, index) => {
                        if (typeof page === "string") {
                          return (
                            <PaginationItem key={`${page}-${index}`}>
                              <span className="px-2 text-muted-foreground">
                                ...
                              </span>
                            </PaginationItem>
                          );
                        }

                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              onClick={() => onPageChange(page)}
                              isActive={currentPage === page}
                              className="cursor-pointer"
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      })}

                      <PaginationItem>
                        <PaginationNext
                          onClick={handleNextPage}
                          className={
                            !canGoNext
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
