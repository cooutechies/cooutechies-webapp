"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createEvent, updateEvent } from "@/app/actions/events";
import { uploadMultipleFiles, type UploadedImage } from "@/lib/uploadFile";
import type { EventFormData } from "@/lib/validations";
import type { SerializedEvent } from "@/types/serialized.types";
import type { EventFormValues, Speaker } from "./types";

export function useEventFormSubmit({
  event,
  mode = "create",
  speakers,
}: {
  event?: SerializedEvent;
  mode?: "create" | "edit";
  speakers: Speaker[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (values: EventFormValues) => {
    setLoading(true);

    try {
      const imagesToUpload: string[] = [];
      const imageDescriptions: string[] = [];

      // Add cover image if it's new base64
      if (values.coverImage.startsWith("data:")) {
        imagesToUpload.push(values.coverImage);
        imageDescriptions.push(`cover-${Date.now()}.jpg`);
      }

      // Add speaker images if they're new base64
      const speakerImageIndexes: number[] = [];
      speakers.forEach((speaker, index) => {
        if (
          speaker.image.startsWith("data:") &&
          !speaker.image.startsWith("data:image/svg")
        ) {
          imagesToUpload.push(speaker.image);
          imageDescriptions.push(`speaker-${index}-${Date.now()}.jpg`);
          speakerImageIndexes.push(index);
        }
      });

      // Upload all new images
      let uploadedData: UploadedImage[] = [];
      if (imagesToUpload.length > 0) {
        setUploading(true);
        toast.loading(`Uploading ${imagesToUpload.length} image(s)...`);
        try {
          uploadedData = await uploadMultipleFiles(
            imagesToUpload,
            imageDescriptions,
            "cooutechies/events"
          );
        } finally {
          setUploading(false);
          toast.dismiss();
        }
      }

      // Replace base64 with uploaded Cloudinary data
      let coverImageObj: any = values.coverImage;
      if (values.coverImage.startsWith("data:") && uploadedData.length > 0) {
        coverImageObj = uploadedData[0];
      }

      const updatedSpeakers = speakers.map((speaker, index) => {
        const speakerUploadIndex = speakerImageIndexes.indexOf(index);
        let photoObj: any = speaker.image;

        if (speakerUploadIndex !== -1) {
          const urlIndex =
            speakerUploadIndex + (values.coverImage.startsWith("data:") ? 1 : 0);
          photoObj = uploadedData[urlIndex] || speaker.image;
        }

        return {
          name: speaker.name,
          role: speaker.title,
          bio: speaker.bio,
          photo: photoObj,
        };
      });

      const eventData: EventFormData = {
        title: values.title,
        description: values.description,
        date: values.date,
        location: values.location,
        coverImage: coverImageObj,
        duration: values.duration,
        maxAttendees: values.maxAttendees
          ? Number.parseInt(values.maxAttendees, 10)
          : null,
        speakers: updatedSpeakers,
      };

      const result =
        mode === "edit" && event?._id
          ? await updateEvent(event._id.toString(), eventData)
          : await createEvent(eventData);

      if (result.success) {
        toast.success(
          mode === "edit"
            ? "Event updated successfully"
            : "Event created successfully"
        );
        if (mode === "create") {
          router.push("/admin/events");
        } else if (event?._id) {
          router.push(`/admin/events/${event._id}`);
        }
        router.refresh();
      } else {
        toast.error(result.error || `Failed to ${mode} event`);
      }
    } catch (error) {
      console.error("[EventForm] Submit error:", error);
      toast.error(`Failed to ${mode} event. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    uploading,
    handleSubmit,
  };
}
