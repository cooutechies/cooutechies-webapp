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
import { CSSProperties } from "react";

interface EventAnnouncementEmailProps {
  eventTitle: string;
  eventDescription: string;
  eventDate: string;
  eventLocation: string;
  eventImage?: string;
  registrationLink: string;
}

/**
 * Event Announcement Email
 * Sent to all community members to announce upcoming events
 * Features: Event details, location, date, and registration CTA
 */
export default function EventAnnouncementEmail({
  eventTitle,
  eventDescription,
  eventDate,
  eventLocation,
  eventImage,
  registrationLink,
}: EventAnnouncementEmailProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const logoUrl = `${baseUrl}/cooutechies-logo1`;
  const currentYear = new Date().getFullYear();

  return (
    <Html>
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

      <Preview>
        🎉 New Event: {eventTitle} - Join us on {eventDate}
      </Preview>

      <Body style={main}>
        <Container style={outerContainer}>
          <Container style={container}>
            {/* Header with Square Logo */}
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

            {/* Announcement Badge */}
            <Section style={badgeSection}>
              <Text style={announcementBadge}>📢 NEW EVENT ANNOUNCEMENT</Text>
            </Section>

            {/* Hero - Event Image */}
            {eventImage && (
              <Section style={heroImageSection}>
                <Img
                  src={eventImage}
                  alt={eventTitle}
                  width="560"
                  style={heroImage}
                />
              </Section>
            )}

            {/* Event Title Section */}
            <Section style={eventTitleSection}>
              <Heading style={eventTitle as CSSProperties}>
                {eventTitle}
              </Heading>
              <Text style={eventDescriptionText}>{eventDescription}</Text>
            </Section>

            {/* Introduction Text */}
            <Section style={introSection}>
              <Text style={introText}>
                🎉 We&apos;re excited to invite you to an incredible event that
                brings together passionate tech enthusiasts, innovators, and
                learners from across our community!
              </Text>
              <Text style={introText}>
                This is your opportunity to expand your knowledge, network with
                like-minded individuals, and be part of something amazing.
                Whether you&apos;re a beginner or an experienced professional,
                this event has something valuable for everyone.
              </Text>
            </Section>

            {/* Event Details */}
            <Section style={detailsSection}>
              <Text style={detailsHeader}>📋 Event Details</Text>

              {/* Date */}
              <Section style={detailCard}>
                <Text style={detailIcon}>📅</Text>
                <Text style={detailLabel}>Date & Time</Text>
                <Text style={detailValue}>{eventDate}</Text>
              </Section>

              {/* Location */}
              <Section style={detailCard}>
                <Text style={detailIcon}>📍</Text>
                <Text style={detailLabel}>Location</Text>
                <Text style={detailValue}>{eventLocation}</Text>
              </Section>
            </Section>

            {/* Why Attend Section */}
            <Section style={whyAttendSection}>
              <Text style={whyAttendTitle}>✨ Why You Should Attend</Text>
              <Section style={benefitsList}>
                <Text style={benefitItem}>
                  🎯 <strong>Learn</strong> from industry experts and
                  experienced speakers
                </Text>
                <Text style={benefitItem}>
                  🤝 <strong>Network</strong> with fellow tech enthusiasts and
                  professionals
                </Text>
                <Text style={benefitItem}>
                  💡 <strong>Gain</strong> practical skills and actionable
                  insights
                </Text>
                <Text style={benefitItem}>
                  🚀 <strong>Grow</strong> your career and expand your horizons
                </Text>
                <Text style={benefitItem}>
                  🎁 <strong>Enjoy</strong> refreshments, giveaways, and
                  surprises
                </Text>
              </Section>
            </Section>

            {/* CTA Section */}
            <Section style={ctaSection}>
              <Text style={ctaPreText}>
                🔥 Spaces are limited! Don&apos;t miss out on this amazing
                opportunity.
              </Text>
              <Button style={ctaButton} href={registrationLink}>
                Register Now - It&apos;s Free! →
              </Button>
              <Text style={ctaSubtext}>
                Secure your spot today and join our growing tech community
              </Text>
            </Section>

            {/* Important Info */}
            <Section style={importantSection}>
              <Text style={importantTitle}>📌 Important Information</Text>
              <Text style={importantText}>
                • Please arrive 15 minutes early so u don&apos;t miss out
              </Text>

              <Text style={importantText}>
                • Feel free to bring friends who share your passion for tech
              </Text>
              <Text style={importantText}>
                • Follow us on social media for real-time updates
              </Text>
            </Section>

            {/* Footer */}
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
   STYLES
   ============================================ */

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

const badgeSection = {
  textAlign: "center" as const,
  padding: "0 40px 24px 40px",
};

const announcementBadge = {
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

const heroImageSection = {
  padding: "0 20px 24px 20px",
  textAlign: "center" as const,
};

const heroImage = {
  width: "100%",
  height: "auto",
  display: "block",
  borderRadius: "16px",
  border: "2px solid rgba(34, 197, 94, 0.2)",
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
};

const eventTitleSection = {
  textAlign: "center" as const,
  padding: "0 40px 32px 40px",
};

const eventTitle = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "40px",
  fontWeight: "800",
  color: "#f8fafc",
  margin: "0 0 20px 0",
  lineHeight: "1.2",
};

const eventDescriptionText = {
  fontSize: "18px",
  lineHeight: "1.7",
  color: "#e2e8f0",
  margin: "0",
};

const introSection = {
  padding: "0 40px 32px 40px",
};

const introText = {
  fontSize: "17px",
  lineHeight: "1.8",
  color: "#cbd5e1",
  margin: "0 0 16px 0",
};

const detailsSection = {
  padding: "32px 40px",
  backgroundColor: "rgba(34, 197, 94, 0.05)",
};

const detailsHeader = {
  fontSize: "22px",
  fontWeight: "800",
  color: "#22c55e",
  margin: "0 0 20px 0",
  fontFamily: '"Orbitron", "Inter", sans-serif',
};

const detailCard = {
  backgroundColor: "rgba(34, 197, 94, 0.08)",
  border: "2px solid rgba(34, 197, 94, 0.2)",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center" as const,
  marginBottom: "16px",
};

const detailIcon = {
  fontSize: "32px",
  margin: "0 0 12px 0",
  lineHeight: "1",
};

const detailLabel = {
  fontSize: "14px",
  fontWeight: "600",
  letterSpacing: "1px",
  color: "#94a3b8",
  margin: "0 0 8px 0",
  textTransform: "uppercase" as const,
};

const detailValue = {
  fontSize: "18px",
  fontWeight: "700",
  color: "#22c55e",
  margin: "0",
  lineHeight: "1.5",
};

const whyAttendSection = {
  padding: "32px 40px",
  backgroundColor: "rgba(234, 179, 8, 0.08)",
  borderTop: "2px solid rgba(234, 179, 8, 0.2)",
  borderBottom: "2px solid rgba(234, 179, 8, 0.2)",
};

const whyAttendTitle = {
  fontSize: "24px",
  fontWeight: "800",
  color: "#eab308",
  margin: "0 0 24px 0",
  fontFamily: '"Orbitron", "Inter", sans-serif',
};

const benefitsList = {
  margin: "0",
};

const benefitItem = {
  fontSize: "17px",
  lineHeight: "1.8",
  color: "#e2e8f0",
  margin: "0 0 14px 0",
};

const ctaSection = {
  textAlign: "center" as const,
  padding: "48px 40px",
};

const ctaPreText = {
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
};

const ctaSubtext = {
  fontSize: "16px",
  color: "#94a3b8",
  margin: "20px 0 0 0",
  lineHeight: "1.5",
};

const importantSection = {
  padding: "32px 40px",
  backgroundColor: "rgba(59, 130, 246, 0.08)",
  borderTop: "2px solid rgba(59, 130, 246, 0.2)",
};

const importantTitle = {
  fontSize: "20px",
  fontWeight: "800",
  color: "#3b82f6",
  margin: "0 0 16px 0",
  fontFamily: '"Orbitron", "Inter", sans-serif',
};

const importantText = {
  fontSize: "16px",
  lineHeight: "1.8",
  color: "#cbd5e1",
  margin: "0 0 10px 0",
};

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
