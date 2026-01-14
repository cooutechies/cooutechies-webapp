"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

/**
 * EventsErrorFallback Component
 * Modern error state for events page
 * Only shows error for the data section, not the whole page
 * Provides options to retry or go back home
 */

interface EventsErrorFallbackProps {
  error?: Error;
  reset?: () => void;
}

export function EventsErrorFallback({
  error,
  reset,
}: EventsErrorFallbackProps) {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto border-glow relative overflow-hidden"
        >
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-destructive/10 rounded-full blur-[80px] animate-pulse" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px] animate-pulse" />

          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative z-10"
          >
            <div className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6 border border-destructive/20">
              <AlertCircle className="w-10 h-10 text-destructive" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10"
          >
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3">
              Unable to Load Events
            </h2>
            <p className="text-muted-foreground mb-2">
              We&apos;re having trouble fetching the events right now.
            </p>
            {error && (
              <p className="text-xs text-muted-foreground/70 mb-6 font-mono bg-muted/30 p-2 rounded">
                {error.message}
              </p>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 justify-center relative z-10"
          >
            {reset && (
              <Button
                onClick={reset}
                size="lg"
                className="group gap-2 bg-linear-to-r from-primary to-secondary hover:opacity-90"
              >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Try Again
              </Button>
            )}
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          {/* Help Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xs text-muted-foreground/60 mt-6 relative z-10"
          >
            If this problem persists, please contact support
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Inline error state for when events fail to load
 * Use this within the page instead of full page error
 */
export function EventsInlineError() {
  return (
    <section className="py-16 relative">
      <div className="container mx-auto px-4">
        <div className="glass rounded-2xl p-12 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-destructive" />
          </div>
          <h3 className="text-xl font-display font-bold mb-2">
            Unable to Load Events
          </h3>
          <p className="text-muted-foreground mb-6">
            We&apos;re having trouble loading events. Please try again later.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => window.location.reload()} variant="default">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
