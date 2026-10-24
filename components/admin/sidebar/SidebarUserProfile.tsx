"use client";

import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarUserProfileProps {
  isCollapsed: boolean;
}

export function SidebarUserProfile({ isCollapsed }: SidebarUserProfileProps) {
  return (
    <div className="relative p-4 border-b border-border/50">
      <motion.div
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm",
          isCollapsed && "justify-center"
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
  );
}
