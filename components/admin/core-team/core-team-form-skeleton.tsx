import { Skeleton } from "@/components/ui/skeleton";

// Loading Skeleton Component
export function CoreTeamFormSkeleton() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Header Skeleton */}
        <div className="mb-8 space-y-3">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-6 w-96" />
        </div>

        {/* Form Card Skeleton */}
        <div className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden">
          <div className="p-6 sm:p-8 space-y-8">
            {/* Profile Image Section */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="border-2 border-dashed border-border rounded-xl p-8">
                <Skeleton className="w-32 h-32 mx-auto rounded-xl" />
                <Skeleton className="mt-4 h-4 w-40 mx-auto" />
              </div>
            </div>

            {/* Basic Info Section */}
            <div className="space-y-6">
              <Skeleton className="h-5 w-48" />

              {/* Name Field */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-12 w-full" />
              </div>

              {/* Role Field */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-28" />
                <Skeleton className="h-12 w-full" />
              </div>

              {/* About Field */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-32 w-full" />
              </div>
            </div>

            {/* Social Links Section */}
            <div className="space-y-6 pt-6 border-t border-border">
              <Skeleton className="h-5 w-32" />

              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-border">
              <Skeleton className="h-14 w-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
