"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

// ─── REUSABLE SKELETON PRIMITIVES ──────────────────────────────────────────

export function SkeletonHeader({
  hasAction = true,
  className,
}: {
  hasAction?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>
      {hasAction && <Skeleton className="h-10 w-36 rounded-lg shrink-0" />}
    </div>
  );
}

export function SkeletonStats({
  count = 4,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8",
        className
      )}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-border/50 bg-card/50 p-6 space-y-4"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-4 w-12 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({
  rows = 6,
  cols = 5,
  className,
}: {
  rows?: number;
  cols?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border/50 bg-card/40 overflow-hidden",
        className
      )}
    >
      <div className="p-4 border-b border-border/40 flex items-center justify-between gap-4">
        <Skeleton className="h-10 w-72 rounded-lg" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 w-24 rounded-lg" />
        </div>
      </div>
      <div className="p-4 border-b border-border/30 bg-muted/20 flex gap-4">
        {[...Array(cols)].map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      <div className="divide-y divide-border/20">
        {[...Array(rows)].map((_, r) => (
          <div key={r} className="p-4 flex items-center gap-4">
            {[...Array(cols)].map((_, c) => (
              <Skeleton key={c} className="h-4 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SkeletonCardGrid({
  count = 6,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="rounded-3xl border border-border/50 bg-card/40 overflow-hidden space-y-4 p-5"
        >
          <Skeleton className="h-48 w-full rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-border/30">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-9 w-24 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonForm({
  fields = 5,
  className,
}: {
  fields?: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl mx-auto rounded-3xl border border-border/50 bg-card/40 p-6 md:p-8 space-y-6",
        className
      )}
    >
      <SkeletonHeader hasAction={false} />
      <div className="space-y-5">
        {[...Array(fields)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        ))}
      </div>
      <div className="pt-4 flex justify-end gap-3 border-t border-border/30">
        <Skeleton className="h-10 w-24 rounded-lg" />
        <Skeleton className="h-10 w-36 rounded-lg" />
      </div>
    </div>
  );
}

export function SkeletonDetail({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-8", className)}>
      <SkeletonHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-72 w-full rounded-3xl" />
          <div className="rounded-2xl border border-border/50 bg-card/40 p-6 space-y-4">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/50 bg-card/40 p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonEditor({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-6", className)}>
      <SkeletonHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Skeleton className="h-11 w-full rounded-xl" />
          <div className="rounded-2xl border border-border/50 bg-card/40 overflow-hidden">
            <div className="p-3 border-b border-border/40 bg-muted/20 flex gap-2">
              {[...Array(8)].map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-lg" />
              ))}
            </div>
            <Skeleton className="h-80 w-full" />
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/50 bg-card/40 p-6 space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-full rounded-lg" />
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── UNIFIED PAGE SKELETON (DRY & DECOUPLED ARCHETYPES) ──────────────────────

export type PageSkeletonVariant =
  | "dashboard"
  | "stats-grid"
  | "stats-table"
  | "card-grid"
  | "table"
  | "detail"
  | "form"
  | "editor";

export interface PageSkeletonProps {
  variant?: PageSkeletonVariant;
  header?: boolean;
  statsCount?: number;
  itemCount?: number;
  className?: string;
  children?: React.ReactNode;
}

export function PageSkeleton({
  variant = "card-grid",
  header = true,
  statsCount,
  itemCount,
  className,
  children,
}: PageSkeletonProps) {
  if (children) {
    return (
      <div className={cn("w-full animate-pulse space-y-8", className)}>
        {header && <SkeletonHeader />}
        {children}
      </div>
    );
  }

  return (
    <div className={cn("w-full animate-pulse space-y-8", className)}>
      {header && variant !== "form" && <SkeletonHeader />}

      {(() => {
        switch (variant) {
          case "dashboard":
            return (
              <div className="space-y-8">
                <SkeletonStats count={statsCount ?? 4} />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card/40 p-6 space-y-4">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-64 w-full rounded-xl" />
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-card/40 p-6 space-y-4">
                    <Skeleton className="h-6 w-32" />
                    <div className="space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="flex gap-3 items-center py-2 border-b border-border/20 last:border-0"
                        >
                          <Skeleton className="h-8 w-8 rounded-full shrink-0" />
                          <div className="space-y-1.5 flex-1">
                            <Skeleton className="h-3.5 w-full" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );

          case "stats-grid":
            return (
              <div className="space-y-8">
                <SkeletonStats count={statsCount ?? 3} />
                <SkeletonCardGrid count={itemCount ?? 6} />
              </div>
            );

          case "stats-table":
            return (
              <div className="space-y-8">
                <SkeletonStats count={statsCount ?? 4} />
                <SkeletonTable rows={itemCount ?? 8} />
              </div>
            );

          case "table":
            return <SkeletonTable rows={itemCount ?? 8} />;

          case "card-grid":
            return <SkeletonCardGrid count={itemCount ?? 6} />;

          case "detail":
            return <SkeletonDetail />;

          case "form":
            return <SkeletonForm fields={itemCount ?? 5} />;

          case "editor":
            return <SkeletonEditor />;

          default:
            return <SkeletonCardGrid count={itemCount ?? 6} />;
        }
      })()}
    </div>
  );
}
