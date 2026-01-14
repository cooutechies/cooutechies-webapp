import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * EventDetailSkeleton Component
 * Loading state for event detail page - content only
 * Shows skeleton loaders for dynamic content
 * Navbar and Footer should be in parent layout
 */

export default function EventDetailSkeleton() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-0 w-150 h-150 bg-primary/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Back button */}
          <Button
            asChild
            variant="ghost"
            className="mb-8 group hover:bg-primary/10"
          >
            <Link href="/events">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Events
            </Link>
          </Button>

          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Left Column - Cover Image Skeleton */}
            <div className="lg:col-span-3">
              <div className="h-100 md:h-125 rounded-3xl overflow-hidden bg-linear-to-br from-muted/30 to-muted/10 relative">
                <div className="absolute inset-0 shimmer" />
              </div>
            </div>

            {/* Right Column - Event Meta Skeleton */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Badge Skeleton */}
              <Skeleton className="h-10 w-32 rounded-full" />

              {/* Event Title Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-3/4" />
              </div>

              {/* Event Details Card Skeleton */}
              <div className="glass rounded-2xl p-6 space-y-4">
                {/* Date & Time */}
                <div className="flex items-start gap-3">
                  <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-start gap-3">
                  <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-32" />
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3">
                  <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>

                {/* Attendees */}
                <div className="flex items-start gap-3">
                  <Skeleton className="w-10 h-10 rounded-xl shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-4 w-36" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Description Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content Skeleton */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description Skeleton */}
              <div>
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-10/12" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-9/12" />
                </div>
              </div>

              {/* Speakers Section Skeleton */}
              <div>
                <Skeleton className="h-8 w-56 mb-6" />
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="glass rounded-2xl p-6">
                      <div className="flex items-start gap-4">
                        <Skeleton className="w-20 h-20 rounded-xl shrink-0" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-6 w-40" />
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-11/12" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Registration Form Skeleton */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="glass rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Skeleton className="w-12 h-12 rounded-xl" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Form fields */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full rounded-lg" />
                      </div>
                    ))}

                    {/* Submit button */}
                    <Skeleton className="h-11 w-full rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events CTA */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-20" />
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-secondary/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto border-glow">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-gradient">Explore More Events</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Check out other exciting events and workshops happening in our
              community!
            </p>
            <Button size="lg" asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
