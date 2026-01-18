"use client";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Phone,
  Twitter,
  Linkedin,
  Instagram,
  ArrowUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const socialLinks = [
  {
    icon: Twitter,
    href: "https://x.com/@cooutechies",
    label: "Twitter",
    color: "hover:bg-[#1DA1F2]",
  },
  {
    icon: Instagram,
    href: "#",
    label: "Instagram",
    color:
      "hover:bg-gradient-to-br hover:from-[#f58529] hover:via-[#dd2a7b] hover:to-[#8134af]",
  },
  { icon: Linkedin, href: "#", label: "LinkedIn", color: "hover:bg-[#0077B5]" },
];

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Vision", href: "/#vision" },
  { name: "Contact", href: "/#contact" },
  { name: "Events", href: "/events" },
  { name: "Biography", href: "/biography" },
  { name: "Join The Community", href: "/register" },
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
    <footer id="footer" className="relative pt-20 pb-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-linear-to-b from-muted/30 via-background to-background" />

      {/* Circuit pattern overlay */}
      <div className="absolute inset-0 circuit-pattern opacity-40" />

      {/* Top gradient line with glow */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary to-transparent shadow-[0_0_20px_rgba(34,197,94,0.5)]" />

      {/* Floating orbs */}
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

      <div className="container mx-auto px-4 relative z-10">
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
                <Link
                  href="mailto:cooutechies@gmail.com?subject=Community%20Enquiries&body=Hello%20Team%2C%0AI%E2%80%99m%20reaching%20out%20regarding%20a%20question%20%2F%20sponsorship%20%2F%20general%20enquiry%20about%20the%20community.%0APlease%20find%20the%20details%20below%3A%0A%0AName%3A%0AEmail%3A%0AMessage%3A%0A%0AThank%20you."
                  className="hover:text-primary transition-colors text-sm"
                >
                  contact@cooutechies.com
                </Link>
              </li>
              {/* <li className="flex items-center gap-3 text-muted-foreground group">
                <Phone className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+234 XXX XXX XXXX</span>
              </li> */}
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
            <span className="text-primary animate-pulse">💚</span> by{" "}
            <a
              href="https://legend4tech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              legend4tech
            </a>
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
