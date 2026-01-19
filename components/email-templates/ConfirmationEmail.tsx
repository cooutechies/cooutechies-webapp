import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Hr,
  Row,
  Column,
} from "@react-email/components";
import * as React from "react";

/**
 * ============================================
 * ConfirmationEmail Component
 * ============================================
 *
 * Premium welcome email for new COOU Techies members.
 * Features a modern dark theme with glassmorphism effects
 * that matches the website's aesthetic design.
 *
 * Design System:
 * - Primary: Green (#22c55e) - Brand accent color
 * - Secondary: Yellow/Gold (#eab308) - Highlight color
 * - Background: Deep slate (#0a0f1a) - Dark mode base
 * - Card: Elevated slate (#151c2c) - Container background
 * - Text: Off-white (#f8fafc) - Primary text
 * - Muted: Slate gray (#94a3b8) - Secondary text
 *
 * Typography:
 * - Display: Orbitron (headings) - Techy, futuristic feel
 * - Body: Inter (paragraphs) - Clean, readable
 *
 * @param firstName - User's first name for personalization
 */

interface ConfirmationEmailProps {
  firstName: string;
}

export default function ConfirmationEmail({
  firstName,
}: ConfirmationEmailProps) {
  // ============================================
  // Environment Configuration
  // ============================================
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const whatsappChannelLink = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL;

  // Logo URL - ensure this matches your actual logo path
  const logoUrl = `${baseUrl}/email-logo.png`;

  // Dynamic year
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      {/* HTML Head with custom fonts */}
      <Head>
        {/* Import Orbitron font for techy headings */}
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        {/* Import Inter font for clean body text */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Preview text - appears in inbox before opening email */}
      <Preview>
        Welcome to COOU Techies, {firstName}! 🚀 You&apos;re now part of 500+
        tech innovators
      </Preview>

      {/* ============================================
          MAIN BODY
          Deep dark background matching website aesthetic
          ============================================ */}
      <Body style={main}>
        {/* Outer glow effect container */}
        <Container style={outerContainer}>
          {/* Main card with glassmorphism effect */}
          <Container style={container}>
            {/* ============================================
                HEADER SECTION
                Logo with decorative gradient line
                ============================================ */}
            <Section style={headerSection}>
              {/* Logo with glow effect */}
              <Img
                src={logoUrl}
                alt="COOU Techies"
                width="150"
                height="150"
                style={logoStyle}
              />

              {/* Decorative gradient line below logo */}
              <Section style={gradientLine} />
            </Section>

            {/* ============================================
                WELCOME BADGE
                ============================================ */}
            <Section style={badgeSection}>
              <Text style={welcomeBadge}>✨ WELCOME TO THE COMMUNITY</Text>
            </Section>

            {/* ============================================
                HERO SECTION
                Main welcome message with gradient text
                ============================================ */}
            <Section style={heroSection}>
              {/* Main heading with gradient effect */}
              <Heading style={mainHeading}>
                Welcome to
                <br />
                <span style={gradientText}>COOU Techies!</span>
              </Heading>

              {/* Subheading */}
              <Text style={heroSubtitle}>
                You&apos;re officially part of the most vibrant tech community
              </Text>
            </Section>

            {/* ============================================
                PERSONALIZED GREETING
                Warm welcome message to the new member
                ============================================ */}
            <Section style={greetingSection}>
              <Text style={greetingText}>
                Hey <span style={nameHighlight}>{firstName}</span> 👋
              </Text>

              <Text style={paragraphText}>
                🎉 Thank you for joining COOU Techies! We&apos;re absolutely
                thrilled to have you as part of our growing family of{" "}
                <strong style={highlightStrong}>500+ tech enthusiasts</strong>,
                innovators, and future industry leaders.
              </Text>

              <Text style={paragraphText}>
                Your journey into the world of technology just got a whole lot
                more exciting. Here&apos;s what makes our community special and
                what awaits you:
              </Text>
            </Section>

            {/* ============================================
                CALL TO ACTION (Early Placement)
                Primary WhatsApp join button with glow effect
                ============================================ */}
            <Section style={ctaSection}>
              <Text style={ctaIntro}>🔥 Ready to dive in?</Text>

              {/* Primary CTA button */}
              <Button style={ctaButton} href={whatsappChannelLink}>
                Join Our WhatsApp Community →
              </Button>

              <Text style={ctaSubtext}>
                Connect instantly with 500+ passionate tech enthusiasts
              </Text>
            </Section>

            {/* ============================================
                BENEFITS SECTION
                Stacked community benefits with modern cards
                ============================================ */}
            <Section style={benefitsSection}>
              <Text style={benefitsHeader}>🌟 What You&apos;ll Experience</Text>

              {/* Benefit 1: Connect */}
              <Section style={benefitCard}>
                <Text style={benefitIcon}>🔗</Text>
                <Text style={benefitTitle}>Connect</Text>
                <Text style={benefitDesc}>
                  Network with brilliant minds and build lasting relationships
                  in tech
                </Text>
              </Section>

              {/* Benefit 2: Learn */}
              <Section style={benefitCard}>
                <Text style={benefitIcon}>📚</Text>
                <Text style={benefitTitle}>Learn</Text>
                <Text style={benefitDesc}>
                  Access exclusive workshops, resources, and expert mentorship
                  programs
                </Text>
              </Section>

              {/* Benefit 3: Build */}
              <Section style={benefitCard}>
                <Text style={benefitIcon}>⚡</Text>
                <Text style={benefitTitle}>Build</Text>
                <Text style={benefitDesc}>
                  Collaborate on real-world projects and participate in exciting
                  hackathons
                </Text>
              </Section>

              {/* Benefit 4: Grow */}
              <Section style={benefitCard}>
                <Text style={benefitIcon}>🚀</Text>
                <Text style={benefitTitle}>Grow</Text>
                <Text style={benefitDesc}>
                  Accelerate your career path and unlock new opportunities
                </Text>
              </Section>
            </Section>

            {/* ============================================
                NEXT STEPS SECTION
                ============================================ */}
            <Section style={nextStepsSection}>
              <Text style={nextStepsTitle}>📋 Your Next Steps</Text>

              <Text style={stepItem}>
                1️⃣{" "}
                <strong style={stepStrong}>Join our WhatsApp community</strong>{" "}
                to connect with 500+ members instantly
              </Text>
              <Text style={stepItem}>
                2️⃣ <strong style={stepStrong}>Introduce yourself</strong> and
                tell us what you&apos;re passionate about
              </Text>
              <Text style={stepItem}>
                3️⃣ <strong style={stepStrong}>Stay updated</strong> on upcoming
                events, workshops, and opportunities
              </Text>
              <Text style={stepItem}>
                4️⃣ <strong style={stepStrong}>Get involved</strong> in projects,
                discussions, and community activities
              </Text>
            </Section>

            {/* ============================================
                STATS SECTION
                Community achievements with visual impact
                ============================================ */}
            <Section style={statsSection}>
              {/* Section title */}
              <Text style={statsHeading}>📊 Our Community Impact</Text>

              {/* Stats grid */}
              <Row style={statsRow}>
                {/* Stat 1: Members */}
                <Column style={statColumn}>
                  <Text style={statNumber}>500+</Text>
                  <Text style={statLabel}>Active Members</Text>
                </Column>

                {/* Stat 2: Projects */}
                <Column style={statColumn}>
                  <Text style={statNumber}>20+</Text>
                  <Text style={statLabel}>Projects Built</Text>
                </Column>

                {/* Stat 3: Events */}
                <Column style={statColumn}>
                  <Text style={statNumber}>30+</Text>
                  <Text style={statLabel}>Events Hosted</Text>
                </Column>
              </Row>
            </Section>

            {/* ============================================
                FOOTER SECTION
                Contact info and social links
                ============================================ */}
            <Section style={footerSection}>
              {/* Decorative divider */}
              <Hr style={footerDivider} />

              {/* Footer title */}
              <Text style={footerTitle}>Have Questions?</Text>

              {/* Contact info */}
              <Text style={footerText}>
                We&apos;re here to help! Reach out to us anytime and we&apos;ll
                get back to you as soon as possible.
              </Text>

              <Link href="mailto:cooutechies@gmail.com" style={footerLink}>
                contact@cooutechies.com
              </Link>

              {/* Social prompt */}
              <Text style={socialText}>
                Follow us for updates and announcements
              </Text>

              {/* Copyright with dynamic year */}
              <Text style={copyrightText}>
                © {currentYear} COOU Techies. Building the Future Techies
              </Text>
            </Section>
          </Container>
        </Container>
      </Body>
    </Html>
  );
}

