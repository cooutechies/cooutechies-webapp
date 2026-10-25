import * as React from "react";
import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "./shared/EmailLayout";
import { EmailBadge } from "./shared/EmailBadge";
import {
  mainHeading,
  paragraphText,
  nameHighlight,
  highlightStrong,
  highlightsSection,
  highlightsTitle,
  bulletPoint,
  bulletIcon,
  ctaSection,
  ctaButton,
  ctaSubtext,
  textMuted,
} from "./styles/emailTheme";

interface ConfirmationEmailProps {
  firstName: string;
}

export default function ConfirmationEmail({
  firstName,
}: ConfirmationEmailProps) {
  const whatsappChannelLink =
    process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL ||
    "https://whatsapp.com/channel/cooutechies";

  return (
    <EmailLayout
      previewText={`Welcome to COOU Techies, ${firstName}! 🚀 You're now part of 500+ tech innovators`}
    >
      {/* Badge */}
      <EmailBadge text="✨ Community Welcome" />

      {/* Main Heading */}
      <Heading style={mainHeading}>
        Welcome to the community, <span style={nameHighlight}>{firstName}</span>!
      </Heading>

      {/* Body Copy */}
      <Text style={paragraphText}>
        Thank you for joining <strong style={highlightStrong}>COOU Techies</strong>.
        You are now part of a vibrant family of over 500+ student developers,
        designers, and innovators at Chukwuemeka Odumegwu Ojukwu University.
      </Text>

      <Text style={paragraphText}>
        Whether you are writing your first line of code, designing interfaces, or
        building full-stack applications, you have found the right place to learn,
        collaborate, and grow.
      </Text>

      {/* Open Highlights Section (No cramped inner box!) */}
      <Section style={highlightsSection}>
        <Text style={highlightsTitle}>Here is what awaits you:</Text>
        <Text style={bulletPoint}>
          <span style={bulletIcon}>✦</span>{" "}
          <strong style={highlightStrong}>Hands-on Workshops:</strong> Master
          web dev, mobile apps, UI/UX, AI, and cloud fundamentals.
        </Text>
        <Text style={bulletPoint}>
          <span style={bulletIcon}>✦</span>{" "}
          <strong style={highlightStrong}>Hackathons & Build Sessions:</strong>{" "}
          Collaborate on real-world projects and build an impressive portfolio.
        </Text>
        <Text style={bulletPoint}>
          <span style={bulletIcon}>✦</span>{" "}
          <strong style={highlightStrong}>Community & Mentorship:</strong>{" "}
          Connect with peers, alumni mentors, and internship opportunities.
        </Text>
      </Section>

      {/* Primary WhatsApp CTA */}
      <Section style={ctaSection}>
        <Button style={ctaButton} href={whatsappChannelLink}>
          Join Our WhatsApp Community →
        </Button>
        <Text style={ctaSubtext}>
          Our WhatsApp channel is the primary hub for live discussions,
          announcements, and networking.
        </Text>
      </Section>

      <Text style={textMuted}>
        Tip: Introduce yourself in the channel and let everyone know what tech
        field you are excited to explore!
      </Text>
    </EmailLayout>
  );
}
