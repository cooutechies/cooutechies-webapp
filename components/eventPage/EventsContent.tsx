"use client";

import { Calendar, Zap } from "lucide-react";
import { EventCard } from "@/components/eventPage/EventCard";
import { calculateEventEndTime } from "@/lib/eventDurationUtils";
import { EventsInlineError } from "./EventsErrorFallback";
import { EventsLoadingSkeleton } from "./EventsLoadingSkeleton";
import { useEvents } from "@/hooks/tanstack-query/use-events";
import { EmptyState } from "@/components/shared/EmptyState";
import {
  FeaturedEventCard,
  type EventWithCount,
} from "./FeaturedEventCard";
import { EventCalendar } from "./EventCalendar";
import { NextEventsList } from "./NextEventsList";
import { EventsCtaBanner } from "./EventsCtaBanner";

function separateEvents(events: EventWithCount[]) {
  const now = new Date();
  const upcoming: EventWithCount[] = [];
  const past: EventWithCount[] = [];

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    const eventEndTime = calculateEventEndTime(
      eventDate,
      event.duration || "1 day"
    );
    if (now <= eventEndTime) upcoming.push(event);
    else past.push(event);
  });

  // soonest first
  upcoming.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  // most recent first
  past.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return { upcoming, past };
}

function countThisYear(events: EventWithCount[]) {
  const year = new Date().getFullYear();
  return events.filter((e) => new Date(e.date).getFullYear() === year).length;
}

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
                <FeaturedEventCard event={upcoming[0]} />
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
              <EmptyState
                icon={Calendar}
                title="No Upcoming Events"
                description="Nothing scheduled yet — check back soon or join the community to get notified first."
                action={{
                  label: "Join Community",
                  href: "/register",
                }}
              />
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
            <EventCalendar upcomingEvents={upcoming} />
            <NextEventsList upcomingEvents={upcoming} />
          </aside>
        </div>
      </div>

      {/* ── CTA Banner ── */}
      <EventsCtaBanner />
    </>
  );
}
