# Features

Each feature is a self-contained slice of the app. Keep feature code here, and
keep cross-feature/shared code in the top-level `src/` folders (`components`,
`lib`, `hooks`, `stores`, `utils`, `types`).

## Suggested structure

```
src/features/awesome-feature/
├── api/          # API request fns + TanStack Query option factories
├── components/   # components scoped to this feature
├── hooks/        # hooks scoped to this feature
├── types/        # types scoped to this feature
└── utils/        # utils scoped to this feature
```

Scaffold one with: `npm run generate` → `feature`.

## Rules of thumb

- A feature should **not** import from another feature. If two features need the
  same thing, lift it to `src/`.
- Compose features at the route level (`src/app/**`), which is allowed to import
  from any feature.
- Co-locate tests and stories next to the code they cover.

## Data layer pattern (TanStack Query + Axios)

Define a typed request fn and a query-options factory, then consume it.

```ts
// src/features/discussions/api/get-discussions.ts
import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import type { QueryConfig } from '@/lib/react-query';

export type Discussion = { id: string; title: string };

export const getDiscussions = (): Promise<Discussion[]> => {
  return api.get('/discussions');
};

export const getDiscussionsQueryOptions = () => {
  return queryOptions({
    queryKey: ['discussions'],
    queryFn: getDiscussions,
  });
};

export const useDiscussions = (
  queryConfig?: QueryConfig<typeof getDiscussionsQueryOptions>,
) => {
  return useQuery({ ...getDiscussionsQueryOptions(), ...queryConfig });
};
```

### Server-side prefetch (SSR)

In a Server Component, prefetch into the request-scoped client and hand the
dehydrated cache to the client tree:

```tsx
// src/app/discussions/page.tsx
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/lib/react-query';
import { getDiscussionsQueryOptions } from '@/features/discussions/api/get-discussions';

export default async function DiscussionsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getDiscussionsQueryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* client components calling useDiscussions() hydrate instantly */}
    </HydrationBoundary>
  );
}
```
