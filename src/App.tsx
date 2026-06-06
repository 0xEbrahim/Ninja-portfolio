import { ArchitectureSection } from "./components/ArchitectureSection";
import { ContactSection } from "./components/ContactSection";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { LiveLogsPanel } from "./components/LiveLogsPanel";
import { ProjectsSection } from "./components/ProjectsSection";
import { ServicesSection } from "./components/ServicesSection";
import { AnimatedBackground } from "./components/motion/AnimatedBackground";
import { ShurikenBurst } from "./components/motion/ShurikenBurst";
import { ScrollProgress } from "./components/motion/ScrollProgress";
import { ArchiveHeatOverlay } from "./components/motion/ArchiveHeatOverlay";
import { EmberScrollLayer } from "./components/motion/EmberScrollLayer";
import { ScrollBlurReveal } from "./components/motion/ScrollBlurReveal";
import { SignalDivider } from "./components/motion/SignalDivider";

function App() {
  return (
    <>
      <AnimatedBackground />
      <ArchiveHeatOverlay />
      <EmberScrollLayer />
      <ShurikenBurst />
      <ScrollProgress />
      <Header />
      <main>
        <ScrollBlurReveal delay={0.05}><HeroSection /></ScrollBlurReveal>
        <SignalDivider />
        <ScrollBlurReveal delay={0.08}><LiveLogsPanel /></ScrollBlurReveal>
        <SignalDivider />
        <ScrollBlurReveal><ServicesSection /></ScrollBlurReveal>
        <SignalDivider />
        <ScrollBlurReveal><ProjectsSection /></ScrollBlurReveal>
        <SignalDivider />
        <ScrollBlurReveal><ArchitectureSection /></ScrollBlurReveal>
        <ScrollBlurReveal><ContactSection /></ScrollBlurReveal>
      </main>
      <footer className="border-t border-[#2A362D] py-8">
        <div className="site-container flex flex-col gap-2 text-sm text-[#69766D] sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-xs">0xControlPlane / classified backend records</span>
          <span className="font-mono text-xs">archive keeper: Ibrahim El-Sayed · 2026</span>
        </div>
      </footer>
    </>
  );
}

export default App;
