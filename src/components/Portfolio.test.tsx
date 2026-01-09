import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Portfolio from "./Portfolio";

// Mock the FAQ bot to keep tests focused
vi.mock("./FaqBot", () => ({
  default: () => <div data-testid="faq-bot" />,
}));

describe("Portfolio", () => {
  test("renders hero and projects section", () => {
    render(<Portfolio />);
    expect(screen.getByText(/Curiosity is noisy/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Inspect The Work/i })).toBeInTheDocument();
  });

  test("opens and closes a project modal", async () => {
    const user = userEvent.setup();
    render(<Portfolio />);

    // Open first project card by accessible name pattern
    const card = screen.getByRole("button", { name: /Open project:/i });
    await user.click(card);

    // Modal title appears
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Close via close button
    await user.click(screen.getByRole("button", { name: /Close modal/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("closes modal with Escape key", async () => {
    const user = userEvent.setup();
    render(<Portfolio />);

    const card = screen.getByRole("button", { name: /Open project:/i });
    await user.click(card);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("search filters projects", async () => {
    const user = userEvent.setup();
    render(<Portfolio />);

    const input = screen.getByRole("textbox", { name: /Search projects/i });
    await user.type(input, "Demucs");

    // Should still show at least one card matching Demucs
    expect(screen.getAllByRole("button", { name: /Open project:/i }).length).toBeGreaterThan(0);
  });

  test("tag filter toggles on/off", async () => {
    const user = userEvent.setup();
    render(<Portfolio />);

    // Toggle a tag (use one that exists)
    const tagBtn = await screen.findByRole("button", { name: "Whisper" });
    await user.click(tagBtn);
    expect(tagBtn).toHaveAttribute("aria-pressed", "true");

    // Reset clears filters
    await user.click(screen.getByRole("button", { name: /Reset/i }));
    expect(tagBtn).toHaveAttribute("aria-pressed", "false");
  });
});