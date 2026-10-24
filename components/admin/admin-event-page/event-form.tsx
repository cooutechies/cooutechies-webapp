"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  type Speaker,
  type EventFormValues,
  type UnifiedEventFormProps,
  eventFormSchema,
  DEFAULT_SPEAKER_IMAGE,
} from "./form/types";
import { EventCoverImageField } from "./form/EventCoverImageField";
import { EventBasicFields } from "./form/EventBasicFields";
import { EventSpeakersManager } from "./form/EventSpeakersManager";
import { useEventFormSubmit } from "./form/useEventFormSubmit";

export function EventForm({ event, mode = "create" }: UnifiedEventFormProps) {
  const router = useRouter();

  const [imagePreview, setImagePreview] = useState<string>(
    typeof event?.coverImage === "string"
      ? event.coverImage
      : event?.coverImage?.url || ""
  );

  const [speakers, setSpeakers] = useState<Speaker[]>(() =>
    mode === "edit" && event?.speakers
      ? event.speakers.map((s, i: number) => ({
          id: `speaker-${i}`,
          name: s.name,
          title: s.role,
          bio: s.bio || "",
          image:
            typeof s.photo === "string"
              ? s.photo
              : s.photo?.url || DEFAULT_SPEAKER_IMAGE,
        }))
      : []
  );

  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null);

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      date: event?.date ? formatDateForInput(event.date) : "",
      location: event?.location || "",
      coverImage:
        typeof event?.coverImage === "string"
          ? event.coverImage
          : event?.coverImage?.url || "",
      maxAttendees: event?.maxAttendees?.toString() || "",
      duration: event?.duration || "1 day",
    },
  });

  const { loading, uploading, handleSubmit } = useEventFormSubmit({
    event,
    mode,
    speakers,
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6 relative">
      {mode === "create" && (
        <>
          <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-100 h-100 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-75 h-75 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      <div className="relative z-10 bg-background/80 backdrop-blur-sm rounded-xl border border-border/50 p-8 shadow-lg">
        {mode === "create" && (
          <div className="mb-8">
            <h1 className="text-4xl font-bold font-display">
              <span className="text-gradient">Create Event</span>
            </h1>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column: Cover Image & Capacity */}
              <div className="space-y-6">
                <EventCoverImageField
                  form={form}
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                />
              </div>

              {/* Right Column: Title, Details, Date, Duration, Location */}
              <EventBasicFields form={form} mode={mode} />
            </div>

            {/* Speakers Section */}
            <EventSpeakersManager
              speakers={speakers}
              setSpeakers={setSpeakers}
              editingSpeaker={editingSpeaker}
              setEditingSpeaker={setEditingSpeaker}
            />

            {/* Form Actions */}
            <div className="flex gap-4 justify-end pt-4 border-t border-border/40">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading || editingSpeaker !== null || uploading}
                className="bg-primary hover:bg-primary/90"
              >
                {loading || uploading
                  ? mode === "edit"
                    ? "Updating Event..."
                    : "Creating Event..."
                  : mode === "edit"
                    ? "Update Event"
                    : "Create Event"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
