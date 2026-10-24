import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EventsCtaBanner() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--primary)/0.15) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="relative rounded-3xl border border-primary/20 bg-card overflow-hidden p-10 md:p-14 text-center">
            <span className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-primary/25 rounded-tl-3xl" />
            <span className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-primary/25 rounded-br-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/8 border border-primary/20 mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-semibold text-primary">
                  Community
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 leading-tight">
                <span className="text-gradient">Never miss</span>
                <br />
                <span className="text-foreground">an event again</span>
              </h2>
              <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
                Join COOU Techies to stay updated on all upcoming events,
                workshops, and hackathons — completely free.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button size="lg" asChild className="rounded-xl px-8 group">
                  <Link href="/register">
                    Join Our Community
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="rounded-xl px-6 text-muted-foreground"
                >
                  <Link href="#events">View all events</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
