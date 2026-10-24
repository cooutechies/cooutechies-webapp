/**
 * Centralized Application Constants
 * Single source of truth for collection names, roles, pagination, and system types
 */

export const COLLECTIONS = {
  EVENTS: process.env.EVENTS_COLLECTION || "events",
  EVENT_REGISTRATIONS: process.env.EVENT_REGISTRATIONS_COLLECTION || "event_registrations",
  REGISTRATIONS: process.env.REGISTRATIONS_COLLECTION || "registrations",
  EMAIL_LOGS: process.env.EMAIL_LOGS_COLLECTION || "email_logs",
  ACTIVITIES: process.env.ACTIVITIES_COLLECTION || "activities",
  CORE_TEAM: process.env.CORE_TEAM_COLLECTION || "core_team",
  ADMIN: process.env.ADMIN_COLLECTION || "admin",
} as const;

export type CollectionName = (typeof COLLECTIONS)[keyof typeof COLLECTIONS];

export const ROLES = {
  ADMIN: "admin",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
} as const;

export const CAMPUSES = [
  "Uli Campus",
  "Igbariam Campus",
  "Awka Campus",
] as const;

export type Campus = (typeof CAMPUSES)[number];

export const ACADEMIC_LEVELS = [
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
] as const;

export type AcademicLevel = (typeof ACADEMIC_LEVELS)[number];

export const EMAIL_TYPES = {
  EVENT_ANNOUNCEMENT: "event-announcement",
  EVENT_REMINDER: "event-reminder",
  EVENT_CONFIRMATION: "event-confirmation",
  COMMUNITY_WELCOME: "community-welcome",
  CUSTOM_BROADCAST: "custom-broadcast",
} as const;

export type EmailType = (typeof EMAIL_TYPES)[keyof typeof EMAIL_TYPES];

export const ACTIVITY_ACTIONS = {
  EVENT_CREATED: "event_created",
  EVENT_UPDATED: "event_updated",
  EVENT_DELETED: "event_deleted",
  ANNOUNCEMENT_SENT: "announcement_sent",
  REMINDER_SENT: "reminder_sent",
  BROADCAST_SENT: "broadcast_sent",
  MEMBER_REGISTERED: "member_registered",
  EVENT_REGISTERED: "event_registered",
  CORE_TEAM_CREATED: "core_team_created",
  CORE_TEAM_UPDATED: "core_team_updated",
  CORE_TEAM_DELETED: "core_team_deleted",
  ADMIN_LOGIN: "admin_login",
} as const;

export type ActivityAction = (typeof ACTIVITY_ACTIONS)[keyof typeof ACTIVITY_ACTIONS];
