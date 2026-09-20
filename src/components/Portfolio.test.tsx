import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Portfolio from "./Portfolio";
import { CONTACT, HERO, HUD_STATS, PROOF_POINTS } from "../data/content";
import { CASE_STUDY_IDS } from "../lib/caseStudies";

/** Project cards and the command palette navigate, so they need router context. */
function renderHome() {
  return render(
    <MemoryRouter>
      <Portfolio />
    </MemoryRouter>,
  );
}

describe("Portfolio", () => {
  test("the hero resolves identity before anything else", () => {
    renderHome();

    // Name is the h1; the role sits immediately under it. A recruiter should not
    // have to infer the job title from a sentence about method, which is what
    // the previous hero asked of them.
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(HERO.name);
    expect(screen.getByText(HERO.roleLabel)).toBeInTheDocument();
    expect(screen.getByText(HERO.headline)).toBeInTheDocument();
  });

  test("resume and primary CTA are both reachable from the hero", () => {
    renderHome();

    expect(screen.getByRole("button", { name: /View Engineering Work/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View resume/i })).toBeInTheDocument();
  });

  test("the first screen asks for one thing, not six", () => {
    const { container } = renderHome();

    // The hero used to carry a six-item capability line, the degree, three
    // social links, a five-item proof strip and four stat tiles on top of two
    // CTAs. Everything a reader could click competed with everything else, so
    // the counts below are the point, not decoration.
    const hero = container.querySelector("#hero");
    expect(hero).not.toBeNull();

    const clickable = hero!.querySelectorAll("a[href], button");
    expect(clickable.length).toBeLessThanOrEqual(3);

    // The proof strip and the stat tiles moved to the close, where they answer
    // "should I mail him" rather than interrupting "who is this".
    for (const stat of HUD_STATS) {
      expect(hero!.textContent).not.toContain(stat.label);
    }
    expect(hero!.textContent).not.toContain(PROOF_POINTS[1]);
  });

  test("the page closes by asking for contact", () => {
    const { container } = renderHome();

    // It previously ended on About and then a footer, so a reader who had just
    // been convinced had nothing to do about it.
    const contact = container.querySelector("#contact");
    expect(contact).not.toBeNull();

    const mailto = screen.getByRole("link", { name: /email me/i });
    expect(mailto.getAttribute("href")).toBe(`mailto:${CONTACT.email}`);
    expect(contact!.contains(mailto)).toBe(true);
  });

  test("the closing section carries the proof the hero gave up", () => {
    const { container } = renderHome();

    const contact = container.querySelector("#contact")!;
    for (const stat of HUD_STATS) {
      expect(contact.textContent, `${stat.label} went missing in the move`).toContain(stat.label);
    }
    for (const point of PROOF_POINTS) {
      expect(contact.textContent).toContain(point);
    }
  });

  test("the site speaks in one voice: no tone or depth switches remain", () => {
    renderHome();

    // Two orthogonal toggles meant four possible first impressions of the same
    // person, and four places for one fact to drift.
    expect(screen.queryByRole("radiogroup", { name: /tone/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("radiogroup", { name: /depth/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("radiogroup", { name: /Explanation depth/i })).not.toBeInTheDocument();
  });

  test("every project card links to its own case-study URL", () => {
    renderHome();

    const links = screen.getAllByRole("link", { name: /Read the case study for/i });
    expect(links).toHaveLength(CASE_STUDY_IDS.length);

    // A case study that is reachable only by click has no address to share, which
    // is the defect this route structure exists to fix.
    for (const link of links) {
      expect(link.getAttribute("href")).toMatch(/^\/work\/[a-z0-9-]+$/);
    }
  });

  test("a project without a case study offers its repo instead of a dead page", () => {
    renderHome();

    // ChatDB is coursework with 258 words behind it. Demoting it is only honest
    // if the row still goes somewhere a reader can actually read.
    const link = screen.getByRole("link", { name: /Open the repository for ChatDB/i });
    expect(link.getAttribute("href")).toMatch(/^https:\/\/github\.com\//);
    expect(
      screen.queryByRole("link", { name: /Read the case study for ChatDB/i }),
    ).not.toBeInTheDocument();
  });

  test("the featured projects link to the four flagship case studies", () => {
    renderHome();

    const hrefs = screen
      .getAllByRole("link", { name: /Read the case study for/i })
      .map((el) => el.getAttribute("href"));

    for (const id of ["agent-shield", "metalearnml", "ai-health-journal", "sourcewarden"]) {
      expect(hrefs).toContain(`/work/${id}`);
    }
  });

  test("search filters projects", async () => {
    const user = userEvent.setup();
    renderHome();

    const input = screen.getByRole("textbox", { name: /Search projects/i });
    await user.type(input, "Demucs");

    const links = screen.getAllByRole("link", { name: /Read the case study for/i });
    expect(links).toHaveLength(1);
    expect(links[0].getAttribute("href")).toBe("/work/ai-remixmate");
  });

  test("the tag filter shows a preview, not every tag at once", async () => {
    const user = userEvent.setup();
    renderHome();

    // A rarely used tag is behind the expander, so it is not on screen yet.
    expect(screen.queryByRole("button", { name: "Inspect AI" })).not.toBeInTheDocument();

    const expander = screen.getByRole("button", { name: /Show all \d+/ });
    await user.click(expander);

    expect(screen.getByRole("button", { name: "Inspect AI" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Show fewer/ })).toBeInTheDocument();
  });

  test("an active tag stays visible after the list collapses", async () => {
    const user = userEvent.setup();
    renderHome();

    await user.click(screen.getByRole("button", { name: /Show all \d+/ }));
    const tagBtn = screen.getByRole("button", { name: "Inspect AI" });
    await user.click(tagBtn);
    expect(tagBtn).toHaveAttribute("aria-pressed", "true");

    // Collapsing must not strand an active filter with no way to switch it off.
    await user.click(screen.getByRole("button", { name: /Show fewer/ }));
    expect(screen.getByRole("button", { name: "Inspect AI" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    await user.click(screen.getByRole("button", { name: /Reset/i }));
    expect(screen.queryByRole("button", { name: "Inspect AI" })).not.toBeInTheDocument();
  });
});
