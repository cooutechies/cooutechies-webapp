/**
 * Registration Serializer
 * Converts raw MongoDB Registration documents into client-safe JSON DTOs
 */

import type { WithId, Document } from "mongodb";
import type {
  SerializedCommunityRegistration,
  SerializedEventRegistration,
} from "@/types/serialized.types";

export function serializeCommunityRegistration(
  doc: WithId<Document> | Record<string, unknown>
): SerializedCommunityRegistration {
  const createdAtVal = doc.createdAt as Date | string | undefined;
  const createdAtStr =
    createdAtVal instanceof Date
      ? createdAtVal.toISOString()
      : typeof createdAtVal === "string"
        ? createdAtVal
        : new Date(createdAtVal || Date.now()).toISOString();

  return {
    _id: doc._id ? String(doc._id) : "",
    firstName: typeof doc.firstName === "string" ? doc.firstName : "",
    lastName: typeof doc.lastName === "string" ? doc.lastName : "",
    email: typeof doc.email === "string" ? doc.email : "",
    department: typeof doc.department === "string" ? doc.department : "",
    level: String(doc.level ?? ""),
    techSkills: typeof doc.techSkills === "string" ? doc.techSkills : undefined,
    aspiringSkills: typeof doc.aspiringSkills === "string" ? doc.aspiringSkills : undefined,
    reason: typeof doc.reason === "string" ? doc.reason : undefined,
    campus: typeof doc.campus === "string" ? doc.campus : undefined,
    school: typeof doc.school === "string" ? doc.school : undefined,
    createdAt: createdAtStr,
    status: (typeof doc.status === "string" ? doc.status : "approved") as SerializedCommunityRegistration["status"],
  };
}

export function serializeCommunityRegistrations(
  docs: (WithId<Document> | Record<string, unknown>)[]
): SerializedCommunityRegistration[] {
  return docs.map(serializeCommunityRegistration);
}

export function serializeEventRegistration(
  doc: WithId<Document> | Record<string, unknown>
): SerializedEventRegistration {
  const registeredAtVal = doc.registeredAt as Date | string | undefined;
  const createdAtVal = doc.createdAt as Date | string | undefined;

  const registeredAtStr =
    registeredAtVal instanceof Date
      ? registeredAtVal.toISOString()
      : createdAtVal instanceof Date
        ? createdAtVal.toISOString()
        : typeof registeredAtVal === "string"
          ? registeredAtVal
          : typeof createdAtVal === "string"
            ? createdAtVal
            : new Date().toISOString();

  return {
    _id: doc._id ? String(doc._id) : "",
    firstName: typeof doc.firstName === "string" ? doc.firstName : "",
    lastName: typeof doc.lastName === "string" ? doc.lastName : "",
    email: typeof doc.email === "string" ? doc.email : "",
    eventId: doc.eventId ? String(doc.eventId) : "",
    registeredAt: registeredAtStr,
    status: (typeof doc.status === "string" ? doc.status : "registered") as SerializedEventRegistration["status"],
  };
}

export function serializeEventRegistrations(
  docs: (WithId<Document> | Record<string, unknown>)[]
): SerializedEventRegistration[] {
  return docs.map(serializeEventRegistration);
}
