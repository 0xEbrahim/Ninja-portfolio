export function SectionKicker({ archive, title }: { archive: string; title: string }) {
  return (
    <div className="section-kicker">
      <span className="section-kicker-mark" />
      <span>{archive}</span>
      <span className="archive-divider flex-1" />
      <strong>{title}</strong>
    </div>
  );
}
