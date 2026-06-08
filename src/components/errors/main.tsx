"use client";

import { Button } from "@/components/ui/button";

/**
 * Top-level fallback rendered by the app's React error boundary
 * (see `src/app/provider.tsx`). Catches render errors in the client tree.
 */
export const MainErrorFallback = () => {
  return (
    <div
      className="flex h-screen w-screen flex-col items-center justify-center gap-4 text-red-500"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Something went wrong :(</h2>
      <Button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
};
