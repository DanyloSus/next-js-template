---
name: testing
description: Test behavior with Vitest + Testing Library (unit) and Playwright (E2E); colocate unit tests.
tier: 1
---

# Testing

**Unit/component tests use Vitest + Testing Library and live next to the code (`*.test.tsx`). E2E tests use Playwright in `e2e/`. Test observable behavior via accessible queries — not implementation details.**

## Do

- Render components with `renderApp` from `@/testing/test-utils`.
- Query by role/label/text; interact with `user-event`.
- Cover async Server Components and full flows with Playwright E2E.
- Keep tests independent and deterministic.

## Don't

- Assert on internal state/props or DOM structure.
- Reach for `data-testid` when an accessible query exists.
- Use `waitForTimeout` in Playwright — rely on web-first assertions.

## Enforcement

`npm run test` (Vitest), `npm run test:e2e` (Playwright), `eslint-plugin-playwright` on `e2e/**`. See the `vitest-testing-library` and `playwright-e2e` skills.
