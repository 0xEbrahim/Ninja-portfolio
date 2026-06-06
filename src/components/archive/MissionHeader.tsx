import { SectionKicker } from "./SectionKicker";

export function MissionHeader({ archive, title, heading, description }: { archive: string; title: string; heading: string; description: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      <SectionKicker archive={archive} title={title} />
      <h2 className="mt-6 text-3xl font-semibold tracking-[-0.035em] text-[#E9D8A6] sm:text-4xl">{heading}</h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-[#9AA89E]">{description}</p>
    </div>
  );
}
