// Render src/data/content.ts as a print portfolio PDF, for application forms
// that ask for a portfolio file rather than a URL.
// Usage: npm run export:pdf   (needs Google Chrome; override with CHROME_PATH)
//
// Every string comes from content.ts, so the PDF cannot say anything the site
// does not. Pages are fixed Letter boxes; before printing, Chrome renders the
// page once with --dump-dom and an inline check marks any box whose content
// overflows it. An overflowing page, a check that never ran, or a page count
// that differs from the number of boxes fails the export.
import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  ABOUT, CAPABILITIES, CLOSING, CONTACT, HERO, HUD_STATS, PROJECTS, RESEARCH, SIDEBAR,
} from "../src/data/content.ts";

const SITE = "https://chunduri-aditya.github.io/Portfolio/";
const OUT = fileURLToPath(new URL("../public/Docs/Aditya_Chunduri_Portfolio.pdf", import.meta.url));
const CHROME = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const bare = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");
const link = (href, text = bare(href)) => `<a href="${esc(href)}">${esc(text)}</a>`;
// Long URLs in the narrow link column may wrap, but only after a slash.
const wrapLink = (href) => `<a href="${esc(href)}">${esc(bare(href)).replace(/\//g, "/<wbr>")}</a>`;
const font = (pkg, file) => {
  const path = fileURLToPath(new URL(`../node_modules/${pkg}/files/${file}`, import.meta.url));
  return `url(data:font/woff2;base64,${readFileSync(path).toString("base64")}) format("woff2")`;
};

/* ── Content selection ─────────────────────────────────────────────────── */

// Flagships (public repos) lead, then the other case studies in site order.
const all = PROJECTS.projects;
const caseStudies = [...all.filter((p) => p.caseStudy && p.featured), ...all.filter((p) => p.caseStudy && !p.featured)];
const moreWork = all.filter((p) => !p.caseStudy);

// A decision with its cost stated shows more judgement than one without, so
// those go first; the sort is stable, so site order holds within each group.
const topDecisions = (p, n) => [...p.decisions].sort((a, b) => Number(!!b.tradeoff) - Number(!!a.tradeoff)).slice(0, n);

const repoLinks = (p) => {
  const out = [];
  if (p.caseStudy) out.push(["Case study", wrapLink(`${SITE}work/${p.id}/`)]);
  if (p.links.github) out.push(["Code", wrapLink(p.links.github)]);
  if (p.links.requestAccess) {
    const subject = encodeURIComponent(`Access request: ${p.links.requestAccess}`);
    out.push(["Code", `Private repo, ${link(`mailto:${CONTACT.email}?subject=${subject}`, "access on request")}`]);
  }
  if (p.links.live) out.push(["Paper", link(p.links.live)]);
  if (p.links.demo) out.push(["Demo", link(p.links.demo)]);
  return out;
};

const absolute = (href) => (href.startsWith("/") ? SITE + href.slice(1) : href);

/* ── Pages ─────────────────────────────────────────────────────────────── */

const pages = [];
const page = (name, body) => pages.push({ name, body });

const csNumber = (i) => String(i + 1).padStart(2, "0");
const MORE_PAGE = 2 + caseStudies.length;

page("cover", `
  <p class="eyebrow">Portfolio</p>
  <h1 class="name">${esc(HERO.name)}</h1>
  <p class="role">${esc(HERO.roleLabel)}</p>
  <p class="headline">${esc(HERO.headline)}</p>
  <p class="contact">${[link(`mailto:${CONTACT.email}`, CONTACT.email), link(SITE), link(CONTACT.github), link(CONTACT.linkedin), esc(CONTACT.location)].map((c) => `<i>${c}</i>`).join("<span>·</span><wbr>")}</p>
  <div class="stats">
    ${HUD_STATS.map((s) => `<div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label.toLowerCase())}</span></div>`).join("")}
  </div>
  <div class="cover-grid">
    <div>
      <h3>About</h3>
      ${ABOUT.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
      <h3>Education</h3>
      ${SIDEBAR.education.items.map((e) => `<p class="edu"><b>${esc(e.degree)}</b><br>${esc(e.school)}, ${esc(e.location)} <span class="faint">· ${esc(e.graduated)}</span></p>`).join("")}
    </div>
    <div>
      <h3>Contents</h3>
      <ol class="toc">
        ${caseStudies.map((p, i) => `
          <li><span class="num">${csNumber(i)}</span><div><b>${esc(p.title)}</b> <span class="disc">${esc(p.discipline)}</span><br><span class="dim">${esc(p.hook)}</span></div><span class="pg">${i + 2}</span></li>`).join("")}
        <li><span class="num">+</span><div><b>More work</b><br><span class="dim">${esc(moreWork.map((p) => p.title).join(", "))}</span></div><span class="pg">${MORE_PAGE}</span></li>
        <li><span class="num">+</span><div><b>Research, skills, contact</b></div><span class="pg">${MORE_PAGE + 1}</span></li>
      </ol>
    </div>
  </div>`);

