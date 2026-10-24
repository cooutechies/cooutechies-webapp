"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  Calendar,
  MapPin,
  Users,
  FileText,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EventFormValues } from "./types";

interface EventBasicFieldsProps {
  form: UseFormReturn<EventFormValues>;
  mode?: "create" | "edit";
}

export function EventBasicFields({ form, mode = "create" }: EventBasicFieldsProps) {
  return (
    <>
      <div className="space-y-6">
        <FormField
          control={form.control}
          name="maxAttendees"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Users className="w-4 h-4 text-primary" />
                Maximum Attendees
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Leave empty for unlimited"
                  {...field}
                  className="bg-background/50 text-foreground border-border/50 focus:border-primary transition-colors"
                />
              </FormControl>
              <FormDescription className="text-xs">
                Optional - Set a limit or leave empty for unlimited capacity
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Clock className="w-4 h-4 text-primary" />
                Event Duration
              </FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="bg-background/50 text-foreground border-border/50 focus:border-primary">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1 day">1 Day (24hrs)</SelectItem>
                  <SelectItem value="2 weeks">2 Weeks</SelectItem>
                  <SelectItem value="3 weeks">3 Weeks</SelectItem>
                  <SelectItem value="1 month">1 Month</SelectItem>
                  <SelectItem value="2 months">2 Months</SelectItem>
                  <SelectItem value="3 months">3 Months</SelectItem>
                  <SelectItem value="4 months">4 Months</SelectItem>
                  <SelectItem value="5 months">5 Months</SelectItem>
                  <SelectItem value="6 months">6 Months</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                {mode === "create" && <Sparkles className="w-4 h-4 text-primary" />}
                Event Title
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., React Meetup 2024"
                  {...field}
                  className="bg-background/50 text-foreground border-border/50 focus:border-primary transition-colors text-lg"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                <FileText className="w-4 h-4 text-primary" />
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your event in detail..."
                  rows={6}
                  {...field}
                  className="bg-background/50 text-foreground border-border/50 focus:border-primary transition-colors resize-none h-36"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Calendar className="w-4 h-4 text-primary" />
                Date & Time
              </FormLabel>
              <FormControl>
                <Input
                  type="datetime-local"
                  {...field}
                  className="bg-background/50 text-foreground border-border/50 focus:border-primary transition-colors"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-sm font-medium text-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                Location
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Conference Hall A"
                  {...field}
                  className="bg-background/50 text-foreground border-border/50 focus:border-primary transition-colors"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
