import { useState } from "react";
import { motion } from "framer-motion";

// Level is a rough proficiency out of 100 — tweak any number here
// as your comfort with a skill changes over time.
const categories = [
  {
    name: "Languages",
    skills: [
      { name: "Java", level: 90 },
      { name: "JavaScript", level: 80 },
      { name: "Python", level: 65 },
      { name: "SQL", level: 80 },
      { name: "HTML5", level: 85 },
      { name: "CSS3", level: 85 },
      { name: "Swift", level: 60 },
      { name: "Kotlin", level: 60 },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Spring Boot", level: 90 },
      { name: "Spring", level: 90 },
      { name: "Node.js", level: 70 },
      { name: "Express", level: 70 },
      { name: "Flask", level: 60 },
      { name: "FastAPI", level: 60 },
    ],
  },
  {
    name: "Frontend",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 65 },
      { name: "React Native", level: 85 },
      { name: "Redux", level: 65 },
      { name: "Tailwind CSS", level: 70 },
      { name: "Bootstrap", level: 70 },
      { name: "Vite", level: 70 },
    ],
  },
  {
    name: "Data & ML",
    skills: [
      { name: "Pandas", level: 65 },
      { name: "NumPy", level: 65 },
      { name: "PyTorch", level: 55 },
      { name: "TensorFlow", level: 70 },
      { name: "Jupyter Lab", level: 70 },
    ],
  },
  {
    name: "Databases",
    skills: [
      { name: "MySQL", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "MongoDB", level: 70 },
      { name: "SQLite", level: 70 },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git", level: 80 },
      { name: "GitHub", level: 80 },
      { name: "VS Code", level: 85 },
      { name: "IntelliJ IDEA", level: 90 },
      { name: "Postman", level: 85 },
      { name: "Linux", level: 65 },
      { name: "Vercel", level: 70 },
    ],
  },
];

const SkillBar = ({ name, level, delay }) => {
  // Convert the 0-100 level into a "Lvl 1-10" badge, the way a game
  // would show character stats instead of a raw percentage.
  const lvl = Math.max(1, Math.round(level / 10));
  const maxed = lvl >= 9;

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="font-body text-sm text-paper">{name}</span>
        <span
          className={`font-pixel text-[8px] px-2 py-1 rounded border leading-none
            ${maxed ? "border-amber text-amber" : "border-line text-slate"}`}
        >
          LVL {lvl}
          {maxed ? " \u2605" : ""}
        </span>
      </div>

      <div className="relative h-3 rounded-full bg-line overflow-hidden border border-line">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
          className="relative h-full rounded-full bg-gradient-to-r from-amber/60 to-amber
                     shadow-[0_0_10px_rgba(217,164,65,0.7)] overflow-hidden"
        >
          {/* Faint segment ticks, like a game HP/XP bar */}
          <div className="absolute inset-0 flex" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 border-r border-ink/30 last:border-r-0"
              />
            ))}
          </div>
          {/* Sweeping highlight for a subtle "charging" feel */}
          <span className="absolute inset-y-0 left-0 w-1/4 bg-paper/25 -skew-x-12 skill-bar-shimmer" />
        </motion.div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = categories[activeIndex];

  return (
    <section
      id="skills"
      className="bg-ink border-t border-line px-6 py-24 flex flex-col items-center"
    >
      <p className="font-mono text-sm text-slate mb-3">
        <span className="text-amber">$</span> cat skills.js
      </p>
      <h2 className="font-display text-3xl sm:text-4xl text-paper mb-2">
        Skill Tree
      </h2>
      <p className="font-pixel text-[8px] text-slate mb-10 tracking-wider">
        SELECT A CATEGORY
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-2xl">
        {categories.map((cat, i) => (
          <button
            key={cat.name}
            onClick={() => setActiveIndex(i)}
            className={`font-mono text-xs px-4 py-2 rounded-full border transition-colors
              ${
                i === activeIndex
                  ? "border-amber text-amber"
                  : "border-line text-slate hover:text-paper"
              }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="w-full max-w-xl grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
        {active.skills.map((skill, i) => (
          <SkillBar
            key={active.name + skill.name}
            name={skill.name}
            level={skill.level}
            delay={i * 0.05}
          />
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
