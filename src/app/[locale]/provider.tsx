"use client";

import * as React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "react-error-boundary";

import { MainErrorFallback } from "@/components/errors/main";
import { Notifications } from "@/components/ui/notifications";
import { Spinner } from "@/components/ui/spinner";
import { getQueryClient } from "@/lib/react-query";

/**
 * Client-side app providers. Mounted once in the root layout, wrapping every
 * route. Server Components can still prefetch into the same QueryClient and
 * dehydrate — see the SSR notes in README.
 */
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  // NOTE: getQueryClient() returns a stable browser singleton, so this is safe
  // to call on every render without useState.
  const queryClient = getQueryClient();

  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <QueryClientProvider client={queryClient}>
          {process.env.NODE_ENV !== "production" && <ReactQueryDevtools />}
          <Notifications />
          {children}
        </QueryClientProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
