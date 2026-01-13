import { Resend } from "resend";
import ConfirmationEmail from "@/components/email-templates/ConfirmationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  firstName: string;
  email: string;
}

export async function sendConfirmationEmail({
  firstName,
  email,
}: SendEmailProps) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }

  if (!process.env.RESEND_FROM_EMAIL) {
    throw new Error("RESEND_FROM_EMAIL environment variable is not set");
  }

  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL as string,
      ...(process.env.RESEND_REPLYTO_EMAIL && {
        replyTo: process.env.RESEND_REPLYTO_EMAIL,
      }),
      to: email,
      subject: "Welcome to COOU Techies! 🎉",
      react: ConfirmationEmail({
        firstName,
      }),
    });

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result;
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    throw error;
  }
}
