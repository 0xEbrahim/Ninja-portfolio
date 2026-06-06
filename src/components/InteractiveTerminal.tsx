import { FormEvent, KeyboardEvent, ReactNode, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { findProject, projects } from "../data/projects";
import { logPool } from "../data/logs";
import { triggerShuriken } from "./motion/ShurikenBurst";
import { pulseSection } from "../lib/sectionPulse";

type OutputLine = {
  command?: string;
  content: ReactNode;
  error?: boolean;
};

const prompt = "shinobi@0xcontrolplane:~$";

const helpItems = [
  ["help", "show available commands"],
  ["whoami / about", "show profile summary"],
  ["skills / stack", "show backend skills and technologies"],
  ["projects / repos / ls", "show project index"],
  ["project <name> / repo <name>", "inspect a project"],
  ["services", "show backend services"],
  ["logs", "show latest engineering activity"],
  ["anime", "activate Backend Shinobi Mode"],
  ["github / contact", "show contact channels"],
  ["history", "show command history"],
  ["clear", "clear terminal"],
];

function projectIndex() {
  return (
    <div className="space-y-1">
      {projects.map((project, index) => (
        <p key={project.repo}>
          <span className="inline-block w-6 text-slate-500">{index + 1}.</span>
          <span className="text-sky-400">{project.name}</span>
          <span className="text-slate-500"> · {project.category} · </span>
          <span className={project.status === "In Progress" ? "text-amber-300" : "text-slate-400"}>{project.status}</span>
        </p>
      ))}
      <p className="pt-2 text-slate-500">Inspect one with: project agora</p>
    </div>
  );
}

function projectDetails(name: string) {
  const project = findProject(name);
  if (!project) {
    return {
      error: true,
      content: <>Project not found: {name}. Type <span className="text-sky-400">projects</span> to see the index.</>,
    };
  }

  return {
    error: false,
    content: (
      <div className="space-y-1">
        <p className="text-slate-200">{project.name}</p>
        <p>{project.description}</p>
        <p><span className="text-slate-500">category:</span> {project.category}</p>
        <p><span className="text-slate-500">status:</span> <span className={project.status === "In Progress" ? "text-amber-300" : "text-green-300"}>{project.status}</span></p>
        <p><span className="text-slate-500">stack:</span> {project.tags.join(" · ")}</p>
        <a href={project.githubUrl} target="_blank" rel="noreferrer">{project.githubUrl}</a>
      </div>
    ),
  };
}

export function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [highlighted, setHighlighted] = useState(false);
  const [output, setOutput] = useState<OutputLine[]>([
    { content: <span>Type <span className="text-sky-400">"help"</span> to see available commands.</span> },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const container = scrollContainerRef.current;
    const end = terminalEndRef.current;
    if (container) container.scrollTo({ top: end?.offsetTop ?? container.scrollHeight, behavior: "smooth" });
  }, [output, history]);

  useEffect(() => {
    let highlightTimeout: number | undefined;
    const focusTerminal = () => inputRef.current?.focus();
    const highlightTerminal = () => {
      setHighlighted(true);
      window.clearTimeout(highlightTimeout);
      highlightTimeout = window.setTimeout(() => setHighlighted(false), 1200);
    };

    window.addEventListener("terminal:focus", focusTerminal);
    window.addEventListener("terminal:highlight", highlightTerminal);
    return () => {
      window.removeEventListener("terminal:focus", focusTerminal);
      window.removeEventListener("terminal:highlight", highlightTerminal);
      window.clearTimeout(highlightTimeout);
    };
  }, []);

  function resolveCommand(rawCommand: string): Omit<OutputLine, "command"> | "clear" {
    const [base = "", ...args] = rawCommand.trim().split(/\s+/);
    const command = base.toLowerCase();
    const argument = args.join(" ");

    if (command === "clear") return "clear";
    if (command === "project" || command === "repo") {
      return argument
        ? projectDetails(argument)
        : { error: true, content: <>Usage: {command} &lt;name&gt;. Example: <span className="text-sky-400">project agora</span></> };
    }

    const commands: Record<string, ReactNode> = {
      help: (
        <div className="space-y-1">
          <p className="mb-2 text-slate-300">Available commands:</p>
          {helpItems.map(([name, description]) => (
            <p key={name}><span className="inline-block w-48 text-sky-400">{name}</span>{description}</p>
          ))}
        </div>
      ),
      whoami: (
        <div className="space-y-1">
          <p className="text-slate-200">Ibrahim El-Sayed · Backend Engineer</p>
          <p>Alias: 0xEbrahim</p>
          <p>I code, script then hack | Back-End | DevOps</p>
          <p>Focus: APIs, distributed systems, databases, caching, and infrastructure</p>
        </div>
      ),
      skills: (
        <div className="space-y-1">
          <p><span className="text-slate-300">Languages:</span> TypeScript, Go, Java</p>
          <p><span className="text-slate-300">Backend:</span> Node.js, Express.js, NestJS, Spring Boot</p>
          <p><span className="text-slate-300">Data:</span> PostgreSQL, MySQL, Redis, MongoDB</p>
          <p><span className="text-slate-300">Infra:</span> Docker, Linux, GitHub Actions, Nginx</p>
        </div>
      ),
      stack: <p>TypeScript | Node.js | NestJS | Go | Java | PostgreSQL | Redis | Docker | Linux</p>,
      projects: projectIndex(),
      services: <p>auth-service <span className="text-green-400">online</span> · api-service <span className="text-green-400">online</span> · cache-service <span className="text-green-400">online</span> · infra-service <span className="text-green-400">online</span></p>,
      logs: (
        <div className="space-y-1">
          <p className="mb-2 text-slate-300">Learning journal stream is running in the logs section.</p>
          {logPool.slice(-3).map((log) => <p key={log.id}><span className="text-sky-400">{log.source}</span> · {log.level} · {log.message}</p>)}
        </div>
      ),
      anime: (
        <div className="space-y-1 rounded border border-sky-500/20 bg-sky-500/[0.06] p-3">
          <p className="font-semibold tracking-wider text-[#A7C957]">Backend Shinobi Mode synchronized.</p>
          <p>Mission: protect the API gateway, master the cache layer, and ship clean systems.</p>
        </div>
      ),
      github: <p>Opening GitHub profile... <a href="https://github.com/0xEbrahim" target="_blank" rel="noreferrer">github.com/0xEbrahim</a></p>,
      contact: (
        <div className="space-y-1">
          <p>GitHub: <a href="https://github.com/0xEbrahim" target="_blank" rel="noreferrer">github.com/0xEbrahim</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/ibrahiimjr/" target="_blank" rel="noreferrer">linkedin.com/in/ibrahiimjr</a></p>
          <p>Email: <a href="mailto:ibrahiim.elsayeedev@gmail.com">ibrahiim.elsayeedev@gmail.com</a></p>
        </div>
      ),
      history: history.length ? <div className="space-y-1">{history.map((item, index) => <p key={`${item}-${index}`}>{index + 1} · {item}</p>)}</div> : <p>No commands in history.</p>,
    };

    const aliases: Record<string, string> = {
      about: "whoami",
      repos: "projects",
      ls: "projects",
    };
    const result = commands[aliases[command] ?? command];
    return result
      ? { content: result }
      : { error: true, content: <>Command not found: {rawCommand}. Type "help" to see available commands.</> };
  }

  function execute(event: FormEvent) {
    event.preventDefault();
    const rawCommand = input.trim();
    if (!rawCommand) return;

    const result = resolveCommand(rawCommand);
    const nextHistory = [...history, rawCommand];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length);
    setInput("");

    if (result === "clear") {
      setOutput([]);
      scrollContainerRef.current?.scrollTo({ top: 0 });
      return;
    }
    if (rawCommand.toLowerCase() === "anime") {
      triggerShuriken();
    }
    const baseCommand = rawCommand.toLowerCase().split(/\s+/)[0];
    if (baseCommand === "logs") pulseSection("logs");
    if (baseCommand === "projects" || baseCommand === "repos" || baseCommand === "ls") pulseSection("projects");
    setOutput((current) => [...current, { command: rawCommand, ...result }]);
  }

  function navigateHistory(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
    event.preventDefault();
    const next = event.key === "ArrowUp" ? Math.max(0, historyIndex - 1) : Math.min(history.length, historyIndex + 1);
    setHistoryIndex(next);
    setInput(next === history.length ? "" : history[next] ?? "");
  }

  return (
    <div className={`terminal ${highlighted ? "terminal-highlighted" : ""}`} onClick={() => inputRef.current?.focus()}>
      <div className="terminal-header">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <div className="ml-3">
          <p className="font-mono text-xs text-[#E9D8A6]">Command Console</p>
          <p className="mt-0.5 font-mono text-[10px] text-[#69766D]">// try: help, projects, project agora, logs, anime</p>
        </div>
      </div>
      <div ref={scrollContainerRef} className="terminal-body" aria-live="polite">
        {output.map((line, index) => (
          <motion.div key={index} className="mb-4" initial={{ opacity: 0, y: reduced ? 0 : 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
            {line.command && <p className="mb-1 text-[#E8EFEA]"><span className="text-[#A7C957]">{prompt}</span> {line.command}</p>}
            <div className={line.error ? "text-red-400" : "text-slate-400"}>{line.content}</div>
          </motion.div>
        ))}
        <form onSubmit={execute} className="flex items-center gap-2">
          <label htmlFor="terminal-input" className="shrink-0 text-[#A7C957]">{prompt}</label>
          <input ref={inputRef} id="terminal-input" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={navigateHistory} className="min-w-0 flex-1 bg-transparent text-slate-200 caret-sky-400 outline-none" autoComplete="off" spellCheck={false} aria-label="Terminal command" />
        </form>
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
}
