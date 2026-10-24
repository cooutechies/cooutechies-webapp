"use client";

import React from "react";
import Link from "next/link";
import { FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ComponentType<{ className?: string }>;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
  variant?: "page" | "card" | "compact";
  className?: string;
}

export function EmptyState({
  icon: Icon = FolderOpen,
  title,
  description,
  action,
  secondaryAction,
  variant = "card",
  className,
}: EmptyStateProps) {
  const isCompact = variant === "compact";
  const isPage = variant === "page";

  const ActionIcon = action?.icon || Plus;

  return (
    <div
      className={cn(
        "rounded-3xl border border-dashed border-border/70 bg-card/30 backdrop-blur-md text-center flex flex-col items-center justify-center relative overflow-hidden",
        isCompact ? "p-6 space-y-3" : "p-8 md:p-14 space-y-6",
        isPage && "min-h-[50vh] max-w-3xl mx-auto my-8",
        className
      )}
    >
      {/* Decorative ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      {/* Themed Icon Badge */}
      <div
        className={cn(
          "rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center relative z-10 transition-transform hover:scale-105 duration-300",
          isCompact ? "w-12 h-12" : "w-16 h-16"
        )}
      >
        <Icon className={isCompact ? "h-6 w-6" : "h-8 w-8"} />
      </div>

      {/* Copy */}
      <div className="space-y-2 max-w-md relative z-10">
        <h4
          className={cn(
            "font-bold font-display tracking-tight text-foreground",
            isCompact ? "text-base" : "text-xl md:text-2xl"
          )}
        >
          {title}
        </h4>
        <p
          className={cn(
            "text-muted-foreground leading-relaxed",
            isCompact ? "text-xs" : "text-sm md:text-base"
          )}
        >
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      {(action || secondaryAction) && (
        <div className="flex flex-wrap items-center justify-center gap-3 relative z-10 pt-2">
          {action && (
            action.href ? (
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-5 gap-2 shadow-sm"
              >
                <Link href={action.href}>
                  <ActionIcon className="h-4 w-4" />
                  {action.label}
                </Link>
              </Button>
            ) : (
              <Button
                onClick={action.onClick}
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-5 gap-2 shadow-sm"
              >
                <ActionIcon className="h-4 w-4" />
                {action.label}
              </Button>
            )
          )}

          {secondaryAction && (
            secondaryAction.href ? (
              <Button asChild variant="outline" className="rounded-xl px-5 border-border/60">
                <Link href={secondaryAction.href}>{secondaryAction.label}</Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={secondaryAction.onClick}
                className="rounded-xl px-5 border-border/60"
              >
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}
