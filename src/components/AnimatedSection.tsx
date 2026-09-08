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
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
      className={`scroll-mt-28 ${className}`}
      initial={{ opacity: 0, filter: "blur(6px)", ...offset }}
      whileInView={{ opacity: 1, filter: "blur(0px)", x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : delay, ease: EASE }}
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
  stagger = 0.07,
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
