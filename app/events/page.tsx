import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventsContent } from "@/components/eventPage/EventsContent";
import { EventsLoadingSkeleton } from "@/components/eventPage/EventsLoadingSkeleton";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

/**
 * Events Listing Page (Server Component)
 * Implements modern loading and error handling patterns
 * Uses Suspense for streaming content and inline errors
 *
 * Route: /events
 */

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      {/* Hero Section - Always visible */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-0 w-125 h-125 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-100 h-100 bg-secondary/10 rounded-full blur-[100px] translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Back button */}
          <Button
            asChild
            variant="ghost"
            className="mb-8 group hover:bg-primary/10"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </Button>

          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Community Events
              </span>
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              <span className="text-gradient">Upcoming Events</span>
              <br />
              <span className="text-foreground">& Workshops</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Join us for exciting tech events, workshops, and networking
              opportunities. Expand your skills and connect with fellow techies!
            </p>
          </div>
        </div>
      </section>

      {/* Events Content with Suspense */}
      <Suspense fallback={<EventsLoadingSkeleton />}>
        <EventsContent />
      </Suspense>

      <Footer />
    </main>
  );
}
