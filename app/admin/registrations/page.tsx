/**
 * Enhanced Registrations Page - Server Component
 * Uses client component for data fetching with TanStack Query
 */

import { Suspense } from "react";
import { Users } from "lucide-react";
import { RegistrationsClient } from "@/components/admin/registrations/RegistrationsClient";
import { AdminSkeleton } from "@/components/admin/shared/admin-skeleton";

import { AdminPageLayout } from "@/components/admin/shared/admin-page-layout";

export const metadata = {
  title: "Registrations",
  description: "Manage community member registrations",
};

export default function RegistrationsPage() {
  return (
    <AdminPageLayout
      title="Community Registrations"
      description="Manage community member registrations"
      icon={<Users className="h-5 w-5 text-primary" />}
    >
      {/* Content */}
      <div className="flex-1 p-6 overflow-auto relative z-10">
        <Suspense 
          fallback={
            <AdminSkeleton 
              layout="table" 
              title="Community Registrations" 
              description="Manage community member registrations" 
              icon={<Users className="h-5 w-5 text-primary" />} 
            />
          }
        >
          <RegistrationsClient />
        </Suspense>
      </div>
    </AdminPageLayout>
  );
}
