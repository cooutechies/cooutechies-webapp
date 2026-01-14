import { Button } from "@/components/ui/button";
import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";

// Error Fallback Component
export function CoreTeamFormError({
  title = "Something went wrong",
  message = "We couldn't load the team member data. Please try again.",
  backUrl = "/admin/core-team",
  backLabel = "Back to Core Team",
}: {
  title?: string;
  message?: string;
  backUrl?: string;
  backLabel?: string;
}) {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 text-center">
          {/* Error Icon */}
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>

          {/* Error Title */}
          <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>

          {/* Error Message */}
          <p className="text-muted-foreground mb-8">{message}</p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={backUrl}>
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <ChevronLeft className="h-4 w-4" />
                {backLabel}
              </Button>
            </Link>
            <Button
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
