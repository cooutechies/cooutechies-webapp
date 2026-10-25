import * as React from "react";
import { Img, Link, Section, Text } from "@react-email/components";
import type { CSSProperties } from "react";
import {
  footerSection,
  copyrightText,
  emailColors,
} from "../styles/emailTheme";

const followUsLabel: CSSProperties = {
  fontSize: "12px",
  fontWeight: "700",
  color: emailColors.textMuted,
  letterSpacing: "0.8px",
  textTransform: "uppercase",
  margin: "0 0 14px 0",
};

const socialRow: CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
};

const socialLinkStyle: CSSProperties = {
  display: "inline-block",
  margin: "0 8px",
  textDecoration: "none",
  verticalAlign: "middle",
};

const socialIconStyle: CSSProperties = {
  display: "block",
  width: "36px",
  height: "36px",
  borderRadius: "8px",
};

interface EmailFooterProps {
  contactEmail?: string;
}

export function EmailFooter({
  contactEmail = "contact@cooutechies.com",
}: EmailFooterProps) {
  const currentYear = new Date().getFullYear();
  const twitterUrl =
    process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/cooutechies";
  const linkedinUrl =
    process.env.NEXT_PUBLIC_LINKEDIN_URL ||
    "https://linkedin.com/company/cooutechies";

  return (
    <Section style={footerSection}>
      {/* Social Follow Links */}
      <Text style={followUsLabel}>Follow us on</Text>
      <Section style={socialRow}>
        <Link
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={socialLinkStyle}
        >
          <Img
            src="https://img.icons8.com/color/96/twitterx--v1.png"
            alt="X (Twitter)"
            width="36"
            height="36"
            style={socialIconStyle}
          />
        </Link>
        <Link
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={socialLinkStyle}
        >
          <Img
            src="https://img.icons8.com/color/96/linkedin.png"
            alt="LinkedIn"
            width="36"
            height="36"
            style={socialIconStyle}
          />
        </Link>
      </Section>

      {/* Compliance & Copyright */}
      <Text style={copyrightText}>
        You received this email because you are a registered member of COOU Techies.
      </Text>
      <Text style={copyrightText}>
        © {currentYear} COOU Techies. All rights reserved.
      </Text>
    </Section>
  );
}
