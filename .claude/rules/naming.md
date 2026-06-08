---
name: naming
description: Naming conventions for files, components, hooks, variables, and constants.
tier: 1
---

# Naming

**kebab-case files. PascalCase components and types. camelCase variables and functions. `use`-prefixed hooks. SCREAMING_SNAKE_CASE module constants.**

## Do

| Thing            | Convention            | Example                  |
| ---------------- | --------------------- | ------------------------ |
| File             | kebab-case            | `api-client.ts`          |
| Component / type | PascalCase            | `Button`, `Discussion`   |
| Variable / fn    | camelCase             | `queryClient`, `getUser` |
| Hook             | `use` + camelCase     | `useDisclosure`          |
| Boolean          | `is/has/should/...`   | `isLoading`              |
| Constant         | SCREAMING_SNAKE_CASE  | `MAX_RETRIES`            |

## Don't

- `MyComponent.tsx` for the filename (use `my-component.tsx`).
- Magic numbers/strings inline — extract to a named constant near its owner.

## Enforcement

`@typescript-eslint/naming-convention` (booleans), review for file/casing conventions.
