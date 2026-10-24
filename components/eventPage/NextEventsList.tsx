import Link from "next/link";
import { Clock } from "lucide-react";
import type { EventWithCount } from "./FeaturedEventCard";

export function NextEventsList({
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
                <div className="shrink-0 w-10 h-11 rounded-lg bg-primary/8 border border-primary/15 flex flex-col items-center justify-center">
                  <span className="font-display font-bold text-base text-primary leading-none">
                    {dayNum}
                  </span>
                  <span className="text-[9px] text-primary/70 font-semibold uppercase mt-0.5">
                    {monthStr}
                  </span>
                </div>
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
