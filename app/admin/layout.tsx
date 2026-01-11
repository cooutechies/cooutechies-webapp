import type React from "react"
/**
 * Admin Layout
 * Wraps all admin pages with sidebar and header
 * Provides consistent structure for dashboard
 */

import { AdminSidebar } from "@/components/admin/sidebar"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard | COOU Techies",
  description: "Community event and email management",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto bg-background">{children}</main>
    </div>
  )
}