const decision = (d) => `<p class="decision"><b>${esc(d.title)}.</b> ${esc(d.why)}${d.tradeoff ? ` <span class="cost">Cost: ${esc(d.tradeoff)}</span>` : ""}</p>`;

caseStudies.forEach((p, i) => {
  // A project with no problem statement has room for more evidence and decisions.
  const roomy = !p.problem;
  const limits = (p.failureModes ?? []).slice(0, 2);
  const decisions = topDecisions(p, limits.length ? 2 : roomy ? 4 : 3);
  const diagram = p.architecture.diagram.replace(/^\s*\n/, "").replace(/\s+$/, "");
  page(p.id, `
    <p class="eyebrow">Case study ${csNumber(i)} <span>·</span> ${esc(p.discipline)} <span>·</span> ${esc(p.status)}</p>
    <h2 class="title">${esc(p.title)}</h2>
    <p class="subtitle">${esc(p.subtitle)}</p>
    <p class="hook">${esc(p.hook)}</p>
    <div class="meta">
      <div class="metrics">${p.metrics.map((m) => `<div class="metric"><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join("")}</div>
      <dl class="links">${repoLinks(p).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>
    </div>
    <div class="${p.problem ? "cols" : ""}">
      ${p.problem ? `<div><h3>Problem</h3><p>${esc(p.problem)}</p></div>` : ""}
      <div><h3>What I built</h3><p>${esc(p.oneLiner)}</p></div>
    </div>
    <div class="arch">
      <div><h3>Architecture</h3><pre class="diagram">${esc(diagram)}</pre></div>
      <div><h3>Evidence</h3><ul>${p.evidence.slice(0, roomy ? 6 : 3).map((e) => `<li>${esc(e)}</li>`).join("")}</ul></div>
    </div>
    ${limits.length ? `
    <div class="cols">
      <div><h3>Decisions</h3>${decisions.map(decision).join("")}</div>
      <div><h3>Honest limits</h3><ul>${limits.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div>
    </div>` : `
    <h3>Decisions</h3><div class="flow">${decisions.map(decision).join("")}</div>`}
    ${roomy ? `<h3>Tradeoffs</h3><ul class="flow">${p.architecture.tradeoffs.slice(0, 4).map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
    <p class="tags">${p.tags.map(esc).join("<span>·</span>")}</p>`);
});

page("more-work", `
  <p class="eyebrow">More work</p>
  <h2 class="title">Smaller systems and coursework</h2>
  <p class="subtitle">Shorter builds without a full case study. Each links to its code.</p>
  ${moreWork.map((p) => `
    <div class="row">
      <p class="row-head"><b>${esc(p.title)}</b> <span class="dim">${esc(p.subtitle)}</span><span class="disc">${esc(p.discipline)} · ${esc(p.status)}</span></p>
      <p>${esc(p.oneLiner)}</p>
      <ul>${p.evidence.slice(0, 2).map((e) => `<li>${esc(e)}</li>`).join("")}</ul>
      <p class="row-foot">${p.metrics.map((m) => `<span><b>${esc(m.value)}</b> ${esc(m.label)}</span>`).join("")}${repoLinks(p).map(([k, v]) => `<span>${k}: ${v}</span>`).join("")}</p>
    </div>`).join("")}`);

page("research", `
  <p class="eyebrow">Research and writing</p>
  ${RESEARCH.publications.map((r) => `
    <div class="row">
      <p class="disc">${esc(r.badge)}</p>
      <p class="row-head"><b>${esc(r.title)}</b></p>
      <p>${esc(r.summary)}</p>
      <p class="row-foot">${r.links.map((l) => `<span>${esc(l.label)}: ${link(absolute(l.href))}</span>`).join("")}</p>
    </div>`).join("")}
  <h3 class="section">Skills</h3>
  <div class="skills">
    ${CAPABILITIES.groups.map((g) => `<div><b>${esc(g.category)}</b><p>${g.tools.map(esc).join(", ")}</p></div>`).join("")}
  </div>
  <div class="close">
    <h3>${esc(CLOSING.title)}</h3>
    ${CLOSING.paragraphs.map((t) => `<p>${esc(t)}</p>`).join("")}
    <p class="contact">${link(`mailto:${CONTACT.email}`, CONTACT.email)}<span>·</span>${link(SITE)}<span>·</span>${link(CONTACT.github)}<span>·</span>${link(CONTACT.linkedin)}</p>
  </div>`);

/* ── Document ──────────────────────────────────────────────────────────── */

const css = `
@font-face { font-family: "Bricolage"; src: ${font("@fontsource-variable/bricolage-grotesque", "bricolage-grotesque-latin-wght-normal.woff2")}; font-weight: 200 800; }
@font-face { font-family: "Hanken"; src: ${font("@fontsource-variable/hanken-grotesk", "hanken-grotesk-latin-wght-normal.woff2")}; font-weight: 100 900; }
@font-face { font-family: "Hanken"; src: ${font("@fontsource-variable/hanken-grotesk", "hanken-grotesk-latin-wght-italic.woff2")}; font-weight: 100 900; font-style: italic; }
@font-face { font-family: "JBMono"; src: ${font("@fontsource/jetbrains-mono", "jetbrains-mono-latin-400-normal.woff2")}; font-weight: 400; }
@font-face { font-family: "JBMono"; src: ${font("@fontsource/jetbrains-mono", "jetbrains-mono-latin-500-normal.woff2")}; font-weight: 500; }
@page { size: 8.5in 11in; margin: 0; }
:root { --ink: #0a1016; --dim: #44545d; --faint: #7a8a92; --line: #dbe2e5; --tile: #f2f6f7; --accent: #0c7a7a; }
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body { background: #fff; color: var(--ink); font: 400 8.6pt/1.38 "Hanken", system-ui, sans-serif; }
a { color: inherit; text-decoration: none; border-bottom: 0.5pt solid var(--line); }
.page { position: relative; width: 8.5in; height: 11in; padding: 0.52in 0.62in 0.7in; overflow: hidden; break-after: page; }
.page:last-child { break-after: auto; }
.page::before { content: ""; position: absolute; inset: 0 0 auto 0; height: 4pt; background: linear-gradient(90deg, #2f8fe0, #17b3b3 45%, #22c48c 75%, #e3b23c); }
.foot { position: absolute; left: 0.62in; right: 0.62in; bottom: 0.38in; display: flex; justify-content: space-between; font: 400 6.8pt "JBMono", monospace; color: var(--faint); letter-spacing: 0.04em; }
.eyebrow, .disc { font: 500 7pt "JBMono", monospace; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); }
.eyebrow span, .contact span, .tags span { color: var(--faint); margin: 0 0.45em; }
h1, h2 { font-family: "Bricolage", sans-serif; letter-spacing: -0.02em; line-height: 1.05; }
h3 { font: 600 7.2pt "JBMono", monospace; letter-spacing: 0.1em; text-transform: uppercase; color: var(--dim); margin: 10pt 0 4pt; }
p + p { margin-top: 4pt; }
b { font-weight: 650; }
.dim { color: var(--dim); } .faint { color: var(--faint); }
ul { padding-left: 11pt; } li { margin-bottom: 2.5pt; } li::marker { color: var(--accent); }
.name { font-size: 40pt; font-weight: 700; margin-top: 10pt; }
.role { font: 600 14pt "Bricolage", sans-serif; color: var(--accent); margin-top: 6pt; }
.headline { font-size: 12.5pt; color: var(--dim); margin-top: 6pt; max-width: 5.6in; line-height: 1.35; }
.contact { margin-top: 10pt; font-size: 8.4pt; } .contact i { font-style: normal; white-space: nowrap; }
.stats { display: grid; grid-template-columns: repeat(${HUD_STATS.length}, 1fr); gap: 8pt; margin-top: 16pt; }
.stat { background: var(--tile); border-radius: 6pt; padding: 9pt 11pt; }
.stat b { display: block; font: 700 20pt "Bricolage", sans-serif; }
.stat span { font: 500 6.6pt "JBMono", monospace; letter-spacing: 0.06em; text-transform: uppercase; color: var(--dim); }
.cover-grid { display: grid; grid-template-columns: 1fr 1.12fr; gap: 24pt; margin-top: 8pt; }
.edu { margin-bottom: 5pt; }
.toc { list-style: none; padding: 0; }
.toc li { display: grid; grid-template-columns: 18pt 1fr 14pt; gap: 6pt; padding: 4pt 0; border-bottom: 0.5pt solid var(--line); margin: 0; }
.toc .num { font: 500 7.4pt "JBMono", monospace; color: var(--accent); padding-top: 1pt; }
.toc .pg { font: 500 7.4pt "JBMono", monospace; color: var(--faint); text-align: right; padding-top: 1pt; }
.toc .disc { font-size: 6.2pt; margin-left: 4pt; }
.title { font-size: 26pt; font-weight: 700; margin-top: 4pt; }
.subtitle { font-size: 10.5pt; color: var(--dim); margin-top: 3pt; }
.hook { font: italic 500 11pt/1.35 "Hanken", sans-serif; margin-top: 8pt; }
.meta { display: grid; grid-template-columns: auto 1fr; gap: 14pt; align-items: start; margin-top: 9pt; }
.metrics { display: flex; gap: 7pt; }
.metric { min-width: 80pt; background: var(--tile); border-radius: 5pt; padding: 7pt 9pt; }
.metric b { display: block; font: 700 11.5pt/1.2 "Bricolage", sans-serif; }
.metric span { font: 500 6.4pt "JBMono", monospace; letter-spacing: 0.05em; text-transform: uppercase; color: var(--dim); }
.links { display: grid; grid-template-columns: auto 1fr; gap: 3pt 9pt; font-size: 8pt; }
.links dt { white-space: nowrap; font: 500 6.6pt/1.9 "JBMono", monospace; letter-spacing: 0.06em; text-transform: uppercase; color: var(--faint); }
.cols { display: grid; grid-template-columns: 1fr 1fr; gap: 18pt; }
.arch { display: grid; grid-template-columns: auto 1fr; gap: 16pt; }
.flow { column-count: 2; column-gap: 18pt; } .flow .decision, .flow li { break-inside: avoid; } ul.flow { padding-left: 11pt; }
.diagram { font: 400 6pt/1.2 "JBMono", monospace; color: #24343d; background: var(--tile); border-radius: 5pt; padding: 8pt 10pt; white-space: pre; overflow: hidden; }
.decision { margin-bottom: 4pt; }
.cost { color: var(--dim); }
.tags { position: absolute; left: 0.62in; right: 0.62in; bottom: 0.56in; font: 400 6.6pt "JBMono", monospace; color: var(--dim); }
.row { padding: 9pt 0; border-bottom: 0.5pt solid var(--line); }
.row .row-head { font-size: 10.5pt; margin-bottom: 3pt; }
.row .row-head .disc { float: right; font-size: 6.4pt; padding-top: 3pt; }
.row ul { margin-top: 4pt; }
.row-foot { display: flex; flex-wrap: wrap; gap: 4pt 14pt; font-size: 7.8pt; color: var(--dim); margin-top: 4pt; }
.page > .subtitle + .row { margin-top: 6pt; }
.section { margin-top: 16pt; }
.skills { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8pt 16pt; }
.skills b { font-size: 8.2pt; } .skills p { color: var(--dim); margin-top: 1pt; }
.close { margin-top: 18pt; background: var(--tile); border-radius: 6pt; padding: 12pt 14pt; }
.close h3 { margin-top: 0; color: var(--accent); }
`;

// Runs in Chrome before --dump-dom returns. Marks content that runs past a
// page's content box (down or right) and diagrams clipped by their panel.
const check = `document.fonts.ready.then(() => {
  const bad = [];
  for (const p of document.querySelectorAll(".page")) {
    const right = p.getBoundingClientRect().right - parseFloat(getComputedStyle(p).paddingRight);
    if (p.scrollHeight > p.clientHeight + 1) bad.push(p.dataset.name + " tall +" + (p.scrollHeight - p.clientHeight) + "px");
    const wide = [...p.querySelectorAll("*")].find((el) => el.getBoundingClientRect().right > right + 1);
    if (wide) bad.push(p.dataset.name + " wide +" + Math.round(wide.getBoundingClientRect().right - right) + "px at <" + wide.tagName.toLowerCase() + ">");
    for (const d of p.querySelectorAll(".diagram")) if (d.scrollWidth > d.clientWidth + 1) bad.push(p.dataset.name + " diagram clipped");
  }
  document.body.dataset.overflow = bad.join(", ") || "none";
});`;

const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>${esc(HERO.name)} · Portfolio</title><style>${css}</style></head><body>
${pages.map((p, i) => `<section class="page" data-name="${p.name}">${p.body}
  <div class="foot"><span>${esc(HERO.name)} · ${esc(HERO.roleLabel)}</span><span>${i + 1} / ${pages.length}</span></div></section>`).join("\n")}
<script>${check}</script></body></html>`;

/* ── Render, check, print ──────────────────────────────────────────────── */

// Desktop Chrome in headless mode finishes its work and then does not exit on
// macOS (its updater keeps it alive), so each run ends when its own completion
// output appears rather than when the process exits.
const chrome = (args, done) => new Promise((resolve, reject) => {
  const proc = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--no-first-run", `--user-data-dir=${join(tmp, "profile")}`,
    "--virtual-time-budget=10000", ...args, `file://${join(tmp, "portfolio.html")}`,
  ]);
  let out = "", err = "";
  const timer = setTimeout(() => { proc.kill("SIGKILL"); reject(new Error(`chrome timed out: ${args.join(" ")}`)); }, 60_000);
  const poll = () => { if (done(out, err)) { clearTimeout(timer); proc.kill(); resolve(out); } };
  proc.stdout.on("data", (d) => { out += d; poll(); });
  proc.stderr.on("data", (d) => { err += d; poll(); });
  proc.on("error", (e) => { clearTimeout(timer); reject(e); });
  proc.on("exit", (code) => { clearTimeout(timer); if (done(out, err)) resolve(out); else reject(new Error(`chrome exited ${code} before finishing`)); });
});

const tmp = mkdtempSync(join(tmpdir(), "portfolio-pdf-"));
try {
  writeFileSync(join(tmp, "portfolio.html"), html);

  const dom = await chrome(["--dump-dom"], (out) => out.includes("</html>"));
  const overflow = dom.match(/<body data-overflow="([^"]*)"/)?.[1];
  if (overflow === undefined) throw new Error("overflow check never ran (no data-overflow on <body>)");
  if (overflow !== "none") throw new Error(`content overflows its page: ${overflow}`);

  await chrome(["--no-pdf-header-footer", `--print-to-pdf=${OUT}`], (_, err) => err.includes("bytes written to file"));
  const pdf = readFileSync(OUT, "latin1");
  const count = (pdf.match(/\/Type\s*\/Page\b(?!s)/g) ?? []).length;
  if (count !== pages.length) throw new Error(`PDF has ${count} pages, expected ${pages.length}`);
  console.log(`portfolio pdf: ${pages.length} pages, 0 overflowing, ${(pdf.length / 1024).toFixed(0)} KB -> ${OUT}`);
} finally {
  rmSync(tmp, { recursive: true, force: true, maxRetries: 5 });
}
