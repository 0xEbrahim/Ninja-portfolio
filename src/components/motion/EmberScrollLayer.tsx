import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const colors = ["#EE9B00", "#BB3E03", "#A7C957", "#E9D8A6"];
const embers = Array.from({ length: 20 }, (_, index) => ({
  id: index,
  left: `${(index * 47 + 9) % 97}%`,
  top: `${(index * 31 + 13) % 94}%`,
  size: 2 + (index % 6),
  color: colors[index % colors.length],
  duration: 13 + (index % 9),
  delay: -(index % 11),
  opacity: 0.08 + (index % 5) * 0.025,
}));

export function EmberScrollLayer() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 1], [0.22, 0.52, 0.3]);

  if (reduced) return null;

  return (
    <motion.div style={{ y, opacity }} className="ember-scroll-layer pointer-events-none fixed inset-0 -z-[8] overflow-hidden" aria-hidden="true">
      {embers.map((ember) => (
        <span
          key={ember.id}
          className="ember-particle"
          style={{
            left: ember.left,
            top: ember.top,
            width: ember.size,
            height: ember.size,
            backgroundColor: ember.color,
            opacity: ember.opacity,
            filter: `blur(${1 + (ember.id % 4)}px)`,
            animationDuration: `${ember.duration}s`,
            animationDelay: `${ember.delay}s`,
          }}
        />
      ))}
    </motion.div>
  );
}
