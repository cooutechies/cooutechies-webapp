/**
 * Add Core Team Member Page
 * Server component wrapper for the core team form
 */

import CoreTeamForm from "@/components/admin/core-team/core-team-form";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Add Team Member",
  description: "Create a new core team member profile",
};

export default function AddCoreTeamPage() {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <div className="z-10 px-6 py-6 border-b border-border/50 sticky top-0 glass backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link href="/admin/core-team">
            <Button
              variant="outline"
              size="icon"
              className="rounded-lg bg-transparent"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              <span className="text-gradient">Add Team Member</span>
            </h1>
            <p className="text-muted-foreground text-sm mt-0.5">
              Create a new core team member profile
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto relative z-10">
        <div className="max-w-2xl mx-auto">
          <CoreTeamForm />
        </div>
      </div>
    </div>
  );
}
