---
name: project-architecture
description: Where code belongs in this template — routes, feature slices, and shared layers under src/ — plus the import boundaries between them.
metadata:
  version: "1.0"
  framework: nextjs
  related-skills:
    - next-app-router
    - tanstack-query-ssr
tier: 1
triggers:
  - where does this go
  - folder structure
  - feature
  - module
  - architecture
  - new feature
summary: |
  Feature-based architecture under src/. Routes in src/app/[locale]. Reusable
  slices in src/features/<name>/{api,components,hooks,types}. Shared code lives
  directly under src/ (components, lib, hooks, stores, utils, types) — no
  shared/ wrapper. Features must NOT import other features; routes compose them.
  Never use deep relative imports — use @/.
---

# Project architecture

## Overview

| Aspect       | Details                                              |
| ------------ | ---------------------------------------------------- |
| Goal         | Predictable placement + clean dependency direction   |
| When         | Adding any new file; deciding where code lives       |
| Verification | `npm run lint` (import rules), `npm run build`        |

## Critical rules

**Features are self-contained and never import each other. Shared code lives directly under `src/`. Compose features at the route level (`src/app`).**

## Layout

```
src/
├── app/[locale]/   # routes, layout, error/not-found, providers
├── components/
│   ├── ui/         # shadcn-style primitives
│   └── errors/     # error fallbacks
├── config/         # env.ts (validated)
├── features/<name>/{api,components,hooks,types}
├── hooks/          # shared hooks
├── i18n/           # next-intl
├── lib/            # api-client, react-query
├── stores/         # zustand
├── types/          # shared types
└── utils/          # cn, helpers
```

## Dependency direction

- `src/app/**` may import from any feature and any shared layer.
- `src/features/a/**` may import shared (`@/lib`, `@/components`, ...) but **not** `src/features/b/**`.
- Shared layers (`@/lib`, `@/utils`, ...) must not import from `features` or `app`.
- If two features need the same thing, lift it into a shared `src/` folder.

## Common mistakes

| Mistake                              | Fix                                         |
| ------------------------------------ | ------------------------------------------- |
| Feature imports another feature      | Lift shared code to `src/`                  |
| `import x from "../../../lib/..."`   | Use `@/lib/...`                             |
| Business logic in `page.tsx`         | Keep pages thin; put logic in features/libs |
| New `shared/` wrapper folder         | Put shared code directly under `src/`       |

## Checklist

- [ ] File is under the correct `src/` layer
- [ ] No cross-feature import
- [ ] All imports use `@/` (no `../../`)
