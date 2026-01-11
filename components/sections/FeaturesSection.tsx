"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  Laptop,
  Users2,
  Presentation,
  Trophy,
  Rocket,
  BookOpen,
  Network,
} from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Coding Bootcamps",
    description:
      "Intensive hands-on training in web development, mobile apps, and more.",
  },
  {
    icon: Laptop,
    title: "Hackathons",
    description:
      "Compete, innovate, and build amazing projects in 24-48 hour sprints.",
  },
  {
    icon: Users2,
    title: "Mentorship",
    description:
      "Learn from industry professionals and experienced senior members.",
  },
  {
    icon: Presentation,
    title: "Tech Talks",
    description:
      "Weekly sessions covering the latest in AI, blockchain, cloud, and more.",
  },
  {
    icon: Trophy,
    title: "Competitions",
    description:
      "Participate in national and international coding competitions.",
  },
  {
    icon: Rocket,
    title: "Project Labs",
    description:
      "Collaborative spaces to work on real-world projects and startups.",
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    description: "Access to premium courses, books, and learning materials.",
  },
  {
    icon: Network,
    title: "Networking",
    description: "Connect with tech companies, recruiters, and alumni network.",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/20 via-background to-background" />
      <div className="absolute inset-0 circuit-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            Unlock Your <span className="text-gradient">Full Potential</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            From beginner-friendly workshops to advanced hackathons, we provide
            everything you need to excel in tech.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative h-full glass rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-500 overflow-hidden">
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="relative z-10 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative z-10 text-lg font-display font-semibold mb-2 text-foreground group-hover:text-gradient transition-all">
                  {feature.title}
                </h3>
                <p className="relative z-10 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Index Number */}
                <span className="absolute top-4 right-4 text-6xl font-display font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 glass rounded-2xl p-6 border border-primary/20">
            <div className="text-left">
              <p className="font-display font-semibold text-foreground">
                Ready to start your journey?
              </p>
              <p className="text-sm text-muted-foreground">
                Join 500+ students already learning with us.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-primary to-secondary text-primary-foreground font-bold px-8 py-3 rounded-xl hover:opacity-90 transition-opacity"
            >
              Become a Member
              <Rocket className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
