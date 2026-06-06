import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function ScrollBlurReveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 30, filter: reduced ? "blur(0px)" : "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: reduced ? 0.2 : 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