/* ============================================
   STYLE DEFINITIONS
   ============================================
   All styles are inline for maximum email client
   compatibility. Colors match the COOU Techies
   dark mode design system.
   ============================================ */

// ============================================
// LAYOUT STYLES
// ============================================

/**
 * Main body background
 * Deep dark color for modern, premium feel
 */
const main = {
  backgroundColor: "#0a0f1a",
  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: "40px 16px",
  margin: "0",
};

/**
 * Outer container for glow effect
 * Creates subtle ambient lighting around the card
 */
const outerContainer = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "4px",
  borderRadius: "24px",
  background:
    "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(234, 179, 8, 0.2), rgba(34, 197, 94, 0.1))",
};

/**
 * Main card container
 * Glassmorphism effect with subtle green border
 */
const container = {
  backgroundColor: "#151c2c",
  borderRadius: "20px",
  padding: "0",
  overflow: "hidden",
  boxShadow:
    "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
};

// ============================================
// HEADER STYLES
// ============================================

/**
 * Header section containing logo
 */
const headerSection = {
  textAlign: "center" as const,
  padding: "48px 40px 32px 40px",
  background:
    "linear-gradient(180deg, rgba(34, 197, 94, 0.08) 0%, transparent 100%)",
};

/**
 * Logo styling with subtle glow - Square format
 */
