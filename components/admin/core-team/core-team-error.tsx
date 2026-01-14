/**
 * Core Team Error Fallback Component
 * Displays when an error occurs while loading team members
 * Provides retry functionality and helpful error messaging
 */

"use client";

import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CoreTeamErrorProps {
  error?: Error & { digest?: string };
}

export default function CoreTeamError({ error }: CoreTeamErrorProps) {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background effects matching main page */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
      <div className="absolute inset-0 grid-pattern opacity-[0.02] pointer-events-none" />

      {/* Subtle animated gradient orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-destructive/5 via-destructive/2 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-destructive/5 via-destructive/2 to-transparent rounded-full blur-3xl pointer-events-none animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      {/* Main error content - centered */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="max-w-lg w-full">
          {/* Error card with glassmorphism */}
          <div className="glass rounded-3xl p-8 sm:p-12 border border-border/50 text-center space-y-6">
            {/* Error icon with animated background */}
            <div className="relative inline-block">
              {/* Pulsing background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-3xl blur-xl animate-pulse" />

              {/* Icon container */}
              <div className="relative glass rounded-3xl p-6 border border-destructive/20">
                <AlertTriangle className="h-12 w-12 text-destructive mx-auto" />
              </div>
            </div>

            {/* Error heading */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                Something Went Wrong
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                We encountered an error while loading the core team members.
                Don&apos;t worry, this is usually temporary.
              </p>
            </div>

            {/* Error details (only in development or if digest exists) */}
            {(process.env.NODE_ENV === "development" || error?.digest) && (
              <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                <p className="text-xs font-mono text-muted-foreground break-all">
                  {error?.digest
                    ? `Error ID: ${error?.digest}`
                    : error?.message}
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              {/* Retry button */}
              <Button
                onClick={() => window.location.reload()}
                size="lg"
                className="w-full sm:w-auto gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-105 bg-gradient-to-r from-primary to-secondary"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>

              {/* Home button */}
              <Link href="/admin" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2 hover:bg-muted/50 transition-all hover:text-foreground"
                >
                  <Home className="h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>

            {/* Help text */}
            <div className="pt-4 border-t border-border/30">
              <p className="text-xs text-muted-foreground">
                If this problem persists, please contact support or check your
                connection.
              </p>
            </div>
          </div>

          {/* Optional: Additional troubleshooting tips */}
          <div className="mt-6 p-4 rounded-xl glass border border-border/50">
            <h3 className="text-sm font-semibold text-foreground mb-2">
              Quick Troubleshooting
            </h3>
            <ul className="text-xs text-muted-foreground space-y-1.5 list-disc list-inside">
              <li>Check your internet connection</li>
              <li>Refresh the page</li>
              <li>Clear your browser cache</li>
              <li>Try again in a few moments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
