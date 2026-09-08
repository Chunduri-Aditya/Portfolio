import React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

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

// Telemetry "boot-in": short travel, a clip wipe, a firm settle. No blur, no bounce.
const HUD_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const reduce = useReducedMotion();

  const offset = reduce ? { x: 0, y: 0 } : directionOffsets[direction];
  const hidden = { opacity: 0, ...offset, clipPath: "inset(0 0 100% 0)" };
  const shown = { opacity: 1, x: 0, y: 0, clipPath: "inset(0 0 0% 0)" };

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial={hidden}
      animate={isInView ? shown : hidden}
      transition={{ duration: reduce ? 0 : 0.55, delay: reduce ? 0 : delay, ease: HUD_EASE }}
    >
      {children}
    </motion.div>
  );
};

/** Stagger children wrapper — children animate in sequence */
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
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={ref}
      id={id}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: { transition: { staggerChildren: stagger } },
        hidden: {},
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : 14 },
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
};

export default AnimatedSection;
