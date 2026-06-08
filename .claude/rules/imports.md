---
name: imports
description: Absolute @/ imports, grouped and alphabetized; no deep relative paths.
tier: 0
---

# Imports

**Use `@/` absolute imports. Never use deep relative paths (`../../`). Imports are grouped and alphabetized with one blank line between groups.**

## Why

Absolute imports survive file moves and read consistently; ordered groups make diffs and merges cleaner.

## Do

```ts
import { useState } from "react";
import { notFound } from "next/navigation";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { api } from "@/lib/api-client";

import { localThing } from "./local-thing";
```

Group order: builtin/react/next → external → internal (`@/`) → parent/sibling → index → object.

## Don't

```ts
import { api } from "../../../lib/api-client"; // deep relative — banned
```

## Enforcement

`import/order`, `import/newline-after-import`, `no-restricted-imports` (bans `../../*`), `no-duplicate-imports`. Auto-fixable with `eslint --fix`.
