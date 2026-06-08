---
name: react-error-handling
description: Error handling across the app — react-error-boundary in the provider, App Router error.tsx/global-error.tsx/not-found.tsx, and surfacing failures via the notifications store.
metadata:
  version: "1.0"
  framework: nextjs
  related-skills:
    - next-app-router
    - react-zustand-state
    - tanstack-query-ssr
tier: 2
triggers:
  - error
  - error boundary
  - try catch
  - notFound
  - 404
  - error.tsx
  - notification
  - toast
summary: |
  Three layers: (1) react-error-boundary in src/app/[locale]/provider.tsx
  catches client render errors with MainErrorFallback; (2) App Router files —
  error.tsx (segment, client, has reset), global-error.tsx (root, own html/
  body), not-found.tsx + notFound(); (3) the Axios client pushes error toasts to
  the notifications store. Don't swallow errors — surface them.
---

# Error handling

## Overview

| Aspect       | Details                                                  |
| ------------ | -------------------------------------------------------- |
| Goal         | Predictable, visible failure handling                    |
| Boundary     | `react-error-boundary` in `provider.tsx`                 |
| Route files  | `error.tsx`, `global-error.tsx`, `not-found.tsx`         |
| Toasts       | `@/stores/notifications` via `@/components/ui/notifications` |

## Critical rules

**Pick the right layer: render errors in a segment → `error.tsx` (with `reset`). Errors in the root layout → `global-error.tsx`. Missing resource → `notFound()` + `not-found.tsx`. Expected/async failures → handle and push a notification. Never silently `catch` and ignore.**

## Patterns

### Trigger a 404

```tsx
import { notFound } from "next/navigation";

if (!data) notFound(); // renders the nearest not-found.tsx
```

### Segment error boundary

```tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // log to your error service
  return <button onClick={() => reset()}>Try again</button>;
}
```

### Notify on a caught failure

```ts
import { useNotifications } from "@/stores/notifications";

useNotifications.getState().addNotification({
  type: "error",
  title: "Could not save",
  message: err.message,
});
```

> The shared Axios client already pushes an error toast on rejected responses (browser only). Don't duplicate it for every request.

## Common mistakes

| Mistake                                  | Fix                                         |
| ---------------------------------------- | ------------------------------------------- |
| `catch {}` that swallows the error       | Surface it (rethrow, toast, or boundary)    |
| `error.tsx` as a Server Component        | Must be `"use client"`                      |
| `global-error.tsx` without `<html>`      | It replaces the root — render html/body     |
| Manual 404 UI                            | `notFound()` + `not-found.tsx`              |

## Checklist

- [ ] Used the correct error layer
- [ ] `error.tsx` is a client component with `reset`
- [ ] No swallowed errors
