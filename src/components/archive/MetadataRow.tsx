import type { ReactNode } from "react";

export function MetadataRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="metadata-row">
      <span>{label}:</span>
      <strong>{children}</strong>
    </div>
  );
}
