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
      const matchesTags = activeTags.size === 0 || p.tags.some((t) => activeTags.has(t));
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

  /*
   * Split after filtering, not before, so search and the tag filter still
   * apply to both groups. Mission numbers come from indexById, which is keyed
   * off the source array, so a project keeps its number wherever it renders.
   */
  const [featured, rest] = useMemo(() => {
    const f = filteredProjects.filter((p) => p.featured);
    const r = filteredProjects.filter((p) => !p.featured);
    return [f, r] as const;
  }, [filteredProjects]);

  return (
    <>
      <AnimatedSection id="projects" labelledBy="projects-heading">
        <header className="mb-8">
          <p className="eyebrow mb-2">{PROJECTS.header.eyebrow}</p>
          <div className="flex items-end justify-between gap-4">
            <h2 id="projects-heading" className="font-display text-3xl text-text sm:text-4xl">
              <span className="gradient-text">{PROJECTS.header.title}</span>
            </h2>
            <span className="shrink-0 pb-1 font-mono text-sm text-text-faint">
              {String(filteredProjects.length).padStart(2, "0")} / {String(PROJECTS.projects.length).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-text-dim">{PROJECTS.header.subtitle[mode]}</p>
        </header>

        <div className="glass mb-6 rounded-3xl p-2">
          <div className="flex items-center gap-2 rounded-2xl bg-white/[0.03] px-3.5 py-2.5">
            <Search size={15} strokeWidth={2} className="text-text-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={PROJECTS.searchPlaceholder}
              className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-faint focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:ring-offset-2 focus-visible:ring-offset-ink-2"
              aria-label="Search projects"
            />
            {!!query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="shrink-0 text-xs font-semibold text-text-faint hover:text-text"
              >
                Clear
              </button>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-1.5 px-2 pb-1 pt-3">
            {allTags.map((tag) => {
              const on = activeTags.has(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  aria-pressed={on}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    on
                      ? "bg-gradient-to-r from-accent-sapphire-deep to-accent-teal-deep text-white"
                      : "border border-white/10 text-text-faint hover:border-white/20 hover:text-text-dim"
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
                className="ml-1 text-[11px] font-semibold text-accent-bronze hover:opacity-80"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <StaggerContainer className="flex flex-col gap-6">
          <AnimatePresence mode="popLayout">
            {featured.length > 0 && (
              <StaggerItem key="featured-label">
                <p className="eyebrow eyebrow--gold">Start here</p>
              </StaggerItem>
            )}
            {featured.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard
                  project={project}
                  index={indexById.get(project.id) ?? 0}
                  mode={mode}
                  onOpen={() => onSelectProject(project.id)}
                />
              </StaggerItem>
            ))}
            {featured.length > 0 && rest.length > 0 && (
              <StaggerItem key="rest-label">
                <p className="eyebrow mt-6 border-t border-white/[0.08] pt-8">
                  Everything else
                </p>
              </StaggerItem>
            )}
            {rest.map((project) => (
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
            <p className="glass rounded-3xl px-4 py-10 text-center text-sm text-text-faint">
              No projects match the current filter.
            </p>
          )}
        </StaggerContainer>
      </AnimatedSection>

      <ProjectModal project={selectedProject} mode={mode} onClose={() => onSelectProject(null)} />
    </>
  );
};

export default ProjectsSection;
