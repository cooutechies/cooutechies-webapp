import React from "react";
import { Sparkles } from "lucide-react";

interface AdminPageLayoutProps {
  title: string | React.ReactNode;
  description: string | React.ReactNode;
  icon?: React.ReactNode;
  actionButton?: React.ReactNode;
  children: React.ReactNode;
  headerContent?: React.ReactNode; // Optional additional header content
}

export function AdminPageLayout({
  title,
  description,
  icon,
  actionButton,
  children,
  headerContent,
}: AdminPageLayoutProps) {
  return (
    <div className="flex flex-col h-full relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header with glassmorphic effect */}
      <div className="z-10 px-6 py-6 border-b border-border/50 sticky top-0 glass backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 shrink-0">
                {icon}
              </div>
            )}
            <div>
              {typeof title === "string" ? (
                <h1 className="text-3xl md:text-4xl font-display font-bold">
                  <span className="text-gradient">{title}</span>
                </h1>
              ) : (
                title
              )}
              <p className="text-muted-foreground text-sm mt-0.5">
                {description}
              </p>
            </div>
          </div>
          {actionButton && <div>{actionButton}</div>}
        </div>
        {headerContent}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
