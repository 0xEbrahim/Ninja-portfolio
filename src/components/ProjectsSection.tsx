import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Project, projects } from "../data/projects";
import { MetadataRow } from "./archive/MetadataRow";
import { MissionHeader } from "./archive/MissionHeader";
import { StampBadge } from "./archive/StampBadge";
import { FadeIn } from "./motion/FadeIn";

type ProjectFilter = "All" | "Featured" | "Backend API" | "Systems" | "Microservices" | "Tooling" | "Security" | "Learning";
const filters: ProjectFilter[] = ["All", "Featured", "Backend API", "Systems", "Microservices", "Tooling", "Security", "Learning"];

function tone(status: Project["status"]) {
  if (status === "Stable" || status === "Active") return "jade" as const;
  if (status === "Experimental") return "amber" as const;
  if (status === "In Progress") return "cyan" as const;
  return "cream" as const;
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="mission-card angled-corner paper-noise shinobi-slash-hover relative flex min-h-[420px] min-w-0 flex-col overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-[#A7C957]/50 lg:p-6">
      <span className="mission-file-tab">{project.featured ? "priority mission" : "mission file"}</span>
      <div className="relative z-[1] flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-[#7AA874]">mission</p>
          <h3 className="mt-2 break-words text-xl font-bold tracking-tight text-[#E9D8A6] lg:text-2xl">{project.name}</h3>
        </div>
        <StampBadge tone={tone(project.status)} tilted>{project.status}</StampBadge>
        </div>
        <div className="space-y-3"><MetadataRow label="type">{project.category}</MetadataRow></div>
        <div className="archive-divider my-6" />
        <p className="flex-1 text-base leading-7 text-[#C8D3CB]">{project.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="archive-tag">{tag}</span>)}</div>
        <div className="mt-6 border-t border-[#2A362D] pt-4">
          <a href={project.githubUrl} target="_blank" rel="noreferrer" className="project-link shinobi-slash-hover inline-flex items-center gap-2 px-1 py-1 font-mono text-sm font-semibold text-[#E9D8A6] hover:text-[#A7C957]">
            Open mission repo <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    if (activeFilter === "Featured") return projects.filter((project) => project.featured);
    if (activeFilter === "Learning") {
      return projects.filter((project) => project.status === "Learning" || project.status === "Archived / Learning");
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const visibleProjects = filteredProjects;
  const filterCounts: Record<ProjectFilter, number> = {
    All: projects.length,
    Featured: projects.filter((project) => project.featured).length,
    "Backend API": projects.filter((project) => project.category === "Backend API").length,
    Systems: projects.filter((project) => project.category === "Systems").length,
    Microservices: projects.filter((project) => project.category === "Microservices").length,
    Tooling: projects.filter((project) => project.category === "Tooling").length,
    Security: projects.filter((project) => project.category === "Security").length,
    Learning: projects.filter((project) => project.status === "Learning" || project.status === "Archived / Learning").length,
  };

  function handleFilterChange(filter: ProjectFilter) {
    setActiveFilter(filter);
  }

  return (
    <section id="projects" className="section-block archive-section-alt">
      <div className="site-container">
        <FadeIn><MissionHeader archive="Archive 03" title="Mission Records / Projects" heading="Every repository leaves a mission record." description="What I built, what I learned, and the system problem each project touched." /></FadeIn>
        <div className="mb-10 flex flex-wrap gap-2">{filters.map((item) => <button key={item} type="button" onClick={() => handleFilterChange(item)} className={activeFilter === item ? "mission-filter mission-filter-active" : "mission-filter"}>{item === "All" ? "all missions" : item.toLowerCase()} <span className="ml-1 text-[#E9D8A6]">{filterCounts[item]}</span></button>)}</div>
        <div>
          <p className="mission-list-label mission-records-label">{activeFilter === "All" ? "All mission records" : `${activeFilter} records`} · {filteredProjects.length} <span>// every repo is a mission</span></p>
          {visibleProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">{visibleProjects.map((project) => <ProjectCard key={project.repo} project={project} />)}</div>
          ) : (
            <div className="mission-card angled-corner p-6 text-base text-[#C8D3CB]">No mission records found for this filter.</div>
          )}
        </div>
      </div>
    </section>
  );
}
