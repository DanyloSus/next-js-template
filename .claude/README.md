# AI knowledge base

Single source of truth for AI coding agents working in this template.

- **`rules/`** — always-on constraints (architecture, imports, code style, naming, types, testing). Mirror the ESLint config.
- **`skills/`** — load-on-demand playbooks for specific tasks (`<id>/SKILL.md`). Each has frontmatter (`triggers`, `summary`) so an agent can decide whether to read the full file.
- **`agents/`** — subagent role definitions (code reviewer, test writer, docs keeper).
- **`templates/`** — scaffolds for authoring new rules/skills/agents.
- **`manifest.json`** — registry of everything above.

## Sync

`ai/` is canonical. Generate the Claude Code adapter with:

```bash
npm run sync:ai            # writes .claude/{rules,skills,agents,templates}
npm run sync:ai -- --clean # wipe target dirs first
npm run sync:ai -- --dry-run
```

`.claude/` is generated — edit files under `ai/` and re-sync, don't edit `.claude/` directly.

## Adding a skill

1. Copy `templates/_SKILL_TEMPLATE.md` to `skills/<id>/SKILL.md`.
2. Fill in frontmatter (`name`, `description`, `triggers`, `summary`) and body.
3. Register it in `manifest.json` under `skills`.
4. `npm run sync:ai`.
