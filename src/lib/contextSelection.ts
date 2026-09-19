/**
 * The context-selection policy from the Personal Digital Twin, reimplemented in
 * TypeScript so it can run in the browser.
 *
 * It mirrors `twin/index.py::search` and the constants in
 * `twin/pipelines/ask.py`:
 *
 *   - every chunk is tagged with a source: profile | transcript | reflection
 *   - a query embedding is scored against each chunk by cosine similarity
 *   - `boost` adds a per-section offset to the score before ranking
 *   - `sources` masks every other row to -infinity, so a filtered-out chunk
 *     cannot re-enter on score alone
 *   - the top K survive; K is 5
 *
 * The scores below are a fixed worked example, not a live embedding run and not
 * anyone's real notes. The point is the ranking rule, which is the real one.
 */

export const TOP_K = 5;

/** `DECIDE_BOOST` in twin/pipelines/ask.py. */
export const DECIDE_BOOST: Record<string, number> = { Decisions: 0.05 };

export type ChunkSource = "profile" | "transcript" | "reflection";
export type Intent = "ask" | "decide";

export interface Candidate {
  id: string;
  section: string;
  source: ChunkSource;
  /** Cosine similarity against the query embedding. */
  score: number;
}

export interface RankedCandidate extends Candidate {
  boost: number;
  /** score + boost, or -Infinity when the source is masked out. */
  finalScore: number;
  masked: boolean;
  admitted: boolean;
}

/**
 * Rank candidates exactly as the twin does, and say which enter the context.
 *
 * @param candidates The pool to choose from.
 * @param intent     "decide" applies DECIDE_BOOST; "ask" applies nothing.
 * @param sources    Allowed sources. Anything else is masked to -Infinity.
 * @param k          How many survive. Defaults to TOP_K.
 */
export function rankCandidates(
  candidates: Candidate[],
  intent: Intent,
  sources: Set<ChunkSource>,
  k: number = TOP_K,
): RankedCandidate[] {
  const boosts = intent === "decide" ? DECIDE_BOOST : {};

  const scored = candidates.map((c) => {
    const masked = !sources.has(c.source);
    const boost = boosts[c.section] ?? 0;
    return {
      ...c,
      boost,
      masked,
      finalScore: masked ? Number.NEGATIVE_INFINITY : c.score + boost,
      admitted: false,
    };
  });

  // Ties resolve by id so the demo is deterministic across renders.
  const order = [...scored].sort(
    (a, b) => b.finalScore - a.finalScore || a.id.localeCompare(b.id),
  );
  for (const c of order.slice(0, k)) {
    if (Number.isFinite(c.finalScore)) c.admitted = true;
  }

  return scored;
}

/**
 * Chunks the section boost pulled into context that plain similarity would have
 * left out. This is the whole reason the boost exists, so the demo names it.
 */
export function admittedByBoost(
  candidates: Candidate[],
  sources: Set<ChunkSource>,
  k: number = TOP_K,
): Set<string> {
  const withBoost = rankCandidates(candidates, "decide", sources, k);
  const without = rankCandidates(candidates, "ask", sources, k);
  const baseline = new Set(without.filter((c) => c.admitted).map((c) => c.id));
  return new Set(
    withBoost.filter((c) => c.admitted && !baseline.has(c.id)).map((c) => c.id),
  );
}
