"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, ImagePlus, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { CoreTeamFormData } from "@/lib/core-team-schema";

interface AvatarUploadFieldProps {
  form: UseFormReturn<CoreTeamFormData>;
  previewImage: string;
  isDragging: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

export function AvatarUploadField({
  form,
  previewImage,
  isDragging,
  fileInputRef,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileInputChange,
  onRemoveImage,
}: AvatarUploadFieldProps) {
  return (
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
              <div
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                  transition-all duration-300 ease-out
                  ${
                    isDragging
                      ? "border-primary bg-primary/5 scale-[1.02]"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }
                  ${previewImage ? "border-solid border-primary/30" : ""}
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onFileInputChange}
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
                          onRemoveImage();
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
                        PNG, JPG, GIF up to 10MB • Recommended: 400×400px
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
  );
}
