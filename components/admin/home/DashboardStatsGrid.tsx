"use client";

import { Calendar, Users, Mail, Clock } from "lucide-react";

interface DashboardStatsGridProps {
  stats?: {
    totalEvents: number;
    upcomingEvents: number;
    totalRegistrations: number;
    emailsSentLast7Days: number;
  };
}

export function DashboardStatsGrid({ stats }: DashboardStatsGridProps) {
  const statItems = [
    {
      icon: Calendar,
      label: "Total Events",
      value: stats?.totalEvents ?? 0,
      color: "from-blue-500/20 to-blue-500/5",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Calendar,
      label: "Upcoming Events",
      value: stats?.upcomingEvents ?? 0,
      color: "from-primary/20 to-primary/5",
      textColor: "text-primary",
    },
    {
      icon: Users,
      label: "Total Registrations",
      value: stats?.totalRegistrations ?? 0,
      color: "from-purple-500/20 to-purple-500/5",
      textColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Mail,
      label: "Total Emails (Sent)",
      value: stats?.emailsSentLast7Days ?? 0,
      color: "from-secondary/20 to-secondary/5",
      textColor: "text-secondary",
    },
  ];

  return (
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
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-xl bg-gradient-to-br ${item.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`h-6 w-6 ${item.textColor}`} />
                </div>
              </div>

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

            <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        );
      })}
    </div>
  );
}
