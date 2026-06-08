---
name: next-intl-i18n
description: Internationalization with next-intl — routing config, message catalogs, useTranslations, locale-aware navigation, and the proxy.ts locale negotiation.
metadata:
  version: "1.0"
  framework: nextjs
  related-skills:
    - next-app-router
tier: 2
triggers:
  - i18n
  - translation
  - locale
  - next-intl
  - useTranslations
  - language
  - messages
summary: |
  Locale-prefixed routing. Add a locale in src/i18n/routing.ts and a matching
  locales/<locale>.json. Read strings with useTranslations("Namespace") (works
  in server and client components). Navigate with Link/redirect from
  @/i18n/navigation (NOT next/link). Root layout sets the locale via
  setRequestLocale and wraps children in NextIntlClientProvider. Locale
  negotiation runs in src/proxy.ts.
---

# Internationalization (next-intl)

## Overview

| Aspect       | Details                                         |
| ------------ | ----------------------------------------------- |
| Goal         | Localized UI with locale-prefixed URLs          |
| Config       | `src/i18n/{routing,request,navigation}.ts`      |
| Messages     | `locales/<locale>.json`                          |
| Verification | `npm run build`                                  |

## Critical rules

**Add strings to `locales/<locale>.json`, not inline. Use `useTranslations("Namespace")` for text. Use `Link`/`redirect`/`useRouter` from `@/i18n/navigation` — never `next/link` — so locale prefixes are preserved.**

## Patterns

### Add a locale

```ts
// src/i18n/routing.ts
export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
});
```

Then create `locales/fr.json` mirroring `en.json`.

### Use translations

```tsx
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations("HomePage");

  return <h1>{t("title")}</h1>;
}
```

### Locale-aware navigation

```tsx
import { Link } from "@/i18n/navigation";

<Link href="/about">About</Link>; // becomes /en/about, /fr/about, ...
```

## Common mistakes

| Mistake                          | Fix                                       |
| -------------------------------- | ----------------------------------------- |
| Hardcoded UI strings             | Add keys to `locales/*.json`              |
| `import Link from "next/link"`   | `import { Link } from "@/i18n/navigation"`|
| New locale without a catalog     | Add `locales/<locale>.json`               |
| Creating `middleware.ts`         | Locale routing lives in `src/proxy.ts`    |

## Checklist

- [ ] New strings added to every locale catalog
- [ ] Navigation uses `@/i18n/navigation`
- [ ] `npm run build` passes
