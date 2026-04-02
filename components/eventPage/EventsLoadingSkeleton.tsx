import { Calendar, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function EventsLoadingSkeleton() {
  return (
    <>
      {/* Stats bar skeleton */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 py-3 flex items-center gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <Skeleton className="h-6 w-7" />
              <Skeleton className="h-3.5 w-24" />
            </div>
          ))}
          <div className="ml-auto">
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
      </div>

      {/* Main body */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary/30 animate-pulse" />
              </div>
              <Skeleton className="h-6 w-44" />
            </div>

            {/* Featured skeleton */}
            <div className="rounded-2xl border border-border/60 overflow-hidden mb-5">
              <div className="flex flex-col md:flex-row min-h-[240px]">
                <div className="relative md:w-[42%] h-52 md:h-auto bg-muted/20 flex-shrink-0 overflow-hidden">
                  <div className="absolute inset-0 shimmer" />
                </div>
                <div className="flex-1 p-6 md:p-7 flex flex-col justify-between">
                  <div>
                    <Skeleton className="h-3.5 w-52 mb-4" />
                    <Skeleton className="h-6 w-4/5 mb-2" />
                    <Skeleton className="h-6 w-3/5 mb-4" />
                    <Skeleton className="h-4 w-full mb-1.5" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  <div className="space-y-2 mt-5">
                    <div className="flex gap-4 flex-wrap">
                      <Skeleton className="h-3.5 w-20" />
                      <Skeleton className="h-3.5 w-32" />
                      <Skeleton className="h-3.5 w-28" />
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border/50">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-1.5 w-20 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2-col grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <EventCardSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Calendar */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-5 w-36" />
                <div className="flex gap-1">
                  <Skeleton className="w-6 h-6 rounded-md" />
                  <Skeleton className="w-6 h-6 rounded-md" />
                </div>
              </div>
              <div className="grid grid-cols-7 gap-0.5">
                {[...Array(7)].map((_, i) => (
                  <Skeleton key={i} className="h-4 rounded mx-1 mb-1" />
                ))}
                {[...Array(35)].map((_, i) => (
                  <Skeleton key={i} className="w-7 h-7 rounded-lg mx-auto" />
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-border/50 flex gap-5">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>

            {/* Next events */}
            <div className="rounded-2xl border border-border/60 bg-card p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-primary/8 flex items-center justify-center">
                  <Calendar className="w-3.5 h-3.5 text-primary/30 animate-pulse" />
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3 p-2.5">
                    <Skeleton className="w-10 h-11 rounded-lg flex-shrink-0" />
                    <div className="flex-1 space-y-1.5 pt-1">
                      <Skeleton className="h-3.5 w-full" />
                      <Skeleton className="h-3 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA skeleton */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto rounded-3xl border border-primary/10 bg-card p-10 md:p-14 text-center space-y-4">
            <Skeleton className="h-6 w-24 rounded-full mx-auto" />
            <Skeleton className="h-9 w-52 mx-auto" />
            <Skeleton className="h-9 w-44 mx-auto" />
            <Skeleton className="h-4 w-full max-w-md mx-auto" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <div className="flex items-center justify-center gap-3 pt-2">
              <Skeleton className="h-11 w-44 rounded-xl" />
              <Skeleton className="h-11 w-32 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function EventCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border/60 overflow-hidden bg-card">
      <div className="relative h-40 bg-muted/20 overflow-hidden">
        <div className="absolute inset-0 shimmer" />
      </div>
      <div className="p-4 space-y-2">
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <div className="pt-1 space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="w-3 h-3 rounded" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>
        <Skeleton className="h-9 w-full rounded-lg mt-1" />
      </div>
    </div>
  );
}
