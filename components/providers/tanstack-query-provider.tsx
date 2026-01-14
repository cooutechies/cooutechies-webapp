"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Reduced staleTime for more real-time feel (30 seconds instead of 5 minutes)
            staleTime: 30 * 1000,
            // Renamed from cacheTime to gcTime (garbage collection time)
            gcTime: 5 * 60 * 1000, // 5 minutes
            // Retry failed requests 1 time
            retry: 1,
            // Refetch on window focus for fresh data
            refetchOnWindowFocus: true,
            // Refetch on network reconnect for real-time sync
            refetchOnReconnect: true,
            // Refetch on mount only if data is stale
            refetchOnMount: false,
          },
          mutations: {
            // Don't retry mutations by default (prevents duplicate submissions)
            retry: 0,
            // Network mode: online-only prevents mutations when offline
            networkMode: "online",
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} position="bottom" />
      )}
    </QueryClientProvider>
  );
}
