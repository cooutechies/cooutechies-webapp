import Link from "next/link";
import { ArrowLeft, AlertCircle, RefreshCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * EventDetailError Component
 * Error state for event detail page - content only
 * Shows user-friendly error message with options to retry or go back
 * Navbar and Footer should be in parent layout
 */

interface EventDetailErrorProps {
  error?: string;
  onRetry?: () => void;
}

export default function EventDetailError({
  error = "We couldn't load this event",
  onRetry,
}: EventDetailErrorProps) {
  return (
    <>
      {/* Hero Section with Error */}
      <section className="relative pt-28 pb-0 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-0 w-150 h-150 bg-primary/10 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Back button */}
          <Button
            asChild
            variant="ghost"
            className="mb-8 group hover:bg-primary/10"
          >
            <Link href="/events">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Events
            </Link>
          </Button>

          {/* Error Content */}
          <div className="min-h-150 flex items-center justify-center py-12">
            <div className="glass rounded-3xl p-12 max-w-2xl w-full border-destructive/20 bg-destructive/5">
              <div className="text-center">
                {/* Error Icon */}
                <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-6 border-2 border-destructive/20">
                  <AlertCircle className="w-10 h-10 text-destructive" />
                </div>

                {/* Error Message */}
                <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                  Oops! Something went wrong
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  {error}. This could be due to a network issue or the event may
                  no longer be available.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  {onRetry && (
                    <Button size="lg" onClick={onRetry} className="gap-2">
                      <RefreshCcw className="w-5 h-5" />
                      Try Again
                    </Button>
                  )}
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/events" className="gap-2">
                      <ArrowLeft className="w-5 h-5" />
                      Back to Events
                    </Link>
                  </Button>
                  <Button size="lg" variant="ghost" asChild>
                    <Link href="/" className="gap-2">
                      <Home className="w-5 h-5" />
                      Go Home
                    </Link>
                  </Button>
                </div>

                {/* Additional Help */}
                <div className="mt-12 pt-8 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    Need help?{" "}
                    <Link
                      href="/contact"
                      className="text-primary hover:underline font-medium"
                    >
                      Contact our support team
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events CTA */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-20" />
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-secondary/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto border-glow">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              <span className="text-gradient">Explore More Events</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Check out other exciting events and workshops happening in our
              community!
            </p>
            <Button size="lg" asChild>
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
