import { PROJECTS } from "../data/content";
import { CASE_STUDY_IDS, hasCaseStudy, RENAMED_CASE_STUDY_IDS, renamedCaseStudyId } from "./caseStudies";

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

/**
 * jarvis was renamed taintgate, and /work/jarvis/ sits in sent applications.
 * Two invariants keep the rename honest: a renamed id must never resurrect as
 * a page (if "jarvis" came back as a project id, the redirect and the page
 * would fight over one URL), and a redirect must land on a page that exists
 * (a target in the project list but without a case study would 404 twice).
 */
describe("renamed case-study ids", () => {
  const projectIds = PROJECTS.projects.map((p) => p.id);

  test("the jarvis rename is recorded", () => {
    // Guards the loops below against passing on an empty map.
    expect(RENAMED_CASE_STUDY_IDS).toHaveProperty("jarvis", "taintgate");
  });

  test("no old id is still a project or a case study", () => {
    for (const oldId of Object.keys(RENAMED_CASE_STUDY_IDS)) {
      expect(projectIds, `${oldId} is still a project id`).not.toContain(oldId);
      expect(CASE_STUDY_IDS, `${oldId} still has a page of its own`).not.toContain(oldId);
    }
  });

  test("every new id is a case study that exists, and none maps to itself", () => {
    for (const [oldId, newId] of Object.entries(RENAMED_CASE_STUDY_IDS)) {
      expect(CASE_STUDY_IDS, `${oldId} redirects to ${newId}, which has no page`).toContain(newId);
      expect(newId, `${oldId} redirects to itself`).not.toBe(oldId);
    }
  });

  test("renamedCaseStudyId maps the old id and nothing else", () => {
    expect(renamedCaseStudyId("jarvis")).toBe("taintgate");
    expect(renamedCaseStudyId("taintgate")).toBeUndefined();
    expect(renamedCaseStudyId(undefined)).toBeUndefined();
    // Own keys only: an id off Object.prototype must not resolve to a function.
    expect(renamedCaseStudyId("constructor")).toBeUndefined();
  });
});
