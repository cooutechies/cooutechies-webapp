import * as React from "react";
import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "./shared/EmailLayout";
import { EmailBadge } from "./shared/EmailBadge";
import { EventDetailsCard } from "./sections/EventDetailsCard";
import { EventExpectationsSection } from "./sections/EventExpectationsSection";
import { EventPreparationTips } from "./sections/EventPreparationTips";
import {
  heroSection,
  mainHeading,
  gradientText,
  heroSubtitle,
  greetingSection,
  greetingText,
  nameHighlight,
  paragraphText,
  highlightStrong,
  ctaSection,
  ctaIntro,
  ctaButton,
  ctaSubtext,
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
      previewText={`You're registered for ${eventTitle}! 🎉 See you on ${eventDate}`}
    >
      {/* Confirmation Badge */}
      <EmailBadge text="✅ REGISTRATION CONFIRMED" />

      {/* Hero Heading */}
      <Section style={heroSection}>
        <Heading style={mainHeading}>
          You&apos;re
          <br />
          <span style={gradientText}>All Set!</span>
        </Heading>
        <Text style={heroSubtitle}>
          Your spot is reserved for this amazing event
        </Text>
      </Section>

      {/* Personalized Greeting */}
      <Section style={greetingSection}>
        <Text style={greetingText}>
          Hey <span style={nameHighlight}>{firstName}</span> 👋
        </Text>
        <Text style={paragraphText}>
          🎉 We&apos;re excited to confirm your registration for{" "}
          <strong style={highlightStrong}>{eventTitle}</strong>! This is going
          to be an incredible experience, and we can&apos;t wait to see you
          there.
        </Text>
        <Text style={paragraphText}>
          Mark your calendar and get ready for an unforgettable day of learning,
          networking, and innovation with fellow tech enthusiasts!
        </Text>
      </Section>

      {/* Structured Event Details Card */}
      <EventDetailsCard
        eventTitle={eventTitle}
        eventDate={eventDate}
        eventTime={eventTime}
        eventLocation={eventLocation}
        eventDescription={eventDescription}
      />

      {/* Expectations Breakdown */}
      <EventExpectationsSection />

      {/* Preparation Checklist */}
      <EventPreparationTips />

      {/* WhatsApp Community CTA */}
      <Section style={ctaSection}>
        <Text style={ctaIntro}>🔥 Stay Connected</Text>
        <Button style={ctaButton} href={whatsappChannelLink}>
          Join Our WhatsApp Channel →
        </Button>
        <Text style={ctaSubtext}>
          Get real-time updates and connect with other attendees before the
          event
        </Text>
      </Section>
    </EmailLayout>
  );
}
