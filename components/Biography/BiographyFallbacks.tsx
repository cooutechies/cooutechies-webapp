"use client";
import { motion } from "framer-motion";
import { Users, AlertCircle, RefreshCw } from "lucide-react";

/**
 * TeamCardSkeleton - Loading skeleton for team member cards
 */
export function TeamCardSkeleton() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative h-64 bg-muted/20 animate-pulse" />

      {/* Info Skeleton */}
      <div className="p-6 space-y-3">
        <div className="h-4 w-24 bg-muted/20 rounded animate-pulse" />
        <div className="h-6 w-3/4 bg-muted/20 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-muted/20 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-muted/20 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/**
 * ErrorFallback - Error state display with retry option
 */
export function ErrorFallback({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) {
  return (
    <div className="col-span-full">
      <div className="glass rounded-2xl p-12 text-center border-destructive/30">
        <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
        <h3 className="text-xl font-display font-bold mb-2">
          Failed to Load Team Members
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {error.message ||
            "Something went wrong while fetching the team data."}
        </p>
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </motion.button>
      </div>
    </div>
  );
}

/**
 * EmptyState - Display when no team members exist
 */
export function EmptyState() {
  return (
    <div className="col-span-full">
      <div className="glass rounded-2xl p-12 text-center">
        <Users className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
        <h3 className="text-xl font-display font-bold mb-2">
          No Team Members Yet
        </h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          The core team information will be displayed here once members are
          added.
        </p>
      </div>
    </div>
  );
}
