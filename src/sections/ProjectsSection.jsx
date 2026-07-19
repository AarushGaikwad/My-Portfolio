import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Replace `points`, `tech`, `difficulty` (1-5), `longDescription`, and
// `breakdown` with your real project details whenever you're ready —
// everything here is a reasonable placeholder based on the project
// names you gave.
const projects = [
  {
    name: "Hackathon Management System",
    difficulty: 3,
    tech: ["Spring Boot", "React", "MySQL"],
    points: [
      "Full-stack platform for organizing hackathons — registrations, team formation, and submission tracking.",
      "REST APIs in Spring Boot paired with a React front end for real-time updates on scores and rounds.",
    ],
    longDescription:
      "A platform built to run the full lifecycle of a hackathon — from opening registrations, to team formation, to project submissions and judge scoring. Built with a focus on clean REST API design and a responsive dashboard so organizers and judges could track progress in real time.",
    breakdown: {
      Frontend: ["React", "Tailwind CSS"],
      Backend: ["Spring Boot", "REST APIs", "Spring Security"],
      Database: ["MySQL"],
    },
  },
  {
    name: "Library Management System",
    difficulty: 2,
    tech: ["Spring Boot", "React", "MySQL"],
    points: [
      "System to manage book inventory, member records, and the borrow/return workflow end to end.",
      "Role-based access so admins and members see different views and permissions.",
    ],
    longDescription:
      "A system for managing a library's day-to-day operations — book inventory, member registration, and the borrow/return cycle, including due-date tracking. Admins and members get different views, backed by role-based access control on the API layer.",
    breakdown: {
      Frontend: ["React"],
      Backend: ["Spring Boot", "REST APIs"],
      Database: ["MySQL"],
    },
  },
  {
    name: "Heart Attack Prediction via Retinal Imaging",
    difficulty: 5,
    tech: ["Python", "TensorFlow", "OpenCV"],
    points: [
      "Deep learning model that estimates heart attack risk from retinal eye images.",
      "Preprocessed medical imaging data and trained a classifier to flag risk levels.",
    ],
    longDescription:
      "A research-driven project exploring whether retinal imaging can be used as a non-invasive signal for heart attack risk. Involved preprocessing medical image data with OpenCV, then training and evaluating a deep learning classifier in TensorFlow to flag risk levels.",
    breakdown: {
      Frontend: ["Jupyter Notebook (demo/analysis interface)"],
      "Backend / ML": ["Python", "TensorFlow", "OpenCV"],
      Database: ["Local image dataset"],
    },
  },
  {
    name: "AQI Index",
    difficulty: 3,
    tech: ["Java", "JavaScript"],
    points: [
      "Web app that tracks and displays Air Quality Index data for locations in real time.",
      "Java backend serving air quality data to a JavaScript-driven front end.",
    ],
    longDescription:
      "A tool for checking Air Quality Index readings for a given location, with a Java backend handling data retrieval and processing, and a JavaScript front end for displaying current readings to the user.",
    breakdown: {
      Frontend: ["JavaScript", "HTML5", "CSS3"],
      Backend: ["Java"],
    },
  },
  {
    name: "Practo Clone",
    difficulty: 3,
    tech: ["Java", "JavaScript"],
    points: [
      "A clone of Practo, focused on doctor listings and appointment booking flows.",
      "Java backend handling core logic, JavaScript front end for browsing and booking.",
    ],
    longDescription:
      "A clone of the Practo healthcare platform, recreating core flows like browsing doctors and booking appointments. Java handles the backend logic, with a JavaScript front end for the user-facing booking experience.",
    breakdown: {
      Frontend: ["JavaScript", "HTML5", "CSS3"],
      Backend: ["Java"],
    },
  },
  {
    name: "Zentry",
    difficulty: 2,
    tech: ["HTML5", "CSS3", "JavaScript"],
    points: [
      "A front-end focused project built with core HTML5, CSS3, and JavaScript.",
      "Focused on clean UI structure and interactivity without a framework.",
    ],
    longDescription:
      "A front-end project built with plain HTML5, CSS3, and JavaScript — no framework — focused on practicing core web fundamentals: layout, styling, and DOM interactivity.",
    breakdown: {
      Frontend: ["HTML5", "CSS3", "JavaScript"],
    },
  },
  {
    name: "Employee Management System",
    difficulty: 2,
    tech: ["Java", "JavaScript"],
    points: [
      "System to manage employee records — adding, updating, and viewing employee data.",
      "Java backend with a JavaScript front end for HR-style record management.",
    ],
    longDescription:
      "A system for managing employee records — creating, updating, and viewing employee data through a simple interface, backed by a Java service layer handling the core logic.",
    breakdown: {
      Frontend: ["JavaScript", "HTML5", "CSS3"],
      Backend: ["Java"],
    },
  },
];

