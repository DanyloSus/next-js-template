---
name: vitest-testing-library
description: Unit and component testing with Vitest + Testing Library — the renderApp provider wrapper, role-based queries, and user-event interactions.
metadata:
  version: "1.0"
  framework: react
  related-skills:
    - playwright-e2e
    - tanstack-query-ssr
tier: 2
triggers:
  - test
  - unit test
  - vitest
  - testing library
  - render
  - mock
  - spec
summary: |
  Tests live next to the code as *.test.tsx (Vitest, jsdom). Render components
  with renderApp() from @/testing/test-utils (wraps QueryClientProvider, returns
  a user-event instance). Query by role/label/text, not test ids. Test behavior,
  not implementation. Async Server Components aren't unit-testable — cover those
  with Playwright E2E.
---

# Unit/component testing (Vitest + Testing Library)

## Overview

| Aspect       | Details                                       |
| ------------ | --------------------------------------------- |
| Goal         | Fast, behavior-focused component tests         |
| Runner       | Vitest (jsdom), `npm run test`                |
| Helper       | `renderApp` from `@/testing/test-utils`        |
| Verification | `npm run test`                                 |

## Critical rules

**Use `renderApp()` so components get the QueryClient provider. Query by accessible role/label/text — avoid `data-testid` unless there's no accessible handle. Assert on what the user sees/does, not internal state. Don't try to unit-test async Server Components — use E2E.**

## Pattern

```tsx
import { describe, expect, it, vi } from "vitest";

import { renderApp, screen } from "@/testing/test-utils";

import { Button } from "./button";

describe("Button", () => {
  it("calls onClick when pressed", async () => {
    const onClick = vi.fn();
    const { user } = renderApp(<Button onClick={onClick}>Press</Button>);

    await user.click(screen.getByRole("button", { name: /press/i }));

    expect(onClick).toHaveBeenCalledOnce();
  });
});
```

## Common mistakes

| Mistake                               | Fix                                        |
| ------------------------------------- | ------------------------------------------ |
| Bare RTL `render` for app components  | `renderApp` (adds providers)               |
| `getByTestId` everywhere              | `getByRole`/`getByLabelText`/`getByText`   |
| `fireEvent` for user flows            | `user` from user-event                     |
| Asserting on state/props internals    | Assert on rendered output / behavior       |
| Unit-testing an async RSC             | Write a Playwright test instead            |

## Checklist

- [ ] Rendered with `renderApp`
- [ ] Accessible queries
- [ ] Interactions via `user-event`
- [ ] `npm run test` passes
