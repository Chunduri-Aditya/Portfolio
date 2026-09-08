import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Fixed full-viewport aurora backdrop: four large blurred colour blobs on a slow
 * CSS drift, nudged by cursor and scroll (transform-only, rAF-throttled).
 * Sits at z-index -10, pointer-events none. Motion disabled under reduced-motion.
 */
const Aurora: React.FC = () => {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const root = rootRef.current;
    if (!root) return;

    let frame = 0;
    let px = 0;
    let py = 0;
    let sy = 0;

    const apply = () => {
      frame = 0;
      root.style.transform = `translate3d(${px * 24}px, ${py * 24 + sy * 0.04}px, 0)`;
    };
    const onMove = (e: MouseEvent) => {
      px = e.clientX / window.innerWidth - 0.5;
      py = e.clientY / window.innerHeight - 0.5;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onScroll = () => {
      sy = window.scrollY;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <div className="aurora" aria-hidden="true" ref={rootRef}>
      <div className="aurora__blob aurora__blob--1" />
      <div className="aurora__blob aurora__blob--2" />
      <div className="aurora__blob aurora__blob--3" />
      <div className="aurora__blob aurora__blob--4" />
    </div>
  );
};

export default Aurora;
