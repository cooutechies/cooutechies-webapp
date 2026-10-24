import * as React from "react";
import { Section, Text } from "@react-email/components";
import { badgeSection, badgePill } from "../styles/emailTheme";

interface EmailBadgeProps {
  text: string;
  color?: string;
}

export function EmailBadge({ text, color = "#22c55e" }: EmailBadgeProps) {
  return (
    <Section style={badgeSection}>
      <Text style={badgePill(color)}>{text}</Text>
    </Section>
  );
}
