import React from "react";
import { motion } from "framer-motion";

export interface Bar {
  label: string;
  value: number;
  max?: number;
  display?: string;
  hue?: string;
}

const DEFAULT_HUE = "#8b5cf6";

/**
 * Compact animated horizontal bar chart (hand-rolled SVG-free, pure divs).
 * Bars grow via scaleX on scroll into view. Used for per-project metric snapshots.
 */
const MiniViz: React.FC<{ title?: string; bars: Bar[] }> = ({ title, bars }) => {
  const max = Math.max(...bars.map((b) => b.max ?? b.value), 0.0001);

  return (
    <div>
      {title && <p className="eyebrow mb-2">{title}</p>}
      <div className="flex flex-col gap-2.5">
        {bars.map((b, i) => {
          const pct = Math.max(0.03, (b.value / (b.max ?? max)) * 100);
          const hue = b.hue ?? DEFAULT_HUE;
          return (
            <div key={b.label + i}>
              <div className="mb-1 flex items-baseline justify-between gap-2">
                <span className="text-[11px] text-text-faint">{b.label}</span>
                <span className="font-mono text-[11px] font-semibold text-text-dim">
                  {b.display ?? b.value}
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${hue}, ${hue}cc)`,
                    boxShadow: `0 0 12px ${hue}80`,
                    transformOrigin: "left",
                  }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: pct / 100 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniViz;
