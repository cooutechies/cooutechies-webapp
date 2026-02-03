"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useScrollSection } from "../layout/ScrollContext";

export default function CTASection() {
  const ref = useScrollSection("contact");

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Animated Background with spotlight effects */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/30 to-background" />

      {/* Radial spotlights */}
      <div className="absolute top-0 left-1/4 w-125 h-125 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div
        className="absolute top-1/4 right-1/4 w-100 h-100 bg-secondary/15 rounded-full blur-[100px] animate-pulse-glow"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute bottom-1/3 left-1/2 w-150 h-150 bg-accent/10 rounded-full blur-[140px] animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />

      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-40" />

      {/* Floating orbs - Enhanced with color spotlights */}
      <motion.div
        animate={{
          x: [0, 60, 0],
          y: [0, -40, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 h-80 w-80 rounded-full bg-linear-to-br from-primary/20 via-accent/15 to-transparent blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 50, 0],
          scale: [1, 1.4, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 h-96 w-96 rounded-full bg-linear-to-tr from-secondary/20 via-primary/10 to-transparent blur-[140px]"
      />
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 h-72 w-72 rounded-full bg-linear-to-br from-accent/15 via-secondary/10 to-transparent blur-[100px]"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-secondary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative glass border border-border/50 rounded-3xl p-8 md:p-12 text-center overflow-hidden shadow-2xl">
            {/* Animated corner accents with glow */}
            <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-primary/60 rounded-tl-3xl shadow-[0_0_30px_rgba(34,197,94,0.3)]" />
            <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-secondary/60 rounded-br-3xl shadow-[0_0_30px_rgba(234,179,8,0.3)]" />

            {/* Animated accent dots */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-4 left-4 w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_rgba(34,197,94,0.6)]"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-secondary shadow-[0_0_20px_rgba(234,179,8,0.6)]"
            />

            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Join Our Community
              </div>

              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 tracking-tight">
                Ready to{" "}
                <span className="text-gradient animate-shimmer bg-size-[200%_100%]">
                  Level Up?
                </span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
                Join COOU Techies today and become part of a community
                that&apos;s shaping the future of technology in Nigeria.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="group relative overflow-hidden bg-linear-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl px-8 py-6 shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] hover:scale-105 transition-all duration-300"
                >
                  <Link href="/register">
                    <span className="relative z-10">Join the Community</span>
                    <div className="absolute inset-0 bg-linear-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] rounded-xl px-8 py-6 font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Link href="mailto:cooutechies@gmail.com?subject=Community%20Enquiries&body=Hello%20Team%2C%0AI%E2%80%99m%20reaching%20out%20regarding%20a%20question%20%2F%20sponsorship%20%2F%20general%20enquiry%20about%20the%20community.%0APlease%20find%20the%20details%20below%3A%0A%0AName%3A%0AEmail%3A%0AMessage%3A%0A%0AThank%20you.">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
