import Link from "next/link";
import { ArrowLeft, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/eventPage/EventCard";
import { getEvents } from "@/app/actions/events";
import { calculateEventEndTime } from "@/lib/eventDurationUtils";

/**
 * Events Listing Page (Server Component)
 * Fetches real event data from database using server actions
 * Displays all events separated into Upcoming and Past sections
 * Event status is computed dynamically from event date AND duration
 *
 * Route: /events
 */

/**
 * Separates events into upcoming and past based on current time and event duration
 * Upcoming: now <= event.date + duration
 * Past: now > event.date + duration
 */
function separateEvents(events: any[]) {
  const now = new Date();
  const upcoming: any[] = [];
  const past: any[] = [];

  events.forEach((event) => {
    const eventDate = new Date(event.date);
    const duration = event.duration || "1 day"; // Default to 1 day if not specified

    // Calculate when the event actually ends based on its duration
    const eventEndTime = calculateEventEndTime(eventDate, duration);

    // Event is upcoming if it hasn't ended yet
    if (now <= eventEndTime) {
      upcoming.push(event);
    } else {
      // Event is past if it has ended
      past.push(event);
    }
  });

  return { upcoming, past };
}

export default async function EventsPage() {
  // Fetch events from database using server action
  const response = await getEvents(); // Fetch all events (adjust limit as needed)

  // Handle fetch error
  if (!response.success || !response.data) {
    return (
      <main className="min-h-screen">
        <section className="relative pt-28 pb-16 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="glass rounded-2xl p-12 text-center max-w-2xl mx-auto">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">
                Unable to Load Events
              </h2>
              <p className="text-muted-foreground mb-6">
                We&apos;re having trouble loading events. Please try again
                later.
              </p>
              <Button asChild>
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  // Get events and separate into upcoming and past
  const allEvents = response.data.events;
  const { upcoming, past } = separateEvents(allEvents);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-0 w-125 h-125 bg-primary/10 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Back button */}
          <Button
            asChild
            variant="ghost"
            className="mb-8 group hover:bg-primary/10"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </Button>

          {/* Page Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Community Events
              </span>
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
              <span className="text-gradient">Upcoming Events</span>
              <br />
              <span className="text-foreground">& Workshops</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Join us for exciting tech events, workshops, and networking
              opportunities. Expand your skills and connect with fellow techies!
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold">
                Upcoming Events
              </h2>
              <p className="text-muted-foreground text-sm">
                {upcoming.length} {upcoming.length === 1 ? "event" : "events"}{" "}
                you can register for
              </p>
            </div>
          </div>

          {/* Events Grid */}
          {upcoming.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => (
                <EventCard
                  key={event._id.toString()}
                  event={{
                    _id: event._id.toString(),
                    title: event.title,
                    description: event.description,
                    date: event.date.toISOString
                      ? event.date.toISOString()
                      : event.date,
                    location: event.location,
                    coverImage: event.coverImage,
                    maxAttendees: event.maxAttendees,
                    duration: event.duration || "1 day",
                  }}
                  registeredCount={event.registrationCount || 0}
                />
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-12 text-center">
              <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-display font-bold mb-2">
                No Upcoming Events
              </h3>
              <p className="text-muted-foreground">
                Check back soon for new events and workshops!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events Section */}
      {past.length > 0 && (
        <section className="py-16 relative">
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-muted/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-muted-foreground" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-display font-bold">
                  Past Events
                </h2>
                <p className="text-muted-foreground text-sm">
                  Catch up on what you missed
                </p>
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {past.map((event) => (
                <EventCard
                  key={event._id.toString()}
                  event={{
                    _id: event._id.toString(),
                    title: event.title,
                    description: event.description,
                    date: event.date.toISOString
                      ? event.date.toISOString()
                      : event.date,
                    location: event.location,
                    coverImage: event.coverImage,
                    maxAttendees: event.maxAttendees,
                    duration: event.duration || "1 day",
                  }}
                  isPast={true}
                  registeredCount={event.registrationCount || 0}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto border-glow">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-gradient">Stay Updated</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Don't miss out on our upcoming events! Follow us on social media
              or join our community to get notified about new events.
            </p>
            <Button size="lg" asChild>
              <Link href="/join">Join Our Community</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
