import React, { memo } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Mode, Project } from "../data/content";
import { Icon } from "../lib/iconMap";

const ProjectCard = memo(function ProjectCard({
  project,
  mode,
  onOpen,
}: {
  project: Project;
  mode: Mode;
  onOpen: () => void;
}) {
  const isStory = mode === "story";

  return (
    <motion.button
      type="button"
      id={project.id}
      onClick={onOpen}
      className="text-left rounded-2xl glass gradient-border p-6 hover:bg-slate-900/70 transition-all cursor-pointer group focus:outline-none focus:ring-2 focus:ring-cyan-500/30"
      aria-label={`Open project: ${project.title}`}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/50 group-hover:border-slate-700/50 transition-colors">
            <Icon
              name={project.iconName}
              size={24}
              className={project.iconClassName}
            />
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-100 mb-1 group-hover:text-white transition-colors">
              {project.title}
            </h4>
            <p className="text-sm text-slate-500 font-mono">{project.subtitle}</p>
          </div>
        </div>
        <motion.div className="mt-1" animate={{ x: 0 }} whileHover={{ x: 4 }}>
          <ArrowRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 transition-colors" />
        </motion.div>
      </div>

      <p
        className={`text-sm leading-relaxed mb-4 ${
          isStory ? "text-slate-300" : "text-slate-400"
        }`}
      >
        {isStory ? project.story : project.oneLiner}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 bg-slate-900/50 border border-slate-800/50 text-slate-400 rounded-lg font-mono group-hover:border-slate-700/50 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-xs text-slate-500 font-mono pt-3 border-t border-slate-800/30">
        {project.metrics.map((m, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            <span className="text-slate-600">{m.label}:</span>
            <span className="text-slate-400">{m.value}</span>
          </div>
        ))}
      </div>
    </motion.button>
  );
});

export default ProjectCard;