const logoStyle = {
  display: "block",
  margin: "0 auto 24px auto",
  width: "180px",
  height: "auto",
  borderRadius: "12px",
  boxShadow: "0 0 40px rgba(34, 197, 94, 0.3), 0 4px 20px rgba(0, 0, 0, 0.4)",
  border: "2px solid rgba(34, 197, 94, 0.3)",
};

/**
 * Decorative gradient line below logo
 */
const gradientLine = {
  height: "3px",
  maxWidth: "120px",
  margin: "0 auto",
  background:
    "linear-gradient(90deg, transparent, #22c55e, #eab308, #22c55e, transparent)",
  borderRadius: "2px",
};

// ============================================
// BADGE SECTION
// ============================================

const badgeSection = {
  textAlign: "center" as const,
  padding: "0 40px 24px 40px",
};

/**
 * Welcome badge styling
 */
const welcomeBadge = {
  display: "inline-block",
  fontSize: "16px",
  fontWeight: "700",
  letterSpacing: "2px",
  color: "#22c55e",
  backgroundColor: "rgba(34, 197, 94, 0.15)",
  padding: "12px 28px",
  borderRadius: "100px",
  border: "2px solid rgba(34, 197, 94, 0.3)",
  margin: "0",
};

// ============================================
// HERO SECTION STYLES
// ============================================

/**
 * Hero section container
 */
const heroSection = {
  textAlign: "center" as const,
  padding: "0 40px 32px 40px",
};

/**
 * Main heading - uses Orbitron font
 */
const mainHeading = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "40px",
  fontWeight: "800",
  color: "#f8fafc",
  margin: "0 0 20px 0",
  lineHeight: "1.2",
  letterSpacing: "-0.5px",
};

/**
 * Gradient text effect for heading
 * Green to yellow gradient matching brand colors
 */
const gradientText = {
  background: "linear-gradient(135deg, #22c55e 0%, #84cc16 50%, #eab308 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

/**
 * Hero subtitle styling
 */
const heroSubtitle = {
  fontSize: "18px",
  lineHeight: "1.7",
  color: "#e2e8f0",
  margin: "0",
};

// ============================================
// GREETING SECTION STYLES
// ============================================

/**
 * Greeting section container
 */
const greetingSection = {
  padding: "0 40px 32px 40px",
};

/**
 * Greeting text with name
 */
const greetingText = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#f8fafc",
  margin: "0 0 24px 0",
};

/**
 * Name highlight - green color
 */
const nameHighlight = {
  color: "#22c55e",
  fontWeight: "800",
};

/**
 * Standard paragraph text
 */
const paragraphText = {
  fontSize: "17px",
  lineHeight: "1.8",
  color: "#cbd5e1",
  margin: "0 0 16px 0",
};

/**
 * Strong text highlight
 */
const highlightStrong = {
  color: "#22c55e",
  fontWeight: "700",
};

// ============================================
// BENEFITS SECTION STYLES
// ============================================

/**
 * Benefits section container
 */
const benefitsSection = {
  padding: "32px 40px",
  backgroundColor: "rgba(34, 197, 94, 0.05)",
};

/**
 * Benefits section header
 */
const benefitsHeader = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#22c55e",
  margin: "0 0 24px 0",
  fontFamily: '"Orbitron", "Inter", sans-serif',
  textAlign: "center" as const,
};

/**
 * Benefits row layout
 */
const benefitsRow = {
  marginBottom: "12px",
};

/**
 * Benefits column - 50% width
 */
const benefitColumn = {
  width: "50%",
  verticalAlign: "top" as const,
  padding: "0 8px",
};

/**
 * Individual benefit card - Full width stacked
 */
const benefitCard = {
  backgroundColor: "rgba(34, 197, 94, 0.08)",
  border: "2px solid rgba(34, 197, 94, 0.2)",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center" as const,
  marginBottom: "16px",
};

/**
 * Benefit icon styling
 */
const benefitIcon = {
  fontSize: "32px",
  margin: "0 0 12px 0",
  lineHeight: "1",
};

