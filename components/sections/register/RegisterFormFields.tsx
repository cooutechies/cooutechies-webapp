"use client";

import React from "react";
import type { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Building2,
  GraduationCap,
  Code2,
  Target,
  MapPin,
  FileText,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CAMPUSES, ACADEMIC_LEVELS } from "@/lib/constants";
import type { RegistrationFormData } from "@/lib/validations";
import { AnimatedFormField } from "./AnimatedFormField";

interface RegisterFormFieldsProps {
  form: UseFormReturn<RegistrationFormData>;
  isSubmitting: boolean;
  onSubmit: (data: RegistrationFormData) => Promise<void>;
}

export function RegisterFormFields({
  form,
  isSubmitting,
  onSubmit,
}: RegisterFormFieldsProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedFormField index={0} icon={User}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold text-base">
                    First Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. John"
                      className="bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-12"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </AnimatedFormField>

          <AnimatedFormField index={1} icon={User}>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold text-base">
                    Last Name <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Doe"
                      className="bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-12"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </AnimatedFormField>
        </div>

        <AnimatedFormField index={2} icon={Mail}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-bold text-base">
                  Email Address <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-12"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </AnimatedFormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnimatedFormField index={3} icon={Building2}>
            <FormField
              control={form.control}
              name="department"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold text-base">
                    Department <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Computer Science"
                      className="bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-12"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </AnimatedFormField>

          <AnimatedFormField index={4} icon={GraduationCap}>
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground font-bold text-base">
                    Current Level <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-12">
                        <SelectValue placeholder="Select your level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ACADEMIC_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level} Level
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </AnimatedFormField>
        </div>

        <AnimatedFormField index={5} icon={Code2}>
          <FormField
            control={form.control}
            name="techSkills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-bold text-base">
                  Current Tech Skills{" "}
                  <span className="text-muted-foreground text-sm font-normal">
                    (Optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. HTML, CSS, JavaScript, Python"
                    className="bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-12"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </AnimatedFormField>

        <AnimatedFormField index={6} icon={Target}>
          <FormField
            control={form.control}
            name="aspiringSkills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-bold text-base">
                  Skills You Want to Learn{" "}
                  <span className="text-muted-foreground text-sm font-normal">
                    (Optional)
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. React, Node.js, AI/ML, DevOps"
                    className="bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-12"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </AnimatedFormField>

        <AnimatedFormField index={7} icon={MapPin}>
          <FormField
            control={form.control}
            name="campus"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-bold text-base">
                  Campus <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-12">
                      <SelectValue placeholder="Select your campus" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CAMPUSES.map((campus) => (
                      <SelectItem key={campus} value={campus}>
                        {campus}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </AnimatedFormField>

        <AnimatedFormField index={8} icon={FileText}>
          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-foreground font-bold text-base">
                  Why do you want to join?{" "}
                  <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us what brought you here..."
                    className="resize-none bg-background/60 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all h-24"
                    rows={4}
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </AnimatedFormField>

        <motion.div
          className="pt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              "Complete Registration"
            )}
          </Button>
        </motion.div>
      </form>
    </Form>
  );
}
