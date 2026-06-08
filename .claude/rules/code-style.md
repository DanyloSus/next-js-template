---
name: code-style
description: Enforced style — no console.log, no nested ternary, strict equality, boolean naming, blank line before return.
tier: 0
---

# Code style

**No `console.log` (only `warn`/`error`). No nested ternaries. Strict equality (`===`). Boolean identifiers start with `is/has/should/can/did/will/are`. Blank line before `return`. Identifiers ≥ 2 chars (loop indices exempt).**

## Why

These are mechanical, ESLint-enforced rules that keep the codebase consistent and catch common bugs (loose equality, debug logs shipped to prod).

## Do

```ts
const isActive = status === "active";

if (!isActive) {
  doSomething();
}

return isActive ? <Active /> : <Inactive />;
```

## Don't

```ts
const active = status == "active"; // loose equality, bad boolean name
console.log(active); // no console.log
return a ? (b ? x : y) : z; // nested ternary
```

## Enforcement

`no-console`, `no-nested-ternary`, `eqeqeq`, `@typescript-eslint/naming-convention`, `padding-line-between-statements`, `id-length`. Prettier handles formatting (double quotes, `arrowParens: avoid`). `src/components/ui/**` is exempt from naming/length (vendored shadcn convention).
