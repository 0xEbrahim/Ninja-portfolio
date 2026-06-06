import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function triggerShuriken() {
  window.dispatchEvent(new CustomEvent("shinobi:shuriken"));
}

export function ShurikenBurst() {
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const handler = () => setActive(true);
    window.addEventListener("shinobi:shuriken", handler);
    return () => window.removeEventListener("shinobi:shuriken", handler);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => setActive(false)}>
      {active && (reduced ? (
        <motion.div className="fixed right-6 top-20 z-[80] border border-[#7AA874]/30 bg-[#111713]/95 px-4 py-2 font-mono text-xs text-[#A7C957] shadow-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} onAnimationComplete={() => setActive(false)}>
          SHINOBI MODE
        </motion.div>
      ) : (
        <motion.div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden" exit={{ opacity: 0 }}>
          <motion.div className="absolute h-px w-36 bg-gradient-to-r from-transparent to-[#A7C957]/50" initial={{ x: "-20vw", y: "72vh", rotate: -17, opacity: 0 }} animate={{ x: "108vw", y: "20vh", opacity: [0, 0.6, 0] }} transition={{ duration: 1.15, ease: "easeInOut" }} />
          <motion.svg viewBox="0 0 64 64" className="absolute h-9 w-9 text-[#9AA89E] drop-shadow-[0_0_8px_rgba(167,201,87,0.45)]" initial={{ x: "-10vw", y: "70vh", rotate: 0, scale: 0.8 }} animate={{ x: "106vw", y: "18vh", rotate: 1080, scale: 1 }} transition={{ duration: 1.15, ease: "easeInOut" }} onAnimationComplete={() => setActive(false)}>
            <path fill="currentColor" d="M32 5 39 24 59 18 43 32 59 46 39 40 32 59 25 40 5 46 21 32 5 18 25 24Z" />
            <circle cx="32" cy="32" r="5" fill="#111713" stroke="#A7C957" strokeWidth="2" />
          </motion.svg>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
