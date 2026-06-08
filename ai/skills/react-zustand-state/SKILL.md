---
name: react-zustand-state
description: Global client state with Zustand — defining a typed store, selecting state in components, and reading/updating state outside React via getState().
metadata:
  version: "1.0"
  framework: react
  related-skills:
    - react-error-handling
tier: 2
triggers:
  - state
  - store
  - zustand
  - global state
  - getState
  - notifications
summary: |
  Stores live in src/stores. Define with create<T>()((set) => ({...})). Read in
  components with the hook + a selector to avoid extra re-renders. Read/write
  outside React (e.g. the Axios client) with useStore.getState(). Keep stores
  small and domain-focused; prefer TanStack Query for server state, Zustand for
  pure client/UI state.
---

# Global state (Zustand)

## Overview

| Aspect       | Details                                            |
| ------------ | -------------------------------------------------- |
| Goal         | Lightweight global client/UI state                 |
| Location     | `src/stores`                                       |
| Example      | `src/stores/notifications.ts`                      |
| Verification | `npm run typecheck`                                |

## Critical rules

**Zustand is for client/UI state. Server data belongs in TanStack Query, not a store. Select narrowly in components. To touch state from non-React code, use `useStore.getState()`.**

## Patterns

### Define a store

```ts
import { create } from "zustand";

type CounterStore = {
  count: number;
  increment: () => void;
};

export const useCounter = create<CounterStore>(set => ({
  count: 0,
  increment: () => set(state => ({ count: state.count + 1 })),
}));
```

### Select in a component

```tsx
const count = useCounter(state => state.count); // re-renders only on count change
```

### Use outside React

```ts
// e.g. in src/lib/api-client.ts
import { useNotifications } from "@/stores/notifications";

useNotifications.getState().addNotification({ type: "error", title: "Failed" });
```

## Common mistakes

| Mistake                                | Fix                                          |
| -------------------------------------- | -------------------------------------------- |
| Caching server data in a store         | Use TanStack Query                           |
| `const store = useStore()` (no select) | `useStore(s => s.thing)`                     |
| Mutating state directly                | Return a new object from `set`               |

## Checklist

- [ ] Store is client/UI state, not server data
- [ ] Components select narrowly
- [ ] Non-React access uses `getState()`
