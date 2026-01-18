/**
 * Admin Sidebar Navigation Component
 * Sleek collapsible sidebar with icon-only mode
 * Modern glassmorphic design with smooth animations
 * Enhanced with logout functionality and user profile
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
  LogOut,
  User,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { logoutAction } from "@/app/actions/auth";

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
  { href: "/admin/core-team", label: "Core Team", icon: Users },
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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
      if (!mobile) {
        setIsOpen(true);
      } else {
        setIsCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on route change (mobile)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isMobile) {
        setIsOpen(false);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname, isMobile]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutAction();
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  const currentTheme = mounted ? resolvedTheme : "light";

  return (
    <>
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 right-4 z-50 glass backdrop-blur-xl border border-border/50 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-5 w-5" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-5 w-5" />
            </motion.div>
          )}
        </AnimatePresence>
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
          width: !isMobile && isCollapsed ? "80px" : "256px",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-0 top-0 h-screen glass backdrop-blur-xl border-r border-border/50 transition-transform duration-300 z-40 md:relative md:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Animated background gradient effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"
            animate={{
              x: [0, -20, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Header */}
        <div className="relative p-6 border-b border-border/50 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-sm">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Techies Admin
                </h1>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop Collapse Toggle */}
          {!isMobile && (
            <motion.button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg hover:bg-muted/50 transition-all duration-300 group relative"
              aria-label="Toggle sidebar"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </motion.div>
            </motion.button>
          )}
        </div>

        {/* User Profile Section */}
        <div className="relative p-4 border-b border-border/50">
          <motion.div
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm",
              isCollapsed && "justify-center",
            )}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <User className="h-5 w-5 text-primary-foreground" />
              </div>
              <motion.div
                className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-background"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-semibold text-foreground truncate">
                    Admin User
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    Administrator
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
                      : "text-foreground hover:bg-muted/50",
                  )}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
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
                          : "text-muted-foreground group-hover:text-primary group-hover:scale-110",
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
                          isActive ? "text-primary" : "",
                        )}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Glow effect on hover */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 blur-xl",
                      isActive
                        ? "bg-gradient-to-r from-primary/30 to-secondary/30"
                        : "bg-muted/30",
                    )}
                  />
                </motion.button>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions Section */}
        <div className="relative border-t border-border/50">
          {/* Theme Toggle */}
          <div className="p-4 pb-2">
            <motion.button
              onClick={toggleTheme}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-all duration-300 group relative overflow-hidden",
                !isCollapsed && "justify-between",
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
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
            </motion.button>
          </div>

          {/* Logout Button */}
          <div className="p-4 pt-2">
            <motion.button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden",
                isLoggingOut
                  ? "opacity-50 cursor-not-allowed bg-muted/30"
                  : "hover:bg-destructive/10 text-destructive",
                !isCollapsed && "justify-start",
              )}
              whileHover={!isLoggingOut ? { scale: 1.02, x: 4 } : {}}
              whileTap={!isLoggingOut ? { scale: 0.98 } : {}}
            >
              {/* Background effect */}
              <motion.div className="absolute inset-0 bg-gradient-to-r from-destructive/10 to-destructive/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center">
                <motion.div
                  animate={isLoggingOut ? { rotate: 360 } : {}}
                  transition={{
                    duration: 1,
                    repeat: isLoggingOut ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <LogOut className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                </motion.div>
              </div>

              {/* Label */}
              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-medium text-sm relative z-10"
                  >
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 blur-xl bg-destructive/20" />
            </motion.button>
          </div>

          {/* Gradient accent line */}
          <motion.div
            className="h-1 bg-gradient-to-r from-primary via-secondary to-primary"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "200% 100%",
            }}
          />
        </div>
      </motion.aside>
    </>
  );
}
