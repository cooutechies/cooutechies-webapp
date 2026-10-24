"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RegisterSuccessViewProps {
  onRegisterAnother: () => void;
}

export function RegisterSuccessView({ onRegisterAnother }: RegisterSuccessViewProps) {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4, type: "spring" }}
        className="mb-6"
      >
        <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
      </motion.div>

      <motion.h2
        className="text-2xl md:text-3xl font-bold mb-4 font-display"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Welcome to COOU Techies!
      </motion.h2>

      <motion.p
        className="text-muted-foreground text-lg mb-8 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Check your email for confirmation details and the WhatsApp community link.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button
          variant="default"
          size="lg"
          onClick={onRegisterAnother}
          className="bg-primary hover:bg-primary/90"
        >
          Register Another Person
        </Button>
        <Button asChild variant="outline" size="lg" className="border-border/60">
          <Link href="/">Back to Home</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
