/**
 * Core Team Validation Schema
 * Uses Zod for schema-based validation of core team member data
 */

import { z } from "zod";

export const coreTeamFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  role: z.string().min(2, "Role must be at least 2 characters").max(50),
  about: z.string().min(10, "About must be at least 10 characters").max(500),
  profileImage: z
    .string()
    .min(1, "Profile image is required")
    .refine(
      (val) => val.startsWith("data:") || val.startsWith("http"),
      "Invalid image format"
    ),
  socialLinks: z.object({
    github: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
    twitter: z.string().url("Invalid Twitter URL").optional().or(z.literal("")),
    linkedin: z
      .string()
      .url("Invalid LinkedIn URL")
      .optional()
      .or(z.literal("")),
  }),
});

export type CoreTeamFormData = z.infer<typeof coreTeamFormSchema>;
