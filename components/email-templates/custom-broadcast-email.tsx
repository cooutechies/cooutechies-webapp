import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Section,
  Text,
  Hr,
  Font,
} from "@react-email/components";
import * as React from "react";

interface CustomBroadcastEmailProps {
  subject?: string;
  htmlContent?: string;
}

export default function CustomBroadcastEmail({
  subject = "COOU Techies Newsletter",
  htmlContent = "<p>Your email content will appear here...</p>",
}: CustomBroadcastEmailProps) {
  const currentYear = new Date().getFullYear();

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  const logoUrl = `${baseUrl}/email-logo.png`;

  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Orbitron"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800&display=swap",
            format: "woff2",
          }}
          fontWeight={700}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Arial"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
            format: "woff2",
          }}
          fontWeight={500}
          fontStyle="normal"
        />

        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Typography enhancements */
              p {
                font-size: 20px !important;
                line-height: 1.8 !important;
                color: #e2e8f0 !important;
                margin-bottom: 20px !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
              }
              
              h1 {
                font-family: 'Orbitron', Arial, sans-serif !important;
                font-size: 48px !important;
                font-weight: 800 !important;
                line-height: 1.2 !important;
                color: #f8fafc !important;
                margin-bottom: 20px !important;
                letter-spacing: -0.02em !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
              }
              
              h2 {
                font-family: 'Orbitron', Arial, sans-serif !important;
                font-size: 36px !important;
                font-weight: 700 !important;
                line-height: 1.3 !important;
                color: #f8fafc !important;
                margin-bottom: 16px !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
              }
              
              h3 {
                font-family: 'Orbitron', Arial, sans-serif !important;
                font-size: 28px !important;
                font-weight: 600 !important;
                line-height: 1.4 !important;
                color: #f8fafc !important;
                margin-bottom: 12px !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
              }
              
              /* Links (both regular links and button-styled links) */
              a {
                color: #22c55e !important;
                text-decoration: underline !important;
                text-underline-offset: 3px !important;
                font-weight: 500 !important;
                word-break: break-word !important;
              }
              
              /* Button-styled links (inline styles override these) */
              p[style*="text-align: center"] a[style*="display: inline-block"] {
                text-decoration: none !important;
              }
              
              /* Image constraints with alignment support */
              .content-section img {
                max-width: 400px !important;
                max-height: 300px !important;
                width: auto !important;
                height: auto !important;
                border-radius: 14px !important;
                border: 0 !important;
                display: inline-block !important;
              }
              
              /* Image alignment preservation */
              p[style*="text-align: left"] img,
              p[style*="text-align:left"] img {
                display: inline-block !important;
              }
              
              p[style*="text-align: center"] img,
              p[style*="text-align:center"] img {
                display: inline-block !important;
              }
              
              p[style*="text-align: right"] img,
              p[style*="text-align:right"] img {
                display: inline-block !important;
              }
              
              /* Lists */
              li {
                font-size: 20px !important;
                line-height: 1.7 !important;
                margin-bottom: 12px !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
              }
              
              /* Blockquotes */
              blockquote {
                border-left: 4px solid rgba(34, 197, 94, 0.6) !important;
                padding: 16px 20px !important;
                margin: 20px 0 !important;
                background: rgba(34, 197, 94, 0.05) !important;
                border-radius: 0 12px 12px 0 !important;
                font-style: italic !important;
                color: #94a3b8 !important;
                word-wrap: break-word !important;
                overflow-wrap: break-word !important;
              }
              
              /* Horizontal rules */
              hr {
                border: none !important;
                border-top: 1px solid rgba(148, 163, 184, 0.15) !important;
                margin: 28px 0 !important;
              }
              
              /* Responsive mobile adjustments */
              @media only screen and (max-width: 600px) {
                .email-container {
                  padding: 24px 20px !important;
                }
                
                h1 {
                  font-size: 36px !important;
                }
                
                h2 {
                  font-size: 28px !important;
                }
                
                h3 {
                  font-size: 24px !important;
                }
                
                p, li {
                  font-size: 18px !important;
                }
                
                .content-section img {
                  max-width: 100% !important;
                }
              }
            `,
          }}
        />
      </Head>

      <Body style={main}>
        <Container style={outerContainer}>
          <Container style={container} className="email-container">
            <Section style={logoSection}>
              <Img
                src={logoUrl}
                alt="COOU Techies Logo"
                width={160}
                style={logo}
              />
            </Section>

            <Section style={contentSection} className="content-section">
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </Section>

            {htmlContent &&
              htmlContent !==
                "<p>Your email content will appear here...</p>" && (
                <Section style={footerSection}>
                  <Hr style={footerDivider} />
                  <Text style={footerText}>
                    Questions? Reach out to us anytime
                  </Text>
                  <Link href="mailto:cooutechies@gmail.com" style={footerLink}>
                    cooutechies@gmail.com
                  </Link>
                  <Text style={copyrightText}>
                    © {currentYear} COOU Techies. Building the Future Techies.
                  </Text>
                </Section>
              )}
          </Container>
        </Container>
      </Body>
    </Html>
  );
}

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
  padding: "40px",
  overflow: "hidden",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "36px",
  paddingBottom: "28px",
  borderBottom: "1px solid rgba(34, 197, 94, 0.15)",
};

const logo = {
  margin: "0 auto",
  display: "block",
};

const contentSection = {
  padding: "0",
  color: "#e2e8f0",
  fontSize: "20px",
  lineHeight: "1.8",
  fontWeight: "500",
};

const footerSection = {
  padding: "32px 0 0 0",
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
  fontWeight: "500",
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
  fontWeight: "400",
};
