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
                width="600"
                height="200"
                style={{ ...logoStyle, margin: "0 auto 24px auto" }}
              />
              <Section style={gradientLine} />
            </Section>

            {/* ============================================
                HERO SECTION
                ============================================ */}
            <Section style={heroSection}>
              <Text style={welcomeBadge}>✅ REGISTRATION CONFIRMED</Text>

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
                We&apos;re excited to confirm your registration for{" "}
                <strong style={highlightStrong}>{eventTitle}</strong>! This is
                going to be an incredible experience, and we can&apos;t wait to
                see you there.
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

                {/* Event Info Grid */}
                <Row style={eventInfoRow}>
                  <Column style={eventInfoColumn}>
                    <Text style={eventInfoIcon}>📅</Text>
                    <Text style={eventInfoLabel}>Date</Text>
                    <Text style={eventInfoValue}>{eventDate}</Text>
                  </Column>

                  <Column style={eventInfoColumn}>
                    <Text style={eventInfoIcon}>⏰</Text>
                    <Text style={eventInfoLabel}>Time</Text>
                    <Text style={eventInfoValue}>{eventTime}</Text>
                  </Column>
                </Row>

                <Section style={locationSection}>
                  <Text style={eventInfoIcon}>📍</Text>
                  <Text style={eventInfoLabel}>Location</Text>
                  <Text style={locationValue}>{eventLocation}</Text>
                </Section>
              </Section>
            </Section>

            {/* ============================================
                WHAT TO EXPECT SECTION
                ============================================ */}
            <Section style={expectSection}>
              <Text style={expectHeading}>What to Expect</Text>

              <Row style={expectRow}>
                <Column style={expectColumn}>
                  <Section style={expectCard}>
                    <Text style={expectIcon}>🎯</Text>
                    <Text style={expectTitle}>Engaging Content</Text>
                    <Text style={expectDesc}>
                      Learn from industry experts and gain valuable insights
                    </Text>
                  </Section>
                </Column>

                <Column style={expectColumn}>
                  <Section style={expectCard}>
                    <Text style={expectIcon}>🤝</Text>
                    <Text style={expectTitle}>Networking</Text>
                    <Text style={expectDesc}>
                      Connect with like-minded tech enthusiasts
                    </Text>
                  </Section>
                </Column>
              </Row>

              <Row style={expectRow}>
                <Column style={expectColumn}>
                  <Section style={expectCard}>
                    <Text style={expectIcon}>💡</Text>
                    <Text style={expectTitle}>Hands-on</Text>
                    <Text style={expectDesc}>
                      Interactive sessions and practical workshops
                    </Text>
                  </Section>
                </Column>

                <Column style={expectColumn}>
                  <Section style={expectCard}>
                    <Text style={expectIcon}>🎁</Text>
                    <Text style={expectTitle}>Refreshments</Text>
                    <Text style={expectDesc}>
                      Exclusive resources and Refreshments
                    </Text>
                  </Section>
                </Column>
              </Row>
            </Section>

            {/* ============================================
                PREPARATION TIPS
                ============================================ */}
            <Section style={tipsSection}>
              <Text style={tipsHeading}>📝 Quick Tips for the Event</Text>

              <Section style={tipsList}>
                <Text style={tipItem}>
                  ✓ Arrive 15 minutes early to get settled
                </Text>
                <Text style={tipItem}>
                  ✓ Bring a notebook and pen for taking notes
                </Text>
                <Text style={tipItem}>
                  ✓ Charge your devices if you&apos;re bringing them
                </Text>
                <Text style={tipItem}>
                  ✓ Come ready to learn, network, and have fun!
                </Text>
              </Section>
            </Section>

            {/* ============================================
                CALL TO ACTION
                ============================================ */}
            <Section style={ctaSection}>
              <Text style={ctaIntro}>Stay Connected</Text>

              <Button style={ctaButton} href={whatsappChannelLink}>
                Join Our WhatsApp Channel →
              </Button>

              <Text style={ctaSubtext}>
                Get real-time updates and connect with other attendees
              </Text>
            </Section>

            {/* ============================================
                FOOTER SECTION
                ============================================ */}
            <Section style={footerSection}>
              <Hr style={footerDivider} />

              <Text style={footerText}>
                Questions about the event? We&apos;re here to help!
              </Text>

              <Link href="mailto:cooutechies@gmail.com" style={footerLink}>
                cooutechies@gmail.com
              </Link>

              <Text style={copyrightText}>
                © {currentYear} COOU Techies. Building the future, together.
              </Text>

              <Text style={universityText}>
                Chukwuemeka Odumegwu Ojukwu University
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
  width: "100%",
};

const container = {
  backgroundColor: "#151c2c",
  borderRadius: "20px",
  padding: "0",
  margin: "0",
  overflow: "hidden",
  boxShadow:
    "0 25px 50px -12px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
  width: "100%",
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
  borderRadius: "16px",
  boxShadow: "0 0 40px rgba(34, 197, 94, 0.3), 0 4px 20px rgba(0, 0, 0, 0.4)",
  border: "2px solid rgba(34, 197, 94, 0.3)",
  display: "block",
  margin: "0 auto 24px auto",
  width: "100%",
  maxWidth: "600px",
  height: "auto",
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
// HERO SECTION STYLES
// ============================================

const heroSection = {
  textAlign: "center" as const,
  padding: "24px 40px 40px 40px",
};

const welcomeBadge = {
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "700",
  letterSpacing: "2px",
  color: "#22c55e",
  backgroundColor: "rgba(34, 197, 94, 0.15)",
  padding: "10px 24px",
  borderRadius: "100px",
  border: "1px solid rgba(34, 197, 94, 0.25)",
  margin: "0 0 24px 0",
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
  fontWeight: "500",
  color: "#94a3b8",
  margin: "0",
  lineHeight: "1.6",
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
  color: "#e2e8f0",
  margin: "0 0 20px 0",
  fontWeight: "400",
};

const highlightStrong = {
  color: "#22c55e",
  fontWeight: "700",
};

// ============================================
// EVENT DETAILS SECTION STYLES
// ============================================

const eventDetailsSection = {
  padding: "0 40px 40px 40px",
};

const eventDetailsHeading = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "18px",
  fontWeight: "700",
  color: "#f8fafc",
  margin: "0 0 24px 0",
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
};

