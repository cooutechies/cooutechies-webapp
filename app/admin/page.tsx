/**
 * Dashboard Overview Page
 * Server component that wraps the client-side dashboard
 * Provides initial metadata and layout structure
 */

import { DashboardClient } from "@/components/admin/home/DashboardClient";
import { AdminSkeleton } from "@/components/admin/shared/admin-skeleton";
import { Sparkles } from "lucide-react";
import { Suspense } from "react";

export const metadata = {
  title: "Dashboard | Admin Panel",
  description: "View real-time statistics and recent activity",
};

export default function DashboardPage() {
  return (
    <Suspense 
      fallback={
        <AdminSkeleton 
          layout="stats-and-list" 
          title="Dashboard" 
          description="Welcome back to your admin panel" 
          icon={<Sparkles className="h-5 w-5 text-primary" />} 
        />
      }
    >
      <DashboardClient />
    </Suspense>
  );
}
