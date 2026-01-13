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
} from "@react-email/components";
import * as React from "react";

/**
 * ============================================
 * EventConfirmationEmail Component
 * ============================================
 *
 * Premium event registration confirmation email.
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
 * @param firstName - User's first name for personalization
 * @param eventTitle - Name of the event
 * @param eventDate - Date of the event
 * @param eventTime - Time of the event
 * @param eventLocation - Location of the event
 * @param eventDescription - Brief description of the event
 */

interface EventConfirmationEmailProps {
  firstName: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventLocation: string;
  eventDescription?: string;
}

export default function EventConfirmationEmail({
  firstName,
  eventTitle,
  eventDate,
  eventTime,
  eventLocation,
  eventDescription,
}: EventConfirmationEmailProps) {
  // ============================================
  // Environment Configuration
  // ============================================
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const whatsappChannelLink = process.env.NEXT_PUBLIC_WHATSAPP_CHANNEL;

  // Logo URL - ensure this matches your actual logo path
  const logoUrl = `${baseUrl}/cooutechies-logo1`;

  // Dynamic year
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      {/* HTML Head with custom fonts */}
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      {/* Preview text */}
      <Preview>
        You&apos;re registered for {eventTitle}! 🎉 See you on {eventDate}
      </Preview>

      {/* ============================================
          MAIN BODY
          ============================================ */}
      <Body style={main}>
        <Container style={outerContainer}>
          <Container style={container}>
            {/* ============================================
                HEADER SECTION
                ============================================ */}
            <Section style={headerSection}>
              <Img
                src={logoUrl}
                alt="COOU Techies"
                width="150"
                height="150"
                style={logoStyle}
              />
              <Section style={gradientLine} />
            </Section>

            {/* ============================================
                CONFIRMATION BADGE
                ============================================ */}
            <Section style={badgeSection}>
              <Text style={confirmationBadge}>✅ REGISTRATION CONFIRMED</Text>
            </Section>

            {/* ============================================
                HERO SECTION
                ============================================ */}
            <Section style={heroSection}>
              <Heading style={mainHeading}>
                You&apos;re
                <br />
                <span style={gradientText}>All Set!</span>
              </Heading>

              <Text style={heroSubtitle}>
                Your spot is reserved for this amazing event
              </Text>
            </Section>

            {/* ============================================
                PERSONALIZED GREETING
                ============================================ */}
            <Section style={greetingSection}>
              <Text style={greetingText}>
                Hey <span style={nameHighlight}>{firstName}</span> 👋
              </Text>

              <Text style={paragraphText}>
                🎉 We&apos;re excited to confirm your registration for{" "}
                <strong style={highlightStrong}>{eventTitle}</strong>! This is
                going to be an incredible experience, and we can&apos;t wait to
                see you there.
              </Text>

              <Text style={paragraphText}>
                Mark your calendar and get ready for an unforgettable day of
                learning, networking, and innovation with fellow tech
                enthusiasts!
              </Text>
            </Section>

            {/* ============================================
                EVENT DETAILS CARD
                ============================================ */}
            <Section style={eventDetailsSection}>
              <Text style={eventDetailsHeading}>📅 Event Details</Text>

              <Section style={eventCard}>
                {/* Event Title */}
                <Text style={eventTitle_style}>{eventTitle}</Text>

                {eventDescription && (
                  <Text style={eventDescription_style}>{eventDescription}</Text>
                )}

                <Hr style={eventDivider} />

                {/* Date */}
                <Section style={detailItem}>
                  <Text style={detailIcon}>📅</Text>
                  <Text style={detailLabel}>Date</Text>
                  <Text style={detailValue}>{eventDate}</Text>
                </Section>

                {/* Time */}
                <Section style={detailItem}>
                  <Text style={detailIcon}>⏰</Text>
                  <Text style={detailLabel}>Time</Text>
                  <Text style={detailValue}>{eventTime}</Text>
                </Section>

                {/* Location */}
                <Section style={detailItem}>
                  <Text style={detailIcon}>📍</Text>
                  <Text style={detailLabel}>Location</Text>
                  <Text style={detailValue}>{eventLocation}</Text>
                </Section>
              </Section>
            </Section>

            {/* ============================================
                WHAT TO EXPECT SECTION
                ============================================ */}
            <Section style={expectSection}>
              <Text style={expectHeading}>✨ What to Expect</Text>

              {/* Stacked cards */}
              <Section style={expectCard}>
                <Text style={expectIcon}>🎯</Text>
                <Text style={expectTitle}>Engaging Content</Text>
                <Text style={expectDesc}>
                  Learn from industry experts and gain valuable insights that
                  will elevate your tech journey
                </Text>
              </Section>

              <Section style={expectCard}>
                <Text style={expectIcon}>🤝</Text>
                <Text style={expectTitle}>Networking Opportunities</Text>
                <Text style={expectDesc}>
                  Connect with like-minded tech enthusiasts and build meaningful
                  relationships
                </Text>
              </Section>

              <Section style={expectCard}>
                <Text style={expectIcon}>💡</Text>
                <Text style={expectTitle}>Hands-on Experience</Text>
                <Text style={expectDesc}>
                  Participate in interactive sessions and practical workshops
                  that you can apply immediately
                </Text>
              </Section>

              <Section style={expectCard}>
                <Text style={expectIcon}>🎁</Text>
                <Text style={expectTitle}>Refreshments & Goodies</Text>
                <Text style={expectDesc}>
                  Enjoy refreshments, exclusive resources, and surprise
                  giveaways throughout the event
                </Text>
              </Section>
            </Section>

            {/* ============================================
                PREPARATION TIPS
                ============================================ */}
            <Section style={tipsSection}>
              <Text style={tipsHeading}>📋 Preparation Tips</Text>

              <Text style={tipItem}>
                1️⃣ <strong style={tipStrong}>Arrive 15 minutes early</strong> to
                get settled and network before we start
              </Text>
              <Text style={tipItem}>
                2️⃣ <strong style={tipStrong}>Bring a notebook and pen</strong>{" "}
                for taking notes and jotting down ideas
              </Text>
              <Text style={tipItem}>
                3️⃣ <strong style={tipStrong}>Charge your devices</strong> if
                you&apos;re bringing a laptop or tablet
              </Text>
              <Text style={tipItem}>
                4️⃣ <strong style={tipStrong}>Come with an open mind</strong> and
                be ready to learn, network, and have fun!
              </Text>
            </Section>

            {/* ============================================
                CALL TO ACTION
                ============================================ */}
            <Section style={ctaSection}>
              <Text style={ctaIntro}>🔥 Stay Connected</Text>

              <Button style={ctaButton} href={whatsappChannelLink}>
                Join Our WhatsApp Channel →
              </Button>

              <Text style={ctaSubtext}>
                Get real-time updates and connect with other attendees before
                the event
              </Text>
            </Section>

            {/* ============================================
                FOOTER SECTION
                ============================================ */}
            <Section style={footerSection}>
              <Hr style={footerDivider} />

              <Text style={footerTitle}>Have Questions?</Text>

              <Text style={footerText}>
                We&apos;re here to help! Reach out to us anytime and we&apos;ll
                get back to you as soon as possible.
              </Text>

              <Link href="mailto:cooutechies@gmail.com" style={footerLink}>
                contact@cooutechies.com
              </Link>

              <Text style={socialText}>
                Follow us for updates and announcements
              </Text>

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
   ============================================ */

// ============================================
// LAYOUT STYLES
// ============================================

const main = {
  backgroundColor: "#0a0f1a",
  fontFamily:
    '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: "40px 16px",
  margin: "0",
};

const outerContainer = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "4px",
  borderRadius: "24px",
  background:
    "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(234, 179, 8, 0.2), rgba(34, 197, 94, 0.1))",
};

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

