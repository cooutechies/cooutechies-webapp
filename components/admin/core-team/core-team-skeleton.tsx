/**
 * Core Team Loading Skeleton
 * Matches the layout and design of the core team page
 * Uses shadcn/ui Skeleton component for smooth loading states
 */

import { Skeleton } from "@/components/ui/skeleton";
import { Users } from "lucide-react";

export default function CoreTeamSkeleton() {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background effects matching main page */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute inset-0 grid-pattern opacity-[0.02] pointer-events-none" />

      {/* Animated gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-secondary/10 via-secondary/5 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Header section skeleton */}
      <div className="relative z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border-b border-border/40 backdrop-blur-xl bg-background/60">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Title section skeleton */}
              <div className="flex items-start gap-4">
                {/* Icon skeleton */}
                <Skeleton className="h-14 w-14 rounded-2xl" />

                <div className="space-y-2">
                  {/* Title skeleton */}
                  <Skeleton className="h-10 w-48" />
                  {/* Description skeleton */}
                  <Skeleton className="h-5 w-64" />
                </div>
              </div>

              {/* Button skeleton */}
              <Skeleton className="h-11 w-40 rounded-lg" />
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-auto relative z-10">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="max-w-7xl mx-auto">
            {/* Stats bar skeleton */}
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="glass rounded-xl p-4 border border-border/50"
                >
                  <Skeleton className="h-8 w-16 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>

            {/* Team members grid skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="group relative">
                  {/* Card skeleton */}
                  <div className="relative glass rounded-3xl overflow-hidden border border-border/50">
                    {/* Profile image skeleton */}
                    <Skeleton className="h-56 w-full rounded-none" />

                    {/* Content section */}
                    <div className="p-6 space-y-4">
                      {/* Name and role skeleton */}
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>

                      {/* About section skeleton - 3 lines */}
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                      </div>

                      {/* Action buttons skeleton */}
                      <div className="flex items-center gap-2 pt-4 border-t border-border/30">
                        <Skeleton className="h-10 flex-1 rounded-lg" />
                        <Skeleton className="h-10 w-20 rounded-lg" />
                      </div>
                    </div>

                    {/* Bottom accent bar */}
                    <div className="h-1 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
