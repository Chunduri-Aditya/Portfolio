import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink, Play, Lock } from "lucide-react";
import type { Mode, Project } from "../data/content";
import { CONTACT } from "../data/content";
import { Icon } from "../lib/iconMap";
import { useLockBodyScroll } from "../lib/useLockBodyScroll";
import { useDepth } from "../lib/depth";
import { PROJECT_VIZ } from "../lib/projectViz";
import FlowDiagram from "./FlowDiagram";
import MiniViz from "./MiniViz";

interface ProjectModalProps {
  project: Project | null;
  mode: Mode;
  onClose: () => void;
}

const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="eyebrow mb-3">{children}</p>
);

/** Prefilled mail link for a private repo, so the ask arrives already labelled. */
function requestAccessHref(repo: string, title: string): string {
  const subject = `Repo access request: ${repo}`;
  const body = `Hi Aditya,\n\nI read about ${title} on your portfolio and would like access to the ${repo} repository.\n\nWho I am:\nWhy I am asking:\n\nThanks`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, mode, onClose }) => {
  const { depth, setDepth } = useDepth();
  const [rawDiagram, setRawDiagram] = useState(false);
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

  const overview = !project
    ? ""
    : depth === "plain"
      ? project.plain
      : mode === "story"
        ? project.story
        : project.oneLiner;
  const viz = project ? PROJECT_VIZ[project.id] : undefined;

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
          <div className="fixed inset-0 bg-ink/80 backdrop-blur-md" />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.id}`}
            className="glass-strong edge-gradient relative my-4 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-4xl"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-white/10 bg-ink-2/80 p-6 backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-violet/30 to-accent-cyan/20 text-accent-cyan">
                  <Icon name={project.iconName} size={20} />
                </span>
                <div>
                  <p className="eyebrow mb-1">{project.discipline} · {project.status}</p>
                  <h3 id={`modal-title-${project.id}`} className="font-display text-2xl text-text">
                    {project.title}
                  </h3>
                  <p className="mt-0.5 text-[13px] text-text-faint">{project.subtitle}</p>
                </div>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="rounded-full border border-white/12 p-2 text-text-dim transition-colors hover:border-accent-pink/60 hover:text-accent-pink focus:outline-none focus:ring-2 focus:ring-accent-violet/50"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="space-y-8 p-6">
              <section>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <Label>Overview</Label>
                  <div className="inline-flex rounded-full border border-white/10 bg-white/[0.03] p-0.5" role="radiogroup" aria-label="Explanation depth">
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
                </div>
                <p className="text-[15px] leading-relaxed text-text-dim">{overview}</p>
              </section>

              <section>
                <Label>Evidence</Label>
                <ul className="space-y-2">
                  {project.evidence.map((item, idx) => (
                    <li key={idx} className="flex gap-3 text-sm leading-snug text-text-dim">
                      <span className="mt-1 shrink-0 text-accent-cyan">▹</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {viz && (
                <section>
                  <Label>Results</Label>
                  <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                    <MiniViz title={viz.title} bars={viz.bars} />
                  </div>
                </section>
              )}

              <section>
                <div className="mb-3 flex items-center justify-between">
                  <Label>Architecture</Label>
                  <button
                    type="button"
                    onClick={() => setRawDiagram((r) => !r)}
                    className="text-[11px] font-semibold text-text-faint hover:text-text-dim"
                  >
                    {rawDiagram ? "flow view" : "raw"}
                  </button>
                </div>
                {rawDiagram ? (
                  <div className="code-block p-4">
                    <p className="mb-3 font-mono text-[13px] text-text-dim">{project.architecture.overview}</p>
                    <pre className="overflow-x-auto whitespace-pre font-mono text-[11px] leading-relaxed text-accent-cyan/80">
                      {project.architecture.diagram}
                    </pre>
                  </div>
                ) : (
                  <FlowDiagram overview={project.architecture.overview} />
                )}
                <p className="mb-2 mt-4 eyebrow">Tradeoffs</p>
                <ul className="space-y-1.5">
                  {project.architecture.tradeoffs.map((t, idx) => (
                    <li key={idx} className="flex gap-2 text-[13px] leading-snug text-text-dim">
                      <span className="mt-1 shrink-0 text-accent-pink">/</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <Label>Key decisions</Label>
                <div className="grid gap-3">
                  {project.decisions.map((d, idx) => (
                    <div key={idx} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                      <p className="mb-1 text-sm font-bold text-text">{d.title}</p>
                      <p className="text-[13px] leading-snug text-text-dim">{d.why}</p>
                    </div>
                  ))}
                </div>
              </section>

              {(project.links.github ||
                project.links.requestAccess ||
                project.links.live ||
                project.links.demo) && (
                <section className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
                  {project.links.requestAccess && (
                    <a
                      href={requestAccessHref(project.links.requestAccess, project.title)}
                      className="flex items-center gap-2 rounded-full border border-white/[0.12] px-4 py-2 text-xs font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
                    >
                      <Lock size={14} strokeWidth={2} />
                      Private repo · request access
                    </a>
                  )}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
                    >
                      <Github size={14} strokeWidth={2} />
                      GitHub
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-violet to-accent-cyan px-4 py-2 text-xs font-bold text-white"
                    >
                      <ExternalLink size={14} strokeWidth={2} />
                      Live / DOI
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-xs font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
                    >
                      <Play size={14} strokeWidth={2} />
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
