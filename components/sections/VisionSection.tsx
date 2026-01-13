"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Target, Eye, Compass } from "lucide-react";

export default function VisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const cards = [
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "To be the leading hub for technological innovation in Nigerian universities, empowering students to become world-class developers, entrepreneurs, and tech leaders who drive positive change in Africa and beyond.",
      gradient: "from-primary to-primary/50",
    },
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To provide accessible, high-quality tech education, foster a collaborative learning environment, and create opportunities for students to build real-world projects that solve meaningful problems.",
      gradient: "from-secondary to-secondary/50",
    },
    {
      icon: Compass,
      title: "Our Values",
      description:
        "Innovation, Collaboration, Excellence, and Community. We believe in learning by doing, sharing knowledge freely, and lifting each other up on our journey to tech excellence.",
      gradient: "from-primary via-secondary to-primary",
    },
  ];

  return (
    <section id="vision" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-muted/20 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full border border-secondary/30 bg-secondary/5 text-secondary text-sm font-medium mb-4">
            Our Purpose
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Shaping The <span className="text-gradient">Future</span> of Tech
          </h2>
          <p className="text-lg text-muted-foreground">
            We&apos;re driven by a clear vision and mission to transform how
            students learn and engage with technology.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Card Glow Effect */}
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full glass rounded-3xl p-8 border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden">
                {/* Top Gradient Line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${card.gradient}`}
                />

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <card.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-bold mb-4 text-gradient">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {card.description}
                </p>

                {/* Decorative Corner */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-primary/10 rounded-full" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">
            Ready to be part of something extraordinary?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
          >
            Join our community
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
