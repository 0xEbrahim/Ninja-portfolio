import { motion, useReducedMotion } from "motion/react";

const packets = [
  ["API", "8%", "18%", 18, 0], ["DB", "82%", "12%", 22, 4], ["Redis", "65%", "32%", 20, 8],
  ["Queue", "18%", "46%", 24, 2], ["Auth", "88%", "62%", 19, 6], ["Cache", "38%", "75%", 23, 10],
] as const;

export function AnimatedBackground() {
  const reduced = useReducedMotion();
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="technical-grid" />
      <motion.div
        className="absolute left-[20%] top-[8%] h-[28rem] w-[28rem] rounded-full bg-[#7AA874]/[0.025] blur-3xl"
        animate={reduced ? undefined : { x: [0, 70, 0], y: [0, 35, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      {!reduced && packets.map(([label, left, top, duration, delay]) => (
        <motion.span
          key={label}
          className="absolute font-mono text-[8px] text-[#7AA874]/15"
          style={{ left, top }}
          animate={{ y: [0, -28, 0], x: [0, 12, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          · {label}
        </motion.span>
      ))}
    </div>
  );
}
