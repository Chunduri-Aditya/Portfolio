import { useEffect, useState } from "react";

/** Fraction of the viewport height that counts as "reading position". */
const READING_LINE = 0.25;

/** Scroll slack, in px, for treating the page as bottomed out. */
const BOTTOM_SLACK = 2;

/**
 * Pick the section a reader is currently on, from scroll position.
 *
 * Before any spy existed, `activeSection` was set only by clicking a nav link
 * and initialised to "projects", so on first paint the nav marked Projects as
 * the current page while the hero was on screen, and a visitor who scrolled
 * never saw it update.
 *
 * An IntersectionObserver version of this was tried first and had two bugs that
 * only showed up in a browser: it kept a Map of intersecting sections, so an
 * exit callback that never arrived left a section marked current forever, and
 * it resolved ties by document order, so a section higher up the page beat the
 * one actually being read. Reading positions directly has neither failure mode,
 * because nothing is remembered between frames.
 *
 * @param ids     Section element ids, in any order.
 * @param enabled Pass false on routes with no sections to track.
 * @returns The id of the section at reading position, or "" when above them all.
 */
export function useScrollSpy(ids: string[], enabled = true): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled || ids.length === 0) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.innerHeight * READING_LINE;

      // A section becomes a candidate once its top has crossed the reading
      // line; the one that crossed most recently, meaning the greatest top
      // still above the line, is the one being read.
      //
      // This compares measured positions rather than position in `ids`, so the
      // caller's order does not have to match the document's. It did not: the
      // nav lists Research before Skills while the page renders Skills first,
      // so resolving by array order handed every Research scroll to Skills and
      // the Research link could never light up.
      let current = "";
      let currentTop = -Infinity;

      // The deepest section in the document, tracked for the bottom-out case
      // below. Also found by position, for the same reason.
      let deepest = "";
      let deepestTop = -Infinity;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const { top } = el.getBoundingClientRect();
        if (top > deepestTop) {
          deepestTop = top;
          deepest = id;
        }
        if (top <= line && top > currentTop) {
          currentTop = top;
          current = id;
        }
      }

      // The final section can sit below the reading line even at maximum
      // scroll, in which case it would never register: About measured top=327
      // against a line at 225 with the page fully scrolled. Once there is no
      // scroll left, the deepest section is by definition the one being read.
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const bottomedOut = scrollable > 0 && Math.ceil(window.scrollY) >= scrollable - BOTTOM_SLACK;

      setActive(bottomedOut && deepest ? deepest : current);
    };

    const onScroll = () => {
      // Coalesce to one measurement per frame; scroll fires far more often.
      if (frame === 0) frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, enabled]);

  return active;
}
