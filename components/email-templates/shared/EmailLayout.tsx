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
  emailContainer,
  headerSection,
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
  // Official high-res white brand logo on dark canvas
  const logoUrl = `${baseUrl}/cooutechies-logo2.png`;

  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>{`
          img {
            max-width: 100% !important;
            height: auto !important;
          }
          body {
            -webkit-text-size-adjust: 100% !important;
          }
        `}</style>
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={mainLayout}>
        <Container style={emailContainer}>
          {/* Brand Logo Header - Bold, natural 1.95:1 aspect ratio */}
          <Section style={headerSection}>
            <Img
              src={logoUrl}
              alt="COOU Techies"
              width="160"
              height="82"
              style={{
                display: "block",
                margin: "0 auto",
                width: "160px",
                height: "auto",
                maxWidth: "100%",
              }}
            />
          </Section>

          {/* Main Email Content */}
          {children}

          {/* Common Footer */}
          {showFooter && <EmailFooter />}
        </Container>
      </Body>
    </Html>
  );
}
