import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS, type Mode } from "../data/content";
import { Icon } from "../lib/iconMap";

interface ProjectsSectionProps {
  mode: Mode;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ mode }) => {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.projects.filter((p) => {
      const matchesQuery =
        !q ||
        [p.title, p.subtitle, p.oneLiner, p.story, ...p.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesTags =
        activeTags.size === 0 || p.tags.some((t) => activeTags.has(t));
      return matchesQuery && matchesTags;
    });
  }, [query, activeTags]);

  const selectedProject = useMemo(
    () => PROJECTS.projects.find((p) => p.id === selectedProjectId) || null,
    [selectedProjectId]
  );

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  }, []);

  const clearTags = useCallback(() => setActiveTags(new Set()), []);

  return (
    <>
      <AnimatedSection id="projects">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl glass">
              <Icon
                name={PROJECTS.header.iconName}
                size={24}
                className="text-cyan-400"
              />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-100 mb-2">
                {PROJECTS.header.title}
              </h3>
              <p className="text-slate-400 text-sm max-w-2xl">
                {PROJECTS.header.subtitle[mode]}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-500 uppercase tracking-widest hidden sm:block mt-2">
            {PROJECTS.header.eyebrow}
          </span>
        </div>

        {/* Search & filters */}
        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-2 glass rounded-xl px-4 py-3">
            <Search className="text-slate-500" size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={PROJECTS.searchPlaceholder}
              className="w-full bg-transparent outline-none text-sm text-slate-200 placeholder:text-slate-600"
              aria-label="Search projects"
            />
            {!!query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-xs text-slate-400 hover:text-slate-200 whitespace-nowrap"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 mr-1">
              <Filter size={14} /> Tags:
            </span>
            {allTags.map((tag) => {
              const on = activeTags.has(tag);
              return (
                <motion.button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all ${
                    on
                      ? "bg-cyan-500/15 border-cyan-500/30 text-cyan-200 glow-cyan"
                      : "bg-slate-900/30 border-slate-800/50 text-slate-400 hover:border-slate-700/50"
                  }`}
                  aria-pressed={on}
                  whileTap={{ scale: 0.95 }}
                >
                  {tag}
                </motion.button>
              );
            })}
            {activeTags.size > 0 && (
              <button
                type="button"
                onClick={clearTags}
                className="text-xs font-mono text-slate-400 hover:text-slate-200 ml-1"
              >
                Reset
              </button>
            )}
          </div>

          <div className="text-xs text-slate-600 font-mono">
            Showing {filteredProjects.length} / {PROJECTS.projects.length}
          </div>
        </div>

        {/* Project grid */}
        <StaggerContainer className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard
                  project={project}
                  mode={mode}
                  onOpen={() => setSelectedProjectId(project.id)}
                />
              </StaggerItem>
            ))}
          </AnimatePresence>
        </StaggerContainer>
      </AnimatedSection>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        mode={mode}
        onClose={() => setSelectedProjectId(null)}
      />
    </>
  );
};

export default ProjectsSection;
