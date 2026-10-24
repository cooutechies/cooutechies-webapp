"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { User, Briefcase, FileText } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CoreTeamFormData } from "@/lib/core-team-schema";

interface BasicInfoFieldsProps {
  form: UseFormReturn<CoreTeamFormData>;
}

export function BasicInfoFields({ form }: BasicInfoFieldsProps) {
  return (
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
            <FormLabel className="text-sm font-medium">Full Name</FormLabel>
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
            <FormLabel className="text-sm font-medium">About</FormLabel>
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
  );
}
