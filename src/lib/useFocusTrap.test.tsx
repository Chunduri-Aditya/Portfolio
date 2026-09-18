import React, { useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import { useFocusTrap } from "./useFocusTrap";

/**
 * A page with a focusable control outside the overlay, so an escaping Tab has
 * somewhere to land. Without the trap, Tab from the last item in the panel
 * moves to `outside-after` and the assertions below fail.
 */
const Harness: React.FC<{ active: boolean }> = ({ active }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  useFocusTrap(panelRef, active);
  return (
    <div>
      <button type="button">outside-before</button>
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label="panel">
        <button type="button">first</button>
        <button type="button">middle</button>
        <button type="button">last</button>
      </div>
      <button type="button">outside-after</button>
    </div>
  );
};

describe("useFocusTrap", () => {
  test("Tab from the last element wraps to the first, never to the page behind", async () => {
    const user = userEvent.setup();
    render(<Harness active />);

    screen.getByText("last").focus();
    await user.tab();

    expect(document.activeElement).toBe(screen.getByText("first"));
    expect(document.activeElement).not.toBe(screen.getByText("outside-after"));
  });

  test("Shift+Tab from the first element wraps to the last", async () => {
    const user = userEvent.setup();
    render(<Harness active />);

    screen.getByText("first").focus();
    await user.tab({ shift: true });

    expect(document.activeElement).toBe(screen.getByText("last"));
    expect(document.activeElement).not.toBe(screen.getByText("outside-before"));
  });

  test("when inactive, focus is free to leave the panel", async () => {
    const user = userEvent.setup();
    render(<Harness active={false} />);

    screen.getByText("last").focus();
    await user.tab();

    // The control is the point: with the trap off, Tab must escape. If this
    // ever passes for the same reason the trapped cases do, the trap is not
    // what the other two tests are measuring.
    expect(document.activeElement).toBe(screen.getByText("outside-after"));
  });
});