const eventDescription_style = {
  fontSize: "16px",
  color: "#cbd5e1",
  margin: "0 0 24px 0",
  lineHeight: "1.6",
};

const eventDivider = {
  border: "none",
  borderTop: "1px solid rgba(148, 163, 184, 0.2)",
  margin: "24px 0",
};

const eventInfoRow = {
  marginBottom: "16px",
};

const eventInfoColumn = {
  width: "50%",
  textAlign: "center" as const,
  padding: "0 8px",
};

const eventInfoIcon = {
  fontSize: "24px",
  margin: "0 0 8px 0",
  lineHeight: "1",
};

const eventInfoLabel = {
  fontSize: "12px",
  color: "#94a3b8",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  fontWeight: "600",
  margin: "0 0 6px 0",
};

const eventInfoValue = {
  fontSize: "16px",
  color: "#f8fafc",
  fontWeight: "700",
  margin: "0",
};

const locationSection = {
  textAlign: "center" as const,
  marginTop: "24px",
  padding: "20px",
  backgroundColor: "rgba(15, 23, 42, 0.5)",
  borderRadius: "12px",
};

const locationValue = {
  fontSize: "16px",
  color: "#f8fafc",
  fontWeight: "700",
  margin: "0",
  lineHeight: "1.5",
};

// ============================================
// WHAT TO EXPECT SECTION STYLES
// ============================================

const expectSection = {
  padding: "0 32px 40px 32px",
};

const expectHeading = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "20px",
  fontWeight: "700",
  color: "#f8fafc",
  textAlign: "center" as const,
  margin: "0 0 28px 0",
  letterSpacing: "0.5px",
};

const expectRow = {
  marginBottom: "12px",
};

const expectColumn = {
  width: "50%",
  verticalAlign: "top",
  padding: "0 8px",
};

const expectCard = {
  backgroundColor: "rgba(34, 197, 94, 0.06)",
  border: "1px solid rgba(34, 197, 94, 0.15)",
  borderRadius: "14px",
  padding: "20px 14px",
  textAlign: "center" as const,
};

const expectIcon = {
  fontSize: "28px",
  margin: "0 0 10px 0",
  lineHeight: "1",
};

const expectTitle = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "15px",
  fontWeight: "700",
  color: "#22c55e",
  margin: "0 0 8px 0",
  letterSpacing: "0.3px",
};

const expectDesc = {
  fontSize: "13px",
  color: "#cbd5e1",
  margin: "0",
  lineHeight: "1.5",
  fontWeight: "400",
};

// ============================================
// PREPARATION TIPS SECTION STYLES
// ============================================

const tipsSection = {
  backgroundColor: "rgba(15, 23, 42, 0.6)",
  borderTop: "1px solid rgba(34, 197, 94, 0.1)",
  borderBottom: "1px solid rgba(34, 197, 94, 0.1)",
  padding: "32px 40px",
};

const tipsHeading = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "18px",
  fontWeight: "700",
  color: "#f8fafc",
  margin: "0 0 20px 0",
  letterSpacing: "0.5px",
};

const tipsList = {
  margin: "0",
};

const tipItem = {
  fontSize: "15px",
  color: "#e2e8f0",
  margin: "0 0 12px 0",
  lineHeight: "1.6",
  fontWeight: "500",
};

// ============================================
// CTA SECTION STYLES
// ============================================

const ctaSection = {
  textAlign: "center" as const,
  padding: "40px 40px 48px 40px",
};

const ctaIntro = {
  fontSize: "22px",
  fontWeight: "700",
  color: "#f8fafc",
  margin: "0 0 28px 0",
};

const ctaButton = {
  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  color: "#ffffff",
  padding: "20px 52px",
  borderRadius: "14px",
  textDecoration: "none",
  fontWeight: "800",
  fontSize: "18px",
  fontFamily: '"Orbitron", "Inter", sans-serif',
  display: "inline-block",
  boxShadow: "0 8px 24px rgba(34, 197, 94, 0.35), 0 4px 8px rgba(0, 0, 0, 0.3)",
  border: "none",
  letterSpacing: "0.5px",
};

const ctaSubtext = {
  fontSize: "15px",
  fontWeight: "500",
  color: "#94a3b8",
  margin: "20px 0 0 0",
};

// ============================================
// FOOTER SECTION STYLES
// ============================================

const footerSection = {
  padding: "32px 40px 40px 40px",
  textAlign: "center" as const,
};

const footerDivider = {
  border: "none",
  borderTop: "1px solid rgba(148, 163, 184, 0.1)",
  margin: "0 0 32px 0",
};

const footerText = {
  color: "#94a3b8",
  fontSize: "16px",
  fontWeight: "500",
  margin: "0 0 12px 0",
};

const footerLink = {
  color: "#22c55e",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "16px",
};

const copyrightText = {
  color: "#64748b",
  fontSize: "14px",
  fontWeight: "500",
  margin: "24px 0 8px 0",
};

const universityText = {
  color: "#64748b",
  fontSize: "13px",
  fontWeight: "500",
  margin: "0",
  fontStyle: "italic" as const,
};
