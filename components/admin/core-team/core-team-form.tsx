/**
 * Core Team Form Component
 * Sleek form for creating/editing core team members
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import type { CoreTeamMember } from "@/types/core-team.types";
import { CoreTeamFormData, coreTeamFormSchema } from "@/lib/core-team-schema";
import { uploadFile } from "@/lib/uploadFile";
import {
  createCoreTeamMember,
  updateCoreTeamMember,
} from "@/app/actions/core-team";
import { AvatarUploadField } from "./form/AvatarUploadField";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { SocialLinksFields } from "./form/SocialLinksFields";

interface CoreTeamFormProps {
  initialData?: Partial<CoreTeamMember>;
  memberId?: string;
  isEditing?: boolean;
}

export default function CoreTeamForm({
  initialData,
  memberId,
  isEditing = false,
}: CoreTeamFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CoreTeamFormData>({
    resolver: zodResolver(coreTeamFormSchema),
    defaultValues: {
      name: initialData?.name || "",
      role: initialData?.role || "",
      about: initialData?.about || "",
      profileImage: initialData?.profileImage || "",
      socialLinks: {
        github: initialData?.socialLinks?.github || "",
        twitter: initialData?.socialLinks?.twitter || "",
        linkedin: initialData?.socialLinks?.linkedin || "",
      },
    },
  });

  useEffect(() => {
    if (initialData?.profileImage) {
      const imageStr =
        typeof initialData.profileImage === "string"
          ? initialData.profileImage
          : initialData.profileImage.url;
      setPreviewImage(imageStr);
    }
  }, [initialData]);

  const handleImageSelect = (file: File) => {
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64);
        form.setValue("profileImage", base64);
        form.clearErrors("profileImage");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      handleImageSelect(file);
    }
  };

  const removeImage = () => {
    setPreviewImage("");
    setSelectedFile(null);
    form.setValue("profileImage", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: CoreTeamFormData) => {
    setIsSubmitting(true);

    try {
      let imageUrl = data.profileImage;

      if (selectedFile) {
        setIsUploading(true);
        const filename = `team-member-${Date.now()}-${selectedFile.name}`;
        imageUrl = await uploadFile(selectedFile, filename, "cooutechies/team");
        setIsUploading(false);
      }

      const finalData = {
        ...data,
        profileImage: imageUrl,
      };

      const response =
        isEditing && memberId
          ? await updateCoreTeamMember(memberId, finalData)
          : await createCoreTeamMember(finalData);

      if (response.success) {
        toast.success(
          isEditing
            ? "Team member updated successfully!"
            : "Team member added successfully!"
        );
        setTimeout(() => router.push("/admin/core-team"), 1500);
      } else {
        toast.error(response.error || "Failed to submit form");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit form"
      );
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {isEditing ? "Edit Team Member" : "Add New Team Member"}
          </h1>
          <p className="text-muted-foreground">
            {isEditing
              ? "Update the team member's information below"
              : "Fill in the details to add a new core team member"}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden"
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 sm:p-8 space-y-8"
            >
              <AvatarUploadField
                form={form}
                previewImage={previewImage}
                isDragging={isDragging}
                fileInputRef={fileInputRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onFileInputChange={handleFileInputChange}
                onRemoveImage={removeImage}
              />

              <BasicInfoFields form={form} />

              <SocialLinksFields form={form} />

              <div className="pt-6 border-t border-border">
                <Button
                  disabled={isSubmitting}
                  className="w-full h-14 text-base font-semibold hover:opacity-90 transition-opacity shadow-glow"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {isUploading
                        ? "Uploading image..."
                        : isEditing
                        ? "Updating..."
                        : "Adding..."}
                    </span>
                  ) : isEditing ? (
                    "Update Team Member"
                  ) : (
                    "Add Team Member"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </div>
    </div>
  );
}
