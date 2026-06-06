import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export function StaggerReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: reduced ? 0 : 0.075 } } }}
    >
      {children}
    </motion.div>
  );
}
