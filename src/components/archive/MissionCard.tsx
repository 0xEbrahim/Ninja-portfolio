import type { ReactNode } from "react";
import { MagneticCard } from "../motion/MagneticCard";

export function MissionCard({ children, className = "", tab }: { children: ReactNode; className?: string; tab?: string }) {
  return (
    <MagneticCard className={`mission-card angled-corner paper-noise shinobi-slash-hover ${className}`}>
      {tab && <span className="mission-file-tab">{tab}</span>}
      {children}
    </MagneticCard>
  );
}
