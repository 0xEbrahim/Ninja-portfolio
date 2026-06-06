import { ArrowRight, Target, Terminal } from "lucide-react";
import { InteractiveTerminal } from "./InteractiveTerminal";
import { FadeIn } from "./motion/FadeIn";
import { MagneticCard } from "./motion/MagneticCard";
import { triggerShuriken } from "./motion/ShurikenBurst";
import { StampBadge } from "./archive/StampBadge";
import { AsciiShinobiArtifact } from "./AsciiShinobiArtifact";

export function HeroSection() {
  function handleEnterConsole() {
    document.getElementById("command-console")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent("terminal:focus"));
      window.dispatchEvent(new CustomEvent("terminal:highlight"));
    }, 450);
  }

  return (
    <section id="home" className="scroll-mt-20 py-20 lg:py-28">
      <div className="site-container grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <FadeIn>
          <p className="section-label">Identity File · 0xControlPlane / classified backend records</p>
          <div className="mt-5"><StampBadge tone="amber" tilted>MISSION STATUS: ACTIVE</StampBadge></div>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-100 sm:text-5xl lg:text-6xl">
            I build the systems behind the screen.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
            Backend engineer focused on APIs, caches, databases, queues, and service boundaries — with a shinobi mindset: silent, precise, reliable.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="button-primary shinobi-slash-hover">Open Mission Records <ArrowRight className="h-4 w-4" /></a>
            <button type="button" className="button-secondary shinobi-slash-hover" onClick={handleEnterConsole}><Terminal className="h-4 w-4" /> Enter Command Console</button>
          </div>
          <button
            type="button"
            className="mt-10 block w-full max-w-xl text-left"
            onClick={triggerShuriken}
            aria-label="Activate Backend Shinobi Mode"
          >
            <MagneticCard className="shinobi-module shinobi-slash-hover">
              <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-sky-500/20 bg-sky-500/[0.06] text-sky-300"><Target className="h-4 w-4" /></span>
              <div>
                <p className="font-mono text-[10px] font-semibold tracking-[0.16em] text-[#A7C957]">BACKEND SHINOBI MODE</p>
                <p className="mt-1 text-sm text-[#9AA89E]">// silent systems, clean APIs</p>
              </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 font-mono text-[10px] text-slate-500">
              <span>Rank: <b>Backend Shinobi</b></span>
              <span>Chakra: <b>Caffeine + Curiosity</b></span>
              <span>Clan: <b>0xControlPlane</b></span>
              <span>Mission: <b>Reliable systems</b></span>
              </div>
            </MagneticCard>
          </button>
        </FadeIn>
        <div className="space-y-5">
          <FadeIn delay={0.08} className="scroll-mt-20" ><div id="command-console"><InteractiveTerminal /></div></FadeIn>
          <FadeIn delay={0.14}><AsciiShinobiArtifact /></FadeIn>
        </div>
      </div>
    </section>
  );
}
