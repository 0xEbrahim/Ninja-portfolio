import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

const links = [
  ["Identity / Home", "#home"],
  ["Signal Stream / Logs", "#logs"],
  ["Jutsu Modules / Services", "#services"],
  ["Mission Records / Projects", "#projects"],
  ["System Map / Architecture", "#architecture"],
  ["Rendezvous / Contact", "#contact"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const reduced = useReducedMotion();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(`#${entry.target.id}`)),
      { rootMargin: "-35% 0px -55% 0px" },
    );
    links.forEach(([, href]) => {
      const section = document.querySelector(href);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header initial={{ opacity: 0, y: reduced ? 0 : -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.02 }} className="sticky top-0 z-50 border-b border-[#2A362D] bg-[#0A0D0B]/95">
      <nav className="site-container flex min-h-16 items-center justify-between" aria-label="Primary navigation">
        <a href="#home" className="font-mono text-xs font-semibold text-[#E9D8A6] sm:text-sm">
          <span className="mr-2 text-[#A7C957]">封</span> Backend Shinobi Mission Archive
        </a>
        <button
          type="button"
          className="border border-[#2A362D] p-2 text-[#9AA89E] xl:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
        <div className="hidden items-center gap-4 xl:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className={active === href ? "nav-link nav-link-active" : "nav-link"}>{label}</a>
          ))}
        </div>
      </nav>
      {open && (
        <nav className="site-container flex flex-wrap gap-x-6 gap-y-4 border-t border-[#2A362D] py-4 xl:hidden" aria-label="Mobile navigation">
          {links.map(([label, href]) => (
            <a key={href} href={href} className={active === href ? "nav-link nav-link-active" : "nav-link"} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      )}
    </motion.header>
  );
}
