<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AI knowledge base

This repo ships an AI knowledge base under `ai/` (source of truth), mirrored to
`.claude/` for Claude Code via `npm run sync:ai`.

- **Always-on rules** live in `ai/rules/` — architecture, imports, code-style,
  naming, typescript, testing. Follow them; they mirror the ESLint config.
- **Skills** (`ai/skills/<id>/SKILL.md`) are task playbooks. Load the relevant
  one before working on that area. Index:
  - `project-architecture` — where code goes + import boundaries
  - `next-app-router` — Next 16 routing, server/client, `proxy.ts`
  - `tanstack-query-ssr` — data fetching + SSR hydration
  - `react-hook-form-zod` — forms + validation
  - `shadcn-ui-component` — adding/authoring UI components
  - `next-intl-i18n`, `react-zustand-state`, `react-error-handling`
  - `vitest-testing-library`, `playwright-e2e`, `conventional-commits`
- **Agents** (`ai/agents/`): `code-reviewer`, `test-writer`, `docs-keeper`.

Edit knowledge under `ai/` (canonical), then run `npm run sync:ai`. Don't edit
`.claude/` directly — it's generated.
