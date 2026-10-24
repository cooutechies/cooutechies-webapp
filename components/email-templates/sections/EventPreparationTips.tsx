import * as React from "react";
import { Section, Text } from "@react-email/components";
import type { CSSProperties } from "react";
import { emailFonts } from "../styles/emailTheme";

const tipsSection: CSSProperties = {
  padding: "32px 40px",
  backgroundColor: "rgba(234, 179, 8, 0.08)",
  borderTop: "2px solid rgba(234, 179, 8, 0.2)",
  borderBottom: "2px solid rgba(234, 179, 8, 0.2)",
};

const tipsHeading: CSSProperties = {
  fontFamily: emailFonts.heading,
  fontSize: "20px",
  fontWeight: "800",
  color: "#eab308",
  margin: "0 0 20px 0",
};

const tipItem: CSSProperties = {
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#e2e8f0",
  margin: "0 0 12px 0",
};

const tipStrong: CSSProperties = {
  color: "#eab308",
  fontWeight: "700",
};

const TIPS = [
  {
    bold: "Arrive 15 minutes early",
    text: "to get settled and network before we start",
  },
  {
    bold: "Bring a notebook and pen",
    text: "for taking notes and jotting down ideas",
  },
  {
    bold: "Charge your devices",
    text: "if you're bringing a laptop or tablet",
  },
  {
    bold: "Come with an open mind",
    text: "and be ready to learn, network, and have fun!",
  },
];

export function EventPreparationTips() {
  return (
    <Section style={tipsSection}>
      <Text style={tipsHeading}>📋 Preparation Tips</Text>
      {TIPS.map((tip, idx) => (
        <Text key={tip.bold} style={tipItem}>
          {idx + 1}️⃣ <strong style={tipStrong}>{tip.bold}</strong> {tip.text}
        </Text>
      ))}
    </Section>
  );
}
