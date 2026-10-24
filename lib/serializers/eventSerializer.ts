/**
 * Event Serializer
 * Converts raw MongoDB Event documents into client-safe JSON DTOs
 */

import type { WithId, Document } from "mongodb";
import type { SerializedEvent, SerializedSpeaker } from "@/types/serialized.types";

export function serializeSpeaker(speaker: Record<string, unknown> | null | undefined): SerializedSpeaker {
  return {
    name: typeof speaker?.name === "string" ? speaker.name : "",
    role: typeof speaker?.role === "string" ? speaker.role : "",
    bio: typeof speaker?.bio === "string" ? speaker.bio : "",
    photo: (speaker?.photo as SerializedSpeaker["photo"]) ?? undefined,
  };
}

export function serializeEvent(
  doc: WithId<Document> | Record<string, unknown>
): SerializedEvent & { registrationCount?: number } {
  const dateVal = doc.date as Date | string;
  const dateStr =
    dateVal instanceof Date
      ? dateVal.toISOString()
      : typeof dateVal === "string"
        ? dateVal
        : new Date(dateVal).toISOString();

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

  const announcementSentAtVal = doc.announcementSentAt as Date | string | undefined;
  const announcementSentAtStr =
    announcementSentAtVal instanceof Date
      ? announcementSentAtVal.toISOString()
      : typeof announcementSentAtVal === "string"
        ? announcementSentAtVal
        : announcementSentAtVal
          ? new Date(announcementSentAtVal).toISOString()
          : undefined;

  const speakersList = Array.isArray(doc.speakers)
    ? (doc.speakers as Record<string, unknown>[]).map(serializeSpeaker)
    : [];

  return {
    _id: doc._id ? String(doc._id) : "",
    title: typeof doc.title === "string" ? doc.title : "",
    description: typeof doc.description === "string" ? doc.description : "",
    date: dateStr,
    location: typeof doc.location === "string" ? doc.location : "",
    coverImage: doc.coverImage ?? "",
    duration: typeof doc.duration === "string" ? doc.duration : undefined,
    speakers: speakersList,
    maxAttendees: doc.maxAttendees ? Number(doc.maxAttendees) : undefined,
    createdAt: createdAtStr,
    updatedAt: updatedAtStr,
    announcementSent: Boolean(doc.announcementSent),
    announcementSentAt: announcementSentAtStr,
    ...(typeof doc.registrationCount === "number" ? { registrationCount: doc.registrationCount } : {}),
  };
}

export function serializeEvents(
  docs: (WithId<Document> | Record<string, unknown>)[]
): (SerializedEvent & { registrationCount: number })[] {
  return docs.map((doc) => {
    const serialized = serializeEvent(doc);
    return {
      ...serialized,
      registrationCount: Number(doc.registrationCount ?? 0),
    };
  });
}
