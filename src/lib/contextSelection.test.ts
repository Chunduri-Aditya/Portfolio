import { admittedByBoost, rankCandidates, TOP_K, type Candidate, type ChunkSource } from "./contextSelection";

const ALL: Set<ChunkSource> = new Set(["profile", "transcript", "reflection"]);

const CANDIDATES: Candidate[] = [
  { id: "Decisions/local-inference", section: "Decisions", source: "profile", score: 0.71 },
  { id: "Decisions/eval-before-ship", section: "Decisions", source: "profile", score: 0.69 },
  { id: "Projects/retrieval-rebuild", section: "Projects", source: "profile", score: 0.78 },
  { id: "Expert reflections/what-failed", section: "Expert reflections", source: "reflection", score: 0.74 },
  { id: "Interview/on-measurement", section: "Interview", source: "transcript", score: 0.73 },
  { id: "Interview/on-scope", section: "Interview", source: "transcript", score: 0.7 },
  { id: "Background/education", section: "Background", source: "profile", score: 0.52 },
  { id: "Projects/tooling-notes", section: "Projects", source: "profile", score: 0.66 },
];

const admitted = (intent: "ask" | "decide", sources: Set<ChunkSource> = ALL) =>
  rankCandidates(CANDIDATES, intent, sources)
    .filter((c) => c.admitted)
    .map((c) => c.id);

describe("context selection", () => {
  test("admits exactly k chunks", () => {
    expect(admitted("ask")).toHaveLength(TOP_K);
  });

  test("ranks by cosine similarity when no boost applies", () => {
    // rankCandidates preserves input order and flags admission, so rank order
    // has to be read off finalScore rather than off the returned array.
    const byRank = rankCandidates(CANDIDATES, "ask", ALL)
      .filter((c) => c.admitted)
      .sort((a, b) => b.finalScore - a.finalScore)
      .map((c) => c.id);

    expect(byRank).toEqual([
      "Projects/retrieval-rebuild",
      "Expert reflections/what-failed",
      "Interview/on-measurement",
      "Decisions/local-inference",
      "Interview/on-scope",
    ]);
  });

  test("the decide boost changes which chunk makes the cut", () => {
    // The panel's caption claims the boost displaces a higher-similarity chunk.
    // If this fixture stopped demonstrating that, the caption would be a lie.
    const gained = admittedByBoost(CANDIDATES, ALL);

    expect([...gained]).toEqual(["Decisions/eval-before-ship"]);
    expect(admitted("decide")).not.toContain("Interview/on-scope");
    expect(admitted("decide")).toContain("Decisions/eval-before-ship");
  });

  test("a masked source cannot re-enter on score alone", () => {
    // twin sets masked rows to -infinity *before* top-k, so the highest-scoring
    // transcript chunk stays out no matter how well it scores.
    const profileOnly: Set<ChunkSource> = new Set(["profile"]);
    const ids = admitted("ask", profileOnly);

    expect(ids).not.toContain("Interview/on-measurement");
    expect(ids.every((id) => id.startsWith("Decisions/") || id.startsWith("Projects/") || id.startsWith("Background/"))).toBe(true);
  });

  test("masked rows score -Infinity rather than being dropped from the table", () => {
    const ranked = rankCandidates(CANDIDATES, "ask", new Set<ChunkSource>(["profile"]));
    const transcriptRow = ranked.find((c) => c.source === "transcript");

    expect(transcriptRow?.masked).toBe(true);
    expect(transcriptRow?.finalScore).toBe(Number.NEGATIVE_INFINITY);
    expect(transcriptRow?.admitted).toBe(false);
  });

  test("never admits more than the pool holds", () => {
    const tiny = CANDIDATES.slice(0, 2);
    expect(rankCandidates(tiny, "ask", ALL).filter((c) => c.admitted)).toHaveLength(2);
  });
});
