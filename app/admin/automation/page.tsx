/**
 * Automation Status Page
 * Displays active automations and their schedules
 * Read-only information about Vercel cron jobs
 */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Clock, CheckCircle, Zap } from "lucide-react";

const automations = [
  {
    id: "event-reminders",
    name: "Event Reminders",
    description:
      "Automatically sends reminder emails 7 days and 1 day before each event",
    schedule: "Daily at 12:00 AM UTC",
    status: "active" as const,
    lastRun: new Date(),
  },
  {
    id: "post-event-thank-you",
    name: "Post-Event Thank You",
    description:
      "Sends thank you emails to attendees 1 day after events conclude",
    schedule: "Daily at 12:00 AM UTC",
    status: "active" as const,
    lastRun: new Date(),
  },
];

export default function AutomationPage() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <Zap className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Automation</h1>
            <p className="text-muted-foreground text-sm">
              Automated email schedules and system processes
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="space-y-6 max-w-3xl">
          {/* Info Banner */}
          <Card className="border border-blue-500/20 bg-blue-500/5">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-100">
                    Vercel Cron Jobs Active
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                    All automations are managed by Vercel's serverless cron
                    system. They run reliably at the scheduled times without
                    requiring any manual intervention.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Automations List */}
          <div className="space-y-4">
            {automations.map((automation) => (
              <Card
                key={automation.id}
                className="border border-border hover:border-primary/50 transition-colors"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl">
                        {automation.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1.5">
                        {automation.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        Active
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Schedule
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {automation.schedule}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Status
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Running successfully
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technical Details */}
          <Card className="border border-border bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">How It Works</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Vercel Cron:</strong> Our
                automations run on Vercel's serverless infrastructure,
                automatically executing at scheduled intervals without consuming
                your application's resources.
              </p>
              <p>
                <strong className="text-foreground">Database Checks:</strong>{" "}
                Each automation checks The DataBase to determine which emails
                need to be sent, preventing duplicate sends through our email
                logging system.
              </p>
              <p>
                <strong className="text-foreground">Resend API:</strong> All
                emails are sent via the Resend email service, ensuring reliable
                delivery and detailed tracking.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
