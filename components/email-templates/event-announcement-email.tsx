import * as React from "react";
import {
  Button,
  Heading,
  Img,
  Section,
  Text,
} from "@react-email/components";
import type { CSSProperties } from "react";
import { EmailLayout } from "./shared/EmailLayout";
import { EmailBadge } from "./shared/EmailBadge";
import {
  mainHeading,
  paragraphText,
  highlightsSection,
  highlightsTitle,
  bulletPoint,
  bulletIcon,
  highlightStrong,
  ctaSection,
  ctaButton,
  ctaSubtext,
  textMuted,
  emailColors,
} from "./styles/emailTheme";

interface EventAnnouncementEmailProps {
  eventTitle: string;
  eventDescription: string;
  eventDate: string;
  eventLocation: string;
  eventImage?: string;
  registrationLink: string;
}

const bannerImage: CSSProperties = {
  width: "100%",
  maxHeight: "260px",
  objectFit: "cover",
  borderRadius: "12px",
  marginBottom: "20px",
  border: `1px solid ${emailColors.borderLight}`,
};

export default function EventAnnouncementEmail({
  eventTitle,
  eventDescription,
  eventDate,
  eventLocation,
  eventImage,
  registrationLink,
}: EventAnnouncementEmailProps) {
  return (
    <EmailLayout previewText={`🎉 New Event: ${eventTitle} — Join us on ${eventDate}`}>
      {/* Badge */}
      <EmailBadge text="📢 New Event Announcement" color="#eab308" />

      {/* Hero Poster if available */}
      {eventImage && (
        <Img src={eventImage} alt={eventTitle} width="516" style={bannerImage} />
      )}

      {/* Main Title */}
      <Heading style={mainHeading}>{eventTitle}</Heading>

      {/* Description */}
      <Text style={paragraphText}>{eventDescription}</Text>

      {/* Event Details Section (Unboxed) */}
      <Section style={highlightsSection}>
        <Text style={highlightsTitle}>Event Information:</Text>
        <Text style={bulletPoint}>
          <span style={bulletIcon}>📅</span>{" "}
          <strong style={highlightStrong}>Date & Time:</strong> {eventDate}
        </Text>
        <Text style={bulletPoint}>
          <span style={bulletIcon}>📍</span>{" "}
          <strong style={highlightStrong}>Location:</strong> {eventLocation}
        </Text>
      </Section>

      {/* Registration CTA */}
      <Section style={ctaSection}>
        <Button style={ctaButton} href={registrationLink}>
          Register for Free →
        </Button>
        <Text style={ctaSubtext}>
          Attendance is completely free for all students. Spots are reserved on a first-come basis.
        </Text>
      </Section>

      <Text style={textMuted}>
        Have friends who love tech? Forward this invitation to them or share the event link!
      </Text>
    </EmailLayout>
  );
}
