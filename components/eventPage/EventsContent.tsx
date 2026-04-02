"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Calendar,
  Sparkles,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  ChevronRight,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/eventPage/EventCard";
import { calculateEventEndTime } from "@/lib/eventDurationUtils";
import { EventsInlineError } from "./EventsErrorFallback";
import { EventsLoadingSkeleton } from "./EventsLoadingSkeleton";
import { useEvents } from "@/hooks/tanstack-query/use-events";
import { cn } from "@/lib/utils";

interface EventWithCount {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  coverImage: string;
  duration?: string;
  maxAttendees?: number;
  registrationCount?: number;
}

function separateEvents(events: EventWithCount[]) {
  const now = new Date();
  const upcoming: EventWithCount[] = [];
  const past: EventWithCount[] = [];

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    const eventEndTime = calculateEventEndTime(
      eventDate,
      event.duration || "1 day",
    );
    if (now <= eventEndTime) upcoming.push(event);
    else past.push(event);
  });

  // soonest first
  upcoming.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  // most recent first
  past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { upcoming, past };
}

function countThisYear(events: EventWithCount[]) {
  const year = new Date().getFullYear();
  return events.filter((e) => new Date(e.date).getFullYear() === year).length;
}

export function EventsContent() {
  const { data, isLoading, isError } = useEvents(1, 50);

  if (isLoading) return <EventsLoadingSkeleton />;
  if (isError || !data) return <EventsInlineError />;

  const allEvents: EventWithCount[] = data.events;
  const { upcoming, past } = separateEvents(allEvents);

  const eventsThisYear = countThisYear(allEvents);

  return (
    <>
      {/* ── Stats bar ── */}
      <div className="bg-primary/5 border-b border-primary/10">
        <div className="container mx-auto px-4 py-3 flex flex-wrap items-center gap-x-8 gap-y-2">
          <Stat label="Events this year" value={eventsThisYear} />
          <Stat label="Past events" value={past.length} />
          <Stat label="Upcoming" value={upcoming.length} />
          <div className="ml-auto">
            <span className="text-xs text-primary font-semibold bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              Free to attend
            </span>
          </div>
        </div>
      </div>

      {/* ── Main two-column layout ── */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          {/* ── Left column ── */}
          <div>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-xl font-display font-bold">
                  Upcoming Events
                </h2>
                {upcoming.length > 0 && (
                  <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                    {upcoming.length}
                  </span>
                )}
              </div>
              <span className="ml-auto text-xs text-muted-foreground hidden sm:block">
                Register before spots fill up
              </span>
            </div>

            {upcoming.length > 0 ? (
              <>
                <FeaturedCard event={upcoming[0]} />
                {upcoming.length > 1 && (
                  <div className="mt-5 grid sm:grid-cols-2 gap-4">
                    {upcoming.slice(1).map((event) => (
                      <EventCard
                        key={event._id}
                        event={{
                          _id: event._id,
                          title: event.title,
                          description: event.description,
                          date: event.date,
                          location: event.location,
                          coverImage: event.coverImage,
                          maxAttendees: event.maxAttendees ?? null,
                          duration: event.duration || "1 day",
                        }}
                        registeredCount={event.registrationCount || 0}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <EmptyState />
            )}

            {/* ── Past Events ── */}
            {past.length > 0 && (
              <div className="mt-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-border/60" />
                  <span className="text-[10px] text-muted-foreground border border-border rounded-full px-3 py-1 font-medium whitespace-nowrap">
                    Past Events
                  </span>
                  <div className="flex-1 h-px bg-border/60" />
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-muted/20 flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-display font-bold text-muted-foreground">
                    Past Events
                  </h2>
                  <span className="ml-auto text-xs text-muted-foreground/60">
                    {past.length} held so far
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 opacity-70">
                  {past.map((event) => (
                    <EventCard
                      key={event._id}
                      event={{
                        _id: event._id,
                        title: event.title,
                        description: event.description,
                        date: event.date,
                        location: event.location,
                        coverImage: event.coverImage,
                        maxAttendees: event.maxAttendees ?? null,
                        duration: event.duration || "1 day",
                      }}
                      isPast={true}
                      registeredCount={event.registrationCount || 0}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-5 lg:sticky lg:top-20">
            {/* Calendar — dots on real upcoming event dates */}
            <EventCalendar upcomingEvents={upcoming} />

            {/* Next events — real data */}
            <NextEventsList upcomingEvents={upcoming} />
          </aside>
        </div>
      </div>

      {/* ── CTA ── */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--primary)/0.15) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="relative rounded-3xl border border-primary/20 bg-card overflow-hidden p-10 md:p-14 text-center">
              <span className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-primary/25 rounded-tl-3xl" />
              <span className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-primary/25 rounded-br-3xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-semibold text-primary">
                    Community
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 leading-tight">
                  <span className="text-gradient">Never miss</span>
                  <br />
                  <span className="text-foreground">an event again</span>
                </h2>
                <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
                  Join COOU Techies to stay updated on all upcoming events,
                  workshops, and hackathons — completely free.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button size="lg" asChild className="rounded-xl px-8 group">
                    <Link href="/join">
                      Join Our Community
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="ghost"
                    asChild
                    className="rounded-xl px-6 text-muted-foreground"
                  >
                    <Link href="#events">View all events</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Stat pill ── */
function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-lg font-display font-bold text-primary">
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  );
}

/* ── Featured card ── */
function FeaturedCard({ event }: { event: EventWithCount }) {
  // Parse the date exactly as stored (ISO string from MongoDB)
  const date = new Date(event.date);

  const fillPct =
    event.maxAttendees && event.registrationCount !== undefined
      ? Math.min(
          100,
          Math.round((event.registrationCount / event.maxAttendees) * 100),
        )
      : null;

  const spotsLeft =
    event.maxAttendees && event.registrationCount !== undefined
      ? event.maxAttendees - event.registrationCount
      : null;

  return (
    <Link
      href={`/events/${event._id}`}
      className="group block rounded-2xl border border-primary/15 bg-card overflow-hidden hover:border-primary/35 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row min-h-[240px]">
        {/* Cover image */}
        <div className="relative md:w-[42%] h-52 md:h-auto overflow-hidden flex-shrink-0">
          <img
            src={event.coverImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-card/80 hidden md:block" />

          <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-lg">
            <Sparkles className="w-2.5 h-2.5" />
            Featured
          </div>

          {spotsLeft !== null && spotsLeft <= 20 && (
            <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur border border-white/25 text-white text-[10px] font-semibold">
              {spotsLeft} spots left
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6 md:p-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
              <Calendar className="w-3 h-3 text-primary" />
              {date.toLocaleDateString("en-US", {
                weekday: "short",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              &middot;{" "}
              {date.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <h3 className="text-xl font-display font-bold leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-5">
              {event.description
                .replace(/[\n\r]/g, " ")
                .replace(/\s+/g, " ")
                .trim()}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {event.duration && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3 text-primary/70" />
                  {event.duration}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3 text-primary/70" />
                {event.location}
              </span>
              {event.registrationCount !== undefined && (
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="w-3 h-3 text-primary/70" />
                  {event.registrationCount}
                  {event.maxAttendees ? ` / ${event.maxAttendees}` : ""}{" "}
                  registered
                </span>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/60">
              <span className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                Register now <ChevronRight className="w-4 h-4" />
              </span>
              {fillPct !== null && (
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-primary/10 overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {fillPct}%
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ── Calendar — dots on real upcoming event dates ── */
function EventCalendar({
  upcomingEvents,
}: {
  upcomingEvents: EventWithCount[];
}) {
  const now = new Date();

  // Default view: month of the first upcoming event (or current month if none)
  const firstUpcoming =
    upcomingEvents.length > 0 ? new Date(upcomingEvents[0].date) : now;

  const [viewYear, setViewYear] = useState(firstUpcoming.getFullYear());
  const [viewMonth, setViewMonth] = useState(firstUpcoming.getMonth());

  // Build a Set of day-numbers that have upcoming events in this viewed month
  const eventDays = new Set(
    upcomingEvents
      .map((e) => new Date(e.date))
      .filter((d) => d.getFullYear() === viewYear && d.getMonth() === viewMonth)
      .map((d) => d.getDate()),
  );

  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const isCurrentMonth =
    viewYear === now.getFullYear() && viewMonth === now.getMonth();
  const todayDate = now.getDate();

  const monthLabel = new Date(viewYear, viewMonth).toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  function prev() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  }
  function next() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  }

  // Build cells: leading empty slots + day numbers
  const cells = [
    ...Array(firstDayOfWeek).fill(0),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display font-bold text-sm">{monthLabel}</span>
        <div className="flex gap-1">
          <button
            onClick={prev}
            className="w-6 h-6 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors text-[13px] leading-none"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="w-6 h-6 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors text-[13px] leading-none"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            className="text-[9px] text-muted-foreground font-semibold uppercase py-1"
          >
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          const isEmpty = d === 0;
          const isToday = isCurrentMonth && d === todayDate;
          const hasEvent = !isEmpty && eventDays.has(d);

          return (
            <div
              key={i}
              className={cn(
                "w-7 h-7 mx-auto rounded-lg flex items-center justify-center text-[11px] relative",
                isEmpty && "pointer-events-none",
                isToday
                  ? "bg-primary text-primary-foreground font-bold"
                  : hasEvent
                    ? "bg-primary/12 text-primary font-semibold ring-1 ring-inset ring-primary/30"
                    : !isEmpty
                      ? "text-foreground hover:bg-muted/50 cursor-default"
                      : "",
              )}
            >
              {d || ""}
              {/* dot below day number for event days (skip if also today) */}
              {hasEvent && !isToday && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-5">
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="w-3 h-3 rounded bg-primary/12 ring-1 ring-primary/30 inline-block shrink-0" />
          Event day
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          <span className="w-3 h-3 rounded bg-primary inline-block shrink-0" />
          Today
        </div>
      </div>
    </div>
  );
}

/* ── Next events list — real data ── */
function NextEventsList({
  upcomingEvents,
}: {
  upcomingEvents: EventWithCount[];
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
          <Clock className="w-3.5 h-3.5 text-primary" />
        </div>
        <span className="font-display font-bold text-sm">Next events</span>
      </div>

      {upcomingEvents.length > 0 ? (
        <div className="space-y-2">
          {upcomingEvents.slice(0, 3).map((event) => {
            const d = new Date(event.date);
            const dayNum = d.getDate();
            const monthStr = d.toLocaleString("en-US", { month: "short" });
            const timeStr = d.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <Link
                key={event._id}
                href={`/events/${event._id}`}
                className="flex gap-3 p-2.5 rounded-xl border border-transparent hover:border-primary/20 hover:bg-primary/5 transition-all"
              >
                {/* Date tile */}
                <div className="shrink-0 w-10 h-11 rounded-lg bg-primary/8 border border-primary/15 flex flex-col items-center justify-center">
                  <span className="font-display font-bold text-base text-primary leading-none">
                    {dayNum}
                  </span>
                  <span className="text-[9px] text-primary/70 font-semibold uppercase mt-0.5">
                    {monthStr}
                  </span>
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold leading-tight line-clamp-2 mb-1">
                    {event.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {event.location}
                  </p>
                  <p className="text-[10px] text-muted-foreground/70">
                    {timeStr}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-muted-foreground text-center py-4">
          No upcoming events yet
        </p>
      )}
    </div>
  );
}

/* ── Empty state ── */
function EmptyState() {
  return (
    <div className="relative rounded-2xl border border-dashed border-border/60 bg-muted/5 p-16 text-center">
      <Calendar className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
      <h3 className="text-base font-display font-bold mb-2">
        No Upcoming Events
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs mx-auto">
        Nothing scheduled yet — check back soon or join the community to get
        notified first.
      </p>
    </div>
  );
}
