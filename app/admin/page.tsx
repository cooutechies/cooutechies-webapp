/**
 * Dashboard Overview Page
 * Server-side rendering with real-time statistics
 * Displays metrics and activity feed directly from database
 * Enhanced with modern glassmorphic design matching biography page aesthetic
 */

import { getDashboardStats, getActivityLog } from "@/app/actions/dashboard";
import type { ActivityLog } from "@/types/data.types";

import {
  Calendar,
  Users,
  Mail,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default async function DashboardPage() {
  // Fetch data on the server
  const stats = await getDashboardStats();
  const activityResponse = await getActivityLog(10);
  const activities: ActivityLog[] = activityResponse.success
    ? activityResponse.data || []
    : [];

  const statItems = [
    {
      icon: Calendar,
      label: "Total Events",
      value: stats.totalEvents,
      color: "from-blue-500/20 to-blue-500/5",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Calendar,
      label: "Upcoming Events",
      value: stats.upcomingEvents,
      color: "from-primary/20 to-primary/5",
      textColor: "text-primary",
    },
    {
      icon: Users,
      label: "Total Registrations",
      value: stats.totalRegistrations,
      color: "from-purple-500/20 to-purple-500/5",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Mail,
      label: " Total Emails (Sent)",
      value: stats.emailsSentLast7Days,
      color: "from-secondary/20 to-secondary/5",
      textColor: "text-secondary",
    },
  ];

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background effects matching biography page */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header with glassmorphic effect */}
      <div className=" z-10 px-6 py-6 border-b border-border/50 sticky top-0 glass backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Welcome back to your admin panel
            </p>
          </div>
        </div>
      </div>

      {/* Content with relative positioning */}
      <div className="flex-1 p-6 overflow-auto relative z-10">
        <div className="space-y-6 max-w-7xl mx-auto">
          {/* Stats Grid with enhanced glassmorphic cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {statItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="glass rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02] border-glow hover:shadow-lg"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="p-6">
                    {/* Icon and Trend */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl bg-linear-to-br ${item.color} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`h-6 w-6 ${item.textColor}`} />
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.label}
                      </p>
                      <div className="flex items-end gap-2">
                        <span className="text-4xl font-display font-bold text-gradient">
                          {item.value}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                        <Clock className="h-3 w-3" />
                        Real-time data
                      </p>
                    </div>
                  </div>

                  {/* Gradient bottom accent */}
                  <div className="h-1 bg-linear-to-r from-primary via-secondary to-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })}
          </div>

          {/* Activity Log with enhanced design */}
          <div className="glass rounded-2xl overflow-hidden border-glow">
            <div className="border-b border-border/50 bg-linear-to-r from-primary/5 via-transparent to-secondary/5 p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-foreground">
                    Recent Activity
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Latest updates and events
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {activities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="p-4 rounded-2xl bg-muted/50 mb-4">
                    <Activity className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">
                    No recent activity yet
                  </p>
                  <p className="text-muted-foreground/70 text-xs mt-1">
                    Activity will appear here once events occur
                  </p>
                </div>
              ) : (
                <div className="space-y-0">
                  {activities.map((activity) => {
                    // Determine activity type for icon
                    const isSuccess =
                      activity.action.includes("created") ||
                      activity.action.includes("sent");
                    const StatusIcon = isSuccess ? CheckCircle2 : AlertCircle;
                    const statusColor = isSuccess
                      ? "text-green-600 dark:text-green-400"
                      : "text-blue-600 dark:text-blue-400";
                    const statusBg = isSuccess
                      ? "bg-green-500/20"
                      : "bg-blue-500/20";

                    return (
                      <div
                        key={activity._id.toString()}
                        className="flex items-start gap-4 py-5 border-b border-border/30 last:border-0 group hover:bg-muted/30 -mx-4 px-4 rounded-lg transition-all duration-200"
                      >
                        {/* Status Icon */}
                        <div
                          className={`p-2 rounded-xl ${statusBg} group-hover:scale-110 transition-transform duration-200 shrink-0 mt-0.5`}
                        >
                          <StatusIcon className={`h-4 w-4 ${statusColor}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground capitalize mb-1">
                            {activity.action.replace(/_/g, " ")}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {activity.details}
                          </p>
                          <p className="text-xs text-muted-foreground/80 mt-2 flex items-center gap-1.5">
                            <Clock className="h-3 w-3" />
                            {new Date(activity.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
