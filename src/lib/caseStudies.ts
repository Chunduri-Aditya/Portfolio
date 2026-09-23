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

/**
 * Old case-study ids and where they went. A project that changes its id keeps
 * its old address alive: the build emits a redirect stub at /work/<old>/ and
 * the app route forwards it, because the old URL is in sent applications. The
 * old id never returns as a project id (the tests hold that), so the redirect
 * and a page cannot fight over one address.
 */
export const RENAMED_CASE_STUDY_IDS: Readonly<Record<string, string>> = { jarvis: "taintgate" };

/** The current id for a renamed case-study id, or undefined when the id was never renamed. */
export function renamedCaseStudyId(id: string | undefined): string | undefined {
  // Own keys only: /work/constructor must not resolve to a function off Object.prototype.
  const renamed = id !== undefined && Object.prototype.hasOwnProperty.call(RENAMED_CASE_STUDY_IDS, id);
  return renamed ? RENAMED_CASE_STUDY_IDS[id] : undefined;
}
