/**
 * Fail if src/index.css and tailwind.config.js disagree about a palette token.
 *
 * The two files hold the same colours with nothing linking them, and a comment
 * in index.css claims they are "kept in sync". Nothing checked that. This does.
 *
 * It lives as a script rather than a vitest case because Vite serves a
 * stylesheet through its CSS pipeline, so a `?raw` import of one comes back
 * empty and the test would pass against nothing.
 *
 * Run: node scripts/check-palette-sync.mjs
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const tw = readFileSync(resolve(root, "tailwind.config.js"), "utf8");
const css = readFileSync(resolve(root, "src/index.css"), "utf8");

/** `DEFAULT` inside a named block, so `text` is not read as `ink`. */
function blockDefault(source, block) {
  const m = source.match(new RegExp(`${block}:\\s*\\{[^}]*DEFAULT:\\s*"(#[0-9a-fA-F]{6})"`));
  return m?.[1]?.toLowerCase();
}

function hexAfter(source, key) {
  const m = source.match(new RegExp(`${key}:\\s*"?(#[0-9a-fA-F]{6})"?`));
  return m?.[1]?.toLowerCase();
}

/** [css custom property, value read from tailwind.config.js] */
const PAIRS = [
  ["--ink", blockDefault(tw, "ink")],
  ["--text", blockDefault(tw, "text")],
  ["--text-dim", hexAfter(tw, "dim")],
  ["--text-faint", hexAfter(tw, "faint")],
  ["--sapphire", hexAfter(tw, "sapphire")],
  ["--indigo", hexAfter(tw, "indigo")],
  ["--teal", hexAfter(tw, "teal")],
  ["--bronze", hexAfter(tw, "bronze")],
  ["--viridian", hexAfter(tw, "viridian")],
  ["--gold", hexAfter(tw, "gold")],
];

const failures = [];
for (const [cssVar, expected] of PAIRS) {
  if (!expected) {
    failures.push(`${cssVar}: no matching token found in tailwind.config.js`);
    continue;
  }
  const actual = hexAfter(css, cssVar);
  if (!actual) {
    failures.push(`${cssVar}: missing from src/index.css (tailwind has ${expected})`);
  } else if (actual !== expected) {
    failures.push(`${cssVar}: index.css has ${actual}, tailwind.config.js has ${expected}`);
  }
}

if (failures.length > 0) {
  console.error("Palette drift between tailwind.config.js and src/index.css:\n");
  for (const f of failures) console.error(`  - ${f}`);
  console.error("\nUpdate both, or delete the duplicate.");
  process.exit(1);
}

console.log(`palette in sync: ${PAIRS.length} tokens match`);
