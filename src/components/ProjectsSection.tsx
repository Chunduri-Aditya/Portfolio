import React, { useCallback, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { AnimatedSection, StaggerContainer, StaggerItem } from "./AnimatedSection";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS, type Mode } from "../data/content";

interface ProjectsSectionProps {
  mode: Mode;
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  mode,
  selectedProjectId,
  onSelectProject,
}) => {
  const [query, setQuery] = useState("");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());

  const allTags = useMemo(() => {
    const set = new Set<string>();
    PROJECTS.projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, []);

  // Keep a stable mission number per project regardless of filtering.
  const indexById = useMemo(() => {
    const m = new Map<string, number>();
    PROJECTS.projects.forEach((p, i) => m.set(p.id, i));
    return m;
  }, []);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS.projects.filter((p) => {
      const matchesQuery =
        !q ||
        [p.title, p.subtitle, p.hook, p.plain, p.oneLiner, p.story, p.discipline, ...p.tags]
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
    [selectedProjectId],
  );

  const toggleTag = useCallback((tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }, []);

  const clearTags = useCallback(() => setActiveTags(new Set()), []);

  return (
    <>
      <AnimatedSection id="projects">
        {/* Header */}
        <header className="mb-8">
          <p className="hud-label mb-2">// {PROJECTS.header.eyebrow}</p>
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-display text-3xl font-extrabold uppercase tracking-crush text-phosphor sm:text-4xl">
              {PROJECTS.header.title}
            </h3>
            <span className="hud-readout shrink-0 pb-1 text-xs text-phosphor-dim">
              {String(filteredProjects.length).padStart(2, "0")} /{" "}
              {String(PROJECTS.projects.length).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-phosphor-dim">
            {PROJECTS.header.subtitle[mode]}
          </p>
        </header>

        {/* Search + filters */}
        <div className="mb-6 border border-hairline">
          <div className="flex items-center gap-2 border-b border-hairline px-3 py-2.5">
            <Search size={14} strokeWidth={1.5} className="text-phosphor-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={PROJECTS.searchPlaceholder}
              className="w-full bg-transparent font-mono text-xs text-phosphor outline-none placeholder:text-phosphor-faint"
              aria-label="Search projects"
            />
            {!!query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="shrink-0 font-mono text-[10px] uppercase tracking-hud text-phosphor-dim hover:text-phosphor"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 p-3">
            <span className="mr-1 font-mono text-[10px] uppercase tracking-hud text-phosphor-faint">
              Filter:
            </span>
            {allTags.map((tag) => {
              const on = activeTags.has(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={on}
                  className={`border px-2 py-0.5 font-mono text-[10px] uppercase tracking-hud transition-colors ${
                    on
                      ? "border-hazard bg-hazard text-white"
                      : "border-hairline text-phosphor-dim hover:border-phosphor-faint hover:text-phosphor"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {activeTags.size > 0 && (
              <button
                type="button"
                onClick={clearTags}
                className="ml-1 font-mono text-[10px] uppercase tracking-hud text-hazard hover:text-hazard-bright"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <StaggerContainer className="flex flex-col gap-5">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard
                  project={project}
                  index={indexById.get(project.id) ?? 0}
                  mode={mode}
                  onOpen={() => onSelectProject(project.id)}
                />
              </StaggerItem>
            ))}
          </AnimatePresence>
          {filteredProjects.length === 0 && (
            <p className="border border-hairline px-4 py-8 text-center font-mono text-xs uppercase tracking-hud text-phosphor-faint">
              No missions match the current filter.
            </p>
          )}
        </StaggerContainer>
      </AnimatedSection>

      <ProjectModal project={selectedProject} mode={mode} onClose={() => onSelectProject(null)} />
    </>
  );
};

export default ProjectsSection;
