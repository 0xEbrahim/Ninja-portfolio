import { ArrowDown } from "lucide-react";
import { MissionHeader } from "./archive/MissionHeader";
import { FadeIn } from "./motion/FadeIn";

const nodes = [
  ["Entry Gate", "Client requests and user-facing applications"],
  ["Auth Guard / API Gateway", "Contracts, validation, access, and routing"],
  ["Service Boundary", "Focused capabilities and orchestrated workflows"],
  ["Persistence Vault / Cache / Async Queue", "Storage, performance, and background work"],
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="section-block">
      <div className="site-container grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:items-center lg:gap-14">
        <FadeIn>
          <MissionHeader archive="Archive 04" title="System Map / Architecture" heading="Boundaries mapped before deployment." description="A mission map for deciding what owns data, what scales independently, what can fail, and what belongs behind a cache or queue." />
          <p className="max-w-xl text-base leading-8 text-[#9AA89E]">
            Good architecture makes behavior understandable. The goal is not more services; it is a system that stays clear as requirements and traffic grow.
          </p>
        </FadeIn>
        <FadeIn delay={0.08} className="architecture-flow mission-map angled-corner paper-noise min-w-0 p-4 sm:p-6 lg:p-8">
          {nodes.map(([title, description], index) => (
            <div key={title}>
              <div className="architecture-block">
                <span className="font-medium text-[#E9D8A6]">{title}</span>
                <span className="text-sm text-[#9AA89E]">{description}</span>
              </div>
              {index < nodes.length - 1 && (
                <div className="architecture-connector">
                  <ArrowDown className="mx-auto h-4 w-4 text-slate-600" aria-hidden="true" />
                  <span className="architecture-packet" aria-hidden="true" />
                  <span className="architecture-packet architecture-packet-delayed" aria-hidden="true" />
                </div>
              )}
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
