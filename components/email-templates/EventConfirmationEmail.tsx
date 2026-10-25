import * as React from "react";
import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "./shared/EmailLayout";
import { EmailBadge } from "./shared/EmailBadge";
import { EventDetailsCard } from "./sections/EventDetailsCard";
import {
  mainHeading,
  paragraphText,
  nameHighlight,
  highlightStrong,
  highlightsSection,
  highlightsTitle,
  bulletPoint,
  bulletIcon,
  ctaSection,
  ctaButton,
  ctaSubtext,
  textMuted,
} from "./styles/emailTheme";

interface EventConfirmationEmailProps {
  firstName: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventDescription?: string;
}

export default function EventConfirmationEmail({
  firstName,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  eventDescription,
}: EventConfirmationEmailProps) {
  const whatsappChannelLink =
    process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL ||
    "https://whatsapp.com/channel/cooutechies";

  return (
    <EmailLayout
      previewText={`Your spot is reserved for ${eventTitle}! 🎟️ See you on ${eventDate}`}
    >
      {/* Confirmation Badge */}
      <EmailBadge text="🎟️ Registration Confirmed" />

      {/* Main Heading */}
      <Heading style={mainHeading}>You&apos;re all set for the event!</Heading>

      <Text style={paragraphText}>
        Hey <span style={nameHighlight}>{firstName}</span>, we are excited to
        confirm your spot for{" "}
        <strong style={highlightStrong}>{eventTitle}</strong>.
      </Text>

      {/* Clean Structured Event Details Card */}
      <EventDetailsCard
        eventTitle={eventTitle}
        eventDate={eventDate}
        eventTime={eventTime}
        eventLocation={eventLocation}
        eventDescription={eventDescription}
      />

      {/* Preparation Notes (Unboxed) */}
      <Section style={highlightsSection}>
        <Text style={highlightsTitle}>Important Reminders:</Text>
        <Text style={bulletPoint}>
          <span style={bulletIcon}>✦</span>{" "}
          <strong style={highlightStrong}>Arrive Early:</strong> Please arrive
          15 minutes before the start time for check-in.
        </Text>
        <Text style={bulletPoint}>
          <span style={bulletIcon}>✦</span>{" "}
          <strong style={highlightStrong}>What to Bring:</strong> Bring your
          student ID, a laptop or notebook, and plenty of curiosity.
        </Text>
        <Text style={bulletPoint}>
          <span style={bulletIcon}>✦</span>{" "}
          <strong style={highlightStrong}>Assistance:</strong> If you have any
          questions or accessibility needs, reply to this email anytime.
        </Text>
      </Section>

      {/* WhatsApp Community CTA */}
      <Section style={ctaSection}>
        <Button style={ctaButton} href={whatsappChannelLink}>
          Join Event WhatsApp Channel →
        </Button>
        <Text style={ctaSubtext}>
          Get live updates, connect with attendees, and ask speakers questions.
        </Text>
      </Section>

      <Text style={textMuted}>
        We look forward to seeing you there! If your plans change and you cannot
        attend, please let us know so we can open the spot to other students.
      </Text>
    </EmailLayout>
  );
}
