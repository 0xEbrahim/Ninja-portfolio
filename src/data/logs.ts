export type LogLevel =
  | "INFO"
  | "DEBUGGED"
  | "LEARNED"
  | "BUILT"
  | "SHIPPED"
  | "OPTIMIZED"
  | "DESIGNED"
  | "STUDIED"
  | "REFACTORED";

export type ActivityLog = {
  id: string;
  level: LogLevel;
  source: string;
  message: string;
};

export const logPool: ActivityLog[] = [
  { id: "redis-aof", level: "LEARNED", source: "redis.engine", message: "Redis persistence, AOF, and in-memory data structures" },
  { id: "docker-network", level: "DEBUGGED", source: "infra.docker", message: "Docker networking between microservices" },
  { id: "jwt-refresh", level: "DESIGNED", source: "auth.service", message: "JWT refresh-token rotation flow" },
  { id: "sql-indexes", level: "OPTIMIZED", source: "database.postgres", message: "SQL indexes and slow queries" },
  { id: "gedis-server", level: "BUILT", source: "systems.gedis", message: "Redis-like server experiments in Go" },
  { id: "system-design", level: "STUDIED", source: "architecture.notes", message: "System design tradeoffs and service boundaries" },
  { id: "agora-api", level: "SHIPPED", source: "api.agora", message: "Backend API features with auth and rate limiting" },
  { id: "backend-layers", level: "REFACTORED", source: "services.core", message: "Backend layers, validation, guards, and services" },
  { id: "queue-flow", level: "INFO", source: "queue.worker", message: "Modeled async job flow for background processing" },
  { id: "shinobi-mode", level: "INFO", source: "shinobi.core", message: "Silent execution mode synchronized" },
];
