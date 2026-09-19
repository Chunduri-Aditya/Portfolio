import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Portfolio from "./Portfolio";
import { HERO } from "../data/content";

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
    expect(links.length).toBeGreaterThan(0);

    // A case study that is reachable only by click has no address to share, which
    // is the defect this route structure exists to fix.
    for (const link of links) {
      expect(link.getAttribute("href")).toMatch(/^\/work\/[a-z0-9-]+$/);
    }
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

  test("tag filter toggles on/off", async () => {
    const user = userEvent.setup();
    renderHome();

    const tagBtn = await screen.findByRole("button", { name: "Inspect AI", pressed: false });
    await user.click(tagBtn);
    expect(tagBtn).toHaveAttribute("aria-pressed", "true");

    await user.click(screen.getByRole("button", { name: /Reset/i }));
    expect(tagBtn).toHaveAttribute("aria-pressed", "false");
  });
});
