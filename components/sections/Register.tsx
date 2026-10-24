"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { submitRegistration } from "@/app/actions/registrations";
import {
  registrationSchema,
  type RegistrationFormData,
} from "@/lib/validations";
import { RegisterBackgroundParticles } from "./register/RegisterBackgroundParticles";
import { RegisterFormFields } from "./register/RegisterFormFields";
import { RegisterSuccessView } from "./register/RegisterSuccessView";

export default function Register() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      department: "",
      level: "",
      techSkills: "",
      aspiringSkills: "",
      reason: "",
      campus: "",
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    try {
      const result = await submitRegistration(data);

      if (result.success) {
        setIsSubmitted(true);
        toast.success("Registration Successful! 🎉", {
          description: "Check your email for confirmation. Welcome to COOU Techies!",
        });
        form.reset();
      } else {
        toast.error("Registration Failed", {
          description:
            result.error === "EMAIL_EXISTS"
              ? "This email is already registered"
              : "Please try again or contact support",
        });
      }
    } catch (error) {
      console.error("[Register] Submission error:", error);
      toast.error("Something went wrong", {
        description: "Please try again later",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden py-12 md:py-20 relative">
      {/* Background Particles & Grid Glow */}
      <RegisterBackgroundParticles />

      {/* Header Back Navigation */}
      <motion.header
        className="relative z-10 py-6 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto max-w-4xl mt-6">
          <Link href="/">
            <motion.div
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Home</span>
            </motion.div>
          </Link>
        </div>
      </motion.header>

      {/* Main Content Form */}
      <main className="relative z-10 py-8 px-4">
        <motion.div
          className="container mx-auto max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Title Section */}
          <div className="text-center mb-12">
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-primary/20 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold tracking-wide">
                Join the Community
              </span>
            </motion.div>

            <motion.h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className="text-gradient">Register</span>{" "}
              <span className="text-foreground">with Us</span>
            </motion.h1>

            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Become a member of{" "}
              <span className="text-primary font-semibold">COOU Techies</span> and
              connect with fellow tech enthusiasts
            </motion.p>
          </div>

          {/* Form / Success Card */}
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isFormInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="relative glass rounded-2xl md:rounded-3xl p-6 md:p-10 border border-primary/20 overflow-hidden shadow-xl bg-card/40 backdrop-blur-xl">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <RegisterFormFields
                      form={form}
                      isSubmitting={isSubmitting}
                      onSubmit={onSubmit}
                    />
                  </motion.div>
                ) : (
                  <RegisterSuccessView
                    onRegisterAnother={() => setIsSubmitted(false)}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
