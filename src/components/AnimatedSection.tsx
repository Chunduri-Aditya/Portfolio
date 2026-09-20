import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  id?: string;
  /**
   * Render as a landmark `<section>` rather than a plain div, labelled by the
   * element with this id. Without it the nav links point at anonymous divs and
   * a screen reader sees no sections at all.
   */
  labelledBy?: string;
}

const directionOffsets = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Reveal once the section's top has come 80px inside the viewport.
 *
 * This used to be `amount: 0.12`, a fraction of the section's own height, which
 * does not survive sections of wildly different heights. Projects is 2654px
 * tall, so twelve percent of it is 318px; when the hero was shortened, Projects
 * came to rest with 247px on screen and stayed at opacity 0 while the sidebar
 * beside it rendered normally. A reader's first screen below the hero was an
 * empty column next to a floating Education card.
 *
 * A pixel offset behaves the same for a 300px section and a 3000px one.
 */
const REVEAL_VIEWPORT = { once: true, amount: "some", margin: "0px 0px -80px 0px" } as const;

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
  labelledBy,
}) => {
  const reduce = useReducedMotion();
  const offset = reduce ? { x: 0, y: 0 } : directionOffsets[direction];
  const Tag = labelledBy ? motion.section : motion.div;

  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={`scroll-mt-28 ${className}`}
      initial={{ opacity: 0, filter: "blur(6px)", ...offset }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      viewport={REVEAL_VIEWPORT}
      transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : delay, ease: EASE }}
    >
      {children}
    </Tag>
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
  stagger = 0.07,
  id,
}) => (
  <motion.div
    id={id}
    className={className}
    initial="hidden"
    whileInView="visible"
    viewport={REVEAL_VIEWPORT}
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
        hidden: { opacity: 0, y: reduce ? 0 : 16, scale: reduce ? 1 : 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: reduce ? 0 : 0.5, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
});

export default AnimatedSection;
