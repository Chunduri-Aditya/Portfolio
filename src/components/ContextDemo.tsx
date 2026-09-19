import React, { useMemo, useState } from "react";
import {
  admittedByBoost,
  rankCandidates,
  TOP_K,
  type Candidate,
  type ChunkSource,
  type Intent,
} from "../lib/contextSelection";

const SOURCES: ChunkSource[] = ["profile", "transcript", "reflection"];

/**
 * A fixed worked example, not real notes and not a live embedding run.
 *
 * Scores are chosen so the two intents disagree: `sec-decisions-tradeoff` sits
 * just below the cut on similarity alone and clears it once the Decisions boost
 * applies. That disagreement is the thing worth showing.
 */
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

const fmt = (n: number) => (Number.isFinite(n) ? n.toFixed(2) : "−∞");

/**
 * Interactive demonstration of the twin's context-selection policy.
 *
 * The engineering question a persistent agent actually has to answer is not
 * "what can the model say" but "what earns a slot in a context window that is
 * always too small". This runs that decision in the browser: no backend, no
 * model call, no personal data.
 */
const ContextDemo: React.FC = () => {
  const [intent, setIntent] = useState<Intent>("ask");
  const [sources, setSources] = useState<Set<ChunkSource>>(new Set(SOURCES));

  const ranked = useMemo(() => rankCandidates(CANDIDATES, intent, sources), [intent, sources]);
  const gained = useMemo(() => admittedByBoost(CANDIDATES, sources), [sources]);

  const admittedCount = ranked.filter((c) => c.admitted).length;
  const maskedCount = ranked.filter((c) => c.masked).length;

  const toggleSource = (s: ChunkSource) =>
    setSources((prev) => {
      const next = new Set(prev);
      // Every source off would make the panel say nothing useful.
      if (next.has(s)) {
        if (next.size > 1) next.delete(s);
      } else {
        next.add(s);
      }
      return next;
    });

  return (
    <div className="rounded-3xl border border-white/[0.12] bg-white/[0.02] p-5">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
        <fieldset>
          <legend className="eyebrow mb-2">Intent</legend>
          <div className="inline-flex rounded-full border border-white/[0.12] p-0.5">
            {(["ask", "decide"] as const).map((i) => (
              <button
                key={i}
                type="button"
                aria-pressed={intent === i}
                onClick={() => setIntent(i)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                  intent === i ? "bg-white/[0.14] text-text" : "text-text-faint hover:text-text-dim"
                }`}
              >
                {i}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-2">Sources admitted</legend>
          <div className="flex flex-wrap gap-1.5">
            {SOURCES.map((s) => {
              const on = sources.has(s);
              return (
                <button
                  key={s}
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggleSource(s)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    on
                      ? "border-accent-teal/50 bg-accent-teal/10 text-text"
                      : "border-white/[0.12] text-text-faint hover:text-text-dim"
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[34rem] border-collapse text-left">
          <caption className="sr-only">
            Candidate chunks ranked for context admission, {admittedCount} of {CANDIDATES.length} admitted
          </caption>
          <thead>
            <tr className="border-b border-white/[0.10]">
              <th scope="col" className="py-2 pr-3 text-[11px] font-semibold uppercase tracking-wide text-text-faint">
                Chunk
              </th>
              <th scope="col" className="py-2 pr-3 text-[11px] font-semibold uppercase tracking-wide text-text-faint">
                Source
              </th>
              <th scope="col" className="py-2 pr-3 text-right text-[11px] font-semibold uppercase tracking-wide text-text-faint">
                Cos
              </th>
              <th scope="col" className="py-2 pr-3 text-right text-[11px] font-semibold uppercase tracking-wide text-text-faint">
                Boost
              </th>
              <th scope="col" className="py-2 pr-3 text-right text-[11px] font-semibold uppercase tracking-wide text-text-faint">
                Final
              </th>
              <th scope="col" className="py-2 text-[11px] font-semibold uppercase tracking-wide text-text-faint">
                In context
              </th>
            </tr>
          </thead>
          <tbody className="font-mono text-[11px]">
            {ranked.map((c) => (
              <tr
                key={c.id}
                className={`border-b border-white/[0.05] ${c.masked ? "opacity-40" : ""}`}
              >
                <td className="py-1.5 pr-3 text-text-dim">{c.id}</td>
                <td className="py-1.5 pr-3 text-text-faint">{c.source}</td>
                <td className="py-1.5 pr-3 text-right tabular-nums text-text-faint">{c.score.toFixed(2)}</td>
                <td className="py-1.5 pr-3 text-right tabular-nums text-accent-gold">
                  {c.boost ? `+${c.boost.toFixed(2)}` : ""}
                </td>
                <td className="py-1.5 pr-3 text-right tabular-nums text-text-dim">{fmt(c.finalScore)}</td>
                <td className="py-1.5">
                  {c.masked ? (
                    <span className="text-text-faint">masked</span>
                  ) : c.admitted ? (
                    <span className="text-accent-viridian">
                      ✓{gained.has(c.id) && intent === "decide" ? " via boost" : ""}
                    </span>
                  ) : (
                    <span className="text-text-faint">✗ below cut</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 border-t border-white/[0.08] pt-3 text-[12px] leading-relaxed text-text-faint">
        k={TOP_K} · {admittedCount} admitted · {maskedCount} masked by source.{" "}
        {intent === "decide" && gained.size > 0
          ? "The Decisions boost is +0.05, small enough to matter only near the cut. Here it displaced a higher-similarity chunk, which is the point: for a decision, a recorded decision outranks a merely similar paragraph."
          : "Switch the intent to “decide” to apply the section boost and watch the cut change."}
      </p>
    </div>
  );
};

export default ContextDemo;
