import type { ReactNode } from "react";

type Tone = "jade" | "amber" | "cream" | "cyan" | "muted" | "rust";

export function StampBadge({ children, tone = "jade", tilted = false }: { children: ReactNode; tone?: Tone; tilted?: boolean }) {
  return <span className={`mission-stamp mission-stamp-${tone} ${tilted ? "-rotate-2" : ""}`}>{children}</span>;
}
