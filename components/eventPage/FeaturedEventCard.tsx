import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Sparkles,
  Clock,
  MapPin,
  Users,
  ChevronRight,
} from "lucide-react";
import { getImageUrl } from "@/lib/utils";

export interface EventWithCount {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  coverImage: string | { url?: string } | null;
  duration?: string;
  maxAttendees?: number;
  registrationCount?: number;
}

export function FeaturedEventCard({ event }: { event: EventWithCount }) {
  const date = new Date(event.date);

  const fillPct =
    event.maxAttendees && event.registrationCount !== undefined
      ? Math.min(
          100,
          Math.round((event.registrationCount / event.maxAttendees) * 100)
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
          <Image
            src={getImageUrl(event.coverImage)}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
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
