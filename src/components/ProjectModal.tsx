import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Play } from "lucide-react";
import type { Mode, Project } from "../data/content";
import { Icon } from "../lib/iconMap";
import { useLockBodyScroll } from "../lib/useLockBodyScroll";
import { useDepth } from "../lib/depth";

interface ProjectModalProps {
  project: Project | null;
  mode: Mode;
  onClose: () => void;
}

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="mb-3 font-mono text-[10px] uppercase tracking-hud text-hazard">
    [ {children} ]
  </p>
);

const ProjectModal: React.FC<ProjectModalProps> = ({ project, mode, onClose }) => {
  const { depth, setDepth } = useDepth();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(!!project);

  useEffect(() => {
    if (project) requestAnimationFrame(() => closeBtnRef.current?.focus());
  }, [project]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const overview =
    !project
      ? ""
      : depth === "plain"
        ? project.plain
        : mode === "story"
          ? project.story
          : project.oneLiner;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="fixed inset-0 bg-ground/85 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.id}`}
            className="hud-panel relative my-4 max-h-[92vh] w-full max-w-3xl overflow-y-auto"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="h-px w-full bg-hazard" />

            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-hairline bg-ground-raised p-5">
              <div className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-hairline text-phosphor-dim">
                  <Icon name={project.iconName} size={20} className={project.iconClassName} />
                </span>
                <div>
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
                    MISSION BRIEF &nbsp;/&nbsp; {project.discipline} &nbsp;/&nbsp; {project.status}
                  </p>
                  <h3
                    id={`modal-title-${project.id}`}
                    className="font-display text-xl font-extrabold uppercase tracking-crush text-phosphor"
                  >
                    {project.title}
                  </h3>
                  <p className="mt-0.5 font-mono text-[11px] text-phosphor-dim">{project.subtitle}</p>
                </div>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="border border-hairline p-2 text-phosphor-dim transition-colors hover:border-hazard hover:text-hazard focus:outline-none focus:ring-1 focus:ring-hazard"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <div className="space-y-8 p-5">
              {/* Overview + depth toggle */}
              <section>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <SectionLabel>OVERVIEW</SectionLabel>
                  <div
                    className="flex items-stretch border border-hairline"
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
                </div>
                <p className="text-[15px] leading-relaxed text-phosphor-dim">{overview}</p>
              </section>

              {/* Evidence */}
              <section>
                <SectionLabel>EVIDENCE</SectionLabel>
                <ul className="space-y-2">
                  {project.evidence.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm leading-snug text-phosphor-dim">
                      <span className="mt-1 shrink-0 text-hazard">+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Architecture */}
              <section>
                <SectionLabel>ARCHITECTURE</SectionLabel>
                <div className="code-block p-4">
                  <p className="mb-3 font-mono text-[13px] text-phosphor-dim">
                    {project.architecture.overview}
                  </p>
                  <pre className="overflow-x-auto whitespace-pre font-mono text-[11px] leading-relaxed text-online/80">
                    {project.architecture.diagram}
                  </pre>
                </div>
                <p className="mb-2 mt-4 font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
                  Tradeoffs
                </p>
                <ul className="space-y-1.5">
                  {project.architecture.tradeoffs.map((t, idx) => (
                    <li key={idx} className="flex gap-2 text-[13px] leading-snug text-phosphor-dim">
                      <span className="mt-1 shrink-0 text-hazard">/</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Decisions */}
              <section>
                <SectionLabel>KEY DECISIONS</SectionLabel>
                <div className="hud-grid grid-cols-1">
                  {project.decisions.map((d, idx) => (
                    <div key={idx} className="p-4">
                      <p className="mb-1 text-sm font-bold text-phosphor">{d.title}</p>
                      <p className="text-[13px] leading-snug text-phosphor-dim">{d.why}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Links */}
              {(project.links.github ||
                (project.links.live && project.links.live !== "#") ||
                (project.links.demo && project.links.demo !== "#")) && (
                <section className="flex flex-wrap items-center gap-2 border-t border-hairline pt-6">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 border border-hairline px-4 py-2 font-mono text-[10px] uppercase tracking-hud text-phosphor-dim transition-colors hover:border-phosphor-faint hover:text-phosphor"
                    >
                      <Github size={13} strokeWidth={1.5} />
                      GitHub
                    </a>
                  )}
                  {project.links.live && project.links.live !== "#" && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 border border-hazard bg-hazard px-4 py-2 font-mono text-[10px] uppercase tracking-hud text-white transition-colors hover:bg-hazard-bright"
                    >
                      <ExternalLink size={13} strokeWidth={1.5} />
                      Live / DOI
                    </a>
                  )}
                  {project.links.demo && project.links.demo !== "#" && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 border border-hairline px-4 py-2 font-mono text-[10px] uppercase tracking-hud text-phosphor-dim transition-colors hover:border-phosphor-faint hover:text-phosphor"
                    >
                      <Play size={13} strokeWidth={1.5} />
                      Demo
                    </a>
                  )}
                </section>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
