import { existsSync } from "node:fs";
import { copyFile, mkdir, readFile, rm, stat } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Sync the canonical AI knowledge base (`ai/`) into Claude Code's `.claude/`
 * directory. `ai/` is the single source of truth; `.claude/` is generated.
 *
 * Usage:
 *   node scripts/sync-ai-adapters.mjs            # sync
 *   node scripts/sync-ai-adapters.mjs --clean    # wipe target dirs first
 *   node scripts/sync-ai-adapters.mjs --dry-run  # print, don't write
 */
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const AI = join(ROOT, "ai");
const CLAUDE = join(ROOT, ".claude");

const args = new Set(process.argv.slice(2));
const isDryRun = args.has("--dry-run");
const shouldClean = args.has("--clean");

const log = (...m) => console.warn("[sync-ai]", ...m);
const writes = [];

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

async function copyOut(src, dst) {
  if (!existsSync(src)) {
    log("skip (missing source):", relative(ROOT, src));

    return;
  }
  writes.push({ target: dst, bytes: (await stat(src)).size });
  if (isDryRun) return;
  await mkdir(dirname(dst), { recursive: true });
  await copyFile(src, dst);
}

async function safeRm(path) {
  if (!shouldClean || isDryRun || !existsSync(path)) return;
  await rm(path, { recursive: true, force: true });
  log("clean:", relative(ROOT, path));
}

async function main() {
  const manifest = await readJson(join(AI, "manifest.json"));
  log(
    `manifest v${manifest.version} — ${manifest.rules.length} rules, ${manifest.skills.length} skills, ${manifest.agents.length} agents`
  );

  for (const dir of ["rules", "skills", "agents", "templates"]) {
    await safeRm(join(CLAUDE, dir));
  }

  for (const entry of [
    ...manifest.rules,
    ...manifest.skills,
    ...manifest.agents,
    ...(manifest.templates ?? []),
  ]) {
    await copyOut(join(AI, entry.path), join(CLAUDE, entry.path));
  }

  for (const file of ["manifest.json", "README.md"]) {
    const src = join(AI, file);
    if (existsSync(src)) await copyOut(src, join(CLAUDE, file));
  }

  const totalKb = (
    writes.reduce((sum, write) => sum + write.bytes, 0) / 1024
  ).toFixed(1);
  log(
    `${isDryRun ? "[dry-run] would write" : "wrote"} ${writes.length} files (${totalKb} KB)`
  );
}

main().catch(err => {
  console.error("[sync-ai] FAILED:", err);
  process.exit(1);
});
