import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventsContent } from "@/components/eventPage/EventsContent";
import { EventsLoadingSkeleton } from "@/components/eventPage/EventsLoadingSkeleton";
import { HeroStats } from "@/components/eventPage/HeroStats";
import { HeroStatsSkeleton } from "@/components/eventPage/HeroStats";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";

export const metadata = {
  title: "Events",
  description:
    "Join us for exciting tech events, workshops, and networking opportunities",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* ── Hero — renders immediately, no data dependency ── */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-24 overflow-hidden bg-background border-b border-border/50">
        {/* Dot-grid */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--primary)/0.2) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 0%, black, transparent)",
          }}
        />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[280px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <Button
            asChild
            variant="ghost"
            className="mb-10 -ml-2 group text-muted-foreground hover:text-foreground"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </Button>

          <div className="grid md:grid-cols-2 gap-10 items-end">
            {/* Left — heading, no data needed */}
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/8 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <Calendar className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-semibold text-primary tracking-widest uppercase">
                  Community Events
                </span>
              </span>
              <h1 className="font-display font-bold leading-[0.92] tracking-tight">
                <span className="text-5xl md:text-6xl lg:text-7xl text-gradient block">
                  Upcoming
                </span>
                <span className="text-5xl md:text-6xl lg:text-7xl text-foreground block">
                  Events &amp;
                </span>
                <span className="text-5xl md:text-6xl lg:text-7xl text-foreground/20 block">
                  Workshops
                </span>
              </h1>
            </div>

            {/* Right — stat grid streams in, skeleton shown while loading */}
            <div className="pb-1">
              <Suspense fallback={<HeroStatsSkeleton />}>
                <HeroStats />
              </Suspense>
              <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/20 pl-4 mt-6">
                Expand your skills, connect with fellow techies, and be part of
                something bigger — every month, right here at COOU.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-10">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-border/60" />
            <span className="text-[9px] text-muted-foreground/50 tracking-widest uppercase font-medium">
              Explore below
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-border/60" />
          </div>
        </div>
      </section>

      {/* ── Events content streams in below the hero ── */}
      <Suspense fallback={<EventsLoadingSkeleton />}>
        <EventsContent />
      </Suspense>

      <Footer />
    </main>
  );
}
