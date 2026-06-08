---
name: architecture
description: Feature-based structure under src/ with one-way dependencies; Server Components by default.
tier: 0
---

# Architecture

**Code is feature-based under `src/`. Features are self-contained and never import each other. Shared code lives directly under `src/` (no `shared/` wrapper). Server Components are the default in the App Router.**

## Why

Keeps features deletable and reasoning local; prevents tangled cross-feature dependencies; ships less client JS by defaulting to the server.

## Do

- Put a feature's code in `src/features/<name>/{api,components,hooks,types}`.
- Put cross-cutting code in `src/{components,lib,hooks,stores,utils,types,config}`.
- Compose features in routes under `src/app/[locale]`.
- Add `"use client"` only when a component needs hooks/state/events/browser APIs.

## Don't

- Import one feature from another (lift shared code to `src/`).
- Add backend/server-only secrets to client components.
- Make `page.tsx` hold business logic — keep pages thin.

## Enforcement

`no-restricted-imports` (no deep relative), review against the `project-architecture` skill, `npm run build`.
