import React from "react";
import { Link } from "react-router-dom";
import { ATTACK_SURFACE } from "../data/content";

const TOTAL = ATTACK_SURFACE.reduce((n, m) => n + m.ids, 0);
const WIDEST = Math.max(...ATTACK_SURFACE.map((m) => m.ids));

/**
 * The hero's visual anchor: one real artifact instead of a decorative object.
 *
 * It replaces a distorted 3D icosahedron that cost 823.83 kB and said nothing.
 * This shows Agent Shield's attack surface, which is the one Agent Shield
 * figure that is both fully documented in METRICS.md and currently printable.
 *
 * Deliberately coverage rather than results: METRICS.md withdraws the anchored
 * agentic results pending a rerun, and a hero built on a withdrawn number would
 * undercut the whole point of the page.
 */
const EvidencePanel: React.FC = () => (
  <figure className="rounded-3xl border border-white/[0.12] bg-white/[0.02] p-5">
    <figcaption className="mb-4 flex items-baseline justify-between gap-3">
      <span className="eyebrow">Agent Shield · attack surface</span>
      <span className="font-mono text-[11px] text-text-faint">Inspect AI</span>
    </figcaption>

    <table className="w-full border-collapse">
      <caption className="sr-only">
        Attack identifiers catalogued per module in Agent Shield, {TOTAL} in total
      </caption>
      <thead className="sr-only">
        <tr>
          <th scope="col">Module</th>
          <th scope="col">Attack IDs</th>
        </tr>
      </thead>
      <tbody>
        {ATTACK_SURFACE.map((m) => (
          <tr key={m.code}>
            <th scope="row" className="py-1.5 pr-3 text-left align-middle font-normal">
              <span className="font-mono text-[11px] text-accent-teal">{m.code}</span>
              <span className="ml-2 text-[12px] text-text-dim">{m.label}</span>
            </th>
            <td className="w-[38%] py-1.5 align-middle">
              <span className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="h-1.5 rounded-full bg-accent-teal/70"
                  style={{ width: `${(m.ids / WIDEST) * 100}%` }}
                />
                <span className="font-mono text-[11px] tabular-nums text-text-faint">{m.ids}</span>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    <p className="mt-4 border-t border-white/[0.08] pt-3 font-mono text-[11px] leading-relaxed text-text-faint">
      {ATTACK_SURFACE.length} modules · {TOTAL} attack IDs ·{" "}
      <Link to="/work/agent-shield" className="text-text-dim underline underline-offset-2 hover:text-text">
        read the case study
      </Link>
    </p>
  </figure>
);

export default EvidencePanel;
