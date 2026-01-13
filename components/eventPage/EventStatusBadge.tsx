import { Calendar, Clock, CheckCircle } from "lucide-react";
import { getEventStatus } from "@/lib/eventDurationUtils";

/**
 * EventStatusBadge Component
 * Displays a dynamic status badge based on event date and duration
 * Status is computed from event date, current time, and event duration
 *
 * @param eventDate - ISO date string of the event
 * @param duration - Duration string (e.g., "1 day", "2 weeks", "3 months")
 */

interface EventStatusBadgeProps {
  eventDate: string;
  duration?: string;
}

export function EventStatusBadge({
  eventDate,
  duration = "1 day",
}: EventStatusBadgeProps) {
  // Get event status based on date and duration
  const status = getEventStatus(eventDate, duration);

  // Determine display properties based on status
  let label: string;
  let icon: React.ReactNode;
  let colorClasses: string;

  switch (status) {
    case "upcoming":
      label = "Upcoming";
      icon = <Calendar className="w-4 h-4" />;
      colorClasses = "border-primary/30 bg-primary/10 text-primary";
      break;

    case "ongoing":
      label = "Ongoing";
      icon = <Clock className="w-4 h-4" />;
      colorClasses = "border-secondary/30 bg-secondary/10 text-secondary";
      break;

    case "past":
      label = "Past Event";
      icon = <CheckCircle className="w-4 h-4" />;
      colorClasses = "border-muted/30 bg-muted/10 text-muted-foreground";
      break;
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${colorClasses} text-sm font-medium`}
    >
      {icon}
      {label}
    </span>
  );
}
