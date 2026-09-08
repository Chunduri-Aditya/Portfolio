import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useReducedMotion } from "framer-motion";

/**
 * Count-up on first scroll into view. `value` may carry a non-numeric prefix or
 * suffix (e.g. "520+", "~0.94", "5+ yrs") — the leading/embedded number animates,
 * the rest is preserved.
 */
const Counter: React.FC<{ value: string; className?: string; duration?: number }> = ({
  value,
  className = "",
  duration = 1200,
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(reduce ? value : value.replace(/[0-9]/g, "0"));

  const match = value.match(/([0-9]+(?:\.[0-9]+)?)/);

  useEffect(() => {
    if (reduce || !inView || !match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[1]);
    const decimals = (match[1].split(".")[1] || "").length;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const n = (target * eased).toFixed(decimals);
      setDisplay(value.replace(match[1], n));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default Counter;
