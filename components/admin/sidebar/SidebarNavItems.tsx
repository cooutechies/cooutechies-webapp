"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { navItems } from "./navigation.config";

interface SidebarNavItemsProps {
  isCollapsed: boolean;
}

export function SidebarNavItems({ isCollapsed }: SidebarNavItemsProps) {
  const pathname = usePathname();

  return (
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
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
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

              <div
                className={cn(
                  "absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 blur-xl",
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
  );
}
