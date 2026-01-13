"use client";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

/**
 * BiographyTimeline Component
 * Displays the community journey milestones in an animated timeline
 * Features staggered animations and responsive layout
 */

// Milestone data
const milestones = [
  {
    year: "2022",
    title: "Foundation",
    description: "COOU Techies was born with just 15 passionate members.",
  },
  {
    year: "2023",
    title: "Community Growth",
    description: "Massive publicity and organization of major events.",
  },
  {
    year: "2025",
    title: "400+ Members",
    description: "Grew to become the largest tech community in COOU.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export function BiographyTimeline() {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.span
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10 mb-6"
          >
            <Rocket className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium text-secondary">
              Our Journey
            </span>
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-display font-bold"
          >
            <span className="text-gradient">Milestones</span>{" "}
            <span className="text-foreground">& Achievements</span>
          </motion.h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary via-secondary to-primary transform md:-translate-x-1/2" />

            {/* Milestone items */}
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-start mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content card */}
                <div
                  className={`w-full md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  } pl-12 md:pl-0`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="glass p-6 rounded-2xl inline-block text-left cursor-pointer"
                  >
                    <span className="text-primary font-display font-bold text-2xl">
                      {milestone.year}
                    </span>
                    <h3 className="text-xl font-display font-bold mt-2 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {milestone.description}
                    </p>
                  </motion.div>
                </div>

                {/* Timeline dot indicator */}
                <motion.div
                  className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 rounded-full bg-linear-to-br from-primary to-secondary"
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.5)" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
