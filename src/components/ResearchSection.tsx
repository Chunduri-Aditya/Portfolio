import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { RESEARCH } from "../data/content";

const ACCENT: Record<string, string> = { teal: "#17b3b3", sapphire: "#2f8fe0", indigo: "#6d82e8", viridian: "#22c48c" };

const PubFile: React.FC<{
  pub: (typeof RESEARCH.publications)[number];
  index: number;
}> = ({ pub, index }) => {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const body = pub.summary;

  return (
    <div className="glass edge-gradient overflow-hidden rounded-4xl">
      <div className="flex items-center justify-between px-6 pt-5">
        <span className="font-mono text-[11px] font-semibold text-accent-sapphire">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="eyebrow">{pub.badge}</span>
      </div>

      <div className="p-6 pt-3">
        <h3 className="font-display text-lg leading-snug text-text">{pub.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-text">{pub.hook}</p>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-4 rounded-full border border-white/[0.12] px-3.5 py-1.5 text-xs font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
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
                <p className="text-sm leading-relaxed text-text-dim">{body}</p>
                <dl className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {pub.metrics.map((m) => (
                    <div
                      key={m.label}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-3"
                      style={{ boxShadow: `inset 0 0 0 1px ${ACCENT[m.accent]}22` }}
                    >
                      <dt className="text-[10px] leading-tight text-text-faint">{m.label}</dt>
                      <dd className="mt-0.5 text-[13px] font-bold" style={{ color: ACCENT[m.accent] }}>
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
              className="flex items-center gap-1.5 rounded-full border border-white/[0.12] px-3 py-1.5 text-xs font-semibold text-text-dim transition-colors hover:border-accent-teal/50 hover:text-accent-teal"
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

const ResearchSection: React.FC = () => (
  <AnimatedSection id="research" labelledBy="research-heading">
    <header className="mb-8">
      <p className="eyebrow mb-2">Publications</p>
      <h2 id="research-heading" className="font-display text-3xl text-text sm:text-4xl">
        <span className="gradient-text">{RESEARCH.header.title}</span>
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-text-dim">{RESEARCH.header.subtitle}</p>
    </header>

    <div className="flex flex-col gap-6">
      {RESEARCH.publications.map((pub, i) => (
        <PubFile key={pub.title} pub={pub} index={i} />
      ))}
    </div>
  </AnimatedSection>
);

export default ResearchSection;
