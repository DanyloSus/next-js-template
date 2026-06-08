import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

/**
 * Next.js 16 renamed Middleware to Proxy (same functionality, new filename).
 * This runs next-intl's locale negotiation/redirects on every matched request.
 * Lives in `src/` to sit alongside `src/app`.
 */
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals, and anything with a file extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
