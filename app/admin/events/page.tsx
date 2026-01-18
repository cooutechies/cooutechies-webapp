//   Events Management Page
//   List all events with CRUD operations
//  Displays registration counts and announcement status

import { getEvents } from "@/app/actions/events";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Eye,
  Plus,
  Sparkles,
  Calendar,
  MapPin,
  Users,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatDuration } from "@/lib/eventDurationUtils";
import { SerializedEvent } from "@/types/serialized.types";

interface EventWithCount extends SerializedEvent {
  registrationCount?: number;
}

export default async function EventsPage() {
  const result = await getEvents(1, 50);
  const events: EventWithCount[] = result.success
    ? result.data?.events || []
    : [];

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="px-6 py-6 border-b border-border/50 sticky top-0 glass backdrop-blur-xl z-10 ">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">Events</span>
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              <span className="text-gradient">Events</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your events and registrations
            </p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/admin/events/new">
              <Plus className="h-4 w-4 mr-2" />
              New Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto relative z-10">
        {events.length === 0 ? (
          <Card className="border border-border">
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">
                No events yet. Create one to get started.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event._id.toString()}
                className="group flex flex-col h-full"
              >
                <Card className="overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 flex flex-col h-full backdrop-blur-sm bg-card/50">
                  {/* Event Image Container */}
                  <div className="relative w-full aspect-video bg-muted overflow-hidden">
                    <Image
                      src={
                        event.coverImage ||
                        "/placeholder.svg?height=240&width=360&query=event" ||
                        "/placeholder.svg"
                      }
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${
                          event.announcementSent
                            ? "bg-green-500/20 text-green-700 dark:text-green-400 border border-green-500/30"
                            : "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border border-yellow-500/30"
                        }`}
                      >
                        {event.announcementSent ? "Announced" : "Pending"}
                      </span>
                    </div>
                  </div>

                  <CardContent className="flex-1 p-4 flex flex-col justify-between">
                    {/* Event Info */}
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 text-primary/60 shrink-0" />
                          <span>
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 text-primary/60 shrink-0" />
                          <span>
                            {formatDuration(event.duration || "1 day")}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4 text-primary/60 shrink-0" />
                          <span className="truncate">{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4 text-secondary/60 shrink-0" />
                          <span>
                            {event.registrationCount || 0} registrations
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      asChild
                      size="sm"
                      className="mt-4 w-full bg-primary hover:bg-primary/90 transition-colors"
                    >
                      <Link href={`/admin/events/${event._id.toString()}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