const headerSection = {
  textAlign: "center" as const,
  padding: "48px 40px 32px 40px",
  background:
    "linear-gradient(180deg, rgba(34, 197, 94, 0.08) 0%, transparent 100%)",
};

const logoStyle = {
  display: "block",
  margin: "0 auto 24px auto",
  borderRadius: "16px",
  boxShadow: "0 0 40px rgba(34, 197, 94, 0.3), 0 4px 20px rgba(0, 0, 0, 0.4)",
  border: "2px solid rgba(34, 197, 94, 0.3)",
};

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

const confirmationBadge = {
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

const heroSection = {
  textAlign: "center" as const,
  padding: "0 40px 32px 40px",
};

const mainHeading = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "40px",
  fontWeight: "800",
  color: "#f8fafc",
  margin: "0 0 20px 0",
  lineHeight: "1.2",
  letterSpacing: "-0.5px",
};

const gradientText = {
  background: "linear-gradient(135deg, #22c55e 0%, #84cc16 50%, #eab308 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const heroSubtitle = {
  fontSize: "18px",
  lineHeight: "1.7",
  color: "#e2e8f0",
  margin: "0",
};

// ============================================
// GREETING SECTION STYLES
// ============================================

const greetingSection = {
  padding: "0 40px 32px 40px",
};

const greetingText = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#f8fafc",
  margin: "0 0 24px 0",
};

const nameHighlight = {
  color: "#22c55e",
  fontWeight: "800",
};

const paragraphText = {
  fontSize: "17px",
  lineHeight: "1.8",
  color: "#cbd5e1",
  margin: "0 0 16px 0",
};

const highlightStrong = {
  color: "#22c55e",
  fontWeight: "700",
};

// ============================================
// EVENT DETAILS SECTION STYLES
// ============================================

const eventDetailsSection = {
  padding: "32px 40px",
  backgroundColor: "rgba(34, 197, 94, 0.05)",
};

const eventDetailsHeading = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "22px",
  fontWeight: "800",
  color: "#22c55e",
  margin: "0 0 20px 0",
  letterSpacing: "0.5px",
};

