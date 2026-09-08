import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { RESEARCH, type Mode } from "../data/content";
import { useDepth } from "../lib/depth";

interface ResearchSectionProps {
  mode: Mode;
}

const PubFile: React.FC<{
  pub: (typeof RESEARCH.publications)[number];
  index: number;
  mode: Mode;
}> = ({ pub, index, mode }) => {
  const { depth, setDepth } = useDepth();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  const body =
    depth === "plain" ? pub.plain : mode === "story" ? pub.story : pub.signal;

  return (
    <div className="hud-panel hud-corners">
      <div className="flex items-center justify-between border-b border-hairline px-5 py-2.5">
        <span className="font-mono text-[10px] uppercase tracking-hud text-hazard">
          DOC {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
          {pub.badge}
        </span>
      </div>

      <div className="p-5">
        <h4 className="font-display text-lg font-bold leading-snug text-phosphor">
          {pub.title}
        </h4>
        <p className="mt-3 text-[15px] leading-relaxed text-phosphor">{pub.hook}</p>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-4 flex items-center gap-1.5 border border-hairline px-3 py-1.5 font-mono text-[10px] uppercase tracking-hud text-phosphor-dim transition-colors hover:border-phosphor-faint hover:text-phosphor"
        >
          {open ? "Collapse" : "Expand"}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-hairline pt-5">
                <div
                  className="mb-4 flex w-max items-stretch border border-hairline"
                  role="radiogroup"
                  aria-label="Explanation depth"
                >
                  {(["plain", "technical"] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      role="radio"
                      aria-checked={depth === d}
                      onClick={() => setDepth(d)}
                      className={`px-3 py-1 font-mono text-[10px] uppercase tracking-hud transition-colors ${
                        depth === d ? "bg-hazard text-white" : "text-phosphor-dim hover:text-phosphor"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-phosphor-dim">{body}</p>

                <dl className="hud-grid mt-4 grid-cols-2 sm:grid-cols-4">
                  {pub.metrics.map((m) => (
                    <div key={m.label} className="px-3 py-2.5">
                      <dt className="font-mono text-[9px] uppercase leading-tight tracking-hud text-phosphor-faint">
                        {m.label}
                      </dt>
                      <dd className="hud-readout mt-0.5 text-[13px] font-bold text-phosphor">
                        {m.value}
                      </dd>
                    </div>
                  ))}
                </dl>
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
              className="flex items-center gap-1.5 border border-hairline px-3 py-1.5 font-mono text-[10px] uppercase tracking-hud text-phosphor-dim transition-colors hover:border-hazard hover:text-hazard"
            >
              {link.label}
              <ExternalLink size={11} strokeWidth={1.5} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const ResearchSection: React.FC<ResearchSectionProps> = ({ mode }) => (
  <AnimatedSection id="research">
    <header className="mb-8">
      <p className="hud-label mb-2">// INTEL FILES</p>
      <h3 className="font-display text-3xl font-extrabold uppercase tracking-crush text-phosphor sm:text-4xl">
        {RESEARCH.header.title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-phosphor-dim">
        {RESEARCH.header.subtitle[mode]}
      </p>
    </header>

    <div className="flex flex-col gap-5">
      {RESEARCH.publications.map((pub, i) => (
        <PubFile key={pub.title} pub={pub} index={i} mode={mode} />
      ))}
    </div>
  </AnimatedSection>
);

export default ResearchSection;
