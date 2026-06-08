---
name: shadcn-ui-component
description: Add or author shadcn/ui-style components — Radix primitives + Tailwind v4 tokens, the cn() helper, cva variants, forwardRef, and the asChild pattern.
metadata:
  version: "1.0"
  framework: react
  related-skills:
    - react-hook-form-zod
tier: 1
triggers:
  - component
  - button
  - dialog
  - shadcn
  - ui
  - variant
  - cva
  - tailwind
  - radix
summary: |
  UI primitives live in src/components/ui. Pull official ones with
  `npx shadcn@latest add <name>` (components.json is configured). Author new
  ones with cn() from @/utils/cn, cva for variants, React.forwardRef, and the
  asChild + Radix Slot pattern. Use semantic Tailwind tokens (bg-primary,
  text-muted-foreground) defined in src/app/globals.css — never hardcoded hex.
---

# shadcn/ui components

## Overview

| Aspect       | Details                                          |
| ------------ | ------------------------------------------------ |
| Goal         | Consistent, themeable, accessible primitives     |
| Location     | `src/components/ui`                              |
| Helpers      | `cn()` from `@/utils/cn`, `cva`, Radix Slot      |
| Verification | Storybook story + `npm run build`               |

## Critical rules

**Use semantic theme tokens (`bg-primary`, `text-muted-foreground`, `border-input`) from `globals.css` — never hardcoded colors. Merge classes with `cn()`. Expose variants via `cva`. `forwardRef` for DOM components. Support `asChild` (Radix `Slot`) when a component should be able to render as a link/other element.**

## Add an official component

```bash
npx shadcn@latest add dialog
```

## Author a new component

```tsx
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/cn";

const badgeVariants = cva("inline-flex items-center rounded-md px-2 py-0.5 text-xs", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      outline: "border border-input text-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  asChild?: boolean;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "span";

    return (
      <Comp ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
    );
  }
);
Badge.displayName = "Badge";
```

> When `asChild` is set, render `children` directly (a single element). Don't inject extra siblings (icons/spinners) into a `Slot` — it accepts one child.

## Common mistakes

| Mistake                              | Fix                                       |
| ------------------------------------ | ----------------------------------------- |
| `className="bg-[#fff]"`              | Use tokens: `bg-background`               |
| String-concatenating classNames      | `cn(...)`                                 |
| Conditional sibling inside a `Slot`  | Render only `children` when `asChild`     |
| Per-variant boolean props            | One `variant` prop via `cva`              |

## Checklist

- [ ] Lives in `src/components/ui`
- [ ] Semantic tokens, `cn()`, `cva` variants
- [ ] `forwardRef` + `displayName`
- [ ] `asChild`/`Slot` renders a single child
