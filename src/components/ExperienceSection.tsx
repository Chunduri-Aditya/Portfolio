import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import { EXPERIENCE, type Mode } from "../data/content";
import { useDepth } from "../lib/depth";

interface ExperienceSectionProps {
  mode: Mode;
}

const ExperienceRow: React.FC<{
  exp: (typeof EXPERIENCE.items)[number];
  mode: Mode;
}> = ({ exp, mode }) => {
  const { depth, setDepth } = useDepth();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  const body =
    depth === "plain" ? exp.plain : mode === "story" ? exp.story : exp.signal;

  return (
    <div className="hud-panel hud-corners">
      <div className="flex flex-col gap-2 border-b border-hairline p-5 md:flex-row md:items-start md:justify-between">
        <div>
          <h4 className="font-display text-lg font-bold text-phosphor">{exp.org}</h4>
          <p className="mt-0.5 font-mono text-[11px] uppercase tracking-hud text-hazard">
            {exp.role}
          </p>
        </div>
        <div className="shrink-0 font-mono text-[10px] uppercase tracking-hud text-phosphor-faint md:text-right">
          <div>{exp.period}</div>
          <div>{exp.location}</div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[15px] leading-relaxed text-phosphor">{exp.hook}</p>

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

                <ul className="mt-4 space-y-2">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 text-[13px] leading-snug text-phosphor-dim">
                      <span className="mt-1 shrink-0 text-hazard">+</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1">
                  {exp.tags.map((t) => (
                    <span key={t} className="font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
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

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ mode }) => (
  <AnimatedSection id="experience">
    <header className="mb-8">
      <p className="hud-label mb-2">// SERVICE RECORD</p>
      <h3 className="font-display text-3xl font-extrabold uppercase tracking-crush text-phosphor sm:text-4xl">
        {EXPERIENCE.header.title}
      </h3>
      <p className="mt-2 max-w-2xl text-sm text-phosphor-dim">
        {EXPERIENCE.header.subtitle[mode]}
      </p>
    </header>

    <StaggerContainer className="flex flex-col gap-5">
      {EXPERIENCE.items.map((exp) => (
        <StaggerItem key={`${exp.org}-${exp.period}`}>
          <ExperienceRow exp={exp} mode={mode} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  </AnimatedSection>
);

export default ExperienceSection;
