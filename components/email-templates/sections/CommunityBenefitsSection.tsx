import * as React from "react";
import { Section, Text } from "@react-email/components";
import type { CSSProperties } from "react";
import { emailFonts } from "../styles/emailTheme";

const benefitsSection: CSSProperties = {
  padding: "32px 40px",
  backgroundColor: "rgba(34, 197, 94, 0.05)",
};

const benefitsHeader: CSSProperties = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#22c55e",
  margin: "0 0 24px 0",
  fontFamily: emailFonts.heading,
  textAlign: "center",
};

const benefitCard: CSSProperties = {
  backgroundColor: "rgba(34, 197, 94, 0.08)",
  border: "2px solid rgba(34, 197, 94, 0.2)",
  borderRadius: "12px",
  padding: "20px",
  textAlign: "center",
  marginBottom: "16px",
};

const benefitIcon: CSSProperties = {
  fontSize: "30px",
  margin: "0 0 10px 0",
  lineHeight: "1",
};

const benefitTitle: CSSProperties = {
  fontFamily: emailFonts.heading,
  fontSize: "16px",
  fontWeight: "800",
  color: "#22c55e",
  margin: "0 0 8px 0",
};

const benefitDesc: CSSProperties = {
  fontSize: "14px",
  color: "#cbd5e1",
  margin: 0,
  lineHeight: "1.6",
};

const BENEFITS = [
  {
    icon: "🔗",
    title: "Connect",
    desc: "Network with brilliant minds and build lasting relationships in tech",
  },
  {
    icon: "📚",
    title: "Learn",
    desc: "Access exclusive workshops, resources, and expert mentorship programs",
  },
  {
    icon: "⚡",
    title: "Build",
    desc: "Collaborate on real-world projects and participate in exciting hackathons",
  },
  {
    icon: "🚀",
    title: "Grow",
    desc: "Accelerate your career path and unlock new opportunities",
  },
];

export function CommunityBenefitsSection() {
  return (
    <Section style={benefitsSection}>
      <Text style={benefitsHeader}>🌟 What You&apos;ll Experience</Text>
      {BENEFITS.map((item) => (
        <Section key={item.title} style={benefitCard}>
          <Text style={benefitIcon}>{item.icon}</Text>
          <Text style={benefitTitle}>{item.title}</Text>
          <Text style={benefitDesc}>{item.desc}</Text>
        </Section>
      ))}
    </Section>
  );
}
