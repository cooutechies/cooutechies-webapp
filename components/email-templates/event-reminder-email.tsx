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

interface EventReminderEmailProps {
  recipientName: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  timeFrame: "1-week" | "3-days" | "tomorrow" | "today";
  eventLink: string;
}

/**
 * Event Reminder Email
 * Sent only to registered event attendees
 * Features: Time-aware messaging, personalization, and event details
 */
export default function EventReminderEmail({
  recipientName,
  eventTitle,
  eventDate,
  eventLocation,
  timeFrame,
  eventLink,
}: EventReminderEmailProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  const logoUrl = `${baseUrl}/cooutechies-logo1`;
  const currentYear = new Date().getFullYear();

  const getReminderMessage = () => {
    switch (timeFrame) {
      case "1-week":
        return "🗓️ 1 Week to Go!";
      case "3-days":
        return "⏰ 3 Days to Go!";
      case "tomorrow":
        return "🚀 Tomorrow is the Event!";
      case "today":
        return "🎉 The Event Starts Today!";
      default:
        return "📌 Event Reminder";
    }
  };

  const getReminderSubtext = () => {
    switch (timeFrame) {
      case "1-week":
        return "Mark your calendar! This event is coming up in one week.";
      case "3-days":
        return "It's happening in 3 days! Get ready for an amazing experience.";
      case "tomorrow":
        return "Don't miss it! Join us tomorrow for an incredible event.";
      case "today":
        return "It's happening today! See you soon.";
      default:
        return "This is a reminder about your upcoming event.";
    }
  };

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
        {getReminderMessage()} {eventTitle}
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

            {/* Reminder Badge */}
            <Section style={reminderSection}>
              <Text style={reminderBadge}>{getReminderMessage()}</Text>
              <Text style={reminderSubtext}>{getReminderSubtext()}</Text>
            </Section>

            {/* Greeting */}
            <Section style={greetingSection}>
              <Text style={greetingText}>
                Hey <span style={nameHighlight}>{recipientName}</span>! 👋
              </Text>
            </Section>

            {/* Event Details Card */}
            <Section style={eventCardSection}>
              <Section style={eventCard}>
                <Heading style={eventCardTitle}>{eventTitle}</Heading>

                {/* Date */}
                <Section style={eventDetailRow}>
                  <Text style={eventDetailIcon}>📅</Text>
                  <Section>
                    <Text style={eventDetailLabel}>Date & Time</Text>
                    <Text style={eventDetailValue}>{eventDate}</Text>
                  </Section>
                </Section>

                {/* Location */}
                <Section style={eventDetailRow}>
                  <Text style={eventDetailIcon}>📍</Text>
                  <Section>
                    <Text style={eventDetailLabel}>Location</Text>
                    <Text style={eventDetailValue}>{eventLocation}</Text>
                  </Section>
                </Section>
              </Section>
            </Section>

            {/* CTA Section */}
            <Section style={ctaSection}>
              <Button style={ctaButton} href={eventLink}>
                View Event Details →
              </Button>
              <Text style={ctaSubtext}>
                Click to see full details and connect with other attendees
              </Text>
            </Section>

            {/* Tips Section */}
            <Section style={tipsSection}>
              <Text style={tipsTitle}>Pro Tips:</Text>
              <Text style={tipItem}>✓ Arrive 10-15 minutes early</Text>
              <Text style={tipItem}>✓ Bring a notebook for networking</Text>
              <Text style={tipItem}>
                ✓ Follow us on social media for updates
              </Text>
            </Section>

            {/* Footer */}
            <Section style={footerSection}>
              <Hr style={footerDivider} />
              <Text style={footerText}>Can&apos;t wait to see u there!!.</Text>
              <Link href="mailto:cooutechies@gmail.com" style={footerLink}>
                have questions? contact us
              </Link>
              <Text style={copyrightText}>
                © {currentYear} COOU Techies. Building the Future Techies.
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
  margin: "0 auto",
  padding: "4px",
  borderRadius: "24px",
  background:
    "linear-gradient(135deg, rgba(34, 197, 94, 0.3), rgba(234, 179, 8, 0.2), rgba(34, 197, 94, 0.1))",
};

const container = {
  backgroundColor: "#151c2c",
  borderRadius: "20px",
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

const reminderSection = {
  textAlign: "center" as const,
  padding: "32px 40px 24px 40px",
};

const reminderBadge = {
  fontSize: "40px",
  fontWeight: "800",
  color: "#22c55e",
  margin: "0 0 16px 0",
  lineHeight: "1.2",
};

const reminderSubtext = {
  fontSize: "18px",
  color: "#94a3b8",
  margin: "0",
  lineHeight: "1.6",
};

const greetingSection = {
  padding: "0 40px 24px 40px",
};

const greetingText = {
  fontSize: "24px",
  fontWeight: "700",
  color: "#f8fafc",
  margin: "0",
  lineHeight: "1.4",
};

const nameHighlight = {
  color: "#22c55e",
  fontWeight: "800",
};

const eventCardSection = {
  padding: "0 40px 32px 40px",
};

const eventCard = {
  backgroundColor: "rgba(34, 197, 94, 0.08)",
  border: "2px solid rgba(34, 197, 94, 0.2)",
  borderRadius: "16px",
  padding: "28px 24px",
};

const eventCardTitle = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "32px",
  fontWeight: "800",
  color: "#f8fafc",
  margin: "0 0 24px 0",
  lineHeight: "1.3",
};

const eventDetailRow = {
  marginBottom: "20px",
};

const eventDetailIcon = {
  fontSize: "28px",
  marginRight: "12px",
  marginBottom: "8px",
  display: "inline-block",
};

const eventDetailLabel = {
  fontSize: "14px",
  fontWeight: "600",
  letterSpacing: "1px",
  color: "#94a3b8",
  margin: "0 0 6px 0",
  textTransform: "uppercase" as const,
};

const eventDetailValue = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#22c55e",
  margin: "0",
  lineHeight: "1.5",
};

const ctaSection = {
  textAlign: "center" as const,
  padding: "0 40px 32px 40px",
};

const ctaButton = {
  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
  color: "#ffffff",
  padding: "18px 48px",
  borderRadius: "12px",
  textDecoration: "none",
  fontWeight: "800",
  fontSize: "18px",
  fontFamily: '"Orbitron", "Inter", sans-serif',
  display: "inline-block",
  boxShadow: "0 8px 24px rgba(34, 197, 94, 0.35)",
};

const ctaSubtext = {
  fontSize: "16px",
  color: "#94a3b8",
  margin: "16px 0 0 0",
  lineHeight: "1.5",
};

const tipsSection = {
  backgroundColor: "rgba(234, 179, 8, 0.08)",
  border: "1px solid rgba(234, 179, 8, 0.15)",
  borderRadius: "12px",
  padding: "24px 40px 24px 40px",
  margin: "0 40px 32px 40px",
};

const tipsTitle = {
  fontFamily: '"Orbitron", "Inter", sans-serif',
  fontSize: "18px",
  fontWeight: "800",
  color: "#eab308",
  margin: "0 0 16px 0",
};

const tipItem = {
  fontSize: "16px",
  color: "#e2e8f0",
  margin: "10px 0",
  lineHeight: "1.6",
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
  fontSize: "16px",
  margin: "0 0 12px 0",
  lineHeight: "1.5",
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
  margin: "20px 0 0 0",
  lineHeight: "1.5",
};
