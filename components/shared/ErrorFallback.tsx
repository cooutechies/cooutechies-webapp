"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ErrorFallbackProps {
  title?: string;
  message?: string;
  error?: Error | string | null;
  onRetry?: () => void;
  backHref?: string;
  backLabel?: string;
  variant?: "page" | "card" | "inline";
  className?: string;
}

export function ErrorFallback({
  title = "Something went wrong",
  message = "An unexpected error occurred while loading this data. Please try again.",
  error,
  onRetry,
  backHref,
  backLabel = "Go back",
  variant = "card",
  className,
}: ErrorFallbackProps) {
  const [showDetails, setShowDetails] = useState(false);
  const errorMessage = error instanceof Error ? error.message : typeof error === "string" ? error : null;
  const errorStack = error instanceof Error ? error.stack : null;

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex items-center justify-between gap-3 p-3 rounded-xl border border-destructive/30 bg-destructive/5 text-destructive text-sm",
          className
        )}
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 text-destructive" />
          <span>{message}</span>
        </div>
        {onRetry && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onRetry}
            className="h-7 px-2 text-xs hover:bg-destructive/10 text-destructive"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Retry
          </Button>
        )}
      </div>
    );
  }

  const isPage = variant === "page";

  return (
    <div
      className={cn(
        "rounded-3xl border border-border/60 bg-card/60 backdrop-blur-xl p-8 md:p-12 text-center flex flex-col items-center justify-center space-y-6 relative overflow-hidden shadow-sm",
        isPage && "min-h-[60vh] max-w-2xl mx-auto my-12",
        className
      )}
    >
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-destructive/10 rounded-full blur-3xl pointer-events-none" />

      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive relative z-10">
        <AlertTriangle className="h-8 w-8 animate-pulse" />
      </div>

      {/* Text Content */}
      <div className="space-y-2 max-w-md relative z-10">
        <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight text-foreground">
          {title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {errorMessage || message}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 pt-2">
        {onRetry && (
          <Button
            onClick={onRetry}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-5 gap-2 shadow-sm"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>
        )}

        {backHref && (
          <Button asChild variant="outline" className="rounded-xl px-5 gap-2 border-border/60">
            <Link href={backHref}>
              <ArrowLeft className="h-4 w-4" />
              {backLabel}
            </Link>
          </Button>
        )}
      </div>

      {/* Collapsible Debug Trace in Development */}
      {process.env.NODE_ENV === "development" && (errorMessage || errorStack) && (
        <div className="w-full max-w-lg mt-6 pt-4 border-t border-border/40 relative z-10 text-left">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center justify-between w-full text-xs text-muted-foreground hover:text-foreground font-mono transition-colors"
          >
            <span>Error details (development only)</span>
            {showDetails ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
          {showDetails && (
            <pre className="mt-2 p-3 rounded-lg bg-muted/40 border border-border/50 text-[11px] font-mono text-destructive overflow-x-auto max-h-48 whitespace-pre-wrap">
              {errorStack || errorMessage}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Standard alias matching BiteHub & Next.js conventions
 */
export const FetchError = ErrorFallback;
