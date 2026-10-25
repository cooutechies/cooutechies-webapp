import * as React from "react";
import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "./shared/EmailLayout";
import { EmailBadge } from "./shared/EmailBadge";
import {
  mainHeading,
  paragraphText,
  nameHighlight,
  highlightsSection,
  highlightsTitle,
  bulletPoint,
  bulletIcon,
  highlightStrong,
  ctaSection,
  ctaButton,
  ctaSubtext,
  textMuted,
} from "./styles/emailTheme";

interface EventReminderEmailProps {
  recipientName: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  timeFrame: "1-week" | "3-days" | "tomorrow" | "today";
  eventLink: string;
}

export default function EventReminderEmail({
  recipientName,
  eventTitle,
  eventDate,
  eventLocation,
  timeFrame,
  eventLink,
}: EventReminderEmailProps) {
  const getReminderLabel = () => {
    switch (timeFrame) {
      case "1-week":
        return "🗓️ 1 Week Until Event";
      case "3-days":
        return "⏰ 3 Days Until Event";
      case "tomorrow":
        return "🚀 Event is Tomorrow!";
      case "today":
        return "🎉 Event Starts Today!";
      default:
        return "📌 Event Reminder";
    }
  };

  const getSubtext = () => {
    switch (timeFrame) {
      case "1-week":
        return "This is a friendly reminder that your upcoming event is just one week away.";
      case "3-days":
        return "Your event is coming up in three days. We cannot wait to see you there!";
      case "tomorrow":
        return "Get ready! The event kicks off tomorrow. Here are the key details you need.";
      case "today":
        return "Today is the big day! We are looking forward to welcoming you.";
      default:
        return "Here is a quick reminder about your upcoming event registration.";
    }
  };

  return (
    <EmailLayout previewText={`Reminder: ${eventTitle} is coming up! ⏰`}>
      {/* Badge */}
      <EmailBadge text={getReminderLabel()} color="#eab308" />

      {/* Heading */}
      <Heading style={mainHeading}>{eventTitle}</Heading>

      <Text style={paragraphText}>
        Hi <span style={nameHighlight}>{recipientName}</span>, {getSubtext()}
      </Text>

      {/* Event Details Section (Unboxed) */}
      <Section style={highlightsSection}>
        <Text style={highlightsTitle}>Quick Details:</Text>
        <Text style={bulletPoint}>
          <span style={bulletIcon}>📅</span>{" "}
          <strong style={highlightStrong}>Date:</strong> {eventDate}
        </Text>
        <Text style={bulletPoint}>
          <span style={bulletIcon}>📍</span>{" "}
          <strong style={highlightStrong}>Location:</strong> {eventLocation}
        </Text>
      </Section>

      {/* CTA Button */}
      <Section style={ctaSection}>
        <Button style={ctaButton} href={eventLink}>
          View Event Page & Updates →
        </Button>
        <Text style={ctaSubtext}>
          Check schedule updates, speaker bios, and venue directions.
        </Text>
      </Section>

      <Text style={textMuted}>
        Need help or have questions? Simply reply to this email and our team will
        assist you.
      </Text>
    </EmailLayout>
  );
}
