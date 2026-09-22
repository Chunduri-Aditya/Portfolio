// Export src/data/content.ts as fact-sized chunks for the profile-rag service.
// Usage: node scripts/export-corpus.mjs > corpus/portfolio.jsonl
import { PROJECTS, EXPERIENCE, RESEARCH, CAPABILITIES, ABOUT, SIDEBAR, HERO, CONTACT } from "../src/data/content.ts";

const SITE = "https://chunduri-aditya.github.io/Portfolio/";
const rows = [];
const add = (id, section, title, url, text) => {
  if (!text || !text.trim()) return;
  rows.push({ id, section, title, url, text: text.trim() });
};

for (const p of PROJECTS.projects) {
  const url = p.caseStudy ? `${SITE}work/${p.id}/` : `${SITE}#work`;
  add(`project/${p.id}/overview`, "project", p.title, url, `${p.title}: ${p.subtitle}. ${p.hook} ${p.oneLiner}`);
  if (p.problem) add(`project/${p.id}/problem`, "project", p.title, url, `Problem: ${p.problem}`);
  (p.constraints ?? []).forEach((c, i) => add(`project/${p.id}/constraint/${i}`, "project", p.title, url, `Constraint: ${c}`));
  (p.failureModes ?? []).forEach((f, i) => add(`project/${p.id}/failure/${i}`, "project", p.title, url, `Failure mode: ${f}`));
  p.evidence.forEach((e, i) => add(`project/${p.id}/evidence/${i}`, "project", p.title, url, `Evidence: ${e}`));
  add(`project/${p.id}/architecture`, "project", p.title, url, `Architecture: ${p.architecture.overview}`);
  p.architecture.tradeoffs.forEach((t, i) => add(`project/${p.id}/tradeoff/${i}`, "project", p.title, url, `Tradeoff: ${t}`));
  p.decisions.forEach((d, i) => add(`project/${p.id}/decision/${i}`, "project", p.title, url, `Decision: ${d.title}. ${d.why}${d.tradeoff ? ` Tradeoff: ${d.tradeoff}` : ""}`));
  add(`project/${p.id}/metrics`, "project", p.title, url, `Metrics: ${p.metrics.map((m) => `${m.label}: ${m.value}`).join("; ")}`);
  add(`project/${p.id}/tags`, "project", p.title, url, `Tags: ${p.tags.join(", ")}. Status: ${p.status}.`);
}
for (const e of EXPERIENCE.items) {
  const url = `${SITE}#experience`;
  const t = `${e.org}, ${e.role}`;
  add(`experience/${e.org}/overview`, "experience", t, url, `${e.role} at ${e.org} (${e.period}, ${e.location}). ${e.hook} ${e.summary}`);
  e.bullets.forEach((b, i) => add(`experience/${e.org}/bullet/${i}`, "experience", t, url, b));
}
for (const r of RESEARCH.publications) {
  const url = `${SITE}#research`;
  add(`publication/${r.title}`, "publication", r.title, url, `${r.badge}: ${r.title}. ${r.hook} ${r.summary} ${r.metrics.map((m) => `${m.label}: ${m.value}`).join("; ")}`);
}
for (const g of CAPABILITIES.groups) {
  add(`skills/${g.category}`, "skills", g.category, `${SITE}#skills`, `${g.category}: ${g.tools.join(", ")}`);
}
add("profile/identity", "profile", HERO.name, SITE, `${HERO.name} is an ${HERO.roleLabel} based in ${CONTACT.location}, ${HERO.availability}. ${HERO.headline} Email: ${CONTACT.email}. GitHub: ${CONTACT.github}. LinkedIn: ${CONTACT.linkedin}.`);
for (const ed of SIDEBAR.education.items) {
  add(`education/${ed.school}`, "education", ed.school, `${SITE}#about`, `Education: ${ed.degree} from ${ed.school}, ${ed.location}, graduated ${ed.graduated}.`);
}
ABOUT.paragraphs.forEach((p, i) => add(`about/${i}`, "about", "About", `${SITE}#about`, p));

process.stdout.write(rows.map((r) => JSON.stringify(r)).join("\n") + "\n");
