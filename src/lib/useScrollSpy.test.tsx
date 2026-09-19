import { act, render, screen } from "@testing-library/react";
import { useScrollSpy } from "./useScrollSpy";

/**
 * jsdom does not lay out, so `getBoundingClientRect` is stubbed per element to
 * place each section at a chosen offset. That is the only input the hook reads.
 */
function placeSections(tops: Record<string, number>) {
  for (const [id, top] of Object.entries(tops)) {
    const el = document.getElementById(id);
    if (!el) throw new Error(`no element #${id}`);
    el.getBoundingClientRect = () => ({ top, bottom: top + 500 }) as DOMRect;
  }
}

/**
 * jsdom reports scrollHeight 0 and scrollY 0, so the page never reads as
 * scrollable and the bottom-out branch stays off unless a test asks for it.
 */
function setScroll(y: number, scrollHeight: number) {
  Object.defineProperty(window, "scrollY", { value: y, configurable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    configurable: true,
  });
}

const Probe: React.FC<{ ids: string[] }> = ({ ids }) => {
  const active = useScrollSpy(ids);
  return <div data-testid="active">{active || "(none)"}</div>;
};

const IDS = ["hero", "projects", "experience", "about"];

function setup(tops: Record<string, number>, ids: string[] = IDS) {
  document.body.innerHTML = ids.map((id) => `<section id="${id}"></section>`).join("");
  placeSections(tops);
  render(<Probe ids={ids} />);
}

async function rescroll(tops: Record<string, number>) {
  placeSections(tops);
  await act(async () => {
    window.dispatchEvent(new Event("scroll"));
    // The hook coalesces through requestAnimationFrame.
    await new Promise((r) => setTimeout(r, 20));
  });
}

describe("useScrollSpy", () => {
  // jsdom reports innerHeight 768, so the reading line sits at 192px.
  beforeEach(() => {
    window.scrollTo = (() => {}) as typeof window.scrollTo;
    // Not scrollable by default, so only the tests that opt in exercise the
    // bottom-out branch.
    setScroll(0, 0);
  });

  test("marks nothing while above the first section", () => {
    setup({ hero: 400, projects: 900, experience: 1400, about: 1900 });
    expect(screen.getByTestId("active")).toHaveTextContent("(none)");
  });

  test("marks the section that has reached reading position", async () => {
    setup({ hero: 400, projects: 900, experience: 1400, about: 1900 });

    await rescroll({ hero: -200, projects: 100, experience: 700, about: 1200 });
    // projects at 100 is above the 192px line; hero is further up.
    expect(screen.getByTestId("active")).toHaveTextContent("projects");
  });

  test("the deepest section wins, so the last one still registers", async () => {
    // The IntersectionObserver version resolved ties by document order, so a
    // section higher up the page beat the one actually being read.
    setup({ hero: 400, projects: 900, experience: 1400, about: 1900 });

    await rescroll({ hero: -1800, projects: -1300, experience: -700, about: 50 });
    expect(screen.getByTestId("active")).toHaveTextContent("about");
  });

  test("clears when scrolling back above every section", async () => {
    // The earlier version never cleared: it only ever set a new value, so the
    // last section stayed marked current back at the top of the page.
    setup({ hero: 400, projects: 900, experience: 1400, about: 1900 });

    await rescroll({ hero: -1800, projects: -1300, experience: -700, about: 50 });
    expect(screen.getByTestId("active")).toHaveTextContent("about");

    await rescroll({ hero: 400, projects: 900, experience: 1400, about: 1900 });
    expect(screen.getByTestId("active")).toHaveTextContent("(none)");
  });

  test("resolves by measured position, not by the order ids were passed in", async () => {
    // The nav lists Research before Skills, but the page renders Skills first.
    // Resolving by array order made Skills, which is above Research and so has
    // also passed the line, win every Research scroll: in a real browser at
    // #research, research top=89 and skills top=-601, and the nav marked Skills.
    const ids = ["hero", "research", "skills"];
    setup({ hero: 400, research: 900, skills: 700 }, ids);

    await rescroll({ hero: -7090, skills: -601, research: 89 });
    expect(screen.getByTestId("active")).toHaveTextContent("research");
  });

  test("marks the final section once the page has no scroll left", async () => {
    // About sits close enough to the page bottom that it never reaches the
    // reading line: fully scrolled, it measured top=327 against a line at 225,
    // so the last nav link could never light up.
    setup({ hero: 400, projects: 900, experience: 1400, about: 1900 });

    setScroll(7681, 7681 + window.innerHeight);
    await rescroll({ hero: -7569, projects: -6778, experience: -2338, about: 327 });
    expect(screen.getByTestId("active")).toHaveTextContent("about");
  });

  test("ignores ids with no element rather than throwing", async () => {
    document.body.innerHTML = `<section id="projects"></section>`;
    placeSections({ projects: 10 });
    render(<Probe ids={["missing", "projects"]} />);

    expect(screen.getByTestId("active")).toHaveTextContent("projects");
  });
});