const eventCard = {
  backgroundColor: "rgba(34, 197, 94, 0.08)",
  border: "2px solid rgba(34, 197, 94, 0.2)",
  borderRadius: "16px",
  padding: "32px 28px",
  boxShadow: "0 8px 24px rgba(34, 197, 94, 0.15)",
};

const eventTitle_style = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "24px",
  fontWeight: "800",
  color: "#22c55e",
  margin: "0 0 16px 0",
  lineHeight: "1.3",
  textAlign: "center" as const,
};

const eventDescription_style = {
  fontSize: "17px",
  color: "#e2e8f0",
  margin: "0 0 24px 0",
  lineHeight: "1.7",
  textAlign: "center" as const,
};

const eventDivider = {
  border: "none",
  borderTop: "1px solid rgba(148, 163, 184, 0.2)",
  margin: "24px 0",
};

const detailItem = {
  textAlign: "center" as const,
  marginBottom: "24px",
  padding: "16px",
  backgroundColor: "rgba(15, 23, 42, 0.4)",
  borderRadius: "12px",
};

const detailIcon = {
  fontSize: "32px",
  margin: "0 0 12px 0",
  lineHeight: "1",
};

const detailLabel = {
  fontSize: "14px",
  color: "#94a3b8",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  fontWeight: "600",
  margin: "0 0 8px 0",
};

const detailValue = {
  fontSize: "18px",
  color: "#22c55e",
  fontWeight: "700",
  margin: "0",
  lineHeight: "1.5",
};

// ============================================
// WHAT TO EXPECT SECTION STYLES
// ============================================

const expectSection = {
  padding: "32px 40px",
  backgroundColor: "rgba(234, 179, 8, 0.08)",
  borderTop: "2px solid rgba(234, 179, 8, 0.2)",
  borderBottom: "2px solid rgba(234, 179, 8, 0.2)",
};

const expectHeading = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "24px",
  fontWeight: "800",
  color: "#eab308",
  margin: "0 0 24px 0",
  letterSpacing: "0.5px",
};

const expectCard = {
  backgroundColor: "rgba(234, 179, 8, 0.08)",
  border: "2px solid rgba(234, 179, 8, 0.2)",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center" as const,
  marginBottom: "16px",
};

const expectIcon = {
  fontSize: "32px",
  margin: "0 0 12px 0",
  lineHeight: "1",
};

const expectTitle = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "18px",
  fontWeight: "800",
  color: "#eab308",
  margin: "0 0 10px 0",
  letterSpacing: "0.3px",
};

const expectDesc = {
  fontSize: "16px",
  color: "#cbd5e1",
  margin: "0",
  lineHeight: "1.7",
};

// ============================================
// PREPARATION TIPS SECTION STYLES
// ============================================

const tipsSection = {
  backgroundColor: "rgba(59, 130, 246, 0.08)",
  borderTop: "2px solid rgba(59, 130, 246, 0.2)",
  padding: "32px 40px",
};

const tipsHeading = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "24px",
  fontWeight: "800",
  color: "#3b82f6",
  margin: "0 0 24px 0",
  letterSpacing: "0.5px",
};

const tipItem = {
  fontSize: "17px",
  color: "#e2e8f0",
  margin: "0 0 14px 0",
  lineHeight: "1.8",
};

const tipStrong = {
  color: "#3b82f6",
  fontWeight: "700",
};

// ============================================
// CTA SECTION STYLES
// ============================================

const ctaSection = {
  textAlign: "center" as const,
  padding: "48px 40px",
};

const ctaIntro = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#f8fafc",
  margin: "0 0 24px 0",
  lineHeight: "1.5",
};

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

const ctaSubtext = {
  fontSize: "16px",
  color: "#94a3b8",
  margin: "20px 0 0 0",
  lineHeight: "1.5",
};

// ============================================
// FOOTER SECTION STYLES
// ============================================

const footerSection = {
  padding: "40px 40px 40px 40px",
  textAlign: "center" as const,
};

const footerDivider = {
  border: "none",
  borderTop: "1px solid rgba(148, 163, 184, 0.1)",
  margin: "0 0 28px 0",
};

const footerTitle = {
  fontSize: "20px",
  fontWeight: "700",
  color: "#f8fafc",
  margin: "0 0 12px 0",
};

const footerText = {
  color: "#94a3b8",
  fontSize: "16px",
  margin: "0 0 16px 0",
  lineHeight: "1.6",
};

const footerLink = {
  color: "#22c55e",
  textDecoration: "none",
  fontWeight: "700",
  fontSize: "17px",
};

const socialText = {
  color: "#94a3b8",
  fontSize: "15px",
  margin: "20px 0 0 0",
  lineHeight: "1.5",
};

const copyrightText = {
  color: "#64748b",
  fontSize: "14px",
  margin: "24px 0 0 0",
  lineHeight: "1.5",
};
