"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import type { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import type { EventFormValues } from "./types";

interface EventCoverImageFieldProps {
  form: UseFormReturn<EventFormValues>;
  imagePreview: string;
  setImagePreview: (url: string) => void;
}

export function EventCoverImageField({
  form,
  imagePreview,
  setImagePreview,
}: EventCoverImageFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImagePreview(base64String);
      form.setValue("coverImage", base64String, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
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
    if (file) {
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setImagePreview("");
    form.setValue("coverImage", "", { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <FormField
      control={form.control}
      name="coverImage"
      render={() => (
        <FormItem>
          <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
            <ImageIcon className="w-4 h-4 text-primary" />
            Event Cover Image
          </FormLabel>

          <div
            className={`relative aspect-video rounded-2xl overflow-hidden border-2 border-dashed ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border/50 bg-muted/30"
            } group hover:border-primary/50 transition-all duration-300 cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !imagePreview && fileInputRef.current?.click()}
          >
            {imagePreview ? (
              <>
                <Image
                  src={imagePreview}
                  alt="Cover preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">Preview</p>
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="h-8 px-3"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-6">
                <Upload
                  className={`w-12 h-12 mb-3 ${
                    isDragging ? "text-primary" : "opacity-50"
                  }`}
                />
                <p className="text-sm font-medium mb-1 text-center">
                  {isDragging ? "Drop image here" : "Click to upload or drag and drop"}
                </p>
                <p className="text-xs text-center">PNG, JPG, GIF up to 5MB</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
