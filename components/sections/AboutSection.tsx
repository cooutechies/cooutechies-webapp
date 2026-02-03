"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { Code2, Lightbulb, GraduationCap, Trophy } from "lucide-react";
import { useScrollSection } from "../layout/ScrollContext";

const stats = [
  { label: "Active Members", value: "500+", icon: Code2 },
  { label: "Projects Built", value: "50+", icon: Lightbulb },
  { label: "Workshops Held", value: "30+", icon: GraduationCap },
  { label: "Hackathons Won", value: "1+", icon: Trophy },
];

export default function AboutSection() {
  const ref = useScrollSection("about");
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 circuit-pattern opacity-30" />
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Main Card */}
            <div className="relative glass rounded-3xl p-8 border-glow">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                <Code2 className="w-10 h-10 text-primary-foreground" />
              </div>

              <h3 className="text-2xl font-display font-bold mb-4 text-gradient">
                Who We Are
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                COOU Techies is the Parent technology community at Chukwuemeka
                Odumegwu Ojukwu University (COOU). We are a collective of
                passionate students, developers, designers, and tech enthusiasts
                united by our love for innovation and technology.
              </p>

              <p className="text-muted-foreground leading-relaxed">
                Founded with the vision to bridge the gap between academic
                learning and real-world tech skills, we provide a platform for
                students to learn, collaborate, and build the future together.
              </p>

              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -left-6 w-12 h-12 border-2 border-secondary/50 rounded-xl" />
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-primary rounded-full animate-pulse" />
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-8 right-8 glass rounded-xl px-6 py-4 border-glow"
            >
              <p className="text-sm text-muted-foreground">Established</p>
              <p className="text-2xl font-display font-bold text-gradient">
                2022
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-4"
              >
                Our Impact
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-4"
              >
                Building Tomorrow&apos;s
                <span className="text-gradient"> Tech Leaders</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className="text-lg text-muted-foreground"
              >
                Our numbers speak for themselves. We&apos;re committed to
                nurturing talent and creating impact.
              </motion.p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="glass rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 group"
                >
                  <stat.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
