---
name: playwright-e2e
description: End-to-end tests with Playwright — specs in e2e/, role-based locators, web-first assertions, and the auto-started dev server via webServer.
metadata:
  version: "1.0"
  framework: nextjs
  related-skills:
    - vitest-testing-library
tier: 2
triggers:
  - e2e
  - playwright
  - end to end
  - browser test
  - integration test
summary: |
  Specs live in e2e/*.spec.ts. playwright.config.ts auto-starts the dev server
  (webServer) and sets baseURL, so use page.goto("/"). Locate by role/label/text
  via getBy* and assert with web-first matchers (await expect(locator)
  .toBeVisible()). Run with `npm run test:e2e`; first run needs
  `npx playwright install`. Use E2E for full flows and async Server Components.
---

# E2E testing (Playwright)

## Overview

| Aspect       | Details                                          |
| ------------ | ------------------------------------------------ |
| Goal         | Verify real user flows in a browser              |
| Location     | `e2e/*.spec.ts`                                  |
| Config       | `playwright.config.ts` (auto-starts dev server)  |
| Verification | `npm run test:e2e`                               |

## Critical rules

**Use `baseURL`-relative paths (`page.goto("/")`). Locate by role/label/text and assert with web-first `await expect(...)` matchers (they auto-wait) — never `page.waitForTimeout`. Keep specs independent.**

## Pattern

```ts
import { test, expect } from "@playwright/test";

test("home page renders the heading", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Next.js Template" })
  ).toBeVisible();
});
```

## Setup

```bash
npx playwright install   # once, to download browsers
npm run test:e2e
```

## Common mistakes

| Mistake                          | Fix                                          |
| -------------------------------- | -------------------------------------------- |
| `page.goto("http://localhost…")` | `page.goto("/")` (baseURL is set)            |
| `waitForTimeout(1000)`           | Web-first assertions auto-wait               |
| CSS/nth-child selectors          | `getByRole`/`getByText`/`getByLabel`         |
| Tests depending on each other    | Make each spec self-contained                |

## Checklist

- [ ] Spec in `e2e/`, relative `goto`
- [ ] Role/label/text locators
- [ ] Web-first `expect` assertions
- [ ] Passes via `npm run test:e2e`
