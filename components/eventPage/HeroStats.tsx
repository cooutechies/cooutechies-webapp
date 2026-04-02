import { getEvents } from "@/app/actions/events";
import { calculateEventEndTime } from "@/lib/eventDurationUtils";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * HeroStats — Server Component
 * Fetches real event data and renders the 2x2 stat grid.
 * Wrapped in Suspense on the page so it streams in without
 * blocking the hero heading from rendering immediately.
 */
export async function HeroStats() {
  const result = await getEvents(1, 200);

  // Graceful fallback if fetch fails
  if (!result.success || !result.data) {
    return <HeroStatsError />;
  }

  const { events } = result.data;
  const now = new Date();

  const thisYear = now.getFullYear();

  const eventsThisYear = events.filter(
    (e) => new Date(e.date).getFullYear() === thisYear,
  ).length;

  const upcomingCount = events.filter((e) => {
    const eventDate = new Date(e.date);
    const endTime = calculateEventEndTime(eventDate, e.duration || "1 day");
    return now <= endTime;
  }).length;

  const pastCount = events.filter((e) => {
    const eventDate = new Date(e.date);
    const endTime = calculateEventEndTime(eventDate, e.duration || "1 day");
    return now > endTime;
  }).length;

  const stats = [
    { n: String(eventsThisYear), l: "Events this year" },
    { n: "500+", l: "Community members" }, // hardcoded — update manually
    { n: String(upcomingCount), l: "Upcoming events" },
    { n: String(pastCount), l: "Past events held" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map(({ n, l }) => (
        <div
          key={l}
          className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3"
        >
          <div className="text-2xl font-display font-bold text-primary leading-none">
            {n}
          </div>
          <div className="text-xs text-muted-foreground mt-1 font-medium">
            {l}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Shown while HeroStats is loading */
export function HeroStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3 space-y-2"
        >
          <Skeleton className="h-7 w-10" />
          <Skeleton className="h-3.5 w-24" />
        </div>
      ))}
    </div>
  );
}

/** Shown if the fetch fails */
function HeroStatsError() {
  const stats = [
    { n: "—", l: "Events this year" },
    { n: "500+", l: "Community members" },
    { n: "—", l: "Upcoming events" },
    { n: "—", l: "Past events held" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map(({ n, l }) => (
        <div
          key={l}
          className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-3"
        >
          <div className="text-2xl font-display font-bold text-primary/40 leading-none">
            {n}
          </div>
          <div className="text-xs text-muted-foreground mt-1 font-medium">
            {l}
          </div>
        </div>
      ))}
    </div>
  );
}
