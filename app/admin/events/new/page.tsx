import { EventForm } from "@/components/admin/event-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Sparkles } from "lucide-react";

export default function NewEventPage() {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="px-6 py-6 border-b border-border/50 sticky top-0 glass backdrop-blur-xl z-10 relative">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/10 transition-colors"
            >
              <Link href="/admin/events">
                <ChevronLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-medium text-primary">
                    New Event
                  </span>
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold">
                <span className="text-gradient">Create New Event</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Fill in the details below to add a new event to your calendar
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto relative z-10">
        <div className="max-w-4xl mx-auto">
          <EventForm />
        </div>
      </div>
    </div>
  );
}
