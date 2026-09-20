import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CaseStudy from "./CaseStudy";
import { PROJECTS } from "../data/content";
import { hasCaseStudy } from "../lib/caseStudies";
import { HUE } from "../components/ProjectCard";

/**
 * Mounts the real route so the test exercises param parsing, not just the
 * component with a hand-fed prop.
 */
function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="/work/:projectId" element={<CaseStudy />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("CaseStudy", () => {
  test("renders the project named in the URL", () => {
    renderAt("/work/agent-shield");

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Agent Shield");
  });

  test("renders the sections a hiring manager reads for", () => {
    renderAt("/work/agent-shield");

    for (const label of ["Evidence", "Architecture", "Tradeoffs", "Key engineering decisions"]) {
      expect(screen.getByRole("heading", { level: 2, name: label })).toBeInTheDocument();
    }
  });

  test("shows the hand-drawn architecture diagram, not just the flow summary", () => {
    const { container } = renderAt("/work/agent-shield");

    const pre = container.querySelector("pre");
    expect(pre).not.toBeNull();
    expect(pre?.textContent).toBe(
      PROJECTS.projects.find((p) => p.id === "agent-shield")?.architecture.diagram,
    );
  });

  test("an unknown project id redirects home instead of rendering an empty page", () => {
    renderAt("/work/not-a-real-project");

    expect(screen.getByText("home")).toBeInTheDocument();
  });

  test("private work offers request-access rather than a link that would 404", () => {
    renderAt("/work/jarvis");

    const link = screen.getByRole("link", { name: /request access/i });
    expect(link.getAttribute("href")).toMatch(/^mailto:/);
    expect(screen.queryByRole("link", { name: /^GitHub$/ })).not.toBeInTheDocument();
  });

  test("a project without a case study redirects home rather than showing a stub", () => {
    // ChatDB is a known id, so the unknown-id guard above never fires on it.
    // Without its own check it would render 258 words under the same chrome the
    // 1,199-word flagships use.
    renderAt("/work/chatdb");

    expect(screen.getByText("home")).toBeInTheDocument();
  });

  test("every project that claims a case study has one that renders", () => {
    for (const project of PROJECTS.projects.filter(hasCaseStudy)) {
      const { unmount } = renderAt(`/work/${project.id}`);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(project.title);
      unmount();
    }
  });

  test("every discipline has an accent hue, so none falls back silently", () => {
    // The map held 9 entries against 11 disciplines, so two projects rendered in
    // the fallback colour and nothing said so.
    for (const project of PROJECTS.projects) {
      expect(HUE[project.discipline], `no hue for "${project.discipline}"`).toBeDefined();
    }
  });
});
