import React from "react";
import { motion } from "framer-motion";

/**
 * Turns an architecture "overview" string (mostly of the form
 * "A -> B -> C -> D") into an animated node/connector flow. Nodes fade + rise on
 * view, connectors draw via pathLength. Falls back to the raw text if no arrows.
 */
const HUES = ["#8b5cf6", "#3b82f6", "#22d3ee", "#ec4899", "#34d399", "#fbbf24"];

const FlowDiagram: React.FC<{ overview: string }> = ({ overview }) => {
  const parts = overview
    .split(/\s*(?:->|→|→|–>|=>)\s*/)
    .map((s) => s.trim())
    .filter(Boolean);

  if (parts.length < 2) {
    return <p className="text-sm leading-relaxed text-text-dim">{overview}</p>;
  }

  return (
    <div className="flex flex-wrap items-stretch gap-2">
      {parts.map((node, i) => {
        const hue = HUES[i % HUES.length];
        return (
          <React.Fragment key={i}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex min-w-[7rem] flex-1 items-center rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5"
              style={{ boxShadow: `inset 0 0 0 1px ${hue}22, 0 0 24px -12px ${hue}` }}
            >
              <span
                className="mr-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: hue, boxShadow: `0 0 8px ${hue}` }}
              />
              <span className="text-[12px] font-medium leading-tight text-text-dim">{node}</span>
            </motion.div>

            {i < parts.length - 1 && (
              <div className="flex items-center px-0.5 text-text-faint" aria-hidden="true">
                <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
                  <motion.path
                    d="M1 6 H15 M11 2 L15 6 L11 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                  />
                </svg>
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FlowDiagram;
