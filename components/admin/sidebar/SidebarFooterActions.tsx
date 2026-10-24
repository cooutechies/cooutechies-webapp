"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/app/actions/auth";

interface SidebarFooterActionsProps {
  isCollapsed: boolean;
  mounted: boolean;
}

export function SidebarFooterActions({
  isCollapsed,
  mounted,
}: SidebarFooterActionsProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

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
    <div className="relative border-t border-border/50">
      {/* Theme Toggle */}
      <div className="p-4 pb-2">
        <motion.button
          onClick={toggleTheme}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted/50 transition-all duration-300 group relative overflow-hidden",
            !isCollapsed && "justify-between"
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
                <span className="font-medium text-sm text-foreground">Theme</span>
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
                        {currentTheme === "dark" ? (
                          <Moon className="w-3.5 h-3.5 text-primary inline-block" />
                        ) : (
                          <Sun className="w-3.5 h-3.5 text-secondary inline-block" />
                        )}
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
            !isCollapsed && "justify-start"
          )}
          whileHover={!isLoggingOut ? { scale: 1.02, x: 4 } : {}}
          whileTap={!isLoggingOut ? { scale: 0.98 } : {}}
        >
          <motion.div className="absolute inset-0 bg-gradient-to-r from-destructive/10 to-destructive/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
  );
}
