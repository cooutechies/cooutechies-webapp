import * as React from "react";
import { Hr, Section, Text } from "@react-email/components";
import type { CSSProperties } from "react";
import { emailColors } from "../styles/emailTheme";

const eventDetailsSection: CSSProperties = {
  margin: "24px 0",
  padding: "16px 0",
  borderTop: `1px solid ${emailColors.borderLight}`,
  borderBottom: `1px solid ${emailColors.borderLight}`,
};

const eventTitleStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: "700",
  color: emailColors.textPrimary,
  margin: "0 0 8px 0",
};

const eventDescriptionStyle: CSSProperties = {
  fontSize: "14px",
  lineHeight: "1.6",
  color: emailColors.textBody,
  margin: "0 0 16px 0",
};

const eventDivider: CSSProperties = {
  border: "none",
  borderTop: `1px solid ${emailColors.borderLight}`,
  margin: "14px 0",
};

const detailItem: CSSProperties = {
  margin: "0 0 8px 0",
};

const detailLabel: CSSProperties = {
  display: "inline-block",
  fontSize: "13px",
  fontWeight: "600",
  color: emailColors.textMuted,
  marginRight: "8px",
};

const detailValue: CSSProperties = {
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "600",
  color: emailColors.textPrimary,
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
      <Text style={eventTitleStyle}>{eventTitle}</Text>
      {eventDescription && (
        <Text style={eventDescriptionStyle}>{eventDescription}</Text>
      )}
      <Hr style={eventDivider} />

      <Section style={detailItem}>
        <Text style={detailLabel}>📅 Date:</Text>
        <Text style={detailValue}>{eventDate}</Text>
      </Section>

      <Section style={detailItem}>
        <Text style={detailLabel}>⏰ Time:</Text>
        <Text style={detailValue}>{eventTime}</Text>
      </Section>

      <Section style={detailItem}>
        <Text style={detailLabel}>📍 Location:</Text>
        <Text style={detailValue}>{eventLocation}</Text>
      </Section>
    </Section>
  );
}
