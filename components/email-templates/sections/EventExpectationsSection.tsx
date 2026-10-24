import * as React from "react";
import { Section, Text } from "@react-email/components";
import type { CSSProperties } from "react";
import { emailFonts } from "../styles/emailTheme";

const expectSection: CSSProperties = {
  padding: "32px 40px",
  backgroundColor: "rgba(34, 197, 94, 0.05)",
};

const expectHeading: CSSProperties = {
  fontFamily: emailFonts.heading,
  fontSize: "22px",
  fontWeight: "800",
  color: "#22c55e",
  margin: "0 0 20px 0",
  textAlign: "center",
};

const expectCard: CSSProperties = {
  backgroundColor: "rgba(34, 197, 94, 0.08)",
  border: "2px solid rgba(34, 197, 94, 0.2)",
  borderRadius: "12px",
  padding: "18px 24px",
  marginBottom: "14px",
  textAlign: "center",
};

const expectIcon: CSSProperties = {
  fontSize: "28px",
  margin: "0 0 8px 0",
};

const expectTitle: CSSProperties = {
  fontFamily: emailFonts.heading,
  fontSize: "15px",
  fontWeight: "800",
  color: "#22c55e",
  margin: "0 0 6px 0",
};

const expectDesc: CSSProperties = {
  fontSize: "14px",
  color: "#cbd5e1",
  margin: 0,
  lineHeight: "1.6",
};

const EXPECTATIONS = [
  {
    icon: "🎯",
    title: "Engaging Content",
    desc: "Learn from industry experts and gain valuable insights that will elevate your tech journey",
  },
  {
    icon: "🤝",
    title: "Networking Opportunities",
    desc: "Connect with like-minded tech enthusiasts and build meaningful relationships",
  },
  {
    icon: "💡",
    title: "Hands-on Experience",
    desc: "Participate in interactive sessions and practical workshops that you can apply immediately",
  },
  {
    icon: "🎁",
    title: "Refreshments & Goodies",
    desc: "Enjoy refreshments, exclusive resources, and surprise giveaways throughout the event",
  },
];

export function EventExpectationsSection() {
  return (
    <Section style={expectSection}>
      <Text style={expectHeading}>✨ What to Expect</Text>
      {EXPECTATIONS.map((item) => (
        <Section key={item.title} style={expectCard}>
          <Text style={expectIcon}>{item.icon}</Text>
          <Text style={expectTitle}>{item.title}</Text>
          <Text style={expectDesc}>{item.desc}</Text>
        </Section>
      ))}
    </Section>
  );
}
