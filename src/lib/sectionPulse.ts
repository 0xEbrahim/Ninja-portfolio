export function pulseSection(id: "logs" | "projects") {
  const section = document.getElementById(id);
  if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  section.animate(
    [
      { boxShadow: "inset 0 0 0 rgba(167, 201, 87, 0)" },
      { boxShadow: "inset 4px 0 0 rgba(167, 201, 87, 0.65)" },
      { boxShadow: "inset 0 0 0 rgba(167, 201, 87, 0)" },
    ],
    { duration: 650, easing: "ease-out" },
  );
}
