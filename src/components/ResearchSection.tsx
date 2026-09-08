import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { RESEARCH, type Mode } from "../data/content";
import { useDepth } from "../lib/depth";

const ACCENT: Record<string, string> = { cyan: "#22d3ee", purple: "#8b5cf6", blue: "#3b82f6", green: "#34d399" };

const PubFile: React.FC<{
  pub: (typeof RESEARCH.publications)[number];
  index: number;
  mode: Mode;
}> = ({ pub, index, mode }) => {
  const { depth, setDepth } = useDepth();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const body = depth === "plain" ? pub.plain : mode === "story" ? pub.story : pub.signal;

  return (
    <div className="glass edge-gradient overflow-hidden rounded-4xl">
      <div className="flex items-center justify-between px-6 pt-5">
        <span className="font-mono text-[11px] font-semibold text-accent-violet">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="eyebrow">{pub.badge}</span>
      </div>

      <div className="p-6 pt-3">
        <h4 className="font-display text-lg leading-snug text-text">{pub.title}</h4>
        <p className="mt-3 text-[15px] leading-relaxed text-text">{pub.hook}</p>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-4 rounded-full border border-white/12 px-3.5 py-1.5 text-xs font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
        >
          {open ? "Less" : "Expand"}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-white/10 pt-5">
                <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-0.5" role="radiogroup" aria-label="Explanation depth">
                  {(["plain", "technical"] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      role="radio"
                      aria-checked={depth === d}
                      onClick={() => setDepth(d)}
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold capitalize transition-colors ${
                        depth === d ? "bg-white/12 text-text" : "text-text-faint hover:text-text-dim"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-text-dim">{body}</p>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {pub.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-white/8 bg-white/[0.02] p-3"
                      style={{ boxShadow: `inset 0 0 0 1px ${ACCENT[m.accent]}22` }}
                    >
                      <dt className="text-[10px] leading-tight text-text-faint">{m.label}</dt>
                      <dd className="mt-0.5 text-[13px] font-bold" style={{ color: ACCENT[m.accent] }}>
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex flex-wrap gap-2">
          {pub.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-white/12 px-3 py-1.5 text-xs font-semibold text-text-dim transition-colors hover:border-accent-cyan/50 hover:text-accent-cyan"
            >
              {link.label}
              <ExternalLink size={12} strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const ResearchSection: React.FC<{ mode: Mode }> = ({ mode }) => (
  <AnimatedSection id="research">
    <header className="mb-8">
      <p className="eyebrow mb-2">Publications</p>
      <h3 className="font-display text-3xl text-text sm:text-4xl">
        <span className="gradient-text">{RESEARCH.header.title}</span>
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-text-dim">{RESEARCH.header.subtitle[mode]}</p>
    </header>

    <div className="flex flex-col gap-6">
      {RESEARCH.publications.map((pub, i) => (
        <PubFile key={pub.title} pub={pub} index={i} mode={mode} />
      ))}
    </div>
  </AnimatedSection>
);

export default ResearchSection;
