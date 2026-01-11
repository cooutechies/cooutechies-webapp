"use client";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Github,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-[#1DA1F2]" },
  {
    icon: Instagram,
    href: "#",
    label: "Instagram",
    color:
      "hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af]",
  },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-[#0077B5]" },
  // { icon: Github, href: "#", label: "GitHub", color: "hover:bg-foreground" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Events", href: "#" },
  { name: "Projects", href: "#" },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function Footer() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const currentYear = new Date().getFullYear();

  // Handle mounting to prevent hydration mismatch
  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Get current theme for logo selection
  const currentTheme = resolvedTheme || "light";

  function getLogoSrc() {
    // Use theme-appropriate logo
    return currentTheme === "dark"
      ? "/cooutechies-logo2.png"
      : "/cooutechies-logo1.png";
  }

  return (
    <footer id="contact" className="relative pt-32 pb-8 overflow-hidden">
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

      {/* Top gradient line with glow */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(34,197,94,0.5)]" />

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
        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-secondary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative glass border border-border/50 rounded-3xl p-8 md:p-12 mb-20 text-center overflow-hidden shadow-2xl">
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
                  size="lg"
                  className="group relative overflow-hidden bg-linear-to-r from-primary to-secondary text-primary-foreground font-semibold rounded-xl px-8 py-6 shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] hover:scale-105 transition-all duration-300"
                >
                  <span className="relative z-10">Join the Community</span>
                  <div className="absolute inset-0 bg-linear-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-primary/50 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] rounded-xl px-8 py-6 font-semibold transition-all duration-300 hover:scale-105"
                >
                  Contact Us
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href="/" className="inline-block mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-primary/20 to-secondary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative px-3 py-2">
                  {mounted && (
                    <Image
                      src={getLogoSrc()}
                      alt="COOU Techies"
                      width={80}
                      height={80}
                      className="h-20 w-auto transition-transform duration-300 group-hover:scale-110"
                      priority
                    />
                  )}
                </div>
              </div>
            </Link>

            <p className="text-muted-foreground mb-6 max-w-md leading-relaxed">
              The premier technology community at Chukwuemeka Odumegwu Ojukwu
              University. Building the next generation of tech leaders in
              Africa.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 rounded-xl bg-muted/50 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] border border-border/50 hover:border-primary/50 ${social.color}`}
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-display font-bold text-foreground mb-6 text-lg flex items-center gap-2">
              <span className="w-1 h-6 bg-linear-to-b from-primary to-secondary rounded-full" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display font-bold text-foreground mb-6 text-lg flex items-center gap-2">
              <span className="w-1 h-6 bg-linear-to-b from-primary to-secondary rounded-full" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground group">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-sm leading-relaxed">
                  Chukwuemeka Odumegwu Ojukwu University, Anambra State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground group">
                <Mail className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <a
                  href="mailto:hello@cooutechies.com"
                  className="hover:text-primary transition-colors text-sm"
                >
                  hello@cooutechies.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground group">
                <Phone className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+234 XXX XXX XXXX</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50 shadow-[0_-1px_30px_rgba(34,197,94,0.05)] flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sm text-muted-foreground text-center md:text-left"
          >
            © {currentYear} COOU Techies. All rights reserved. Built with{" "}
            <span className="text-primary animate-pulse">💚</span> by the
            community
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="rounded-xl glass hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300 hover:scale-110 border border-border/50 hover:border-primary w-12 h-12 group"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
            </Button>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
