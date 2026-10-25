/**
 * lib/email/sesDispatcher.ts
 *
 * Low-level Amazon SES dispatch helper for COOU Techies.
 * Handles SESClient lifecycle, React Email rendering, BCC batching,
 * rate-limit delay spacing, and local development fallback.
 */

import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { render } from "@react-email/render";
import React from "react";

const region = process.env.AWS_REGION || "us-east-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
export const FROM_EMAIL =
  process.env.AWS_SES_FROM_EMAIL || "COOU Techies <team@cooutechies.org>";

export const sesClient =
  accessKeyId && secretAccessKey
    ? new SESClient({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      })
    : null;

export interface SendSingleEmailOptions {
  to: string;
  subject: string;
  reactElement: React.ReactElement;
}

export interface SendSingleEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send a 1-to-1 email with HTML and plain-text fallback via Amazon SES
 */
export async function sendSesSingleEmail({
  to,
  subject,
  reactElement,
}: SendSingleEmailOptions): Promise<SendSingleEmailResult> {
  if (!sesClient) {
    console.info(
      `[EmailService:Dev] AWS SES not configured. Simulated send "${subject}" to ${to}.`
    );
    return { success: true, messageId: `dev-ses-${Date.now()}` };
  }

  try {
    const html = await render(reactElement);
    const text = await render(reactElement, { plainText: true });

    const command = new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [to],
      },
      Message: {
        Subject: {
          Data: subject,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: html,
            Charset: "UTF-8",
          },
          Text: {
            Data: text,
            Charset: "UTF-8",
          },
        },
      },
    });

    const response = await sesClient.send(command);
    return { success: true, messageId: response.MessageId };
  } catch (error) {
    console.error(`[EmailService:SES] Error sending email to ${to}:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "SES dispatch error",
    };
  }
}

export interface SendBccBroadcastOptions {
  recipients: string[];
  subject: string;
  reactElement: React.ReactElement;
  chunkSize?: number;
}

export interface SendBccBroadcastResult {
  success: boolean;
  sentCount: number;
  messageIds: string[];
  error?: string;
}

/**
 * Strategy A: Send broadcast emails using BCC chunking (up to 50 recipients per SES call).
 *
 * Guarantees:
 * 1. 100% recipient privacy (no recipient sees any other recipient's email).
 * 2. Pre-renders the React Email template once for maximum throughput.
 * 3. 100ms delay between 50-recipient chunks to strictly respect SES rate limits.
 */
export async function sendSesBccBroadcast({
  recipients,
  subject,
  reactElement,
  chunkSize = 45,
}: SendBccBroadcastOptions): Promise<SendBccBroadcastResult> {
  // Deduplicate and filter non-empty email addresses
  const validEmails = Array.from(
    new Set(recipients.map((e) => e?.trim().toLowerCase()).filter(Boolean))
  );

  if (validEmails.length === 0) {
    return { success: true, sentCount: 0, messageIds: [] };
  }

  if (!sesClient) {
    console.info(
      `[EmailService:Dev] AWS SES not configured. Simulated broadcast "${subject}" to ${validEmails.length} recipients.`
    );
    return {
      success: true,
      sentCount: validEmails.length,
      messageIds: [`dev-broadcast-${Date.now()}`],
    };
  }

  try {
    // Pre-render the React component to HTML and Plain Text ONCE
    const html = await render(reactElement);
    const text = await render(reactElement, { plainText: true });

    const messageIds: string[] = [];
    let sentCount = 0;

    for (let i = 0; i < validEmails.length; i += chunkSize) {
      const chunk = validEmails.slice(i, i + chunkSize);

      try {
        const command = new SendEmailCommand({
          Source: FROM_EMAIL,
          Destination: {
            ToAddresses: [FROM_EMAIL], // Visible "To:" is the community address
            BccAddresses: chunk,       // Recipients are completely hidden
          },
          Message: {
            Subject: {
              Data: subject,
              Charset: "UTF-8",
            },
            Body: {
              Html: {
                Data: html,
                Charset: "UTF-8",
              },
              Text: {
                Data: text,
                Charset: "UTF-8",
              },
            },
          },
        });

        const response = await sesClient.send(command);
        if (response.MessageId) {
          messageIds.push(response.MessageId);
        }
        sentCount += chunk.length;
      } catch (chunkError) {
        console.error(
          `[EmailService:SES] Error sending BCC chunk ${Math.floor(i / chunkSize) + 1}:`,
          chunkError
        );
      }

      // Small 100ms delay between chunks to strictly obey the 14 sends/sec rate limit
      if (i + chunkSize < validEmails.length) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }

    return {
      success: sentCount > 0,
      sentCount,
      messageIds,
    };
  } catch (error) {
    console.error("[EmailService:SES] Unexpected broadcast error:", error);
    return {
      success: false,
      sentCount: 0,
      messageIds: [],
      error: error instanceof Error ? error.message : "Broadcast dispatch error",
    };
  }
}
