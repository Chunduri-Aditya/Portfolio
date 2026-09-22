import { memo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import type { Project } from "../data/content";
import { Icon } from "../lib/iconMap";
import { PROJECT_VIZ } from "../lib/projectViz";
import FlowDiagram from "./FlowDiagram";
import MiniViz from "./MiniViz";

/**
 * Discipline to accent hue.
 *
 * Keyed by every discipline in PROJECTS, checked by a test rather than by
 * eye: the map previously held nine entries against eleven disciplines, so
 * jarvis and Company Agents silently took the fallback and looked like a
 * different tier of work than they are.
 *
 * Hues are the ones that clear AA as ink-on-colour, since the case-study
 * button sits on this hue. #2f8fe0 measured 4.49:1, just under; #7fb4ee is
 * 6.99:1.
 */
export const HUE: Record<string, string> = {
  "AI-SAFETY / EVAL": "#17b3b3",
  "AUDIO-ML": "#c1743a",
  "GENAI / PIPELINE": "#7fb4ee",
  "RAG / SAFETY": "#22c48c",
  "EVAL / TOOLING": "#6d82e8",
  "CV / LOCAL-FIRST": "#17b3b3",
  "SYSTEMS / SECURITY": "#7fb4ee",
  "AUTOML / BENCHMARK": "#22c48c",
  "DEV-TOOL / SQL": "#e3b23c",
  "AGENT-SECURITY / RUNTIME": "#17b3b3",
  "MULTI-AGENT / TOOLING": "#6d82e8",
  "AGENT / MEMORY": "#7fb4ee",
  "RETRIEVAL / API": "#17b3b3",
};

const STATUS: Record<Project["status"], string> = {
  SHIPPED: "text-accent-viridian",
  PREPRINT: "text-accent-teal",
  COURSEWORK: "text-text-faint",
};

const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useReducedMotion();
  const [expanded, setExpanded] = useState(false);

  const hue = HUE[project.discipline] ?? "#2f8fe0";
  const mission = String(index + 1).padStart(2, "0");
  const viz = PROJECT_VIZ[project.id];
  const body = project.oneLiner;

  return (
    <motion.article
      id={project.id}
      whileHover={reduce ? undefined : { y: -4 }}
      transition={{ duration: 0.25 }}
      className="glass edge-gradient group relative scroll-mt-28 overflow-hidden rounded-4xl border-white/[0.14] transition-colors duration-300 hover:border-white/30"
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
          <Link
            to={`/work/${project.id}`}
            aria-label={`Read the case study for ${project.title}`}
            className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-ink transition-transform hover:scale-[1.03]"
            style={{ background: hue }}
          >
            Case study
            <Icon name="ArrowUpRight" size={13} />
          </Link>
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
        {/*
          Column count follows the data. Fixed at two, Sourcewarden's three
          metrics left an orphaned half-width cell on its own row.
        */}
        <dl
          className={`grid border-t border-white/[0.08] ${
            project.metrics.length === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-2"
          }`}
        >
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="border-white/[0.08] px-6 py-3 [&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-b-0 sm:[&:not(:last-child)]:border-r"
            >
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
