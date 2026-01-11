/**
 * Event Duration Utility Functions
 * Converts duration strings to milliseconds and calculates event end times
 */

/**
 * Convert duration string to milliseconds
 * Supports: "X day(s)", "X week(s)", "X month(s)"
 * Examples: "1 day", "2 weeks", "3 months"
 */
export function durationToMilliseconds(duration: string): number {
  const normalized = duration.toLowerCase().trim();

  // Extract number and unit
  const match = normalized.match(/^(\d+)\s*(day|week|month)s?$/);

  if (!match) {
    console.warn(
      `Invalid duration format: "${duration}". Defaulting to 1 day.`
    );
    return 24 * 60 * 60 * 1000; // Default to 1 day
  }

  const value = parseInt(match[1]);
  const unit = match[2];

  switch (unit) {
    case "day":
      return value * 24 * 60 * 60 * 1000;
    case "week":
      return value * 7 * 24 * 60 * 60 * 1000;
    case "month":
      return value * 30 * 24 * 60 * 60 * 1000; // Approximate 30 days per month
    default:
      return 24 * 60 * 60 * 1000; // Default to 1 day
  }
}

/**
 * Calculate event end time based on start date and duration
 * @param eventDate - Event start date (Date object or ISO string)
 * @param duration - Duration string (e.g., "1 day", "2 weeks", "3 months")
 * @returns Date object representing when the event ends
 */
export function calculateEventEndTime(
  eventDate: Date | string,
  duration: string = "1 day"
): Date {
  const startDate = new Date(eventDate);
  const durationMs = durationToMilliseconds(duration);

  return new Date(startDate.getTime() + durationMs);
}

/**
 * Check if an event is currently ongoing
 * Event is ongoing if: eventStartTime <= now <= eventEndTime
 */
export function isEventOngoing(
  eventDate: Date | string,
  duration: string = "1 day"
): boolean {
  const now = new Date();
  const startDate = new Date(eventDate);
  const endDate = calculateEventEndTime(eventDate, duration);

  return now >= startDate && now <= endDate;
}

/**
 * Check if an event is in the past
 * Event is past if: now > eventEndTime
 */
export function isEventPast(
  eventDate: Date | string,
  duration: string = "1 day"
): boolean {
  const now = new Date();
  const endDate = calculateEventEndTime(eventDate, duration);

  return now > endDate;
}

/**
 * Check if an event is upcoming
 * Event is upcoming if: now < eventStartTime
 */
export function isEventUpcoming(eventDate: Date | string): boolean {
  const now = new Date();
  const startDate = new Date(eventDate);

  return now < startDate;
}

/**
 * Check if registration is still open
 * Registration is open if the event hasn't ended yet
 */
export function isRegistrationOpen(
  eventDate: Date | string,
  duration: string = "1 day"
): boolean {
  const now = new Date();
  const endDate = calculateEventEndTime(eventDate, duration);

  return now <= endDate;
}

/**
 * Get event status: "upcoming", "ongoing", or "past"
 */
export function getEventStatus(
  eventDate: Date | string,
  duration: string = "1 day"
): "upcoming" | "ongoing" | "past" {
  if (isEventUpcoming(eventDate)) {
    return "upcoming";
  }

  if (isEventOngoing(eventDate, duration)) {
    return "ongoing";
  }

  return "past";
}

/**
 * Format duration for display
 * Examples: "1 Day", "2 Weeks", "3 Months"
 */
export function formatDuration(duration: string): string {
  const normalized = duration.toLowerCase().trim();
  const match = normalized.match(/^(\d+)\s*(day|week|month)s?$/);

  if (!match) {
    return duration; // Return original if can't parse
  }

  const value = match[1];
  const unit = match[2];

  // Capitalize unit and add 's' if value > 1
  const capitalizedUnit = unit.charAt(0).toUpperCase() + unit.slice(1);
  const pluralUnit =
    parseInt(value) === 1 ? capitalizedUnit : `${capitalizedUnit}s`;

  return `${value} ${pluralUnit}`;
}
