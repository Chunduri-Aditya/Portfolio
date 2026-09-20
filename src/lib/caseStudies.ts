import { PROJECTS, type Project } from "../data/content";

/**
 * Which projects earn a page at /work/<id>.
 *
 * One reader of `Project.caseStudy`, so the route guard, the project list, the
 * command palette, the emitted route files and the sitemap cannot disagree
 * about which URLs exist. They did once: the sitemap advertised twelve URLs
 * that all answered 404 because nothing emitted a file for them, and the SPA
 * fallback rendered the page anyway so every check that read the body passed.
 *
 * Imported by `vite.config.ts` at build time as well as by the app, which is
 * why this module stays free of React and of anything but data.
 *
 * @param project A project from `PROJECTS.projects`.
 * @returns Whether the project has a case study to link to.
 */
export function hasCaseStudy(project: Project): boolean {
  return project.caseStudy === true;
}

/** Project ids with a case study, in the order they appear in the data. */
export const CASE_STUDY_IDS: string[] = PROJECTS.projects.filter(hasCaseStudy).map((p) => p.id);
