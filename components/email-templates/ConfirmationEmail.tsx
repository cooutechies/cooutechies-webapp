import * as React from "react";
import { Button, Heading, Section, Text } from "@react-email/components";
import { EmailLayout } from "./shared/EmailLayout";
import { EmailBadge } from "./shared/EmailBadge";
import { CommunityBenefitsSection } from "./sections/CommunityBenefitsSection";
import { NextStepsSection } from "./sections/NextStepsSection";
import { CommunityStatsSection } from "./sections/CommunityStatsSection";
import {
  heroSection,
  mainHeading,
  gradientText,
  heroSubtitle,
  greetingSection,
  greetingText,
  nameHighlight,
  paragraphText,
  highlightStrong,
  ctaSection,
  ctaIntro,
  ctaButton,
  ctaSubtext,
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
      {/* Welcome Badge */}
      <EmailBadge text="✨ WELCOME TO THE COMMUNITY" />

      {/* Hero Heading */}
      <Section style={heroSection}>
        <Heading style={mainHeading}>
          Welcome to
          <br />
          <span style={gradientText}>COOU Techies!</span>
        </Heading>
        <Text style={heroSubtitle}>
          You&apos;re officially part of the most vibrant tech community
        </Text>
      </Section>

      {/* Personalized Greeting */}
      <Section style={greetingSection}>
        <Text style={greetingText}>
          Hey <span style={nameHighlight}>{firstName}</span> 👋
        </Text>
        <Text style={paragraphText}>
          🎉 Thank you for joining COOU Techies! We&apos;re absolutely thrilled
          to have you as part of our growing family of{" "}
          <strong style={highlightStrong}>500+ tech enthusiasts</strong>,
          innovators, and future industry leaders.
        </Text>
        <Text style={paragraphText}>
          Your journey into the world of technology just got a whole lot more
          exciting. Here&apos;s what makes our community special and what awaits
          you:
        </Text>
      </Section>

      {/* Primary WhatsApp CTA */}
      <Section style={ctaSection}>
        <Text style={ctaIntro}>🔥 Ready to dive in?</Text>
        <Button style={ctaButton} href={whatsappChannelLink}>
          Join Our WhatsApp Community →
        </Button>
        <Text style={ctaSubtext}>
          Connect instantly with 500+ passionate tech enthusiasts
        </Text>
      </Section>

      {/* Benefits Showcase */}
      <CommunityBenefitsSection />

      {/* Next Steps Checklist */}
      <NextStepsSection />

      {/* Stats Counter */}
      <CommunityStatsSection />
    </EmailLayout>
  );
}
