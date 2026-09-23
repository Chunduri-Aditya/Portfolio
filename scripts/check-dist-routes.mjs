// Check dist/work/ after a build: every case study id has an app page, every
// renamed id has a redirect stub that points at a page that exists, and the
// sitemap lists exactly the pages. Nothing in the test suite reads dist/, so a
// stub emitted as a copy of index.html would otherwise ship with every gate
// green (review of the jarvis to taintgate redirect, 2026-09-23).
// Usage: node scripts/check-dist-routes.mjs   (npm runs it as postbuild)
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const SITE = "https://chunduri-aditya.github.io/Portfolio/";
const ROOT = fileURLToPath(new URL("..", import.meta.url));

// The id map lives in TypeScript with an extensionless import, which plain Node cannot load
// (the deploy workflow runs Node 20, and even Node 23 stops at "../data/content"). Vite's SSR
// loader resolves it the way the app and the tests do, with no extra dependency.
const server = await createServer({
  configFile: false,
  root: ROOT,
  logLevel: "error",
  server: { middlewareMode: true, watch: null },
  optimizeDeps: { disabled: true },
});
const { CASE_STUDY_IDS, RENAMED_CASE_STUDY_IDS } = await server.ssrLoadModule("/src/lib/caseStudies.ts");
await server.close();
const DIST = join(ROOT, "dist");
const WORK = join(DIST, "work");

const failures = [];
const check = (ok, message) => {
  if (!ok) failures.push(message);
  console.log(`${ok ? "ok  " : "FAIL"} ${message}`);
};
const read = (path) => (existsSync(path) ? readFileSync(path, "utf8") : "");

const renamed = Object.entries(RENAMED_CASE_STUDY_IDS);

// (a) dist/work/ holds one directory per page and one per redirect stub, nothing else.
const expectedDirs = [...CASE_STUDY_IDS, ...Object.keys(RENAMED_CASE_STUDY_IDS)].sort();
const actualDirs = existsSync(WORK) ? readdirSync(WORK).sort() : [];
check(
  JSON.stringify(actualDirs) === JSON.stringify(expectedDirs),
  `dist/work/ holds exactly the pages and stubs: ${actualDirs.join(", ") || "(missing)"}`,
);

// (b) every case study id has an app page.
for (const id of CASE_STUDY_IDS) {
  const file = join(WORK, id, "index.html");
  check(existsSync(file) && read(file).includes('id="root"'), `dist/work/${id}/index.html is an app page`);
}

// (c) every renamed id has a stub that redirects to its new page, not a copy of index.html.
for (const [from, to] of renamed) {
  const file = join(WORK, from, "index.html");
  const html = read(file);
  const target = `${SITE}work/${to}/`;
  check(existsSync(file), `dist/work/${from}/index.html exists`);
  check(
    !html.includes('id="root"') && !html.includes("<script") && !/noindex/i.test(html),
    `dist/work/${from}/index.html is a redirect stub, not a copy of index.html`,
  );
  check(
    // Exact elements: a loose substring match would also accept the <a href> as the canonical.
    html.includes(`<link rel="canonical" href="${target}">`),
    `dist/work/${from}/index.html is canonical to ${target}`,
  );
  check(
    html.includes(`<meta http-equiv="refresh" content="0; url=${target}">`),
    `dist/work/${from}/index.html refreshes to ${target}`,
  );
}

// (d) the sitemap lists the home page and every app page, and no redirect stub.
const sitemap = read(join(DIST, "sitemap.xml"));
for (const id of CASE_STUDY_IDS) {
  check(sitemap.includes(`<loc>${SITE}work/${id}/</loc>`), `sitemap.xml lists work/${id}/`);
}
for (const [from] of renamed) {
  check(!sitemap.includes(`work/${from}/`), `sitemap.xml omits the redirect stub work/${from}/`);
}
const locCount = (sitemap.match(/<loc>/g) ?? []).length;
check(
  locCount === CASE_STUDY_IDS.length + 1,
  `sitemap.xml has ${CASE_STUDY_IDS.length + 1} URLs (home plus one per page), found ${locCount}`,
);

console.log(`dist routes: ${CASE_STUDY_IDS.length} pages, ${renamed.length} redirect stubs, ${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
