/**
 * Registration Server Actions
 * Handles two types of registrations:
 * 1. Community Registrations - Students joining the community
 * 2. Event Registrations - Students registering for specific events
 */

"use server";

import { connectToDatabase } from "@/lib/db";
import {
  registrationSchema,
  eventRegistrationSchema,
  type RegistrationFormData,
  type EventRegistrationData,
} from "@/lib/validations";
import { sendConfirmationEmail } from "@/lib/confirmation-email";
import { ObjectId } from "mongodb";
import z from "zod";
import { Resend } from "resend";
import EventConfirmationEmail from "@/components/email-templates/EventConfirmationEmail";

interface RegistrationResponseData {
  registrationId: string;
}

interface ActionResponse {
  success: boolean;
  message?: string;
  data?: RegistrationResponseData;
  error?: string;
}

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL as string;

/**
 * Submit a new community registration (student joining the community)
 * Added submitRegistration function for community registrations
 */
export async function submitRegistration(
  formData: RegistrationFormData
): Promise<ActionResponse> {
  try {
    // Validate input using registrationSchema
    const validatedData = registrationSchema.parse(formData);

    const { db } = await connectToDatabase();
    const registrationsCollection = db.collection("registrations");

    // Check if email already exists
    const existingRegistration = await registrationsCollection.findOne({
      email: validatedData.email.toLowerCase(),
    });

    if (existingRegistration) {
      return {
        success: false,
        message: "This email is already registered",
        error: "EMAIL_EXISTS",
      };
    }

    // Create registration document
    const registration = {
      _id: new ObjectId(),
      ...validatedData,
      createdAt: new Date(),
      status: "registered",
    };

    // Insert into database
    const result = await registrationsCollection.insertOne(registration);

    // Send confirmation email
    try {
      await sendConfirmationEmail({
        firstName: validatedData.firstName,
        email: validatedData.email,
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Continue even if email fails - registration was successful
    }

    return {
      success: true,
      message: "Registration successful! Check your email for confirmation.",
      data: {
        registrationId: result.insertedId.toString(),
      },
    };
  } catch (error) {
    console.error("Registration error:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        error: "VALIDATION_ERROR",
      };
    }

    return {
      success: false,
      message: "Registration failed. Please try again.",
      error: "REGISTRATION_ERROR",
    };
  }
}

/**
 * Get all community registrations (students joining the community)
 * @param page - Page number (default: 1)
 * @param limit - Items per page (default: 20, set to 0 for all)
 */
export async function getCommunityRegistrations(page = 1, limit = 20) {
  try {
    const { db } = await connectToDatabase();
    const registrationsCollection = db.collection("registrations");

    // If limit is 0, fetch all registrations
    if (limit === 0) {
      const [registrations, total] = await Promise.all([
        registrationsCollection.find({}).sort({ registeredAt: -1 }).toArray(),
        registrationsCollection.countDocuments({}),
      ]);

      return {
        success: true,
        data: {
          registrations,
          total,
          pages: 1,
          currentPage: 1,
        },
      };
    }

    // Standard pagination
    const skip = (page - 1) * limit;

    const [registrations, total] = await Promise.all([
      registrationsCollection
        .find({})
        .sort({ registeredAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      registrationsCollection.countDocuments({}),
    ]);

    return {
      success: true,
      data: {
        registrations,
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("[Registrations] Fetch failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Get registrations for a specific event
 */
export async function getEventRegistrations(
  eventId: string,
  page = 1,
  limit = 20
) {
  try {
    if (!ObjectId.isValid(eventId)) {
      return {
        success: false,
        error: "Invalid event ID",
      };
    }

    const { db } = await connectToDatabase();
    const eventRegistrationsCollection = db.collection("eventRegistrations");

    const skip = (page - 1) * limit;

    const [registrations, total] = await Promise.all([
      eventRegistrationsCollection
        .find({ eventId: new ObjectId(eventId) })
        .sort({ registeredAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray(),
      eventRegistrationsCollection.countDocuments({
        eventId: new ObjectId(eventId),
      }),
    ]);

    return {
      success: true,
      data: {
        registrations,
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      },
    };
  } catch (error) {
    console.error("[Event Registrations] Fetch failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Submit event registration using the pattern from submitRegistration
 * Register a student for a specific event with validation and confirmation email
 */
export async function submitEventRegistration(
  formData: EventRegistrationData & {
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    eventDescription?: string;
  }
): Promise<ActionResponse> {
  console.log(FormData);

  try {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const validatedData = eventRegistrationSchema.parse(formData);

    if (!ObjectId.isValid(validatedData.eventId)) {
      return {
        success: false,
        error: "Invalid event ID",
      };
    }

    const { db } = await connectToDatabase();
    const eventRegistrationsCollection = db.collection("eventRegistrations");

    // Check if email already registered for this event
    const existingRegistration = await eventRegistrationsCollection.findOne({
      email: validatedData.email.toLowerCase(),
      eventId: new ObjectId(validatedData.eventId),
    });

    if (existingRegistration) {
      return {
        success: false,
        message: "This email is already registered for this event",
        error: "EMAIL_EXISTS",
      };
    }

    const registration = {
      _id: new ObjectId(),
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email.toLowerCase(),
      eventId: new ObjectId(validatedData.eventId),
      registeredAt: new Date(),
      status: "registered",
    };

    // Insert into eventRegistrations collection
    const result = await eventRegistrationsCollection.insertOne(registration);

    // Send event-specific confirmation email using Resend directly
    try {
      const response = await resend.emails.send({
        from: FROM_EMAIL,
        to: validatedData.email,
        subject: `You're Registered for ${formData.eventTitle}! 🎉`,
        react: EventConfirmationEmail({
          firstName: validatedData.firstName,
          eventTitle: formData.eventTitle,
          eventDate: formData.eventDate,
          eventTime: formData.eventTime,
          eventLocation: formData.eventLocation,
          eventDescription: formData.eventDescription,
        }),
      });

      if (response.error) {
        console.error("Resend API error:", response.error);
      }
    } catch (emailError) {
      console.error("Event confirmation email sending failed:", emailError);
      // Continue even if email fails - registration was successful
    }

    return {
      success: true,
      message:
        "Successfully registered for the event! Check your email for confirmation.",
      data: {
        registrationId: result.insertedId.toString(),
      },
    };
  } catch (error) {
    console.error("[Event Registration] Submission failed:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Validation failed",
        error: "VALIDATION_ERROR",
      };
    }

    return {
      success: false,
      message: "Failed to register for event. Please try again.",
      error: "REGISTRATION_ERROR",
    };
  }
}
