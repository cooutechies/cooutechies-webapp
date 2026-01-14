// @/types/core-team.types.ts
/**
 * Core Team Member Types
 * Defines the structure of core team members with social media links
 */

import type { ObjectId } from "mongodb";

export interface SocialLinks {
  github?: string;
  twitter?: string;
  linkedin?: string;
}

// Database model with ObjectId (used server-side only)
export interface CoreTeamMemberDB {
  _id: ObjectId;
  name: string;
  role: string;
  about: string;
  profileImage: string;
  socialLinks: SocialLinks;
  createdAt: Date;
  updatedAt: Date;
}

// Serialized model for client components (strings instead of ObjectId/Date)
export interface CoreTeamMember {
  _id: string;
  name: string;
  role: string;
  about: string;
  profileImage: string;
  socialLinks: SocialLinks;
  createdAt: string;
  updatedAt: string;
}
