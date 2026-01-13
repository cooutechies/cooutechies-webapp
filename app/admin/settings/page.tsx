/**
 * Settings Page
 * Admin configuration and preferences
 */

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your preferences</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Settings page will include configuration options for emails, notifications, and more.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
