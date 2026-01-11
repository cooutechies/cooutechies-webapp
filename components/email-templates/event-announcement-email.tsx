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
            {/* Header */}
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

            {/* Hero - Event Image */}
            {eventImage && (
              <Section style={heroImageSection}>
                <Img
                  src={eventImage}
                  alt={eventTitle}
                  width="600"
                  height="300"
                  style={heroImage}
                />
              </Section>
            )}

            {/* Event Title Section */}
            <Section style={eventTitleSection}>
              <Text style={announcementBadge}>📢 EVENT ANNOUNCEMENT</Text>
              <Heading style={eventTitle as any}>{eventTitle}</Heading>
              <Text style={eventDescriptionText}>{eventDescription}</Text>
            </Section>

            {/* Event Details */}
            <Section style={detailsSection}>
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

            {/* CTA Section */}
            <Section style={ctaSection}>
              <Button style={ctaButton} href={registrationLink}>
                Register Now →
              </Button>
              <Text style={ctaSubtext}>
                Secure your spot for this exclusive event
              </Text>
            </Section>

            {/* Footer */}
            <Section style={footerSection}>
              <Hr style={footerDivider} />
              <Text style={footerText}>Questions? Reach out to us anytime</Text>
              <Link href="mailto:cooutechies@gmail.com" style={footerLink}>
                cooutechies@gmail.com
              </Link>
              <Text style={copyrightText}>
                © {currentYear} COOU Techies. Empowering the tech community.
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

const heroImageSection = {
  padding: "0",
  overflow: "hidden",
};

const heroImage = {
  width: "100%",
  height: "auto",
  display: "block",
};

const eventTitleSection = {
  textAlign: "center" as const,
  padding: "40px 40px 24px 40px",
};

const announcementBadge = {
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

const eventTitle = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "36px",
  fontWeight: "800",
  color: "#f8fafc",
  margin: "0 0 16px 0",
  lineHeight: "1.2",
};

const eventDescriptionText = {
  fontSize: "17px",
  lineHeight: "1.8",
  color: "#e2e8f0",
  margin: "0",
};

const detailsSection = {
  padding: "32px 40px",
  display: "grid" as const,
  gap: "16px",
};

const detailCard = {
  backgroundColor: "rgba(34, 197, 94, 0.08)",
  border: "1px solid rgba(34, 197, 94, 0.2)",
  borderRadius: "12px",
  padding: "20px",
  textAlign: "center" as const,
};

const detailIcon = {
  fontSize: "24px",
  margin: "0 0 12px 0",
  lineHeight: "1",
};

const detailLabel = {
  fontSize: "13px",
  fontWeight: "600",
  letterSpacing: "1px",
  color: "#94a3b8",
  margin: "0 0 8px 0",
  textTransform: "uppercase" as const,
};

const detailValue = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#22c55e",
  margin: "0",
};

const ctaSection = {
  textAlign: "center" as const,
  padding: "0 40px 48px 40px",
};

const ctaButton = {
  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  color: "#ffffff",
  padding: "18px 48px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "800",
  fontSize: "16px",
  fontFamily: '"Orbitron", "Inter", sans-serif',
  display: "inline-block",
  boxShadow: "0 8px 24px rgba(34, 197, 94, 0.35)",
};

const ctaSubtext = {
  fontSize: "14px",
  color: "#94a3b8",
  margin: "16px 0 0 0",
};

const footerSection = {
  padding: "32px 40px 40px 40px",
  textAlign: "center" as const,
};

const footerDivider = {
  border: "none",
  borderTop: "1px solid rgba(148, 163, 184, 0.1)",
  margin: "0 0 24px 0",
};

const footerText = {
  color: "#94a3b8",
  fontSize: "14px",
  margin: "0 0 12px 0",
};

const footerLink = {
  color: "#22c55e",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "14px",
};

const copyrightText = {
  color: "#64748b",
  fontSize: "12px",
  margin: "20px 0 0 0",
};
