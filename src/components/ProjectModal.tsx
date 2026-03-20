import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XCircle,
  CheckCircle2,
  Github,
  ExternalLink,
  Play,
} from "lucide-react";
import type { Project } from "./ProjectCard";

type Mode = "signal" | "story";

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const orig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = orig;
    };
  }, [locked]);
}

interface ProjectModalProps {
  project: Project | null;
  mode: Mode;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, mode, onClose }) => {
  const isStory = mode === "story";
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useLockBodyScroll(!!project);

  useEffect(() => {
    if (project) {
      requestAnimationFrame(() => closeBtnRef.current?.focus());
    }
  }, [project]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${project.id}`}
            className="relative max-w-4xl w-full bg-slate-900/95 rounded-2xl border border-slate-800/60 shadow-2xl my-8 max-h-[90vh] overflow-y-auto backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Gradient top bar */}
            <div className="h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-t-2xl" />

            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800/50 p-6 flex items-start justify-between z-10">
              <div className="flex items-start gap-4 flex-1">
                <div className="p-3 rounded-xl glass">{project.icon}</div>
                <div className="flex-1">
                  <h3
                    id={`modal-title-${project.id}`}
                    className="text-2xl font-bold text-slate-100 mb-1"
                  >
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 font-mono">{project.subtitle}</p>
                </div>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
                aria-label="Close modal"
              >
                <XCircle className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4 className="text-xs font-mono text-slate-500 mb-2 uppercase tracking-widest">
                  {isStory ? "The Story" : "Overview"}
                </h4>
                <p
                  className={`text-base leading-relaxed ${
                    isStory ? "text-slate-200" : "text-slate-300"
                  }`}
                >
                  {isStory ? project.story : project.oneLiner}
                </p>
              </motion.div>

              {/* Evidence */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-widest">
                  Evidence
                </h4>
                <ul className="space-y-2">
                  {project.evidence.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Architecture */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h4 className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-widest">
                  Architecture
                </h4>
                <div className="code-block p-4 mb-3">
                  <p className="text-sm text-slate-300 mb-3 font-mono">
                    {project.architecture.overview}
                  </p>
                  <pre className="text-xs text-cyan-300/70 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                    {project.architecture.diagram}
                  </pre>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-mono text-slate-500 mb-2">Tradeoffs:</p>
                  {project.architecture.tradeoffs.map((tradeoff, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-slate-400 flex items-start gap-2"
                    >
                      <span className="text-cyan-500/50">\u2022</span>
                      <span>{tradeoff}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Decisions */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h4 className="text-xs font-mono text-slate-500 mb-3 uppercase tracking-widest">
                  Key Decisions
                </h4>
                <div className="space-y-3">
                  {project.decisions.map((decision, idx) => (
                    <div
                      key={idx}
                      className="glass rounded-xl p-4"
                    >
                      <div className="text-sm font-semibold text-slate-200 mb-1">
                        {decision.title}
                      </div>
                      <div className="text-xs text-slate-400 italic">
                        {decision.why}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Links */}
              <motion.div
                className="flex items-center gap-3 pt-6 border-t border-slate-800/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 glass glass-hover rounded-xl text-sm text-slate-200 transition-all hover:text-white"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                )}
                {project.links.live && project.links.live !== "#" && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 glass glass-hover rounded-xl text-sm text-slate-200 transition-all hover:text-white"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {project.links.demo && project.links.demo !== "#" && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl text-sm text-white transition-all"
                  >
                    <Play size={16} />
                    Demo
                  </a>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
