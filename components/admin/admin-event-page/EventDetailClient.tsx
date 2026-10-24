/**
 * Event Detail Client Component
 * Handles client-side data fetching, pagination, and interactions
 */

"use client";

import { useState } from "react";
import { EventEmailActionsClient } from "@/components/admin/event-email-actions-client";
import { getImageUrl } from "@/lib/utils";
import {
  useEventDetails,
  useEventRegistrations,
  useCommunityEmails,
  useReminderStatus,
} from "@/hooks/tanstack-query/use-event-details";
import { isEventPast } from "@/lib/eventDurationUtils";
import { AdminEventDetailSkeleton } from "../AdminEventDetailSkeleton";
import { AdminErrorState } from "@/components/admin/shared/admin-error-state";
import { EventOverviewHero } from "./detail/EventOverviewHero";
import { EventSpeakersList } from "./detail/EventSpeakersList";
import { EventRegistrationsTable } from "./detail/EventRegistrationsTable";

interface EventDetailClientProps {
  eventId: string;
  shareUrl: string;
}

const REGISTRATIONS_PER_PAGE = 10;

export function EventDetailClient({
  eventId,
  shareUrl,
}: EventDetailClientProps) {
  const [registrationsPage, setRegistrationsPage] = useState(1);

  // Fetch event details
  const {
    data: eventData,
    isLoading: eventLoading,
    error: eventError,
    refetch: refetchEvent,
  } = useEventDetails(eventId);

  // Fetch registrations with pagination
  const {
    data: registrationsData,
    isLoading: registrationsLoading,
    error: registrationsError,
  } = useEventRegistrations(eventId, registrationsPage, REGISTRATIONS_PER_PAGE);

  // Fetch community emails for announcements
  const { data: communityEmails = [] } = useCommunityEmails();

  // Fetch reminder status
  const { data: reminderStatus } = useReminderStatus(eventId);

  const isLoading = eventLoading;
  const error = eventError || registrationsError;

  const handleRetry = () => {
    refetchEvent();
  };

  if (isLoading) {
    return <AdminEventDetailSkeleton />;
  }

  if (error || !eventData) {
    return (
      <AdminErrorState
        title="Event Detail Error"
        description="Failed to load the event details."
        error={error as Error}
        reset={handleRetry}
      />
    );
  }

  const { event, registrationCount } = eventData;
  const registrations = registrationsData?.registrations || [];
  const totalRegistrations = registrationsData?.total || 0;
  const totalPages = registrationsData?.totalPages || 1;
  const eventIsPast = isEventPast(event.date, event.duration);

  return (
    <>
      {/* Hero Overview */}
      <EventOverviewHero
        event={event}
        registrationCount={registrationCount}
        shareUrl={shareUrl}
      />

      {/* Email Actions */}
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-display font-bold">
            <span className="text-gradient">Email Actions</span>
          </h2>
          <p className="text-muted-foreground mt-2">
            Manage event communications
          </p>
        </div>
        <EventEmailActionsClient
          eventId={eventId}
          eventTitle={event.title}
          eventDate={new Date(event.date).toLocaleString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
          eventLocation={event.location}
          eventDescription={event.description}
          eventThumbnail={getImageUrl(event.coverImage)}
          announcementSent={event.announcementSent}
          registrations={registrations.map((reg) => ({
            email: reg.email,
            name: `${reg.firstName} ${reg.lastName}`,
          }))}
          allCommunityEmails={communityEmails}
          sentReminders={
            reminderStatus || {
              "1-week": false,
              "3-days": false,
              tomorrow: false,
              today: false,
            }
          }
          eventIsPast={eventIsPast}
          eventDateISO={event.date}
          eventDuration={event.duration}
        />
      </div>

      {/* Speakers */}
      <EventSpeakersList speakers={event.speakers} />

      {/* Registrations Table with Pagination */}
      <EventRegistrationsTable
        registrations={registrations}
        totalRegistrations={totalRegistrations}
        totalPages={totalPages}
        currentPage={registrationsPage}
        isLoading={registrationsLoading}
        onPageChange={setRegistrationsPage}
        pageSize={REGISTRATIONS_PER_PAGE}
      />
    </>
  );
}
