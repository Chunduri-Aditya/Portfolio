import { PROJECTS } from "../data/content";
import { CASE_STUDY_IDS, hasCaseStudy } from "./caseStudies";

/**
 * A case study is a promise about depth. Four projects carried the same
 * "Case study" button as the flagships and then delivered 116 to 278 words with
 * no problem, no constraints and no failure modes, so the click cost the reader
 * more than the repo link would have.
 *
 * These tests hold the two halves of that decision: the demoted four have no
 * page, and demoting one must never leave it with nothing to click.
 */
describe("case-study eligibility", () => {
  // Four demoted on 2026-09-19 for thin bodies; profile-rag added 2026-09-22 as
  // a card that links to its repo rather than promising a page.
  const DEMOTED = ["akashic-tree", "model-behavior-lab", "chatdb", "attention-drift-detector", "profile-rag"];

  test("the projects without a case study have none", () => {
    for (const id of DEMOTED) {
      const project = PROJECTS.projects.find((p) => p.id === id);
      expect(project, `${id} is not in the data set`).toBeDefined();
      expect(hasCaseStudy(project!), `${id} still claims a case study`).toBe(false);
    }
    expect(CASE_STUDY_IDS).not.toContain("chatdb");
  });

  test("every other project keeps its case study", () => {
    const expected = PROJECTS.projects.filter((p) => !DEMOTED.includes(p.id)).map((p) => p.id);
    expect(CASE_STUDY_IDS).toEqual(expected);
    expect(CASE_STUDY_IDS).toHaveLength(8);
  });

  test("a demoted project still has somewhere to send the reader", () => {
    // Removing the page is only an improvement if the repo or the request-access
    // mail is there to take the click instead.
    for (const id of DEMOTED) {
      const project = PROJECTS.projects.find((p) => p.id === id)!;
      const destination = project.links.github ?? project.links.requestAccess;
      expect(destination, `${id} has no case study and no link`).toBeTruthy();
    }
  });

  test("every flagship has a case study", () => {
    for (const project of PROJECTS.projects.filter((p) => p.featured)) {
      expect(hasCaseStudy(project), `${project.id} is featured with no case study`).toBe(true);
    }
  });

  test("every id in the list is a real project", () => {
    const known = new Set(PROJECTS.projects.map((p) => p.id));
    for (const id of CASE_STUDY_IDS) expect(known.has(id), `${id} is not a project`).toBe(true);
  });
});
