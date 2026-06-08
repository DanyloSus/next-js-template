---
name: conventional-commits
description: Write Conventional Commit messages enforced by commitlint — allowed types, scope, and small focused commits.
metadata:
  version: "1.0"
  framework: tooling
  related-skills: []
tier: 2
triggers:
  - commit
  - git commit
  - commit message
  - conventional commits
  - changelog
summary: |
  Format: type(scope): subject. Allowed types: feat, fix, docs, style,
  refactor, test, chore, deps, perf, revert, ci, build. Enforced by commitlint
  via the Husky commit-msg hook; pre-commit runs lint-staged. Keep commits small
  and single-purpose. Subject in imperative mood, lower-case, no trailing period.
---

# Conventional commits

## Overview

| Aspect       | Details                                            |
| ------------ | -------------------------------------------------- |
| Goal         | Readable history + tool-friendly messages          |
| Enforced by  | commitlint (`commit-msg` hook), `.commitlintrc.json`|
| Pre-commit   | lint-staged (`eslint --fix` / `prettier --write`)  |

## Critical rules

**`type(scope): subject`. Use only allowed types. Subject is imperative, lower-case, no period. One logical change per commit — don't mix a refactor with a feature.**

## Types

| Type     | Use for                                  |
| -------- | ---------------------------------------- |
| feat     | new user-facing capability               |
| fix      | bug fix                                  |
| docs     | documentation only                       |
| style    | formatting, no code-meaning change       |
| refactor | code change, no behavior change          |
| test     | adding/updating tests                    |
| chore    | tooling/maintenance                      |
| deps     | dependency changes                       |
| perf     | performance improvement                  |
| revert   | revert a previous commit                 |
| ci       | CI configuration                         |
| build    | build system / bundler                   |

## Examples

```
feat(auth): add password reset form
fix(api-client): retry on network error
deps: bump next to 16.2.7
test(button): cover loading state
```

## Common mistakes

| Mistake                       | Fix                                  |
| ----------------------------- | ------------------------------------ |
| `Added login` / `update`      | `feat(auth): add login`              |
| `feature:` / `chore(deps):`   | Use `feat` / `deps`                  |
| Mixed concerns in one commit  | Split into focused commits           |
| `feat: Add Login.`            | lower-case, imperative, no period    |

## Checklist

- [ ] Allowed type
- [ ] Imperative, lower-case subject, no period
- [ ] Single logical change