const DifficultyStars = ({ level }) => (
  <div className="flex gap-0.5" aria-label={`Difficulty ${level} out of 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={i < level ? "text-amber" : "text-line"}>
        ★
      </span>
    ))}
  </div>
);

const ProjectCard = ({ project, delay, onOpen }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
    onClick={() => onOpen(project)}
    role="button"
    tabIndex={0}
    onKeyDown={(e) => e.key === "Enter" && onOpen(project)}
    className="rounded-lg border border-line bg-amber/[0.02] p-5 flex flex-col
               hover:border-amber/50 transition-colors cursor-pointer text-left"
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
      <span className="font-mono text-[10px] text-slate">DIFFICULTY</span>
      <DifficultyStars level={project.difficulty} />
    </div>

    <ul className="space-y-1.5 mb-4 flex-1">
      {project.points.map((line) => (
        <li
          key={line}
          className="font-body text-sm text-slate leading-relaxed
                     before:content-['—'] before:mr-2 before:text-line"
        >
          {line}
        </li>
      ))}
    </ul>

    <p className="font-mono text-[10px] text-slate mb-2">WEAPONS USED</p>
    <div className="flex flex-wrap gap-1.5">
      {project.tech.map((t) => (
        <span
          key={t}
          className="font-mono text-[10px] px-2 py-1 rounded border border-line text-paper"
        >
          {t}
        </span>
      ))}
    </div>

    <p className="font-mono text-[9px] text-slate mt-3 text-center">
      click for full battle report
    </p>
  </motion.div>
);

const ProjectModal = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        className="fixed inset-0 z-[80] bg-ink/80 backdrop-blur-sm flex items-center
                   justify-center px-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg max-h-[85vh] overflow-y-auto bg-ink border
                     border-amber rounded-lg shadow-[0_0_30px_rgba(217,164,65,0.2)] p-6"
        >
          <div className="flex items-start justify-between gap-3 mb-1">
            <p className="font-pixel text-[8px] text-amber tracking-wider">
              BATTLE REPORT
            </p>
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="text-slate hover:text-amber font-mono text-sm shrink-0"
            >
              ✕
            </button>
          </div>

          <h3 className="font-display text-2xl text-paper mb-3">
            {project.name}
          </h3>

          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-[9px] px-2 py-1 rounded-full border border-[#7fbf7f] text-[#7fbf7f]">
              DEFEATED
            </span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] text-slate">DIFFICULTY</span>
              <DifficultyStars level={project.difficulty} />
            </div>
          </div>

          <p className="font-body text-sm text-slate leading-relaxed mb-6">
            {project.longDescription}
          </p>

          <p className="font-mono text-[10px] text-slate mb-3 tracking-wide">
            TECH STACK BREAKDOWN
          </p>
          <div className="flex flex-col gap-3">
            {Object.entries(project.breakdown).map(([category, items]) => (
              <div key={category}>
                <p className="font-mono text-[10px] text-amber mb-1.5">
                  {category.toUpperCase()}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[10px] px-2 py-1 rounded border border-line text-paper"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ITEMS_PER_PAGE = 2;

const ProjectsSection = () => {
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);
  const pageProjects = projects.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const goTo = (n) => setPage(Math.max(0, Math.min(totalPages - 1, n)));

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

      <div className="w-full max-w-3xl min-h-[420px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {pageProjects.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                delay={i * 0.1}
                onOpen={setSelected}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3 mt-10">
        <button
          onClick={() => goTo(page - 1)}
          disabled={page === 0}
          aria-label="Previous page"
          className="font-mono text-sm w-8 h-8 rounded-full border border-line text-slate
                     hover:border-amber hover:text-amber transition-colors
                     disabled:opacity-30 disabled:hover:border-line disabled:hover:text-slate
                     disabled:cursor-not-allowed"
        >
          ←
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to page ${i + 1}`}
            aria-current={i === page}
            className={`font-mono text-xs w-8 h-8 rounded-full border transition-colors
              ${
                i === page
                  ? "border-amber text-amber"
                  : "border-line text-slate hover:text-paper"
              }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => goTo(page + 1)}
          disabled={page === totalPages - 1}
          aria-label="Next page"
          className="font-mono text-sm w-8 h-8 rounded-full border border-line text-slate
                     hover:border-amber hover:text-amber transition-colors
                     disabled:opacity-30 disabled:hover:border-line disabled:hover:text-slate
                     disabled:cursor-not-allowed"
        >
          →
        </button>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
};

export default ProjectsSection;