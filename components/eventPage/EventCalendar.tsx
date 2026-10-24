"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { EventWithCount } from "./FeaturedEventCard";

export function EventCalendar({
  upcomingEvents,
}: {
  upcomingEvents: EventWithCount[];
}) {
  const now = new Date();

  const firstUpcoming =
    upcomingEvents.length > 0 ? new Date(upcomingEvents[0].date) : now;

  const [viewYear, setViewYear] = useState(firstUpcoming.getFullYear());
  const [viewMonth, setViewMonth] = useState(firstUpcoming.getMonth());

  const eventDays = new Set(
    upcomingEvents
      .map((e) => new Date(e.date))
      .filter((d) => d.getFullYear() === viewYear && d.getMonth() === viewMonth)
      .map((d) => d.getDate())
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
                  : ""
              )}
            >
              {d || ""}
              {hasEvent && !isToday && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
              )}
            </div>
          );
        })}
      </div>

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
