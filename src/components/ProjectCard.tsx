import { memo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Mode, Project } from "../data/content";
import { Icon } from "../lib/iconMap";
import { useDepth } from "../lib/depth";
import { PROJECT_VIZ } from "../lib/projectViz";
import FlowDiagram from "./FlowDiagram";
import MiniViz from "./MiniViz";

const HUE: Record<string, string> = {
  "AI-SAFETY / EVAL": "#22d3ee",
  "AUDIO-ML": "#ec4899",
  // Lightened from #8b5cf6: the "Full brief" label sits on this hue as ink,
  // and #8b5cf6 measured 4.49:1, just under AA. #a78bfa is 6.99:1.
  "GENAI / PIPELINE": "#a78bfa",
  "RAG / SAFETY": "#34d399",
  "EVAL / TOOLING": "#3b82f6",
  "CV / LOCAL-FIRST": "#22d3ee",
  "SYSTEMS / SECURITY": "#a78bfa",
  "AUTOML / BENCHMARK": "#34d399",
  "DEV-TOOL / SQL": "#fbbf24",
};

const STATUS: Record<Project["status"], string> = {
  SHIPPED: "text-accent-emerald",
  PREPRINT: "text-accent-cyan",
  COURSEWORK: "text-text-faint",
};

const ProjectCard = memo(function ProjectCard({
  project,
  index,
  mode,
  onOpen,
}: {
  project: Project;
  index: number;
  mode: Mode;
  onOpen: () => void;
}) {
  const { depth, setDepth } = useDepth();
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const hue = HUE[project.discipline] ?? "#8b5cf6";
  const mission = String(index + 1).padStart(2, "0");
  const viz = PROJECT_VIZ[project.id];
  const body =
    depth === "plain"
      ? project.plain
      : mode === "story"
        ? project.story
        : project.oneLiner;

  return (
    <motion.article
      id={project.id}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.25 }}
      className="glass edge-gradient group relative scroll-mt-28 overflow-hidden rounded-4xl"
      style={{ ["--card-hue" as string]: hue }}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-4xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 0 1px ${hue}40, 0 40px 90px -40px ${hue}` }}
        aria-hidden="true"
      />

      <div className="relative p-6">
        <div className="flex items-start gap-4">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10"
            style={{ background: `${hue}1a`, color: hue }}
          >
            <Icon name={project.iconName} size={20} />
          </span>
          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="font-mono text-[11px] font-semibold" style={{ color: hue }}>
                {String(mission)}
              </span>
              <span className="eyebrow">{project.discipline}</span>
              <span className={`text-[10px] font-bold uppercase tracking-wide ${STATUS[project.status]}`}>
                {project.status}
              </span>
            </div>
            <h3 className="font-display text-xl text-text">{project.title}</h3>
            <p className="mt-0.5 text-[13px] text-text-faint">{project.subtitle}</p>
          </div>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-text">
          <span style={{ color: hue }}>&ldquo;</span>
          {project.hook}
          <span style={{ color: hue }}>&rdquo;</span>
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="flex items-center gap-1.5 rounded-full border border-white/[0.12] px-3.5 py-1.5 text-xs font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
          >
            <ChevronDown size={13} strokeWidth={2} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
            {expanded ? "Less" : "Expand"}
          </button>
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Open project: ${project.title}`}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-ink transition-transform hover:scale-[1.03]"
            style={{ background: hue }}
          >
            Full brief
            <Icon name="ArrowUpRight" size={13} />
          </button>
        </div>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-white/10 pt-5">
                <div
                  className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.03] p-0.5"
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
                      className={`rounded-full px-3 py-1 text-[11px] font-semibold capitalize transition-colors ${
                        depth === d ? "bg-white/[0.12] text-text" : "text-text-faint hover:text-text-dim"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <p className="text-sm leading-relaxed text-text-dim">{body}</p>

                <div className="mt-5">
                  <p className="eyebrow mb-2">Architecture</p>
                  <FlowDiagram overview={project.architecture.overview} />
                </div>

                {viz && (
                  <div className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                    <MiniViz title={viz.title} bars={viz.bars} />
                  </div>
                )}

                <ul className="mt-5 space-y-1.5">
                  {project.evidence.slice(0, 3).map((e, i) => (
                    <li key={i} className="flex gap-2 text-[13px] leading-snug text-text-dim">
                      <span className="mt-1 shrink-0" style={{ color: hue }}>▹</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative border-t border-white/[0.08] bg-white/[0.015]">
        <div className="flex flex-wrap gap-x-2 gap-y-1 px-6 py-3">
          {project.tags.map((tag) => (
            <span key={tag} className="text-[11px] text-text-faint">
              {tag}
            </span>
          ))}
        </div>
        <dl className="grid grid-cols-2 border-t border-white/[0.08]">
          {project.metrics.map((m) => (
            <div key={m.label} className="border-white/[0.08] px-6 py-3 [&:nth-child(odd)]:border-r">
              <dt className="text-[11px] text-text-faint">{m.label}</dt>
              <dd className="mt-0.5 font-mono text-sm font-bold text-text">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </motion.article>
  );
});

export default ProjectCard;
