/**
 * Email & Activity Log Serializer
 * Converts raw MongoDB Email & Activity log documents into client-safe JSON DTOs
 */

import type { WithId, Document } from "mongodb";
import type {
  SerializedEmailLog,
  SerializedActivityLog,
} from "@/types/serialized.types";

export function serializeEmailLog(
  doc: WithId<Document> | Record<string, unknown>
): SerializedEmailLog {
  const sentAtVal = doc.sentAt as Date | string | undefined;
  const sentAtStr =
    sentAtVal instanceof Date
      ? sentAtVal.toISOString()
      : typeof sentAtVal === "string"
        ? sentAtVal
        : new Date(sentAtVal || Date.now()).toISOString();

  return {
    _id: doc._id ? String(doc._id) : "",
    eventId: doc.eventId ? String(doc.eventId) : undefined,
    emailType: (typeof doc.emailType === "string" ? doc.emailType : "announcement") as SerializedEmailLog["emailType"],
    trigger: (typeof doc.trigger === "string" ? doc.trigger : "manual") as SerializedEmailLog["trigger"],
    recipientCount: Number(doc.recipientCount ?? 0),
    sentAt: sentAtStr,
    subject: typeof doc.subject === "string" ? doc.subject : "",
    resendId: typeof doc.resendId === "string" ? doc.resendId : undefined,
    timeFrame: typeof doc.timeFrame === "string" ? (doc.timeFrame as SerializedEmailLog["timeFrame"]) : undefined,
    htmlContentLength: typeof doc.htmlContentLength === "number" ? doc.htmlContentLength : undefined,
  };
}

export function serializeEmailLogs(
  docs: (WithId<Document> | Record<string, unknown>)[]
): SerializedEmailLog[] {
  return docs.map(serializeEmailLog);
}

export function serializeActivityLog(
  doc: WithId<Document> | Record<string, unknown>
): SerializedActivityLog {
  const createdAtVal = doc.createdAt as Date | string | undefined;
  const createdAtStr =
    createdAtVal instanceof Date
      ? createdAtVal.toISOString()
      : typeof createdAtVal === "string"
        ? createdAtVal
        : new Date(createdAtVal || Date.now()).toISOString();

  return {
    _id: doc._id ? String(doc._id) : "",
    action: typeof doc.action === "string" ? doc.action : "action",
    eventId: doc.eventId ? String(doc.eventId) : undefined,
    memberId: doc.memberId ? String(doc.memberId) : undefined,
    details: typeof doc.details === "string" ? doc.details : "",
    createdAt: createdAtStr,
  };
}

export function serializeActivityLogs(
  docs: (WithId<Document> | Record<string, unknown>)[]
): SerializedActivityLog[] {
  return docs.map(serializeActivityLog);
}
