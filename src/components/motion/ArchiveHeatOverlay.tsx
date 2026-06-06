import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function ArchiveHeatOverlay() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["8%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.08, 0.18, 0.12]);

  return (
    <motion.div
      style={reduced ? { opacity: 0.07 } : { y, opacity }}
      className="archive-heat-overlay pointer-events-none fixed inset-0 -z-[9]"
      aria-hidden="true"
    />
  );
}
