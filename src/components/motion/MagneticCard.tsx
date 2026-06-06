import type { MouseEvent, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { staggerItem } from "./StaggerContainer";

export function MagneticCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();

  function handleMouseMove(event: MouseEvent<HTMLDivElement>) {
    if (reduced || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    event.currentTarget.style.setProperty("--rotate-x", `${((y / rect.height) - 0.5) * -8}deg`);
    event.currentTarget.style.setProperty("--rotate-y", `${((x / rect.width) - 0.5) * 8}deg`);
    event.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  }

  function reset(event: MouseEvent<HTMLDivElement>) {
    event.currentTarget.style.setProperty("--rotate-x", "0deg");
    event.currentTarget.style.setProperty("--rotate-y", "0deg");
  }

  return (
    <motion.div variants={staggerItem} className={`magnetic-card group ${className}`} onMouseMove={handleMouseMove} onMouseLeave={reset}>
      <div className="card-shine" aria-hidden="true" />
      <div className="relative z-[1] h-full">{children}</div>
    </motion.div>
  );
}
