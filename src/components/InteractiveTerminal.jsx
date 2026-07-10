import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WELCOME = [
  "Aarush's Portfolio Terminal v1.0.0",
  "Type 'help' to see available commands.",
];

/**
 * A small floating toggle button that opens a fake terminal. Visitors
 * can type real-ish commands (whoami, ls, sudo hire-me, etc.) that
 * either print info or scroll to a section — a nod to the terminal/git
 * motifs already used elsewhere on the page (TerminalTag, AcademicTimeline).
 */
const InteractiveTerminal = () => {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState(WELCOME);
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    const echo = `guest@portfolio:~$ ${raw}`;

    if (cmd === "") return [echo];

    switch (cmd) {
      case "help":
        return [
          echo,
          "Available commands:",
          "  whoami       - who am I?",
          "  ls           - list sections",
          "  about        - jump to About Me",
          "  skills       - jump to Skills",
          "  sudo hire-me - ...try it",
          "  clear        - clear the terminal",
          "  exit         - close this terminal",
        ];
      case "whoami":
        return [echo, "Aarush Gaikwad — backend-focused software engineer."];
      case "ls":
        return [echo, "about.html  skills.js  projects.css  contact.json"];
      case "about":
        scrollToSection("about");
        return [echo, "Jumping to About Me..."];
      case "skills":
        scrollToSection("skills");
        return [echo, "Jumping to Skills..."];
      case "sudo hire-me":
        return [
          echo,
          "[sudo] password for recruiter: ********",
          "Permission granted. Scroll down, we should talk.",
        ];
      case "clear":
        setLines([]);
        return null;
      case "exit":
        setOpen(false);
        return null;
      default:
        return [echo, `command not found: ${cmd}`];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = runCommand(input);
    if (result) setLines((prev) => [...prev, ...result]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open interactive terminal"
        className="fixed bottom-6 right-6 z-40 font-mono text-sm px-4 py-3
                   rounded-full bg-ink border border-amber text-amber
                   shadow-[0_0_15px_rgba(217,164,65,0.3)]
                   hover:shadow-[0_0_20px_rgba(217,164,65,0.5)]
                   transition-shadow"
      >
        {">_"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-6 z-40 w-[90vw] max-w-md h-80
                       bg-ink border border-line rounded-lg shadow-2xl
                       flex flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-line">
              <span className="font-mono text-xs text-slate">terminal</span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close terminal"
                className="text-slate hover:text-amber font-mono text-xs"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-xs text-paper space-y-1">
              {lines.map((line, i) => (
                <p key={i} className={line.startsWith("guest@") ? "text-amber" : ""}>
                  {line}
                </p>
              ))}
              <div ref={bottomRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex items-center px-4 py-2 border-t border-line">
              <span className="font-mono text-xs text-amber mr-2">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent font-mono text-xs text-paper
                           outline-none placeholder:text-slate"
                placeholder="type 'help'"
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractiveTerminal;