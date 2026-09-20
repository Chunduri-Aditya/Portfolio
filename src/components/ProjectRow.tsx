import { memo } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Lock } from "lucide-react";
import type { Project } from "../data/content";
import { Icon } from "../lib/iconMap";
import { hasCaseStudy } from "../lib/caseStudies";
import { requestAccessHref } from "../lib/projectLinks";
import { HUE } from "./ProjectCard";

/**
 * A non-flagship project, at one row.
 *
 * All twelve projects used to render the same expandable card, so the four with
 * the strongest evidence looked exactly like the four with 116 to 278 words
 * behind them, and the section read as a wall rather than a ranking. The
 * flagships keep the card; everything else gets this, which shows the same
 * facts (discipline, hook, metrics, tags) in about a fifth of the height.
 *
 * The destination follows the work rather than the layout: a case study where
 * there is one, the repository where there is not, and a prefilled
 * request-access mail for private work, which never renders a URL that 404s.
 */
const ProjectRow = memo(function ProjectRow({ project }: { project: Project }) {
  const hue = HUE[project.discipline] ?? "#2f8fe0";
  const caseStudy = hasCaseStudy(project);

  return (
    <article
      id={project.id}
      className="group scroll-mt-28 border-b border-white/[0.08] py-4 transition-colors hover:border-white/20"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="shrink-0 self-center" style={{ color: hue }}>
          <Icon name={project.iconName} size={16} />
        </span>
        <h3 className="font-display text-lg text-text">{project.title}</h3>
        <span className="eyebrow">{project.discipline}</span>
        {project.status === "COURSEWORK" && (
          <span className="text-[10px] font-bold uppercase tracking-wide text-text-faint">
            {project.status}
          </span>
        )}
      </div>

      <p className="mt-1.5 max-w-2xl text-[14px] leading-relaxed text-text-dim">{project.hook}</p>

      <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <dl className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {project.metrics.slice(0, 2).map((m) => (
            <div key={m.label} className="flex items-baseline gap-1.5">
              <dt className="text-[11px] text-text-faint">{m.label}</dt>
              <dd className="font-mono text-[12px] font-bold text-text">{m.value}</dd>
            </div>
          ))}
        </dl>

        <span aria-hidden="true" className="hidden text-text-faint/40 sm:inline">
          |
        </span>

        <p className="flex flex-wrap gap-x-2 text-[11px] text-text-faint">
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </p>

        <div className="ml-auto shrink-0">
          {caseStudy ? (
            <Link
              to={`/work/${project.id}`}
              aria-label={`Read the case study for ${project.title}`}
              className="flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-80"
              style={{ color: hue }}
            >
              Case study
              <ArrowUpRight size={13} strokeWidth={2.5} />
            </Link>
          ) : project.links.github ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open the repository for ${project.title}`}
              className="flex items-center gap-1.5 text-xs font-bold transition-opacity hover:opacity-80"
              style={{ color: hue }}
            >
              <Github size={13} strokeWidth={2.5} />
              Repository
            </a>
          ) : (
            <a
              href={requestAccessHref(project.links.requestAccess ?? project.title, project.title)}
              aria-label={`Request access to the repository for ${project.title}`}
              className="flex items-center gap-1.5 text-xs font-bold text-text-dim transition-colors hover:text-text"
            >
              <Lock size={13} strokeWidth={2.5} />
              Request access
            </a>
          )}
        </div>
      </div>
    </article>
  );
});

export default ProjectRow;
