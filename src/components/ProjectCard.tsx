import { memo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { Mode, Project } from "../data/content";
import { Icon } from "../lib/iconMap";
import { useDepth } from "../lib/depth";

const STATUS_STYLE: Record<Project["status"], string> = {
  SHIPPED: "text-online border-online/40",
  PREPRINT: "text-phosphor border-hairline",
  COURSEWORK: "text-phosphor-dim border-hairline",
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

  const mission = String(index + 1).padStart(2, "0");
  const body =
    depth === "plain"
      ? project.plain
      : mode === "story"
        ? project.story
        : project.oneLiner;

  return (
    <article
      id={project.id}
      className="hud-panel hud-corners scroll-mt-28 transition-colors hover:border-phosphor-faint"
    >
      {/* Header row */}
      <div className="flex items-start gap-4 border-b border-hairline p-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-hairline text-phosphor-dim">
          <Icon name={project.iconName} size={20} className={project.iconClassName} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="font-mono text-[10px] uppercase tracking-hud text-hazard">
              MISSION {mission}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
              {project.discipline}
            </span>
            <span
              className={`border px-1.5 font-mono text-[9px] uppercase tracking-hud ${STATUS_STYLE[project.status]}`}
            >
              {project.status}
            </span>
          </div>
          <h4 className="font-display text-lg font-bold leading-tight text-phosphor">
            {project.title}
          </h4>
          <p className="mt-0.5 font-mono text-[11px] text-phosphor-dim">{project.subtitle}</p>
        </div>
      </div>

      {/* Hook — always visible */}
      <div className="p-5">
        <p className="text-[15px] leading-relaxed text-phosphor">
          <span className="mr-1 text-hazard">&ldquo;</span>
          {project.hook}
          <span className="ml-0.5 text-hazard">&rdquo;</span>
        </p>

        {/* Controls */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            className="flex items-center gap-1.5 border border-hairline px-3 py-1.5 font-mono text-[10px] uppercase tracking-hud text-phosphor-dim transition-colors hover:border-phosphor-faint hover:text-phosphor"
          >
            <ChevronDown
              size={12}
              strokeWidth={1.5}
              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
            />
            {expanded ? "Collapse" : "Expand"}
          </button>
          <button
            type="button"
            onClick={onOpen}
            aria-label={`Open project: ${project.title}`}
            className="flex items-center gap-1.5 border border-hairline px-3 py-1.5 font-mono text-[10px] uppercase tracking-hud text-phosphor-dim transition-colors hover:border-hazard hover:text-hazard"
          >
            Full brief
            <Icon name="ArrowUpRight" size={12} />
          </button>
        </div>

        {/* Expanded body */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 border-t border-hairline pt-5">
                {/* Depth toggle */}
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

                {/* Evidence peek */}
                <ul className="mt-4 space-y-1.5">
                  {project.evidence.slice(0, 3).map((e, i) => (
                    <li key={i} className="flex gap-2 text-[13px] leading-snug text-phosphor-dim">
                      <span className="mt-1 shrink-0 text-hazard">+</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tags + metrics footer */}
      <div className="border-t border-hairline">
        <div className="flex flex-wrap gap-x-3 gap-y-1 px-5 py-2.5">
          {project.tags.map((tag) => (
            <span key={tag} className="font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
              {tag}
            </span>
          ))}
        </div>
        <dl className="hud-grid grid-cols-2 border-t border-hairline sm:grid-cols-4">
          {project.metrics.map((m) => (
            <div key={m.label} className="px-4 py-2.5">
              <dt className="font-mono text-[9px] uppercase leading-tight tracking-hud text-phosphor-faint">
                {m.label}
              </dt>
              <dd className="hud-readout mt-0.5 text-sm font-bold text-phosphor">{m.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
});

export default ProjectCard;
