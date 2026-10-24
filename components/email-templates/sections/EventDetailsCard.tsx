import * as React from "react";
import { Hr, Section, Text } from "@react-email/components";
import type { CSSProperties } from "react";
import { emailFonts } from "../styles/emailTheme";

const eventDetailsSection: CSSProperties = {
  padding: "0 40px 32px 40px",
};

const eventDetailsHeading: CSSProperties = {
  fontFamily: emailFonts.heading,
  fontSize: "20px",
  fontWeight: "800",
  color: "#f8fafc",
  margin: "0 0 16px 0",
};

const eventCard: CSSProperties = {
  backgroundColor: "rgba(34, 197, 94, 0.05)",
  border: "2px solid rgba(34, 197, 94, 0.2)",
  borderRadius: "16px",
  padding: "24px",
};

const eventTitleStyle: CSSProperties = {
  fontFamily: emailFonts.heading,
  fontSize: "22px",
  fontWeight: "800",
  color: "#22c55e",
  margin: "0 0 12px 0",
};

const eventDescriptionStyle: CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.6",
  color: "#cbd5e1",
  margin: "0 0 16px 0",
};

const eventDivider: CSSProperties = {
  border: "none",
  borderTop: "1px solid rgba(34, 197, 94, 0.15)",
  margin: "16px 0",
};

const detailItem: CSSProperties = {
  margin: "0 0 12px 0",
};

const detailIcon: CSSProperties = {
  display: "inline-block",
  fontSize: "18px",
  marginRight: "8px",
};

const detailLabel: CSSProperties = {
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  color: "#94a3b8",
  marginRight: "8px",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const detailValue: CSSProperties = {
  display: "inline-block",
  fontSize: "15px",
  fontWeight: "700",
  color: "#f8fafc",
};

interface EventDetailsCardProps {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventDescription?: string;
}

export function EventDetailsCard({
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  eventDescription,
}: EventDetailsCardProps) {
  return (
    <Section style={eventDetailsSection}>
      <Text style={eventDetailsHeading}>📅 Event Details</Text>
      <Section style={eventCard}>
        <Text style={eventTitleStyle}>{eventTitle}</Text>
        {eventDescription && (
          <Text style={eventDescriptionStyle}>{eventDescription}</Text>
        )}
        <Hr style={eventDivider} />

        <Section style={detailItem}>
          <Text style={detailIcon}>📅</Text>
          <Text style={detailLabel}>Date:</Text>
          <Text style={detailValue}>{eventDate}</Text>
        </Section>

        <Section style={detailItem}>
          <Text style={detailIcon}>⏰</Text>
          <Text style={detailLabel}>Time:</Text>
          <Text style={detailValue}>{eventTime}</Text>
        </Section>

        <Section style={detailItem}>
          <Text style={detailIcon}>📍</Text>
          <Text style={detailLabel}>Location:</Text>
          <Text style={detailValue}>{eventLocation}</Text>
        </Section>
      </Section>
    </Section>
  );
}
