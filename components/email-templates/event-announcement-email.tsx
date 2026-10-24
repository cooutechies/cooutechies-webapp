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
  emailFonts,
  ctaSection,
  ctaButton,
  ctaSubtext,
} from "./styles/emailTheme";

interface EventAnnouncementEmailProps {
  eventTitle: string;
  eventDescription: string;
  eventDate: string;
  eventLocation: string;
  eventImage?: string;
  registrationLink: string;
}

const heroImageSection: CSSProperties = {
  padding: "0 40px 24px 40px",
  textAlign: "center",
};

const heroImage: CSSProperties = {
  width: "100%",
  maxHeight: "280px",
  objectFit: "cover",
  borderRadius: "16px",
  border: "1px solid rgba(34, 197, 94, 0.2)",
};

const eventHeading: CSSProperties = {
  fontFamily: emailFonts.heading,
  fontSize: "28px",
  fontWeight: "800",
  color: "#f8fafc",
  margin: "0 0 14px 0",
  textAlign: "center",
};

const eventDescText: CSSProperties = {
  fontSize: "16px",
  lineHeight: "1.6",
  color: "#cbd5e1",
  margin: "0 0 24px 0",
  textAlign: "center",
};

const introText: CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#94a3b8",
  margin: "0 0 14px 0",
};

const detailsSection: CSSProperties = {
  padding: "24px 40px",
  backgroundColor: "rgba(34, 197, 94, 0.05)",
  borderTop: "1px solid rgba(34, 197, 94, 0.15)",
  borderBottom: "1px solid rgba(34, 197, 94, 0.15)",
};

const detailsHeader: CSSProperties = {
  fontFamily: emailFonts.heading,
  fontSize: "18px",
  fontWeight: "800",
  color: "#22c55e",
  margin: "0 0 16px 0",
};

const detailCard: CSSProperties = {
  backgroundColor: "rgba(34, 197, 94, 0.08)",
  border: "1px solid rgba(34, 197, 94, 0.2)",
  borderRadius: "10px",
  padding: "14px 18px",
  marginBottom: "12px",
};

const detailIcon: CSSProperties = {
  display: "inline-block",
  fontSize: "16px",
  marginRight: "8px",
};

const detailLabel: CSSProperties = {
  display: "inline-block",
  fontSize: "13px",
  fontWeight: "600",
  color: "#94a3b8",
  marginRight: "8px",
  textTransform: "uppercase",
};

const detailValue: CSSProperties = {
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "700",
  color: "#f8fafc",
};

const infoSection: CSSProperties = {
  padding: "24px 40px",
  backgroundColor: "rgba(234, 179, 8, 0.06)",
  borderTop: "1px solid rgba(234, 179, 8, 0.2)",
  borderBottom: "1px solid rgba(234, 179, 8, 0.2)",
};

const infoTitle: CSSProperties = {
  fontFamily: emailFonts.heading,
  fontSize: "18px",
  fontWeight: "800",
  color: "#eab308",
  margin: "0 0 14px 0",
};

const infoText: CSSProperties = {
  fontSize: "14px",
  color: "#e2e8f0",
  lineHeight: "1.6",
  margin: "0 0 10px 0",
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
    <EmailLayout previewText={`🎉 New Event: ${eventTitle} - Join us on ${eventDate}`}>
      {/* Badge */}
      <EmailBadge text="📢 NEW EVENT ANNOUNCEMENT" color="#eab308" />

      {/* Hero Image */}
      {eventImage && (
        <Section style={heroImageSection}>
          <Img src={eventImage} alt={eventTitle} width="520" style={heroImage} />
        </Section>
      )}

      {/* Title & Description */}
      <Section style={{ padding: "0 40px" }}>
        <Heading style={eventHeading}>{eventTitle}</Heading>
        <Text style={eventDescText}>{eventDescription}</Text>
        <Text style={introText}>
          🎉 We&apos;re excited to invite you to an incredible event that brings together
          passionate tech enthusiasts, innovators, and learners from across our community!
        </Text>
      </Section>

      {/* Event Details */}
      <Section style={detailsSection}>
        <Text style={detailsHeader}>📋 Event Details</Text>
        <Section style={detailCard}>
          <Text style={detailIcon}>📅</Text>
          <Text style={detailLabel}>Date & Time:</Text>
          <Text style={detailValue}>{eventDate}</Text>
        </Section>
        <Section style={detailCard}>
          <Text style={detailIcon}>📍</Text>
          <Text style={detailLabel}>Location:</Text>
          <Text style={detailValue}>{eventLocation}</Text>
        </Section>
      </Section>

      {/* Registration CTA */}
      <Section style={ctaSection}>
        <Text style={{ fontSize: "16px", color: "#f8fafc", fontWeight: "700", margin: "0 0 16px 0" }}>
          🔥 Spaces are limited! Don&apos;t miss out on this amazing opportunity.
        </Text>
        <Button style={ctaButton} href={registrationLink}>
          Register Now - It&apos;s Free! →
        </Button>
        <Text style={ctaSubtext}>
          Secure your spot today and join our growing tech community
        </Text>
      </Section>

      {/* Important Info */}
      <Section style={infoSection}>
        <Text style={infoTitle}>📌 Important Information</Text>
        <Text style={infoText}>• Please arrive 15 minutes early so you don&apos;t miss out</Text>
        <Text style={infoText}>• Feel free to invite friends who share your passion for tech</Text>
        <Text style={infoText}>• Follow us on social media for real-time updates</Text>
      </Section>
    </EmailLayout>
  );
}
