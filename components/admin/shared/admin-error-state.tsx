"use client";

import React from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AdminPageLayout } from "./admin-page-layout";

interface AdminErrorStateProps {
  title?: string;
  description?: string;
  error?: Error & { digest?: string };
  reset?: () => void;
  showHomeLink?: boolean;
}

export function AdminErrorState({
  title = "Something went wrong",
  description = "An error occurred while loading this page.",
  error,
  reset,
  showHomeLink = true,
}: AdminErrorStateProps) {
  return (
    <AdminPageLayout
      title={title}
      description={description}
      icon={<AlertCircle className="h-5 w-5 text-destructive" />}
    >
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center z-10 relative">
        <div className="glass p-8 rounded-3xl max-w-md w-full border-destructive/20 relative overflow-hidden group">
          <div className="absolute inset-0 bg-destructive/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="h-8 w-8 text-destructive animate-pulse" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground mb-3">{title}</h2>
            <p className="text-muted-foreground mb-8">
              {error?.message || description}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {reset && (
                <Button
                  onClick={reset}
                  className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Button>
              )}
              {showHomeLink && (
                <Button
                  variant="outline"
                  asChild
                  className="w-full sm:w-auto gap-2"
                >
                  <Link href="/admin">
                    <Home className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminPageLayout>
  );
}
