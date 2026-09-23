import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github, Lock, Play } from "lucide-react";

import { PROJECTS } from "../data/content";
import { hasCaseStudy, renamedCaseStudyId } from "../lib/caseStudies";
import { Icon } from "../lib/iconMap";
import { PROJECT_VIZ } from "../lib/projectViz";
import { requestAccessHref } from "../lib/projectLinks";
import FlowDiagram from "../components/FlowDiagram";
import MiniViz from "../components/MiniViz";
import ContextDemo from "../components/ContextDemo";

const Section: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <section className="border-t border-white/[0.08] pt-8">
    <h2 className="eyebrow mb-4">{label}</h2>
    {children}
  </section>
);

/**
 * One project, at its own URL, so a case study can be pasted into an
 * application or an email. Replaces the modal, which had no address.
 */
const CaseStudy: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const match = PROJECTS.projects.find((p) => p.id === projectId);
  // A known id is not automatically a page. Four projects are too thin to carry
  // this chrome, and nothing links or sitemaps them, so they resolve like any
  // other address that does not exist.
  const project = match && hasCaseStudy(match) ? match : undefined;

  useEffect(() => {
    if (!project) return;
    const previous = document.title;
    document.title = `${project.title} — Aditya Chunduri`;
    return () => {
      document.title = previous;
    };
  }, [project]);

  // A renamed id lands on the same page under its new name; the old URL is in
  // sent applications, so it must not fall through to the home page.
  const renamed = renamedCaseStudyId(projectId);
  if (!project && renamed) return <Navigate to={`/work/${renamed}`} replace />;

  // A dead URL is not an error state worth designing for.
  if (!project) return <Navigate to="/" replace />;

  const viz = PROJECT_VIZ[project.id];

  return (
    <div className="min-h-[100dvh] font-sans text-text antialiased">
      <a href="#case-study" className="skip-link">
        Skip to content
      </a>

      <main id="case-study" className="mx-auto w-full max-w-3xl px-4 pb-24 pt-12 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-text-dim transition-colors hover:text-text"
        >
          <ArrowLeft size={15} strokeWidth={2} />
          All work
        </Link>

        <header className="mt-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/[0.12] text-accent-teal">
              <Icon name={project.iconName} size={20} />
            </span>
            <div>
              <p className="eyebrow mb-1">
                {project.discipline} · {project.status}
              </p>
              <h1
                data-route-heading
                tabIndex={-1}
                className="font-display text-3xl leading-tight text-text sm:text-4xl"
              >
                {project.title}
              </h1>
              <p className="mt-1 text-sm text-text-faint">{project.subtitle}</p>
            </div>
          </div>

          <p className="mt-8 text-[17px] leading-relaxed text-text-dim">{project.oneLiner}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-white/[0.12] px-3 py-1 text-[11px] font-semibold text-text-dim"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-12 space-y-10">
          {project.problem && (
            <Section label="Problem">
              <p className="max-w-2xl text-[15px] leading-relaxed text-text-dim">{project.problem}</p>
            </Section>
          )}

          {project.constraints && project.constraints.length > 0 && (
            <Section label="Constraints">
              <ul className="grid gap-2 sm:grid-cols-2">
                {project.constraints.map((c) => (
                  <li
                    key={c}
                    className="rounded-2xl border border-white/[0.10] bg-white/[0.02] px-4 py-3 text-[13px] leading-relaxed text-text-dim"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {project.metrics.length > 0 && (
            <Section label="Result">
              <dl className="grid gap-4 sm:grid-cols-2">
                {project.metrics.map((m) => (
                  <div key={m.label} className="rounded-2xl border border-white/[0.12] bg-white/[0.02] p-4">
                    <dt className="eyebrow mb-1">{m.label}</dt>
                    <dd className="font-display text-xl text-text">{m.value}</dd>
                  </div>
                ))}
              </dl>
            </Section>
          )}

          <Section label="Evidence">
            <ul className="space-y-2">
              {project.evidence.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-text-dim">
                  <span className="mt-1 shrink-0 text-accent-teal" aria-hidden="true">
                    ▹
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Section>

          {viz && (
            <Section label="Measured results">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4">
                <MiniViz title={viz.title} bars={viz.bars} />
              </div>
            </Section>
          )}

          <Section label="Architecture">
            <FlowDiagram overview={project.architecture.overview} />
            {/*
              The hand-drawn diagram is the real artifact, not a fallback, so it
              renders here rather than behind a "raw" toggle. It is preformatted
              text at a fixed character width, so it gets its own horizontal
              scroll container instead of forcing the page to scroll sideways on
              a phone.
            */}
            <div className="code-block mt-4 overflow-x-auto p-4">
              <pre className="w-max whitespace-pre font-mono text-[11px] leading-relaxed text-accent-teal/80">
                {project.architecture.diagram}
              </pre>
            </div>
          </Section>

          <Section label="Tradeoffs">
            <ul className="space-y-2">
              {project.architecture.tradeoffs.map((t) => (
                <li key={t} className="flex gap-3 text-sm leading-relaxed text-text-dim">
                  <span className="mt-1 shrink-0 text-accent-bronze" aria-hidden="true">
                    /
                  </span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Key engineering decisions">
            <div className="grid gap-3">
              {project.decisions.map((d) => (
                <div key={d.title} className="rounded-2xl border border-white/[0.12] bg-white/[0.02] p-4">
                  <p className="mb-2 text-sm font-bold text-text">{d.title}</p>
                  <p className="text-[13px] leading-relaxed text-text-dim">
                    <span className="font-mono text-[11px] uppercase tracking-wide text-accent-teal">Why </span>
                    {d.why}
                  </p>
                  {d.tradeoff && (
                    <p className="mt-2 text-[13px] leading-relaxed text-text-dim">
                      <span className="font-mono text-[11px] uppercase tracking-wide text-accent-bronze">
                        Tradeoff{" "}
                      </span>
                      {d.tradeoff}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>

          {project.failureModes && project.failureModes.length > 0 && (
            <Section label="Failure modes & limitations">
              <ul className="space-y-2">
                {project.failureModes.map((f) => (
                  <li key={f} className="flex gap-3 text-sm leading-relaxed text-text-dim">
                    <span className="mt-1 shrink-0 text-accent-bronze" aria-hidden="true">
                      !
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {project.hasContextDemo && (
            <Section label="Try the context-selection policy">
              <p className="mb-4 max-w-2xl text-[13px] leading-relaxed text-text-dim">
                The ranking rule below is the one the system uses. It runs in your browser: no
                backend, no model call, and the chunks are a fixed worked example rather than
                anyone&rsquo;s notes.
              </p>
              <ContextDemo />
            </Section>
          )}

          <Section label="Source">
            <div className="flex flex-wrap items-center gap-2">
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
                  className="flex items-center gap-2 rounded-full border border-white/[0.12] px-4 py-2 text-xs font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
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
                  className="flex items-center gap-2 rounded-full border border-accent-teal/40 px-4 py-2 text-xs font-semibold text-text transition-colors hover:border-accent-teal"
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
                  className="flex items-center gap-2 rounded-full border border-white/[0.12] px-4 py-2 text-xs font-semibold text-text-dim transition-colors hover:border-white/25 hover:text-text"
                >
                  <Play size={14} strokeWidth={2} />
                  Demo
                </a>
              )}
            </div>
          </Section>
        </div>
      </main>
    </div>
  );
};

export default CaseStudy;
