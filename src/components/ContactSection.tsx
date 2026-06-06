import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { FadeIn } from "./motion/FadeIn";
import { StampBadge } from "./archive/StampBadge";
import { cvFileName, cvUrl } from "../lib/cv";

export function ContactSection() {
  return (
    <section id="contact" className="section-block">
      <FadeIn className="site-container">
        <div className="mission-card angled-corner paper-noise px-5 py-8 sm:px-8 sm:py-10 lg:flex lg:items-center lg:justify-between lg:px-14 lg:py-14">
          <div className="max-w-2xl">
            <StampBadge tone="jade" tilted>rendezvous: open</StampBadge>
            <p className="section-label mt-6">Archive 05 · Rendezvous Point / Contact</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#E9D8A6] sm:text-4xl">Send a signal.</h2>
            <p className="mt-4 text-base leading-7 text-[#9AA89E]">Need someone who thinks in APIs, data flow, and failure boundaries? Open a channel.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>a]:w-full sm:[&>a]:w-auto lg:mt-0">
            <a href="mailto:ibrahiim.elsayeedev@gmail.com" className="button-primary"><Mail className="h-4 w-4" /> Email me</a>
            <a href="https://www.linkedin.com/in/ibrahiimjr/" target="_blank" rel="noreferrer" className="button-secondary">
              <Linkedin className="h-4 w-4" /> LinkedIn <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a href="https://github.com/0xEbrahim" target="_blank" rel="noreferrer" className="button-secondary">
              <Github className="h-4 w-4" /> GitHub <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <div className="w-full sm:basis-full lg:max-w-xs">
              <a href={cvUrl} download={cvFileName} className="button-secondary shinobi-slash-hover w-full">
                <Download className="h-4 w-4" /> Download CV
              </a>
              <p className="mt-2 font-mono text-[10px] leading-5 text-[#69766D]">Grab the PDF version of my backend engineering profile.</p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
