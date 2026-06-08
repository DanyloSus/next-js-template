---
name: tanstack-query-ssr
description: Data fetching with TanStack Query v5 + Axios — typed query/mutation option factories per feature, and SSR prefetch + HydrationBoundary so server-rendered data hydrates without refetching.
metadata:
  version: "1.0"
  framework: nextjs
  related-skills:
    - project-architecture
    - next-app-router
tier: 1
triggers:
  - fetch
  - data fetching
  - query
  - mutation
  - useQuery
  - useMutation
  - api
  - axios
  - cache
  - prefetch
  - hydration
summary: |
  Use the shared Axios instance from @/lib/api-client (interceptors handle
  headers + error toasts). Per feature, define a request fn + a queryOptions
  factory + a use* hook in features/<name>/api. For SSR, prefetch with the
  request-scoped getQueryClient() in a Server Component and wrap children in
  <HydrationBoundary state={dehydrate(queryClient)}>. staleTime>0 prevents an
  immediate client refetch.
---

# TanStack Query + Axios (SSR-ready)

## Overview

| Aspect       | Details                                                  |
| ------------ | -------------------------------------------------------- |
| Goal         | Typed, cached data fetching that works with SSR          |
| Client       | `@/lib/api-client` (Axios + interceptors)                |
| QueryClient  | `@/lib/react-query` → `getQueryClient()`                 |
| Verification | `npm run build`, `npm run typecheck`                     |

## Critical rules

**One request fn + one `queryOptions` factory + one hook per query, colocated in `features/<name>/api/`. For SSR, prefetch with `getQueryClient()` on the server and hydrate with `<HydrationBoundary>`. Never `new QueryClient()` in a component — use `getQueryClient()`.**

## Patterns

### Feature query module

```ts
// src/features/discussions/api/get-discussions.ts
import { queryOptions, useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { QueryConfig } from "@/lib/react-query";

export type Discussion = { id: string; title: string };

export const getDiscussions = (): Promise<Discussion[]> =>
  api.get("/discussions");

export const getDiscussionsQueryOptions = () =>
  queryOptions({ queryKey: ["discussions"], queryFn: getDiscussions });

export const useDiscussions = (
  queryConfig?: QueryConfig<typeof getDiscussionsQueryOptions>
) => useQuery({ ...getDiscussionsQueryOptions(), ...queryConfig });
```

### SSR prefetch + hydrate

```tsx
// src/app/[locale]/discussions/page.tsx (Server Component)
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { getDiscussionsQueryOptions } from "@/features/discussions/api/get-discussions";
import { getQueryClient } from "@/lib/react-query";

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getDiscussionsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* client components calling useDiscussions() hydrate instantly */}
    </HydrationBoundary>
  );
}
```

### Mutation

```ts
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/api-client";
import type { MutationConfig } from "@/lib/react-query";

export const createDiscussion = (data: { title: string }) =>
  api.post("/discussions", data);

export const useCreateDiscussion = (
  config?: MutationConfig<typeof createDiscussion>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDiscussion,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["discussions"] }),
    ...config,
  });
};
```

## Common mistakes

| Mistake                                  | Fix                                            |
| ---------------------------------------- | ---------------------------------------------- |
| `new QueryClient()` in a component       | `getQueryClient()` (singleton in browser)      |
| Constructing a raw `axios` instance      | Import `api` from `@/lib/api-client`           |
| `staleTime: 0` with SSR                  | Keep `staleTime > 0` to avoid instant refetch  |
| Prefetch in a Client Component           | Prefetch in a Server Component, then hydrate    |

## Checklist

- [ ] Request fn + `queryOptions` + hook colocated in the feature's `api/`
- [ ] Uses shared `api` client
- [ ] SSR pages prefetch + wrap in `HydrationBoundary`
- [ ] Mutations invalidate the right query keys
