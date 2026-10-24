import * as React from "react";
import { Hr, Link, Section, Text } from "@react-email/components";
import {
  footerSection,
  footerDivider,
  footerTitle,
  footerText,
  footerLink,
  socialText,
  copyrightText,
} from "../styles/emailTheme";

interface EmailFooterProps {
  contactEmail?: string;
}

export function EmailFooter({
  contactEmail = "contact@cooutechies.com",
}: EmailFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Section style={footerSection}>
      <Hr style={footerDivider} />
      <Text style={footerTitle}>Have Questions?</Text>
      <Text style={footerText}>
        We&apos;re here to help! Reach out to us anytime and we&apos;ll get back
        to you as soon as possible.
      </Text>
      <Link href={`mailto:${contactEmail}`} style={footerLink}>
        {contactEmail}
      </Link>
      <Text style={socialText}>Follow us for updates and announcements</Text>
      <Text style={copyrightText}>
        © {currentYear} COOU Techies. Building the Future Techies
      </Text>
    </Section>
  );
}
