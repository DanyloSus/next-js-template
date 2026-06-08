import { defineRouting } from "next-intl/routing";

/**
 * Central i18n routing config. Add locales here and drop a matching
 * `locales/<locale>.json` file. `localePrefix` defaults to `"always"`, so URLs
 * are prefixed (e.g. `/en/...`).
 */
export const routing = defineRouting({
  locales: ["en"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
