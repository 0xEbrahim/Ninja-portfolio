import { Database, KeyRound, Network, PackageOpen, ScrollText, Workflow } from "lucide-react";
import { MissionCard } from "./archive/MissionCard";
import { MissionHeader } from "./archive/MissionHeader";
import { MetadataRow } from "./archive/MetadataRow";
import { FadeIn } from "./motion/FadeIn";
import { StaggerReveal } from "./motion/StaggerReveal";

const modules = [
  { icon: KeyRound, title: "Auth Guard", domain: "security", description: "JWT, refresh tokens, guards, sessions, and access boundaries." },
  { icon: Network, title: "API Layer", domain: "services", description: "REST endpoints, controllers, validation, middleware, and service orchestration." },
  { icon: Workflow, title: "Cache Technique", domain: "performance", description: "Redis, TTLs, rate limits, hot paths, and performance protection." },
  { icon: Database, title: "Persistence Seal", domain: "data", description: "PostgreSQL, indexes, migrations, transactions, and data ownership." },
  { icon: PackageOpen, title: "Queue Shadow Clone", domain: "async", description: "Async jobs, workers, retries, and background processing." },
  { icon: ScrollText, title: "Deployment Scroll", domain: "infra", description: "Docker, Linux, CI/CD, environment config, and release hygiene." },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-block">
      <div className="site-container">
        <FadeIn><MissionHeader archive="Archive 02" title="Jutsu Modules / Backend Services" heading="Techniques for reliable backend systems." description="Professional backend capabilities, filed as the modules I use to protect boundaries, move data, and ship dependable services." /></FadeIn>
        <StaggerReveal className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map(({ icon: Icon, title, domain, description }, index) => (
            <MissionCard key={title} tab={`module-${String(index + 1).padStart(2, "0")}`} className="min-h-[255px] p-7">
              <div className="flex items-start justify-between">
                <Icon className="h-5 w-5 text-[#A7C957]" strokeWidth={1.5} />
                <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#69766D]">signal: ready</span>
              </div>
              <h3 className="mt-7 text-xl font-semibold text-[#E9D8A6]">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#9AA89E]">{description}</p>
              <div className="archive-divider my-5" />
              <MetadataRow label="domain">{domain}</MetadataRow>
            </MissionCard>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
