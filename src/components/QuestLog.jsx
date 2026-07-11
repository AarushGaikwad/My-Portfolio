import { motion } from "framer-motion";

// Swap dates, titles, and detail bullets for your own. Add a new object
// to `quests` for each future milestone (new job, next course, etc.).
const quests = [
  {
    title: "B.E. in Electronics & Telecommunication",
    place: "Your College Name, University Name",
    date: "2020 — 2024",
    status: "completed",
    details: [
      "Graduated with a focus on core electronics, communication systems, and programming fundamentals.",
      "Built a growing interest in software development alongside coursework, leading into backend engineering.",
    ],
  },
  {
    title: "PG Certification in Full-Stack Development",
    place: "Your Institute Name",
    date: "Feb 2026 — Aug 2026",
    status: "active",
    progress: 55,
    details: [
      "6-month intensive program covering Java, Spring Boot, Node.js, and React.",
      "Focused on REST API design, database modeling, and building production-style full-stack projects.",
    ],
  },
];

// The trophy case — earned trophies light up; future ones sit greyed
// out until you update `earned` to true. Add new trophies here as you
// hit new milestones (first job, first open-source PR, etc.).
const trophies = [
  { label: "Graduate", earned: true },
  { label: "Certified", earned: false },
  { label: "Hired", earned: false },
];

const QuestCard = ({ quest, delay }) => {
  const isActive = quest.status === "active";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, delay }}
      className={`rounded-lg border px-5 py-4 text-left
        ${isActive ? "border-amber bg-amber/[0.06]" : "border-line bg-amber/[0.02]"}`}
    >
      <div className="flex justify-between items-center gap-3 mb-1.5">
        <h3 className="font-display text-base sm:text-lg text-paper">
          {quest.title}
        </h3>
        <span
          className={`shrink-0 font-mono text-[10px] px-2 py-1 rounded-full border
            ${isActive ? "border-amber text-amber" : "border-[#7fbf7f] text-[#7fbf7f]"}`}
        >
          {isActive ? "IN PROGRESS" : "COMPLETED"}
        </span>
      </div>

      <p className="font-mono text-xs text-slate mb-3">
        {quest.date} · {quest.place}
      </p>

      <ul className="space-y-1 mb-3">
        {quest.details.map((line) => (
          <li
            key={line}
            className="font-body text-sm text-slate leading-relaxed
                       before:content-['—'] before:mr-2 before:text-line"
          >
            {line}
          </li>
        ))}
      </ul>

      <div className="h-1.5 rounded-full bg-line overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${isActive ? quest.progress : 100}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
          className={`h-full rounded-full ${isActive ? "bg-amber" : "bg-[#7fbf7f]"}`}
        />
      </div>
    </motion.div>
  );
};

const TrophyCase = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="flex justify-center gap-4 mt-8 flex-wrap"
  >
    {trophies.map((trophy) => (
      <div
        key={trophy.label}
        className={`flex flex-col items-center gap-1.5 rounded-lg border px-4 py-3
          ${trophy.earned ? "border-[#7fbf7f] bg-[#7fbf7f]/5" : "border-line opacity-40"}`}
      >
        <span className="text-xl" aria-hidden="true">🏆</span>
        <span
          className={`font-mono text-[9px] tracking-wide
            ${trophy.earned ? "text-[#7fbf7f]" : "text-slate"}`}
        >
          {trophy.label.toUpperCase()}
        </span>
      </div>
    ))}
  </motion.div>
);

const QuestLog = () => {
  return (
    <div className="w-full max-w-xl text-left">
      <h2 className="font-mono text-sm text-slate mb-8 text-center">
        <span className="text-amber">$</span> quest-log{" "}
        <span className="text-paper">--active --completed</span>
      </h2>

      <div className="flex flex-col gap-5">
        {quests.map((quest, i) => (
          <QuestCard key={quest.title} quest={quest} delay={i * 0.1} />
        ))}
      </div>

      <TrophyCase />
    </div>
  );
};

export default QuestLog;