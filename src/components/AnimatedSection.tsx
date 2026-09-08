import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  id?: string;
}

const directionOffsets = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

const HUD_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Reveal-on-scroll wrapper. Content is visible by default (opacity 1 via CSS);
 * Framer's `whileInView` only nudges it in. If the viewport observer never
 * fires, or JS is slow, the section is still readable — motion is enhancement,
 * never a gate.
 */
export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
}) => {
  const reduce = useReducedMotion();
  const offset = reduce ? { x: 0, y: 0 } : directionOffsets[direction];

  return (
    <motion.div
      id={id}
      className={`scroll-mt-24 ${className}`}
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : delay, ease: HUD_EASE }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  id?: string;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = "",
  stagger = 0.06,
  id,
}) => (
  <motion.div
    id={id}
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.08 }}
    variants={{
      visible: { transition: { staggerChildren: stagger } },
      hidden: {},
    }}
  >
    {children}
  </motion.div>
);

export const StaggerItem = React.forwardRef<
  HTMLDivElement,
  { children: React.ReactNode; className?: string }
>(function StaggerItem({ children, className = "" }, ref) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 12 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0 : 0.45, ease: HUD_EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
});

export default AnimatedSection;
