# Next.js Template

A general-purpose Next.js starter inspired by
[bulletproof-react](https://github.com/alan2207/bulletproof-react). It ships the
scaffolding (data layer, forms, UI, tooling, testing) without any demo domain —
delete nothing, just build your features.

> **Heads up:** this uses Next.js 16 (App Router). Conventions may differ from
> older versions. The version-matched docs live in
> `node_modules/next/dist/docs/` — see `AGENTS.md`.

## Stack

| Concern        | Choice                                                      |
| -------------- | ----------------------------------------------------------- |
| Framework      | Next.js 16 (App Router) + React 19                          |
| Styling        | Tailwind CSS v4                                              |
| UI components  | shadcn/ui style (Radix + CVA), in `src/components/ui`        |
| Data fetching  | TanStack Query v5 + Axios (`src/lib`), SSR-ready             |
| Forms          | React Hook Form + Zod (`src/components/ui/form.tsx`)         |
| State          | Zustand (`src/stores`)                                       |
| Errors         | `react-error-boundary` + App Router error files             |
| Env            | Zod-validated (`src/config/env.ts`)                         |
| i18n           | next-intl, locale-prefixed routing (`src/i18n`, `locales/`) |
| Assets         | SVGR — import `.svg` as React components (Turbopack)        |
| Testing        | Vitest + Testing Library (unit), Playwright (e2e)           |
| Stories        | Storybook                                                   |
| Tooling        | Prettier, ESLint (strict, type-aware), Husky, lint-staged, Commitlint, Plop, EditorConfig |

## Project structure

```
src/
├── app/
│   └── [locale]/ # locale-prefixed routes, layout, error files, providers
├── components/
│   ├── ui/       # shadcn-style reusable components
│   └── errors/   # error boundary fallbacks
├── config/       # env.ts and other config
├── features/     # feature-based slices (see src/features/README.md)
├── hooks/        # shared hooks
├── i18n/         # next-intl routing, request config, navigation
├── lib/          # api-client (axios), react-query setup
├── stores/       # zustand stores
├── testing/      # test setup + helpers
├── types/        # shared types
├── utils/        # shared utilities (cn, etc.)
└── proxy.ts      # Next 16 "proxy" (formerly middleware): next-intl routing
locales/          # translation message catalogs (en.json, ...)
```

Shared/cross-cutting code lives directly under `src/` (no `shared/` wrapper).
Feature-specific code lives under `src/features/<name>/`.

## Getting started

```bash
npm install
cp .env.example .env.local   # adjust values
npm run dev
```

## Scripts

| Script                    | Description                              |
| ------------------------- | ---------------------------------------- |
| `npm run dev`             | Start the dev server                     |
| `npm run build`           | Production build                         |
| `npm run start`           | Serve the production build               |
| `npm run lint`            | ESLint                                   |
| `npm run typecheck`       | TypeScript, no emit                      |
| `npm run format`          | Prettier write                           |
| `npm run test`            | Unit tests (Vitest, one-shot)            |
| `npm run test:watch`      | Unit tests in watch mode                 |
| `npm run test:e2e`        | Playwright E2E (boots the dev server)    |
| `npm run storybook`       | Storybook on :6006                       |
| `npm run build-storybook` | Build static Storybook                   |
| `npm run generate`        | Scaffold a component/feature (Plop)      |
| `npm run sync:ai`         | Regenerate `.claude/` from `ai/`         |

## AI knowledge base

Coding-agent guidance lives in `ai/` (source of truth) and is mirrored to
`.claude/` for Claude Code via `npm run sync:ai`:

- `ai/rules/` — always-on constraints (mirror the ESLint config).
- `ai/skills/<id>/SKILL.md` — task playbooks: `project-architecture`,
  `next-app-router`, `tanstack-query-ssr`, `react-hook-form-zod`,
  `shadcn-ui-component`, `next-intl-i18n`, `react-zustand-state`,
  `react-error-handling`, `vitest-testing-library`, `playwright-e2e`,
  `conventional-commits`.
- `ai/agents/` — `code-reviewer`, `test-writer`, `docs-keeper`.

Edit under `ai/`, then `npm run sync:ai`. `.claude/` is generated — don't edit it
directly. See `ai/README.md`.

## Data fetching & SSR

`src/lib/react-query.ts` exposes `getQueryClient()` — a fresh client per request
on the server, a singleton in the browser. Prefetch in Server Components and
wrap children in `<HydrationBoundary>`; client components using the query hooks
hydrate without a refetch. Full pattern in
[`src/features/README.md`](./src/features/README.md).

`src/lib/api-client.ts` is a shared Axios instance with request/response
interceptors. Browser-only behavior (toasts, redirects) is guarded so it's safe
on the server.

## Adding UI components

Components follow the [shadcn/ui](https://ui.shadcn.com) convention and live in
`src/components/ui`. `components.json` is configured, so you can also pull in
official components:

```bash
npx shadcn@latest add dialog
```

## Internationalization

[next-intl](https://next-intl.dev) with locale-prefixed routing. Add a locale to
`src/i18n/routing.ts` and a matching `locales/<locale>.json`. Use translations
via `useTranslations("Namespace")`, and the locale-aware `Link`/`redirect` from
`@/i18n/navigation` instead of `next/link`. Locale negotiation runs in
`src/proxy.ts` (Next 16's renamed Middleware).

## Code style

- **Prettier**: double quotes, `trailingComma: "es5"`, `arrowParens: "avoid"`,
  Tailwind class sorting. Config in `.prettierrc.js`.
- **ESLint**: strict, type-aware flat config — enforced `import/order`, no deep
  relative imports (`../../`; use `@/`), `no-explicit-any`, boolean naming
  (`is/has/should…`), blank line before `return`, and more. Prettier runs as a
  lint rule (`prettier/prettier`). `src/components/ui/**` is exempt from the
  opinionated naming/length rules (vendored shadcn convention).
- `.editorconfig` and `.nvmrc` (Node `v26.2.0`) pin editor + runtime.

## Conventional commits

Commits are linted by Commitlint via a Husky `commit-msg` hook. Use
`type(scope): subject`, e.g. `feat(ui): add dialog component`. Allowed types:
`feat, fix, docs, style, refactor, test, chore, deps, perf, revert, ci, build`.
`pre-commit` runs lint-staged: `eslint --fix` on code, `prettier --write` on
JSON/MD/YAML/CSS.

## Notes

- Authentication/authorization is intentionally **not** included — add it to fit
  your backend.
- API mocking (MSW) is not set up; the `NEXT_PUBLIC_ENABLE_API_MOCKING` flag is
  a placeholder if you add it later.
