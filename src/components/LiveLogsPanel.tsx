import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, Pause, Play, Trash2 } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ActivityLog, LogLevel, logPool } from "../data/logs";
import { SectionHeading } from "./SectionHeading";
import { FadeIn } from "./motion/FadeIn";

type RuntimeLog = ActivityLog & {
  runtimeId: string;
  timestamp: string;
};

const levelStyles: Record<LogLevel, string> = {
  INFO: "border-sky-500/20 bg-sky-500/10 text-sky-300",
  DEBUGGED: "border-violet-500/20 bg-violet-500/10 text-violet-300",
  LEARNED: "border-purple-500/20 bg-purple-500/10 text-purple-300",
  BUILT: "border-green-500/20 bg-green-500/10 text-green-300",
  SHIPPED: "border-emerald-500/20 bg-emerald-500/10 text-emerald-300",
  OPTIMIZED: "border-blue-500/20 bg-blue-500/10 text-blue-300",
  DESIGNED: "border-amber-500/20 bg-amber-500/10 text-amber-300",
  STUDIED: "border-cyan-500/20 bg-cyan-500/10 text-cyan-300",
  REFACTORED: "border-orange-500/20 bg-orange-500/10 text-orange-300",
};

function timestamp() {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(new Date());
}

function createRuntimeLog(log: ActivityLog, sequence: number): RuntimeLog {
  return { ...log, runtimeId: `${log.id}-${Date.now()}-${sequence}`, timestamp: timestamp() };
}

export function LiveLogsPanel() {
  const [visibleLogs, setVisibleLogs] = useState<RuntimeLog[]>(() =>
    logPool.slice(0, 5).map((log, index) => createRuntimeLog(log, index)),
  );
  const [paused, setPaused] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [eventCount, setEventCount] = useState(124);
  const reduced = useReducedMotion();
  const nextIndex = useRef(5);
  const sectionRef = useRef<HTMLElement>(null);
  const streamRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { margin: "-25% 0px -25% 0px" });
  const displayedLogs = showAll ? visibleLogs : visibleLogs.slice(-5);

  useEffect(() => {
    if (paused) return;

    const delay = 1800 + Math.floor(Math.random() * 1001);
    const interval = window.setInterval(() => {
      const index = nextIndex.current;
      const nextLog = logPool[index % logPool.length];
      nextIndex.current = index + 1;
      setVisibleLogs((current) => [...current, createRuntimeLog(nextLog, index)].slice(-8));
      setEventCount((current) => current + 1);
    }, delay);

    return () => window.clearInterval(interval);
  }, [paused]);

  useEffect(() => {
    const stream = streamRef.current;
    if (stream) stream.scrollTo({ top: stream.scrollHeight, behavior: "smooth" });
  }, [visibleLogs]);

  return (
    <section ref={sectionRef} id="logs" className={`section-block archive-section-alt ${isInView ? "signal-stream-active" : ""}`}>
      <FadeIn className="site-container">
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            label="Archive 01 · Signal Stream / Logs"
            title="Intercepted backend signals."
            description="Simulated incoming traces from my learning, debugging, and building process."
            className="mb-0"
          />
          <div className="flex flex-wrap items-center gap-2 pb-1">
            <div className="mr-2 flex items-center gap-2 font-mono text-xs text-slate-400" aria-live="polite">
              <span className={`h-2 w-2 rounded-full ${paused ? "bg-[#EE9B00]" : "animate-pulse bg-[#A7C957]"}`} />
              <span className={paused ? "text-amber-300" : "text-[#A7C957]"}>{paused ? "STREAM PAUSED" : "STREAM ACTIVE"}</span>
              <span>· events: {eventCount}</span>
              <span className={paused ? "signal-bars signal-bars-paused" : "signal-bars"} aria-hidden="true"><i /><i /><i /></span>
            </div>
            <button type="button" className="log-control" onClick={() => setPaused((current) => !current)}>
              {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              {paused ? "Resume stream" : "Pause stream"}
            </button>
            <button type="button" className="log-control" onClick={() => setVisibleLogs([])}>
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </button>
            <button type="button" className="log-control" onClick={() => setShowAll((current) => !current)}>
              {showAll ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              {showAll ? "Show latest 5" : "View all logs"}
            </button>
          </div>
        </div>

        <div className="signal-panel angled-corner paper-noise">
          <div className="flex items-center justify-between border-b border-slate-800/70 px-4 py-3 font-mono text-xs text-slate-500 sm:px-5">
            <span>intercepted-signals.log</span>
            <span>showing: {displayedLogs.length} · buffer: {visibleLogs.length}/8</span>
          </div>
          <div ref={streamRef} className="log-stream">
            {visibleLogs.length === 0 && (
              <p className="py-10 text-center font-mono text-sm text-slate-500">Stream cleared. Waiting for new activity.</p>
            )}
            <AnimatePresence initial={false}>
            {displayedLogs.map((log, index) => {
              const latest = index === displayedLogs.length - 1;
              return (
                <motion.div
                  key={log.runtimeId}
                  layout={!reduced}
                  initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -6 }}
                  transition={{ duration: 0.28 }}
                  className={`live-log-row ${latest ? "live-log-row-new" : ""}`}
                >
                  <span className="shrink-0 text-slate-500">[{log.timestamp}]</span>
                  <span className={`log-level ${levelStyles[log.level]}`}>{log.level}</span>
                  <span className="shrink-0 text-sky-400/80">{log.source}</span>
                  <span className="min-w-0 text-slate-300">{log.message}</span>
                  {latest && <span className="new-log-badge">incoming</span>}
                </motion.div>
              );
            })}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-2 border-t border-slate-800/70 px-4 py-3 font-mono text-xs text-slate-500 sm:px-5">
            <span className={`h-1.5 w-1.5 rounded-full ${paused ? "bg-[#EE9B00]" : "animate-pulse bg-[#A7C957]"}`} />
            {paused ? "stream paused" : "waiting for next event..."}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
