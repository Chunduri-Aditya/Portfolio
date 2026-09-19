import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Portfolio from "./Portfolio";

// Mock the FAQ bot to keep tests focused
vi.mock("./FaqBot", () => ({
  default: () => <div data-testid="faq-bot" />,
}));

/** Project cards and the command palette navigate, so they need router context. */
function renderHome() {
  return render(
    <MemoryRouter>
      <Portfolio />
    </MemoryRouter>,
  );
}

describe("Portfolio", () => {
  test("renders hero and projects section", () => {
    renderHome();
    expect(screen.getByRole("button", { name: /Inspect The Work/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /View resume/i })).toBeInTheDocument();
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
