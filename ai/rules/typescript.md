---
name: typescript
description: Strict TypeScript — no explicit any, infer where possible, validate external data with Zod.
tier: 1
---

# TypeScript

**`strict` is on. No explicit `any`. Let inference work; annotate at boundaries (props, public function returns, exported APIs). Validate all external/untrusted data with Zod.**

## Why

`any` disables the type system locally and tends to spread. External data (env, API responses, form input) is untyped at runtime — validate it.

## Do

```ts
const schema = z.object({ email: z.string().email() });
type FormValues = z.infer<typeof schema>; // single source of truth

export function getUser(id: string): Promise<User> {
  return api.get(`/users/${id}`);
}
```

## Don't

```ts
function handle(data: any) {} // banned
const user = JSON.parse(raw) as User; // unchecked cast of external data
```

Prefer `unknown` + a Zod parse over `any` or unchecked `as`.

## Enforcement

`@typescript-eslint/no-explicit-any`, `tsc --noEmit` (`npm run typecheck`), env validated in `src/config/env.ts`.
