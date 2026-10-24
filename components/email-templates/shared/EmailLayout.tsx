import * as React from "react";
import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
} from "@react-email/components";
import {
  mainLayout,
  outerContainer,
  innerContainer,
  headerSection,
  headerLogo,
  gradientLine,
} from "../styles/emailTheme";
import { EmailFooter } from "./EmailFooter";

interface EmailLayoutProps {
  previewText: string;
  children: React.ReactNode;
  showFooter?: boolean;
}

export function EmailLayout({
  previewText,
  children,
  showFooter = true,
}: EmailLayoutProps) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://cooutechies.com";
  const logoUrl = `${baseUrl}/email-logo.png`;

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

      <Preview>{previewText}</Preview>

      <Body style={mainLayout}>
        <Container style={outerContainer}>
          <Container style={innerContainer}>
            {/* Header with Logo */}
            <Section style={headerSection}>
              <Img
                src={logoUrl}
                alt="COOU Techies"
                width="150"
                height="150"
                style={headerLogo}
              />
              <Section style={gradientLine} />
            </Section>

            {/* Main Email Content */}
            {children}

            {/* Common Footer */}
            {showFooter && <EmailFooter />}
          </Container>
        </Container>
      </Body>
    </Html>
  );
}
