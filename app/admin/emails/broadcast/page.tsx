/**
 * Email Broadcast Page
 * Send manual emails to all registrations or specific groups
 */

import { EmailBuilder } from "@/components/admin/email-builder/email-builder";

export const metadata = {
  title: "Send Broadcast",
  description: "Send email broadcasts to community members",
};

export default function BroadcastEmailPage() {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background effects matching dashboard */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header with glassmorphic effect */}

      {/* Content */}
      <div className="flex-1 overflow-auto relative z-10">
        <EmailBuilder />
      </div>
    </div>
  );
}
