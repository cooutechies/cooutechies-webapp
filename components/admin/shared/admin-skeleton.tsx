import React from "react";
import { AdminPageLayout } from "./admin-page-layout";
import { Skeleton } from "@/components/ui/skeleton";
import { Activity } from "lucide-react";

interface AdminSkeletonProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actionButton?: React.ReactNode;
  layout?: "grid" | "table" | "stats-and-list" | "custom";
  contentOnly?: boolean;
  children?: React.ReactNode;
}

export function AdminSkeleton({
  title = <Skeleton className="h-10 w-48" />,
  description = <Skeleton className="h-5 w-64" />,
  icon = <Skeleton className="h-10 w-10 rounded-xl" />,
  actionButton = <Skeleton className="h-10 w-32 rounded-lg" />,
  layout = "custom",
  contentOnly = false,
  children,
}: AdminSkeletonProps) {
  const renderLayout = () => {
    switch (layout) {
      case "grid":
        return (
          <div className="flex-1 p-6 overflow-auto relative z-10">
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Optional top stats bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="glass rounded-xl p-4 border border-border/50">
                    <Skeleton className="h-8 w-16 mb-2" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>

              {/* Grid of cards (e.g., Core Team) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="relative glass rounded-3xl overflow-hidden border border-border/50">
                    <Skeleton className="h-56 w-full rounded-none" />
                    <div className="p-6 space-y-4">
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>
                      <div className="flex items-center gap-2 pt-4 border-t border-border/30">
                        <Skeleton className="h-10 flex-1 rounded-lg" />
                        <Skeleton className="h-10 w-20 rounded-lg" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "stats-and-list":
        return (
          <div className="flex-1 p-6 overflow-auto relative z-10">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="glass rounded-2xl overflow-hidden border-border/50 p-6 space-y-4">
                    <Skeleton className="h-12 w-12 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-10 w-16" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </div>
                ))}
              </div>

              {/* List / Activity Log */}
              <div className="glass rounded-2xl overflow-hidden border-border/50">
                <div className="border-b border-border/50 p-6 flex items-center gap-3">
                   <div className="p-2 rounded-xl bg-primary/10">
                     <Activity className="h-5 w-5 text-primary opacity-50" />
                   </div>
                   <div>
                     <Skeleton className="h-6 w-32" />
                     <Skeleton className="h-3 w-40 mt-1" />
                   </div>
                </div>
                <div className="p-6 space-y-0">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-start gap-4 py-5 border-b border-border/30 last:border-0">
                      <Skeleton className="h-8 w-8 rounded-xl shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0 space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "table":
        return (
          <div className="flex-1 p-6 overflow-auto relative z-10">
            <div className="max-w-7xl mx-auto space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="glass rounded-xl overflow-hidden border-border/50 animate-pulse">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 border-b border-border/30">
                    <div className="flex items-center gap-4 flex-1">
                      <Skeleton className="w-12 h-12 rounded-full" />
                      <div className="flex-1 min-w-0 space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-52" />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <Skeleton className="hidden sm:block h-4 w-24" />
                      <Skeleton className="h-6 rounded-full w-20" />
                    </div>
                  </div>
                  <div className="p-5 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-5">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Skeleton className="w-8 h-8 rounded-lg shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0 space-y-2">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-4 w-32" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "custom":
      default:
        return children;
    }
  };

  if (contentOnly) {
    return <>{renderLayout()}</>;
  }

  return (
    <AdminPageLayout
      title={title}
      description={description}
      icon={icon}
      actionButton={actionButton}
    >
      {renderLayout()}
    </AdminPageLayout>
  );
}
