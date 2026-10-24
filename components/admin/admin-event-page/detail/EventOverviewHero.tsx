"use client";

import Image from "next/image";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ShareEventButton } from "@/components/admin/share-event-button";
import { getImageUrl } from "@/lib/utils";
import { formatDuration } from "@/lib/eventDurationUtils";

interface EventOverviewHeroProps {
  event: {
    title: string;
    description: string;
    date: string;
    location: string;
    duration?: string;
    maxAttendees?: number;
    announcementSent?: boolean;
    coverImage: any;
  };
  registrationCount: number;
  shareUrl: string;
}

export function EventOverviewHero({
  event,
  registrationCount,
  shareUrl,
}: EventOverviewHeroProps) {
  return (
    <>
      {/* Hero Image */}
      <div className="relative w-full aspect-[3/4] max-h-[600px] rounded-xl overflow-hidden border border-border/50 shadow-xl">
        <Image
          src={getImageUrl(event.coverImage)}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 right-6">
          <ShareEventButton shareUrl={shareUrl} />
        </div>
      </div>

      {/* Main Event Details */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient">
            {event.title}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Date */}
          <Card className="border border-border/50 bg-background/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Date
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-1">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="border border-border/50 bg-background/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Location
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-1">
                    {event.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Duration */}
          <Card className="border border-border/50 bg-background/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Duration
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-1">
                    {formatDuration(event.duration || "1 day")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attendees */}
          <Card className="border border-border/50 bg-background/50 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    Attendees
                  </p>
                  <p className="text-sm font-semibold text-foreground mt-1">
                    {registrationCount} registration
                    {registrationCount !== 1 ? "s" : ""}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {event.maxAttendees
                      ? `Max: ${event.maxAttendees}`
                      : "Unlimited"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcement Status */}
        <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/50">
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              Announcement Status
            </p>
          </div>
          <span
            className={`inline-flex items-center px-4 py-2 rounded-full font-medium text-sm ${
              event.announcementSent
                ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20"
                : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20"
            }`}
          >
            {event.announcementSent
              ? "✓ Announcement Sent"
              : "⏱ Announcement Pending"}
          </span>
        </div>
      </div>
    </>
  );
}
