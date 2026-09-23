import { PROJECTS, RESEARCH, HUD_STATS, ATTACK_SURFACE } from "./content";
import { PROJECT_VIZ } from "../lib/projectViz";

/**
 * METRICS.md is the provenance ledger for every number this site prints, and it
 * names figures that must never appear. Prose cannot enforce that; these tests
 * can. A rule nothing checks is a rule that gets violated silently, which is
 * exactly how 0.979 ended up in a chart while the ledger said not to print it.
 */
describe("content integrity", () => {
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

  test("never prints 0.979, which METRICS.md forbids as a headline", () => {
    // The pre-noise subset figure, superseded by 0.968 on the full corpus.
    expect(everyString().filter((s) => s.includes("0.979"))).toEqual([]);
  });

  test("does not claim more anchored surfaces than agent-shield has", () => {
    // The tools/ anchor was withdrawn by its author; one anchor stands.
    const hits = everyString().filter((s) => /2 surfaces|two anchored surfaces/i.test(s));
    expect(hits).toEqual([]);
  });

  test("does not revive the unsupportable frontier-model count", () => {
    // METRICS.md: neither 8 nor 4 is supportable, so the stat was dropped.
    expect(everyString().filter((s) => /\d+ of the \d+ target frontier/i.test(s))).toEqual([]);
  });

  test("the attack-ID total matches the per-module breakdown", () => {
    const total = ATTACK_SURFACE.reduce((n, m) => n + m.ids, 0);
    expect(total).toBe(28);

    const stat = HUD_STATS.find((s) => s.label === "ATTACK IDS CATALOGUED");
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

  // Flips to `test` once the post's blob URL returns 200 and the entry is
  // uncommented in content.ts. The entry is held in a comment in content.ts
  // until then, because a link that 404s never ships on a public surface.
  test.skip("the evals post is listed as a POST and does not count as a paper", () => {
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
