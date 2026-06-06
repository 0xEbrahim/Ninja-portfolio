type SectionHeadingProps = {
  label: string;
  title: string;
  description: string;
  className?: string;
};

export function SectionHeading({ label, title, description, className = "mb-12" }: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="section-label">{label}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#E9D8A6] sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-[#9AA89E]">{description}</p>
    </div>
  );
}
