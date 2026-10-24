"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { Github, Twitter, Linkedin } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CoreTeamFormData } from "@/lib/core-team-schema";

interface SocialLinksFieldsProps {
  form: UseFormReturn<CoreTeamFormData>;
}

export function SocialLinksFields({ form }: SocialLinksFieldsProps) {
  return (
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
            <FormLabel className="text-sm font-medium">GitHub</FormLabel>
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
            <FormLabel className="text-sm font-medium">Twitter / X</FormLabel>
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
            <FormLabel className="text-sm font-medium">LinkedIn</FormLabel>
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
  );
}
