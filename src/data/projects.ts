export type ProjectStatus =
  | "Stable"
  | "Active"
  | "Experimental"
  | "In Progress"
  | "Learning"
  | "Archived / Learning";

export type ProjectCategory =
  | "Backend API"
  | "Systems"
  | "Microservices"
  | "Tooling"
  | "Full Stack"
  | "Security"
  | "App"
  | "Knowledge";

export type Project = {
  name: string;
  repo: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  category: ProjectCategory;
  featured?: boolean;
  githubUrl: string;
};

function project(
  name: string,
  description: string,
  tags: string[],
  status: ProjectStatus,
  category: ProjectCategory,
  featured = false,
): Project {
  return {
    name,
    repo: name,
    description,
    tags,
    status,
    category,
    featured,
    githubUrl: `https://github.com/0xEbrahim/${name}`,
  };
}

export const projects: Project[] = [
  project("Agora", "Social platform backend built with NestJS, TypeORM, Redis, Docker, and scalable monolith architecture.", ["TypeScript", "NestJS", "Redis", "Docker", "Backend"], "Stable", "Backend API", true),
  project("Gedis", "Lightweight Redis client CLI written in Go. Supports RESP2 and RESP3 parsing, interactive Redis commands, and pretty-prints nested protocol replies.", ["Go", "Redis", "CLI", "RESP2", "RESP3", "Systems"], "Experimental", "Tooling", true),
  project("Gedis-Server", "Redis-like in-memory database server written in Go, focused on protocol handling, TTL, persistence concepts, and data structures.", ["Go", "Database", "Redis-like", "Systems"], "Experimental", "Systems", true),
  project("Patient-Management-Microservices", "Healthcare microservices system focused on patients, appointments, service boundaries, and backend communication.", ["Java", "Spring Boot", "Microservices", "Docker"], "In Progress", "Microservices", true),
  project("Curlion", "TypeScript developer-tooling and networking-focused project.", ["TypeScript", "Tooling"], "Active", "Tooling"),
  project("Learning-Management-System", "Learning management system application with backend and platform features.", ["TypeScript", "Express", "Redis", "Stripe", "Cloudinary"], "Archived / Learning", "Full Stack"),
  project("Storm-Store", "NestJS and Mongoose project using guards, validation, class-transformer, and layered backend concepts.", ["TypeScript", "NestJS", "MongoDB", "Backend"], "Learning", "Backend API"),
  project("Spring-Security-With-JWT", "Spring Security and JWT authentication practice project.", ["Java", "Spring Security", "JWT", "Auth"], "Learning", "Security"),
  project("Drop-Shop", "Java backend and e-commerce style project.", ["Java", "Backend", "E-Commerce"], "Learning", "Backend API"),
  project("MeetMe", "TypeScript product and platform experiment.", ["TypeScript", "Platform"], "Learning", "App"),
  project("Collabri", "TypeScript collaboration and productivity-style project.", ["TypeScript", "Collaboration"], "Learning", "App"),
  project("gqlite", "Go systems and database learning experiment.", ["Go", "Systems", "Database"], "Experimental", "Systems"),
  project("IEEE-system-design", "System design learning and notes project.", ["System Design", "Architecture", "Notes"], "Learning", "Knowledge"),
];

export function findProject(name: string) {
  const normalized = name.toLowerCase().replace(/[\s_]+/g, "-");
  const exact = projects.find((item) => item.name.toLowerCase().replace(/[\s_]+/g, "-") === normalized);
  if (exact) return exact;
  return projects.find((item) => {
    const projectName = item.name.toLowerCase().replace(/[\s_]+/g, "-");
    return projectName.includes(normalized);
  });
}
