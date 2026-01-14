import { Calendar, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * EventsLoadingSkeleton Component
 * Beautiful loading state for events page
 * Matches the structure of the actual events page
 * Shows shimmer effect while data is being fetched
 */

export function EventsLoadingSkeleton() {
  return (
    <>
      {/* Upcoming Events Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary/40 animate-pulse" />
            </div>
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>

          {/* Events Grid Skeleton */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Section Skeleton */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-muted/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-muted-foreground/40 animate-pulse" />
            </div>
            <div>
              <Skeleton className="h-8 w-40 mb-2" />
              <Skeleton className="h-4 w-44" />
            </div>
          </div>

          {/* Events Grid Skeleton */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <EventCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section Skeleton */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto border-glow">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-5 w-full max-w-md mx-auto mb-3" />
            <Skeleton className="h-5 w-3/4 mx-auto mb-8" />
            <Skeleton className="h-11 w-48 mx-auto rounded-lg" />
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * EventCardSkeleton Component
 * Skeleton for individual event cards
 * Matches the structure of the actual EventCard component
 */
function EventCardSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Cover Image Skeleton */}
      <div className="relative h-56 bg-linear-to-br from-muted/30 to-muted/10">
        <div className="absolute inset-0 shimmer" />
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-4/5 mb-3" />

        {/* Description Skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Meta Info Skeleton */}
        <div className="space-y-2.5 mb-4">
          {/* Date & Time */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-48" />
          </div>

          {/* Duration */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-24" />
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-36" />
          </div>

          {/* Registered Count */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        {/* Button Skeleton */}
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}
