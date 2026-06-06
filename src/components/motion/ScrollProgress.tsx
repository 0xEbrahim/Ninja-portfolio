import { motion, useScroll } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div style={{ scaleX: scrollYProgress }} className="fixed left-0 top-0 z-[100] h-[2px] w-full origin-left bg-gradient-to-r from-[#7AA874] via-[#E9D8A6] to-[#EE9B00]" aria-hidden="true" />;
}
