/**
 * Admin Sidebar Navigation Component
 * Sleek collapsible sidebar with icon-only mode
 * Modern glassmorphic design with smooth animations
 * Matches the dashboard overview aesthetic
 */

"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Calendar,
  Users,
  Mail,
  Zap,
  Settings,
  Menu,
  X,
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
  { href: "/admin", label: "Overview", icon: BarChart3 },
  { href: "/admin/events", label: "Events", icon: Calendar },
  { href: "/admin/registrations", label: "All Registrations", icon: Users },
  { href: "/admin/emails", label: "Emails", icon: Mail },
  { href: "/admin/automation", label: "Automation", icon: Zap },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(true);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [pathname, isMobile]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const currentTheme = mounted ? resolvedTheme : "light";

  return (
    <>
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50 glass backdrop-blur-xl border border-border/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{
          width: isCollapsed ? "80px" : "256px",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-0 top-0 h-screen glass backdrop-blur-xl border-r border-border/50 transition-transform duration-300 z-40 md:relative md:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Background gradient effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        {/* Header */}
        <div className="relative p-6 border-b border-border/50 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                Techies Admin
              </motion.h1>
            )}
          </AnimatePresence>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-2 rounded-lg hover:bg-muted/50 transition-all duration-300 group relative"
            aria-label="Toggle sidebar"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto relative">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href}>
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group overflow-hidden",
                    isActive
                      ? "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary shadow-lg shadow-primary/20"
                      : "text-foreground hover:bg-muted/50"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <div className="relative z-10 flex items-center justify-center">
                    <Icon
                      className={cn(
                        "h-5 w-5 transition-all duration-300",
                        isActive
                          ? "text-primary scale-110"
                          : "text-muted-foreground group-hover:text-primary group-hover:scale-110"
                      )}
                    />
                  </div>

                  {/* Label */}
                  <AnimatePresence mode="wait">
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          "font-medium text-sm relative z-10 transition-colors duration-300",
                          isActive ? "text-primary" : ""
                        )}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Glow effect on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0 blur-xl",
                      isActive
                        ? "bg-gradient-to-r from-primary/30 to-secondary/30"
                        : "bg-muted/30"
                    )}
                  />
                </motion.button>
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle - Bottom */}
        <div className="relative p-4 border-t border-border/50">
          <motion.button
            onClick={toggleTheme}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-all duration-300 group relative overflow-hidden",
              !isCollapsed && "justify-between"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{
                background: [
                  "linear-gradient(to right, rgba(var(--primary), 0.2), rgba(var(--secondary), 0.2))",
                  "linear-gradient(to right, rgba(var(--secondary), 0.2), rgba(var(--primary), 0.2))",
                  "linear-gradient(to right, rgba(var(--primary), 0.2), rgba(var(--secondary), 0.2))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Icon with rotation animation */}
            <div className="relative z-10 flex items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                {mounted && currentTheme === "dark" ? (
                  <motion.div
                    key="moon"
                    initial={{ y: -20, opacity: 0, rotate: -180 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Moon className="h-5 w-5 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ y: 20, opacity: 0, rotate: 180 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: -20, opacity: 0, rotate: -180 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <Sun className="h-5 w-5 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Label when expanded */}
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 flex-1 flex items-center justify-between"
                >
                  <span className="font-medium text-sm text-foreground">
                    Theme
                  </span>
                  <motion.div
                    className="px-2 py-1 rounded-md bg-muted/50 backdrop-blur-sm"
                    layout
                  >
                    <span className="text-xs font-medium text-muted-foreground">
                      {mounted && (
                        <motion.span
                          key={currentTheme}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -10, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {currentTheme === "dark" ? "🌙" : "☀️"}
                        </motion.span>
                      )}
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Particle effect on click */}
            <motion.div
              className="absolute inset-0 rounded-xl"
              initial={{ scale: 0, opacity: 1 }}
              whileTap={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl" />
            </motion.div>
          </motion.button>
        </div>

        {/* Gradient accent line */}
        <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-50" />
      </motion.aside>
    </>
  );
}
