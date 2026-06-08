---
name: next-app-router
description: Next.js 16 App Router patterns — server vs client components, async params/searchParams, layouts, error/not-found files, and proxy.ts (the renamed middleware).
metadata:
  version: "1.0"
  framework: nextjs
  related-skills:
    - project-architecture
    - next-intl-i18n
    - react-error-handling
tier: 1
triggers:
  - route
  - page
  - layout
  - server component
  - client component
  - middleware
  - proxy
  - params
  - searchParams
  - app router
summary: |
  Next.js 16 App Router under src/app/[locale]. Server Components are the
  default — add "use client" only for hooks/state/events/browser APIs. In v16,
  `params` and `searchParams` are async (await them). Middleware is renamed to
  Proxy: it lives in src/proxy.ts. ALWAYS verify against the bundled docs in
  node_modules/next/dist/docs before writing routing code.
---

# Next.js — App Router (v16)

## Overview

| Aspect       | Details                                                   |
| ------------ | --------------------------------------------------------- |
| Goal         | Correct routing + server/client split on Next 16          |
| Routing dir  | `src/app/[locale]/` (locale-prefixed via next-intl)       |
| Verification | `npm run build`                                            |

## Critical rules

**Server Components are the default — only add `"use client"` when you need hooks, state, effects, event handlers, or browser APIs. In Next 16 `params`/`searchParams` are Promises; `await` them. Middleware is now `proxy.ts`.**

> Training data may be stale. Read `node_modules/next/dist/docs/` for the installed version before writing routing code (see AGENTS.md).

## Patterns

### Async params (v16)

```tsx
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  // ...
}
```

### Server vs client

```tsx
// Server Component (default): can be async, fetch data, no hooks
export default async function Page() { /* ... */ }
```

```tsx
"use client"; // needed for useState/useEffect/onClick/etc.
import { useState } from "react";
export function Counter() { /* ... */ }
```

### File conventions

| File              | Purpose                                        |
| ----------------- | ---------------------------------------------- |
| `layout.tsx`      | Shared shell (root renders `<html>/<body>`)    |
| `page.tsx`        | Route UI                                       |
| `loading.tsx`     | Suspense fallback                              |
| `error.tsx`       | Segment error boundary (`"use client"`)        |
| `global-error.tsx`| Root error boundary (renders own html/body)    |
| `not-found.tsx`   | 404 UI                                          |
| `proxy.ts`        | Request proxy (was `middleware.ts`) — in `src/`|

## Common mistakes

| Mistake                                   | Fix                                        |
| ----------------------------------------- | ------------------------------------------ |
| `const { id } = params`                   | `const { id } = await params` (v16)        |
| `"use client"` on a data-fetching page    | Keep it a Server Component                 |
| Creating `middleware.ts`                  | Use `src/proxy.ts`                         |
| Assuming old APIs from memory             | Check `node_modules/next/dist/docs/`       |

## Checklist

- [ ] Component is server-first; `"use client"` only where required
- [ ] `params`/`searchParams` awaited
- [ ] Verified API against bundled Next docs
- [ ] `npm run build` passes
