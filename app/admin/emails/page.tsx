/**
 * Emails Management Page
 * Manual email broadcast and email history
 * Enhanced with modern glassmorphic design matching dashboard aesthetic
 */

import { getEmailHistory } from "@/app/actions/emails";

import { Button } from "@/components/ui/button";
import { Plus, Mail, Send, Clock, Users } from "lucide-react";
import Link from "next/link";

export default async function EmailsPage() {
  const result = await getEmailHistory(100);
  const emails = result.success ? result.data || [] : [];

  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background effects matching dashboard */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header with glassmorphic effect */}
      <div className=" z-10 px-6 py-6 border-b border-border/50 sticky top-0 glass backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                <span className="text-gradient">Emails</span>
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                Manage and track all communications
              </p>
            </div>
          </div>
          <Button
            asChild
            className="bg-linear-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-lg"
          >
            <Link href="/admin/emails/broadcast">
              <Plus className="h-4 w-4 mr-2" />
              Send Broadcast
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto relative z-10">
        <div className="max-w-7xl mx-auto">
          {emails.length === 0 ? (
            <div className="glass rounded-2xl overflow-hidden border-glow">
              <div className="p-16 flex flex-col items-center justify-center">
                <div className="p-4 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 mb-4">
                  <Mail className="h-12 w-12 text-primary" />
                </div>
                <p className="text-foreground font-semibold text-lg mb-1">
                  No emails sent yet
                </p>
                <p className="text-muted-foreground text-sm mb-6">
                  Start by sending your first broadcast email
                </p>
                <Button
                  asChild
                  className="bg-linear-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                >
                  <Link href="/admin/emails/broadcast">
                    <Send className="h-4 w-4 mr-2" />
                    Send Your First Email
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="glass rounded-2xl overflow-hidden border-glow">
              <div className="border-b border-border/50 bg-linear-to-r from-primary/5 via-transparent to-secondary/5 p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold text-foreground">
                      Email History
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {emails.length} email{emails.length !== 1 ? "s" : ""} sent
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-0">
                  {emails.map((email) => (
                    <div
                      key={email._id.toString()}
                      className="flex items-start justify-between py-5 border-b border-border/30 last:border-0 group hover:bg-muted/30 -mx-4 px-4 rounded-lg transition-all duration-200"
                    >
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        {/* Icon */}
                        <div className="p-2 rounded-xl bg-linear-to-br from-primary/10 to-secondary/10 group-hover:scale-110 transition-transform duration-200 shrink-0 mt-0.5">
                          <Mail className="h-4 w-4 text-primary" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground mb-1">
                            {email.subject}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-2">
                            <Users className="h-3.5 w-3.5" />
                            {email.recipientCount} recipient
                            {email.recipientCount !== 1 ? "s" : ""}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                email.trigger === "auto"
                                  ? "bg-blue-500/20 text-blue-700 dark:text-blue-400"
                                  : "bg-purple-500/20 text-purple-700 dark:text-purple-400"
                              }`}
                            >
                              {email.trigger === "auto"
                                ? "Automated"
                                : "Manual"}
                            </span>
                            <span className="text-xs px-2.5 py-1 rounded-full bg-muted/80 text-muted-foreground font-medium capitalize">
                              {email.emailType.replace(/-/g, " ")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="ml-4 shrink-0 text-right">
                        <p className="text-xs text-muted-foreground/80 flex items-center gap-1.5 justify-end">
                          <Clock className="h-3 w-3" />
                          {new Date(email.sentAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
