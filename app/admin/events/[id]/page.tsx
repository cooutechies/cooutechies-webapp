/**
 * Event Detail Page
 * View comprehensive event information with speakers and registrations
 */

import { getEventById } from "@/app/actions/events";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SpeakerCard } from "@/components/admin/speaker-card";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  MapPin,
  Users,
  Sparkles,
  Clock,
} from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { EventEmailActions } from "@/components/admin/event-email-actions";
import { getCommunityRegistrations } from "@/app/actions/registrations";
import { getRemindersSentStatus } from "@/app/actions/emails";
import { ShareEventButton } from "@/components/admin/share-event-button";
import { formatDuration } from "@/lib/eventDurationUtils";

interface Params {
  id: string;
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const result = await getEventById(id);

  if (!result.success || !result.data) {
    notFound();
  }

  const { event, registrations, registrationCount } = result.data;

  const communityResult = await getCommunityRegistrations(1, 0);
  const allCommunityEmails =
    communityResult.success &&
    communityResult.data.registrations.map((reg: any) => reg.email);

  const reminderStatusResult = await getRemindersSentStatus(id);
  const sentReminders = reminderStatusResult.success
    ? reminderStatusResult.data
    : {
        "1-week": false,
        "3-days": false,
        tomorrow: false,
        today: false,
      };

  // Build the share URL
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const shareUrl = `${baseUrl}/events/${id}`;

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="px-6 py-6 border-b border-border/50 sticky top-0 glass backdrop-blur-xl z-10 relative">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="hover:bg-primary/10 transition-colors"
          >
            <Link href="/admin/events">
              <ChevronLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">
                  Event Details
                </span>
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold truncate">
              <span className="text-gradient">{event.title}</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Event details and registrations
            </p>
          </div>
          <ShareEventButton shareUrl={shareUrl} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto relative z-10">
        <div className="space-y-8 max-w-5xl">
          <div className="relative w-full h-96 rounded-xl overflow-hidden border border-border/50 shadow-xl">
            <Image
              src={event.coverImage}
              alt={event.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Main Event Details */}
          <div className="space-y-6">
            {/* Title and Description */}
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
                          : "Unlimited Attendees"}
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

          <div className="space-y-4">
            <div>
              <h2 className="text-3xl font-display font-bold">
                <span className="text-gradient">Email Actions</span>
              </h2>
              <p className="text-muted-foreground mt-2">
                Manage event communications
              </p>
            </div>
            <EventEmailActions
              eventId={event._id?.toString() || id}
              eventTitle={event.title}
              eventDate={new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              eventLocation={event.location}
              eventDescription={event.description}
              eventThumbnail={event.coverImage}
              announcementSent={event.announcementSent}
              registrations={registrations.map((reg: any) => ({
                email: reg.email,
                name: reg.name,
              }))}
              allCommunityEmails={allCommunityEmails}
              sentReminders={sentReminders}
            />
          </div>

          {event.speakers && event.speakers.length > 0 && (
            <div className="space-y-4">
              <div>
                <h2 className="text-3xl font-display font-bold">
                  <span className="text-gradient">Featured Speakers</span>
                </h2>
                <p className="text-muted-foreground mt-2">
                  Meet the experts speaking at this event
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {event.speakers.map((speaker, index) => (
                  <SpeakerCard
                    key={index}
                    name={speaker.name}
                    role={speaker.role}
                    bio={speaker.bio}
                    photo={speaker.photo}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Registrations */}
          <Card className="border border-border">
            <CardHeader className="border-b border-border bg-background/50">
              <CardTitle>Registrations ({registrationCount})</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {registrations.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No registrations yet
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Name
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Email
                        </th>
                        <th className="text-left py-3 px-4 font-semibold text-foreground">
                          Registered
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {registrations.map((reg) => (
                        <tr
                          key={reg._id.toString()}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-3 px-4 font-medium text-foreground">
                            {reg.firstName} {reg.lastName}
                          </td>
                          <td className="py-3 px-4 text-foreground">
                            {reg.email}
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(reg.registeredAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
