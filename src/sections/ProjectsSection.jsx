import { motion } from "framer-motion";

// Replace the GitHub and demo links with your actual URLs.
const projects = [
  {
    name: "Hackathon Management System",
    difficulty: 3,
    tech: ["Spring Boot", "React", "MySQL"],
    points: [
      "Full-stack platform for organizing hackathons, including registrations, team formation, and submission tracking.",
      "Built REST APIs using Spring Boot with a React frontend for seamless user interaction and real-time updates.",
    ],
    github: null,
    demo: null,
  },
  {
    name: "Library Management System",
    difficulty: 2,
    tech: ["Spring Boot", "React", "MySQL"],
    points: [
      "Developed a complete library management platform for book inventory, member management, and issue/return workflows.",
      "Implemented role-based authentication and authorization for administrators and members.",
    ],
    github: null,
    demo: null,
  },
  {
    name: "Heart Attack Prediction via Retinal Imaging",
    difficulty: 5,
    tech: ["Python", "TensorFlow", "OpenCV"],
    points: [
      "Developed a deep learning model to predict heart attack risk using retinal eye images.",
      "Preprocessed medical imaging datasets and trained a CNN-based classifier for risk prediction.",
    ],
    github: null,
    demo: null,
  },
];

const DifficultyStars = ({ level }) => (
  <div className="flex gap-0.5" aria-label={`Difficulty ${level} out of 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={i < level ? "text-amber" : "text-line"}
      >
        ★
      </span>
    ))}
  </div>
);

const LootLink = ({ href, label }) => {
  const disabled = !href;

  return (
    <a
      href={disabled ? undefined : href}
      target={disabled ? undefined : "_blank"}
      rel={disabled ? undefined : "noopener noreferrer"}
      aria-disabled={disabled}
      onClick={(e) => disabled && e.preventDefault()}
      className={`font-mono text-[10px] px-3 py-1.5 rounded border text-center
        ${
          disabled
            ? "border-line text-slate cursor-not-allowed opacity-50"
            : "border-amber text-amber hover:bg-amber/10 transition-colors"
        }`}
    >
      {disabled ? `${label} (Coming Soon)` : label}
    </a>
  );
};

const ProjectCard = ({ project, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
    className="rounded-lg border border-line bg-amber/[0.02] p-5 flex flex-col hover:border-amber/50 transition-colors"
  >
    <div className="flex items-start justify-between gap-3 mb-2">
      <h3 className="font-display text-lg text-paper leading-snug">
        {project.name}
      </h3>

      <span className="shrink-0 font-mono text-[9px] px-2 py-1 rounded-full border border-[#7fbf7f] text-[#7fbf7f]">
        DEFEATED
      </span>
    </div>

    <div className="flex items-center justify-between mb-4">
      <span className="font-mono text-[10px] text-slate">
        DIFFICULTY
      </span>

      <DifficultyStars level={project.difficulty} />
    </div>

    <ul className="space-y-2 mb-4 flex-1">
      {project.points.map((point) => (
        <li
          key={point}
          className="font-body text-sm text-slate leading-relaxed before:content-['—'] before:mr-2 before:text-line"
        >
          {point}
        </li>
      ))}
    </ul>

    <p className="font-mono text-[10px] text-slate mb-2">
      WEAPONS USED
    </p>

    <div className="flex flex-wrap gap-2 mb-4">
      {project.tech.map((tech) => (
        <span
          key={tech}
          className="font-mono text-[10px] px-2 py-1 rounded border border-line text-paper"
        >
          {tech}
        </span>
      ))}
    </div>

    <div className="flex gap-2">
      <LootLink href={project.github} label="GitHub" />
      <LootLink href={project.demo} label="Live Demo" />
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  return (
    <section
      id="projects"
      data-unlock-name="Projects"
      className="bg-ink border-t border-line px-6 py-24 flex flex-col items-center"
    >
      <p className="font-mono text-sm text-slate mb-3">
        <span className="text-amber">$</span> cat projects.css
      </p>

      <h2 className="font-display text-3xl sm:text-4xl text-paper mb-2">
        Boss Fights Cleared
      </h2>

      <p className="font-pixel text-[8px] text-slate mb-12 tracking-wider">
        PROJECTS BUILT AND SHIPPED
      </p>

      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={project}
            delay={index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;