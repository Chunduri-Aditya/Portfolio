import { useEffect, type RefObject } from "react";

const FOCUSABLE = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

/**
 * Keep Tab and Shift+Tab inside `ref` while `active`, and hand focus back to
 * whatever was focused before the overlay opened.
 *
 * Both overlays already declared `aria-modal="true"`, which promises assistive
 * tech that the rest of the page is inert. Tab escaped to the page behind them,
 * so the attribute was asserting a guarantee the code did not make. This closes
 * the gap.
 *
 * Elements are re-queried on every keydown rather than cached, because the
 * command palette's result list changes as the user types.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean): void {
  useEffect(() => {
    if (!active) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const root = ref.current;
      if (!root) return;

      // Deliberately not filtering on offsetParent or getClientRects: both
      // report every element as hidden under jsdom, which silently emptied this
      // list and turned the trap into a no-op that still looked wired up.
      // `hidden` and aria-hidden are the checks that behave the same in a real
      // browser and in the test environment.
      const items = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => !el.hasAttribute("hidden") && el.getAttribute("aria-hidden") !== "true",
      );
      if (items.length === 0) {
        // Nothing focusable inside: keep focus on the container rather than
        // letting Tab fall through to the page behind the overlay.
        e.preventDefault();
        return;
      }

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && (current === first || !root.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (current === last || !root.contains(current))) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      previouslyFocused?.focus?.();
    };
  }, [ref, active]);
}
