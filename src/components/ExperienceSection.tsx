import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { EXPERIENCE, type ExperienceAccent, type Mode } from "../data/content";
import { useDepth } from "../lib/depth";

const HUE: Record<ExperienceAccent, string> = {
  teal: "#17b3b3",
  sapphire: "#2f8fe0",
  viridian: "#22c48c",
};

const ExperienceRow: React.FC<{
  exp: (typeof EXPERIENCE.items)[number];
  mode: Mode;
}> = ({ exp, mode }) => {
  const { depth, setDepth } = useDepth();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const hue = HUE[exp.accent];

  const body = depth === "plain" ? exp.plain : mode === "story" ? exp.story : exp.signal;

  return (
    <div className="glass overflow-hidden rounded-4xl">
      <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${hue}, transparent)` }} />
      <div className="p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="font-display text-lg text-text">{exp.org}</h3>
            <p className="mt-0.5 text-[13px] font-semibold" style={{ color: hue }}>
              {exp.role}
            </p>
          </div>
          <div className="shrink-0 font-mono text-[11px] text-text-faint sm:text-right">
            <div>{exp.period}</div>
            <div>{exp.location}</div>
          </div>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-text">{exp.hook}</p>

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
                <div className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-0.5" role="radiogroup" aria-label="Explanation depth">
                  {(["plain", "technical"] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      role="radio"
                      aria-checked={depth === d}
                      onClick={() => setDepth(d)}
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold capitalize transition-colors ${
                        depth === d ? "bg-white/[0.12] text-text" : "text-text-faint hover:text-text-dim"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-text-dim">{body}</p>
                <ul className="mt-4 space-y-2">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-[13px] leading-snug text-text-dim">
                      <span className="mt-1 shrink-0" style={{ color: hue }}>▹</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-text-faint">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ExperienceSection: React.FC<{ mode: Mode }> = ({ mode }) => (
  <AnimatedSection id="experience" labelledBy="experience-heading">
    <header className="mb-8">
      <p className="eyebrow mb-2">Field work</p>
      <h2 id="experience-heading" className="font-display text-3xl text-text sm:text-4xl">
        <span className="gradient-text">{EXPERIENCE.header.title}</span>
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-text-dim">{EXPERIENCE.header.subtitle[mode]}</p>
    </header>

    <StaggerContainer className="flex flex-col gap-6">
      {EXPERIENCE.items.map((exp) => (
        <StaggerItem key={`${exp.org}-${exp.period}`}>
          <ExperienceRow exp={exp} mode={mode} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  </AnimatedSection>
);

export default ExperienceSection;
