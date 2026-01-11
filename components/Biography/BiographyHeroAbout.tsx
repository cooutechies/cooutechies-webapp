"use client";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Heart,
  Users,
  Award,
  Rocket,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroImageGallery from "@/components/sections/HeroImageGallery";
import Link from "next/link";

/**
 * BiographyHeroAbout Component
 * Displays the hero section with the image gallery and the about community section with statistics
 * Features animations and responsive grid layout
 */

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

export function BiographyHeroAbout() {
  return (
    <>
      {/* Hero Section with Image Gallery */}
      <section className="relative pt-28 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-x-1/2" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              asChild
              variant="ghost"
              className="mb-8 group hover:bg-primary/10"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Text content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6"
              >
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">
                  Our Story
                </span>
              </motion.span>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight">
                <span className="text-gradient">The Team Behind</span>
                <br />
                <span className="text-foreground">COOU Techies</span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Meet the passionate individuals driving innovation and building
                the future of tech at Chukwuemeka Odumegwu Ojukwu University.
              </p>
            </motion.div>

            {/* Hero Image Gallery */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <HeroImageGallery />
            </motion.div>
          </div>
        </div>
      </section>

      {/* About The Community Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Text content */}
            <motion.div variants={itemVariants} className="space-y-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 bg-secondary/10">
                <Heart className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-secondary">
                  About Us
                </span>
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold leading-tight">
                <span className="text-gradient">More Than</span>{" "}
                <span className="text-foreground">Just a Community</span>
              </h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  COOU Techies is the premier technology community at
                  Chukwuemeka Odumegwu Ojukwu University, dedicated to nurturing
                  the next generation of tech innovators, creators, and leaders.
                </p>
                <p>
                  Founded in 2022, we have grown from a small group of 15
                  passionate students to a vibrant community of over 500 members
                  spanning multiple departments and faculties.
                </p>
                <p>
                  Through workshops, hackathons, mentorship programs, and
                  collaborative projects, we empower students to transform their
                  ideas into reality.
                </p>
              </div>
            </motion.div>

            {/* Statistics Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-4 md:gap-6"
            >
              {[
                { icon: Users, label: "Members", value: "500+" },
                { icon: Award, label: "Awards Won", value: "12" },
                { icon: Rocket, label: "Projects", value: "80+" },
                { icon: Code, label: "Events", value: "50+" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass p-6 rounded-2xl text-center group cursor-pointer"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-3xl md:text-4xl font-display font-bold text-gradient mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
