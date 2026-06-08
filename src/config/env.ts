import { z } from "zod";

/**
 * Type-safe, validated environment variables.
 *
 * Only `NEXT_PUBLIC_`-prefixed variables are available in the browser, so the
 * schema is split accordingly. Access env values through this module instead of
 * reading `process.env` directly — that way a missing or malformed variable
 * fails fast at startup with a clear message.
 *
 * Note: Next.js inlines `process.env.NEXT_PUBLIC_*` at build time, so the keys
 * must be referenced statically (no dynamic `process.env[key]`).
 */
const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:3000/api"),
  NEXT_PUBLIC_ENABLE_API_MOCKING: z
    .enum(["true", "false"])
    .default("false")
    .transform(value => value === "true"),
});

const parsed = EnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_ENABLE_API_MOCKING: process.env.NEXT_PUBLIC_ENABLE_API_MOCKING,
});

if (!parsed.success) {
  const issues = parsed.error.issues
    .map(issue => `  - ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
  throw new Error(
    `Invalid environment variables:\n${issues}\n\nCheck your .env file against .env.example.`
  );
}

export const env = parsed.data;
