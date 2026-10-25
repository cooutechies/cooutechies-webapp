import * as React from "react";
import { Heading, Section } from "@react-email/components";
import { EmailLayout } from "./shared/EmailLayout";
import { mainHeading } from "./styles/emailTheme";

interface CustomBroadcastEmailProps {
  subject?: string;
  htmlContent?: string;
}

function normalizeBroadcastHtml(html: string): string {
  if (!html) return "";

  let processed = html;

  // 1. Constrain images so large flyers never blow out the mobile viewport and shrink text
  processed = processed.replace(/<img([^>]*?)>/gi, (_match, attrs) => {
    const clean = attrs
      .replace(/style=["'][^"']*["']/gi, "")
      .replace(/width=["'][^"']*["']/gi, "")
      .replace(/height=["'][^"']*["']/gi, "")
      .replace(/\/$/, "")
      .trim();

    return `<img ${clean} style="max-width: 100% !important; max-height: 460px !important; width: auto !important; height: auto !important; display: block; margin: 20px auto; border-radius: 14px; border: 0;" />`;
  });

  // 2. Ensure paragraphs have legible, prominent font size (17px) and clean line-height
  processed = processed.replace(/<p([^>]*?)>/gi, (_match, attrs) => {
    if (/style=["'][^"']*["']/i.test(attrs)) {
      return `<p${attrs.replace(
        /style=["']([^"']*)["']/i,
        'style="font-size: 17px !important; line-height: 1.75 !important; color: #cbd5e1; margin: 18px 0; $1"'
      )}>`;
    }
    return `<p${attrs} style="font-size: 17px !important; line-height: 1.75 !important; color: #cbd5e1; margin: 18px 0;">`;
  });

  return processed;
}

export default function CustomBroadcastEmail({
  subject = "COOU Techies Community Broadcast",
  htmlContent = "<p>Your email content will appear here...</p>",
}: CustomBroadcastEmailProps) {
  const processedContent = normalizeBroadcastHtml(htmlContent);

  return (
    <EmailLayout previewText={subject}>
      {subject && <Heading style={mainHeading}>{subject}</Heading>}

      <Section
        style={{
          color: "#cbd5e1",
          fontSize: "17px",
          lineHeight: "1.75",
        }}
      >
        <div
          style={{
            fontSize: "17px",
            lineHeight: "1.75",
            color: "#cbd5e1",
          }}
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </Section>
    </EmailLayout>
  );
}
