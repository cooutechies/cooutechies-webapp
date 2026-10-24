/**
 * Admin Sidebar Navigation Component
 * Sleek collapsible sidebar with icon-only mode
 * Modern glassmorphic design with smooth animations
 */

"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronLeft, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SidebarUserProfile } from "./sidebar/SidebarUserProfile";
import { SidebarNavItems } from "./sidebar/SidebarNavItems";
import { SidebarFooterActions } from "./sidebar/SidebarFooterActions";

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

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

      {/* Sidebar Container */}
      <motion.aside
        animate={{
          width: !isMobile && isCollapsed ? "80px" : "256px",
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed left-0 top-0 h-screen glass backdrop-blur-xl border-r border-border/50 transition-transform duration-300 z-40 md:relative md:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Animated background ambient gradients */}
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

        {/* User Profile */}
        <SidebarUserProfile isCollapsed={isCollapsed} />

        {/* Navigation Items */}
        <SidebarNavItems isCollapsed={isCollapsed} />

        {/* Footer Actions (Theme + Logout) */}
        <SidebarFooterActions isCollapsed={isCollapsed} mounted={mounted} />
      </motion.aside>
    </>
  );
}