/**
 * Benefit title - green accent
 */
const benefitTitle = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "16px",
  fontWeight: "800",
  color: "#22c55e",
  margin: "0 0 10px 0",
  letterSpacing: "0.5px",
};

/**
 * Benefit description text
 */
const benefitDesc = {
  fontSize: "14px",
  color: "#cbd5e1",
  margin: "0",
  lineHeight: "1.6",
};

// ============================================
// NEXT STEPS SECTION
// ============================================

const nextStepsSection = {
  padding: "32px 40px",
  backgroundColor: "rgba(234, 179, 8, 0.08)",
  borderTop: "2px solid rgba(234, 179, 8, 0.2)",
  borderBottom: "2px solid rgba(234, 179, 8, 0.2)",
};

const nextStepsTitle = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#eab308",
  margin: "0 0 24px 0",
  fontFamily: '"Orbitron", "Inter", sans-serif',
};

const stepItem = {
  fontSize: "17px",
  lineHeight: "1.8",
  color: "#e2e8f0",
  margin: "0 0 14px 0",
};

const stepStrong = {
  color: "#eab308",
  fontWeight: "700",
};

// ============================================
// CTA SECTION STYLES
// ============================================

/**
 * CTA section container
 */
const ctaSection = {
  textAlign: "center" as const,
  padding: "48px 40px",
};

/**
 * CTA intro text
 */
const ctaIntro = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#f8fafc",
  margin: "0 0 24px 0",
  lineHeight: "1.5",
};

/**
 * Primary CTA button
 * Green gradient with glow effect
 */
const ctaButton = {
  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  color: "#ffffff",
  padding: "20px 52px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "800",
  fontSize: "19px",
  fontFamily: '"Orbitron", "Inter", sans-serif',
  display: "inline-block",
  boxShadow: "0 8px 24px rgba(34, 197, 94, 0.35)",
  border: "none",
  letterSpacing: "0.5px",
};

/**
 * CTA subtext
 */
const ctaSubtext = {
  fontSize: "16px",
  color: "#94a3b8",
  margin: "20px 0 0 0",
  lineHeight: "1.5",
};

// ============================================
// STATS SECTION STYLES
// ============================================

/**
 * Stats section with background
 */
const statsSection = {
  backgroundColor: "rgba(15, 23, 42, 0.6)",
  borderTop: "1px solid rgba(34, 197, 94, 0.1)",
  borderBottom: "1px solid rgba(34, 197, 94, 0.1)",
  padding: "40px 32px",
};

/**
 * Stats section heading
 */
const statsHeading = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "20px",
  fontWeight: "800",
  color: "#f8fafc",
  textAlign: "center" as const,
  margin: "0 0 32px 0",
  letterSpacing: "1px",
};

/**
 * Stats row layout
 */
const statsRow = {
  textAlign: "center" as const,
};

/**
 * Individual stat column
 */
const statColumn = {
  width: "33.33%",
  textAlign: "center" as const,
  padding: "0 8px",
};

/**
 * Stat number - gradient text
 */
const statNumber = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "42px",
  color: "#f8fafc",
  fontWeight: "900",
  background: "linear-gradient(135deg, #22c55e 0%, #eab308 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  margin: "0 0 10px 0",
  lineHeight: "1",
};

/**
 * Stat label text
 */
const statLabel = {
  fontSize: "13px",
  color: "#94a3b8",
  margin: "0",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  fontWeight: "600",
};

// ============================================
// FOOTER SECTION STYLES
// ============================================

/**
 * Footer section container
 */
const footerSection = {
  padding: "40px 40px 40px 40px",
  textAlign: "center" as const,
};

/**
 * Footer divider line
 */
const footerDivider = {
  border: "none",
  borderTop: "1px solid rgba(148, 163, 184, 0.1)",
  margin: "0 0 28px 0",
};

/**
 * Footer title
 */
const footerTitle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#f8fafc",
  margin: "0 0 12px 0",
};

/**
 * Footer help text
 */
const footerText = {
  color: "#94a3b8",
  fontSize: "16px",
  margin: "0 0 16px 0",
  lineHeight: "1.6",
};

/**
 * Footer email link
 */
const footerLink = {
  color: "#22c55e",
  textDecoration: "none",
  fontWeight: "700",
  fontSize: "17px",
};

/**
 * Social text
 */
const socialText = {
  color: "#94a3b8",
  fontSize: "15px",
  margin: "20px 0 0 0",
  lineHeight: "1.5",
};

/**
 * Copyright text
 */
const copyrightText = {
  color: "#64748b",
  fontSize: "14px",
  margin: "24px 0 0 0",
  lineHeight: "1.5",
};
