"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UserPlus, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { submitEventRegistration } from "@/app/actions/registrations";

/**
 * RegistrationForm Component
 * Client component for event registration
 * Displays form only if registration is still open (event hasn't ended based on duration)
 * Uses real server action to submit registration to database
 *
 * @param eventId - Event ID to register for
 * @param eventDate - ISO date string of event start
 * @param eventDuration - Duration string (e.g., "1 day", "2 weeks")
 * @param isRegistrationOpen - Boolean indicating if registration is currently open
 */

// Form validation schema
const registrationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  eventId: string;
  eventDate: string;
  eventDuration?: string;
  isRegistrationOpen: boolean;
  eventTitle: string;
  eventTime: string;
  eventLocation: string;
  eventDescription?: string;
  formattedDate: string;
}

export function RegistrationForm({
  eventId,

  isRegistrationOpen,
  eventTitle,
  eventTime,
  eventLocation,
  eventDescription,
  formattedDate,
}: RegistrationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  // Handle form submission using real server action
  async function onSubmit(values: RegistrationFormValues) {
    setIsSubmitting(true);
    setError(null);

    try {
      // Call server action to submit event registration
      const result = await submitEventRegistration({
        eventId,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        eventTitle,
        eventDate: formattedDate,
        eventTime,
        eventLocation,
        eventDescription,
      });

      if (result.success) {
        setIsSuccess(true);
        form.reset();
        // Refresh the page to update registration count
        router.refresh();
      } else {
        // Handle specific error cases
        if (result.error === "EMAIL_EXISTS") {
          setError("You've already registered for this event with this email.");
        } else {
          setError(result.message || "Registration failed. Please try again.");
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // If registration is closed, show message
  if (!isRegistrationOpen) {
    return (
      <div className="glass rounded-2xl p-8 border-muted/30">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-display font-bold mb-2">
            Registration Closed
          </h3>
          <p className="text-muted-foreground">
            This event has ended. Registration is no longer available. Check out
            our other upcoming events!
          </p>
        </div>
      </div>
    );
  }

  // Success message
  if (isSuccess) {
    return (
      <div className="glass rounded-2xl p-8 border-primary/30 bg-primary/5">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-display font-bold mb-2">
            Registration Successful!
          </h3>
          <p className="text-muted-foreground mb-6">
            You&apos;re all set! We&apos;ll send you a confirmation email
            shortly with event details.
          </p>
          <Button onClick={() => setIsSuccess(false)} variant="outline">
            Register Another Person
          </Button>
        </div>
      </div>
    );
  }

  // Registration form
  return (
    <div className="glass rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <UserPlus className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-display font-bold">Register for Event</h3>
          <p className="text-sm text-muted-foreground">
            Fill in your details to secure your spot
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your first name"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your last name"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    {...field}
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Registering...
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Complete Registration
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
