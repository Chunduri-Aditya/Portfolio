import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Reset scroll and hand focus to the new page's heading whenever the route
 * changes.
 *
 * A client-side route change moves neither the viewport nor the focus ring on
 * its own, so without this a visitor arriving on a case study lands mid-page,
 * and a keyboard visitor's next Tab resumes from wherever the link they
 * activated used to sit. Anchor navigation inside a page is untouched: this
 * only fires when `pathname` itself changes.
 *
 * The heading opts in by carrying `data-route-heading`. It needs `tabIndex={-1}`
 * to be focusable at all, and the focus ring is suppressed for it in index.css
 * because this focus is programmatic, not the result of a Tab press.
 */
export function useRouteTransition(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);

    // Wait for the incoming route to paint before looking for its heading.
    const raf = window.requestAnimationFrame(() => {
      const heading = document.querySelector<HTMLElement>("[data-route-heading]");
      heading?.focus();
    });

    return () => window.cancelAnimationFrame(raf);
  }, [pathname]);
}
