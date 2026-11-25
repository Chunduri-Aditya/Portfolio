import * as content from "./content";
import { PROJECTS, RESEARCH, HUD_STATS, ATTACK_SURFACE, EXPERIENCE, CAPABILITIES } from "./content";
import { PROJECT_VIZ } from "../lib/projectViz";

/**
 * METRICS.md is the provenance ledger for every number this site prints, and it
 * names figures that must never appear. Prose cannot enforce that; these tests
 * can. A rule nothing checks is a rule that gets violated silently, which is
 * exactly how 0.979 ended up in a chart while the ledger said not to print it.
 */
describe("content integrity", () => {
  test("lists no Brightcone.ai employment, withdrawn by Aditya on 2026-11-02", () => {
    expect(JSON.stringify(content)).not.toMatch(/brightcone/i);
    expect(EXPERIENCE.items.map((item) => item.org)).toContain("Easley Dunn Productions, Inc.");
  });

  const everyString = (): string[] => {
    const out: string[] = [];
    const walk = (v: unknown) => {
      if (typeof v === "string") out.push(v);
      else if (Array.isArray(v)) v.forEach(walk);
      else if (v && typeof v === "object") Object.values(v).forEach(walk);
    };
    walk(PROJECTS);
    walk(RESEARCH);
    walk(HUD_STATS);
    walk(PROJECT_VIZ);
    return out;
  };

  test("ai-health-journal never prints 0.979, which METRICS.md forbids as its headline", () => {
    // The pre-noise subset figure, superseded by 0.968 on the full corpus.
    // Scoped to this project: profile-rag prints its own 0.979 (truth.md P1).
    const ahj = PROJECTS.projects.find((p) => p.id === "ai-health-journal");
    expect(ahj).toBeDefined();
    const hits = [JSON.stringify(ahj), JSON.stringify(PROJECT_VIZ["ai-health-journal"] ?? {})].filter((s) =>
      s.includes("0.979"),
    );
    expect(hits).toEqual([]);
  });

  test("prints no banned claim and no dollar amount", () => {
    // truth.md Section 2 claims and the "Never print" clauses of Section 1.
    const banned =
      /0\.94 AUC|~?94% pixel|28 attack|33 attack|1,403|0\.971|1,880|\b904\b|520\+|1\.13 px|Kuber[n]etes|Brightcone|Softtek|OpenShift|TR 0\.000|Wilson upper bound|Isolation Forest|aditya2210|blocked attack|42 of 42|42 \/ 42/i;
    const text = JSON.stringify(content) + JSON.stringify(PROJECT_VIZ);
    expect(text.match(new RegExp(banned.source, "gi")) ?? []).toEqual([]);
    expect(text.match(/\$\d[\d.,]*|USD ?\d[\d.,]*/g) ?? []).toEqual([]);
    // truth.md E7: the SSN dates are May to June 2021, never June to July.
    expect(text).not.toMatch(/Jun 2021 \u2013 Jul 2021/);
  });

  const projectText = (id: string): string => {
    const p = PROJECTS.projects.find((q) => q.id === id);
    expect(p, `${id} is missing`).toBeDefined();
    return JSON.stringify(p) + JSON.stringify(PROJECT_VIZ[id] ?? {});
  };

  test("chatdb names no SQLite (truth.md CD1: MySQL and MongoDB)", () => {
    expect(projectText("chatdb")).not.toMatch(/sqlite/i);
  });

  test("ai-remixmate claims no Beat This!, CLAP or Streamlit (truth.md RM1)", () => {
    expect(projectText("ai-remixmate")).not.toMatch(/beat this|\bCLAP\b|streamlit/i);
    const tools = CAPABILITIES.groups.flatMap((g) => g.tools);
    expect(tools).not.toContain("CLAP");
  });

  test("agent-shield prints none of the withdrawn TR figures (truth.md A12 to A14)", () => {
    const text = projectText("agent-shield");
    for (const s of ["TR 0.000", "0.150", "0.161", "0.434"]) {
      expect(text, s).not.toContain(s);
    }
  });

  test("twin prints its truth.md T13 and T12 counts, not the retired ones", () => {
    const text = projectText("twin");
    expect(text).toContain("2,638");
    expect(text).toContain("878");
    for (const s of ["1,477", "646", "979", "980"]) {
      expect(text, s).not.toContain(s);
    }
  });

  test("profile-rag prints recall@3 0.979 (truth.md P1)", () => {
    expect(projectText("profile-rag")).toContain("0.979");
  });

  test("company-agents prints 238 handoffs and never the retired verify gate (truth.md CAS2)", () => {
    const text = projectText("company-agents");
    expect(text).toContain("238");
    expect(text).not.toMatch(/42 of 42|all checks pass/i);
  });

  test("ai-health-journal metrics lead with crisis sensitivity (truth.md H1)", () => {
    const ahj = PROJECTS.projects.find((p) => p.id === "ai-health-journal");
    expect(ahj?.metrics[0]?.value).toContain("1.00 (27 of 27)");
  });

  test("the Easley Dunn entry ends October 2026 (truth.md E15)", () => {
    const easley = EXPERIENCE.items.find((item) => item.org === "Easley Dunn Productions, Inc.");
    expect(easley).toBeDefined();
    expect(JSON.stringify(easley)).toMatch(/Oct(ober)? 2026/);
    expect(JSON.stringify(easley)).not.toMatch(/Sep(tember)? 2026/);
  });

  test("does not claim more anchored surfaces than agent-shield has", () => {
    // The tools/ anchor was withdrawn by its author; one anchor stands.
    const hits = everyString().filter((s) => /2 surfaces|two anchored surfaces/i.test(s));
    expect(hits).toEqual([]);
  });

  test("names no earlier repo of twin", () => {
    // The old twin repo names stay out of the product; only the current name ships.
    expect(everyString().filter((s) => /personal[\s_-]digital[\s_-]twin|twin-v2/i.test(s))).toEqual([]);
  });

  test("does not revive the unsupportable frontier-model count", () => {
    // METRICS.md: neither 8 nor 4 is supportable, so the stat was dropped.
    expect(everyString().filter((s) => /\d+ of the \d+ target frontier/i.test(s))).toEqual([]);
  });

  test("the attack total matches the per-module breakdown", () => {
    const total = ATTACK_SURFACE.reduce((n, m) => n + m.ids, 0);
    // truth.md A4 and A24: 24 implemented attacks across six modules.
    expect(total).toBe(24);

    const stat = HUD_STATS.find((s) => s.label === "ATTACKS IMPLEMENTED");
    expect(stat?.value).toBe(String(total));
  });

  test("HUD stats derive from the data rather than being typed", () => {
    // Posts sit in the publications list but are not papers.
    expect(HUD_STATS.find((s) => s.label === "PAPERS")?.value).toBe(
      String(RESEARCH.publications.filter((p) => !p.badge.startsWith("POST")).length),
    );
    // The derivation above also passes if a post is mislabelled as a paper, so
    // pin the count to the two papers that exist: the Zenodo preprint
    // (badge: "PREPRINT · ZENODO 2026") and the IJRASET publication
    // (badge: "PUBLICATION · IJRASET VOL 11, AUG 2023").
    expect(HUD_STATS.find((s) => s.label === "PAPERS")?.value).toBe("2");
    expect(HUD_STATS.find((s) => s.label === "PUBLIC REPOS")?.value).toBe(
      String(PROJECTS.projects.filter((p) => p.links.github).length),
    );
  });

  // Un skipped on 2026-09-23 once the post's blob URL returned 200 and the entry
  // was uncommented in content.ts; a link that 404s never ships on a public surface.
  test("the evals post is listed as a POST and does not count as a paper", () => {
    const posts = RESEARCH.publications.filter((p) => p.badge.startsWith("POST"));
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toBe("Where my evals lied");
    expect(
      posts[0].links.some((l) =>
        l.href.includes("agent-shield/blob/main/docs/posts/where_my_evals_lied.md"),
      ),
    ).toBe(true);
    expect(HUD_STATS.find((s) => s.label === "PAPERS")?.value).toBe("2");
  });

  test("no stat is the project count wearing a different label", () => {
    // "DISCIPLINES" counted unique discipline strings, one per project.
    const projectCount = String(PROJECTS.projects.length);
    const circular = HUD_STATS.filter(
      (s) => s.value === projectCount && s.label !== "SYSTEMS SHIPPED",
    );
    expect(circular).toEqual([]);
  });

  test("every flagship carries problem, constraints and failure modes", () => {
    // A case study without limitations reads as a brochure.
    for (const p of PROJECTS.projects.filter((p) => p.featured)) {
      expect(p.problem, `${p.id} has no problem`).toBeTruthy();
      expect(p.constraints?.length, `${p.id} has no constraints`).toBeGreaterThan(0);
      expect(p.failureModes?.length, `${p.id} has no failure modes`).toBeGreaterThan(0);
    }
  });

  test("every flagship documents a tradeoff on at least one decision", () => {
    for (const p of PROJECTS.projects.filter((p) => p.featured)) {
      const withTradeoff = p.decisions.filter((d) => d.tradeoff);
      expect(withTradeoff.length, `${p.id} states no tradeoffs`).toBeGreaterThan(0);
    }
  });

  test("private repos offer request-access and never a github URL", () => {
    for (const p of PROJECTS.projects) {
      if (p.links.requestAccess) {
        expect(p.links.github, `${p.id} is both private and linked`).toBeUndefined();
      }
    }
  });

  test("exactly four projects are flagged featured", () => {
    // The rule is strong evidence AND a public repo, so every flagship link
    // resolves for whoever clicks it.
    const featured = PROJECTS.projects.filter((p) => p.featured);
    expect(featured).toHaveLength(4);
    for (const p of featured) {
      expect(p.links.github, `${p.id} is featured but has no public repo`).toBeTruthy();
    }
  });
});

