import * as React from "react";
import { Section, Text } from "@react-email/components";
import type { CSSProperties } from "react";
import { emailFonts } from "../styles/emailTheme";

const nextStepsSection: CSSProperties = {
  padding: "32px 40px",
  backgroundColor: "rgba(234, 179, 8, 0.08)",
  borderTop: "2px solid rgba(234, 179, 8, 0.2)",
  borderBottom: "2px solid rgba(234, 179, 8, 0.2)",
};

const nextStepsTitle: CSSProperties = {
  fontSize: "22px",
  fontWeight: "800",
  color: "#eab308",
  margin: "0 0 20px 0",
  fontFamily: emailFonts.heading,
};

const stepItem: CSSProperties = {
  fontSize: "16px",
  lineHeight: "1.7",
  color: "#e2e8f0",
  margin: "0 0 12px 0",
};

const stepStrong: CSSProperties = {
  color: "#eab308",
  fontWeight: "700",
};

const STEPS = [
  {
    bold: "Join our WhatsApp community",
    text: "to connect with 500+ members instantly",
  },
  {
    bold: "Introduce yourself",
    text: "and tell us what you're passionate about",
  },
  {
    bold: "Stay updated",
    text: "on upcoming events, workshops, and opportunities",
  },
  {
    bold: "Get involved",
    text: "in projects, discussions, and community activities",
  },
];

export function NextStepsSection() {
  return (
    <Section style={nextStepsSection}>
      <Text style={nextStepsTitle}>📋 Your Next Steps</Text>
      {STEPS.map((step, index) => (
        <Text key={step.bold} style={stepItem}>
          {index + 1}️⃣ <strong style={stepStrong}>{step.bold}</strong>{" "}
          {step.text}
        </Text>
      ))}
    </Section>
  );
}
