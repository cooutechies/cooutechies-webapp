import * as z from "zod";
import type { SerializedEvent } from "@/types/serialized.types";

export const DEFAULT_SPEAKER_IMAGE = "/default-speaker-avatar.png";

export interface Speaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  image: string;
}

export const eventFormSchema = z.object({
  title: z
    .string()
    .min(3, "Event title must be at least 3 characters")
    .max(100, "Event title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must not exceed 1000 characters"),
  date: z.string().min(1, "Please select a date and time for the event"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  coverImage: z.string().min(1, "Please upload a cover image"),
  maxAttendees: z
    .string()
    .optional()
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) > 0),
      "Maximum attendees must be a positive number"
    ),
  duration: z.string().min(1, "Duration is required"),
});

export const speakerSchema = z.object({
  name: z.string().min(1, "Speaker name is required"),
  title: z.string().min(1, "Speaker title is required"),
  bio: z.string(),
  image: z.string(),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;
export type SpeakerValues = z.infer<typeof speakerSchema>;

export interface UnifiedEventFormProps {
  event?: SerializedEvent;
  mode?: "create" | "edit";
}