/**
 * The project set after the 2026-11-19 refresh. New cards print only what their
 * truth.md lines allow, and an archived card stays out of every list.
 */
describe("project set", () => {
  const find = (id: string) => PROJECTS.projects.find((p) => p.id === id);
  const text = (id: string): string => JSON.stringify(find(id)) + JSON.stringify(PROJECT_VIZ[id] ?? {});
  const NEW = ["racket-vision", "traderbot", "spectraguard", "freeze-gate"];

  test("the four new projects exist and model-behavior-lab is gone", () => {
    for (const id of NEW) expect(find(id), `${id} is missing`).toBeDefined();
    // INDEX.md verdict ARCHIVE and truth.md MB1: no card, no viz, no route.
    expect(find("model-behavior-lab")).toBeUndefined();
    expect(PROJECT_VIZ).not.toHaveProperty("model-behavior-lab");
  });

  test("each new project states a problem, constraints and failure modes", () => {
    for (const id of NEW) {
      const p = find(id);
      expect(p?.problem, `${id} has no problem`).toBeTruthy();
      expect(p?.constraints?.length ?? 0, `${id} constraints`).toBeGreaterThanOrEqual(2);
      expect(p?.failureModes?.length ?? 0, `${id} failure modes`).toBeGreaterThanOrEqual(2);
    }
  });

  test("racket-vision prints its test F1 with the precision limit (truth.md RV1)", () => {
    const t = text("racket-vision");
    expect(t).toContain("0.793");
    expect(t).toContain("0.665");
    expect(t).not.toMatch(/1\.13 ?px/);
  });

  test("traderbot is paper only and claims no backtest, live trading or returns (truth.md TB1)", () => {
    const t = text("traderbot");
    expect(t).toMatch(/paper/i);
    // The stub file name `backtest.py` may print, because the card says it is a stub.
    expect(t).not.toMatch(/backtest(?!\.py)|live trad|returns/i);
    expect(t).toMatch(/stub/i);
  });

  test("freeze-gate is preliminary at n=5 and prints no defended figure (truth.md FG1)", () => {
    const t = text("freeze-gate");
    expect(t).toContain("preliminary");
    expect(t).toContain("n=5");
    // "Undefended" counts may print; a defended count never does.
    expect(t).not.toMatch(/(?<!un)defended[^"]*\d\/5/i);
    expect(find("freeze-gate")?.caseStudy).not.toBe(true);
  });

  test("links follow the 2026-11-19 visibility table in METRICS.md", () => {
    // Public and past the exposure gate: the Persona RAG repo.
    expect(find("persona-rag")?.links.github).toBe("https://github.com/Chunduri-Aditya/Personal-persona-chatbot");
    // Private, no remote, or failed the exposure gate: request access only.
    for (const id of ["twin", "ai-remixmate", "company-agents", ...NEW]) {
      expect(find(id)?.links.github, `${id} must not link a repo`).toBeUndefined();
      expect(find(id)?.links.requestAccess, `${id} needs request access`).toBeTruthy();
    }
  });
});
