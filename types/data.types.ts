/**
 * TypeScript Type Definitions
 * Comprehensive type safety for all database models and API responses
 */

import type { ObjectId } from "mongodb";

export interface Registration {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  level: string;
  campus: string;
  techSkills?: string;
  aspiringSkills?: string;
  reason: string;
  status: string;
  createdAt: Date | string;
}

/**
 * Email Log Document
 * Tracks all sent emails for preventing duplicates and audit trail
 */
export interface EmailLog {
  _id: ObjectId;
  eventId?: ObjectId;
  emailType: "event-announcement" | "reminder" | "thank-you" | "community";
  trigger: "manual" | "auto";
  recipientCount: number;
  sentAt: Date;
  subject: string;
  daysBeforeEvent?: number; // For reminders
}

/**
 * Email Reminder Document
 * Tracks the status of scheduled reminders for each event
 */
export interface EmailReminder {
  _id: ObjectId;
  eventId: ObjectId;
  type: "reminder" | "thank-you";
  daysOffset: number; // Days before (-7, -1) or after (+1) the event
  status: "pending" | "sent";
  sentAt?: Date;
  sentVia: "auto" | "manual"; // How it was sent
}

/**
 * Activity Log Document
 * Tracks important actions for the dashboard activity feed
 */
export interface ActivityLog {
  _id: ObjectId;
  action:
    | "event_created"
    | "announcement_sent"
    | "reminder_sent"
    | "thank_you_sent"
    | "registration";
  eventId?: ObjectId;
  details: string;
  createdAt: Date;
}

/**
 * API Response Types
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface DashboardStats {
  totalEvents: number;
  upcomingEvents: number;
  totalRegistrations: number;
  emailsSentLast7Days: number;
}
