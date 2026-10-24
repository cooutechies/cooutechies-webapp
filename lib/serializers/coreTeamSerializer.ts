/**
 * Core Team Serializer
 * Converts raw MongoDB Core Team documents into client-safe JSON DTOs
 */

import type { WithId, Document } from "mongodb";
import type { CoreTeamMember } from "@/types/core-team.types";

export function serializeCoreTeamMember(
  doc: WithId<Document> | Record<string, unknown>
): CoreTeamMember {
  const createdAtVal = doc.createdAt as Date | string | undefined;
  const createdAtStr =
    createdAtVal instanceof Date
      ? createdAtVal.toISOString()
      : typeof createdAtVal === "string"
        ? createdAtVal
        : new Date(createdAtVal || Date.now()).toISOString();

  const updatedAtVal = doc.updatedAt as Date | string | undefined;
  const updatedAtStr =
    updatedAtVal instanceof Date
      ? updatedAtVal.toISOString()
      : typeof updatedAtVal === "string"
        ? updatedAtVal
        : new Date(updatedAtVal || Date.now()).toISOString();

  const socialLinksObj = doc.socialLinks as Record<string, string | undefined> | undefined;

  return {
    _id: doc._id ? String(doc._id) : "",
    name: typeof doc.name === "string" ? doc.name : "",
    role: typeof doc.role === "string" ? doc.role : "",
    about: typeof doc.about === "string" ? doc.about : "",
    profileImage: typeof doc.profileImage === "string" ? doc.profileImage : "",
    socialLinks: {
      github: typeof socialLinksObj?.github === "string" ? socialLinksObj.github : undefined,
      twitter: typeof socialLinksObj?.twitter === "string" ? socialLinksObj.twitter : undefined,
      linkedin: typeof socialLinksObj?.linkedin === "string" ? socialLinksObj.linkedin : undefined,
    },
    createdAt: createdAtStr,
    updatedAt: updatedAtStr,
  };
}

export function serializeCoreTeamMembers(
  docs: (WithId<Document> | Record<string, unknown>)[]
): CoreTeamMember[] {
  return docs.map(serializeCoreTeamMember);
}
