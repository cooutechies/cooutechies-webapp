/**
 * Core Team Form Component
 * Modern, sleek form for creating/editing core team members
 * Uploads image to S3 only on form submission
 */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Upload,
  Loader2,
  User,
  Briefcase,
  FileText,
  Github,
  Twitter,
  Linkedin,
  ImagePlus,
  X,
} from "lucide-react";
import type { CoreTeamMember } from "@/types/core-team.types";
import { CoreTeamFormData, coreTeamFormSchema } from "@/lib/core-team-schema";
import { uploadFileToS3 } from "@/lib/uploadFileToS3";
import {
  createCoreTeamMember,
  updateCoreTeamMember,
} from "@/app/actions/core-team";

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
      setPreviewImage(initialData.profileImage);
    }
  }, [initialData]);

  // Handle image selection (no upload yet)
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
    if (file) {
      handleImageSelect(file);
    }
  };

  // Drag and drop handlers
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle form submission with S3 upload
  const onSubmit = async (data: CoreTeamFormData) => {
    setIsSubmitting(true);

    try {
      let imageUrl = data.profileImage;

      // Upload to S3 if we have a new file selected
      if (selectedFile) {
        setIsUploading(true);
        const filename = `team-member-${Date.now()}-${selectedFile.name}`;
        imageUrl = await uploadFileToS3(selectedFile, filename);
        setIsUploading(false);
      }

      // Prepare final data with the S3 URL
      const finalData = {
        ...data,
        profileImage: imageUrl,
      };

      let response;

      if (isEditing && memberId) {
        response = await updateCoreTeamMember(memberId, finalData);
      } else {
        response = await createCoreTeamMember(finalData);
      }

      if (response.success) {
        toast.success(
          isEditing
            ? "Team member updated successfully!"
            : "Team member added successfully!"
        );

        setTimeout(() => {
          router.push("/admin/core-team");
        }, 1500);
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
        {/* Header */}
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

        {/* Form Card */}
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
              {/* Profile Image Upload */}
              <FormField
                control={form.control}
                name="profileImage"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold flex items-center gap-2">
                      <ImagePlus className="h-4 w-4 text-primary" />
                      Profile Image
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {/* Drop Zone */}
                        <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          onClick={() => fileInputRef.current?.click()}
                          className={`
                            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                            transition-all duration-300 ease-out
                            ${
                              isDragging
                                ? "border-primary bg-primary/5 scale-[1.02]"
                                : "border-border hover:border-primary/50 hover:bg-muted/50"
                            }
                            ${
                              previewImage
                                ? "border-solid border-primary/30"
                                : ""
                            }
                          `}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            className="hidden"
                          />

                          <AnimatePresence mode="wait">
                            {previewImage ? (
                              <motion.div
                                key="preview"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="relative inline-block"
                              >
                                <div className="relative w-32 h-32 mx-auto rounded-xl overflow-hidden ring-4 ring-primary/20 shadow-glow">
                                  <Image
                                    src={previewImage || "/placeholder.svg"}
                                    alt="Preview"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage();
                                  }}
                                  className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow-md hover:bg-destructive/90 transition-colors"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                                <p className="mt-4 text-sm text-muted-foreground">
                                  Click or drag to replace
                                </p>
                              </motion.div>
                            ) : (
                              <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-3"
                              >
                                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                                  <Upload className="h-7 w-7 text-primary-foreground" />
                                </div>
                                <div>
                                  <p className="text-base font-medium text-foreground">
                                    Drop your image here
                                  </p>
                                  <p className="text-sm text-muted-foreground mt-1">
                                    or click to browse
                                  </p>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  PNG, JPG, GIF up to 10MB • Recommended:
                                  400×400px
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Basic Info Section */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  <User className="h-4 w-4" />
                  Basic Information
                </div>

                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="John Doe"
                            className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role Field */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Role / Position
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="Lead Developer"
                            className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* About Field */}
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        About
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Textarea
                            placeholder="Brief description of the team member..."
                            className="pl-10 min-h-[120px] bg-muted/50 border-border focus:bg-background transition-colors resize-none"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <p className="text-xs text-muted-foreground mt-1">
                        {field.value?.length || 0}/500 characters
                      </p>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Social Links Section */}
              <div className="space-y-6 pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    Social Links
                  </div>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                    Optional
                  </span>
                </div>

                {/* GitHub */}
                <FormField
                  control={form.control}
                  name="socialLinks.github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        GitHub
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="https://github.com/username"
                            className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Twitter */}
                <FormField
                  control={form.control}
                  name="socialLinks.twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Twitter / X
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="https://twitter.com/username"
                            className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* LinkedIn */}
                <FormField
                  control={form.control}
                  name="socialLinks.linkedin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        LinkedIn
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="https://linkedin.com/in/username"
                            className="pl-10 h-12 bg-muted/50 border-border focus:bg-background transition-colors"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-border">
                <Button
                  disabled={isSubmitting}
                  className="w-full h-14 text-base font-semibold  hover:opacity-90 transition-opacity shadow-glow"
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
