import { motion } from "framer-motion";

// Swap these details for your own — dates, degree name, college name,
// and the bullet points under `details` for each entry.
const timeline = [
  {
    date: "2020 — 2024",
    title: "B.E. in Electronics & Telecommunication",
    place: "AISSMS Institute of Information Technology",
    details: [
      "Completed a Bachelor's degree with a strong foundation in Electronics, Communication Systems, Digital Electronics, Microprocessors, and Embedded Systems.",
      "Worked on academic projects that strengthened problem-solving, analytical thinking, and software development skills.",
      "Developed a growing passion for software engineering, which motivated the transition from core electronics to full-stack development.",
    ],
    current: false,
  },
  {
    date: "Feb 2026 — Aug 2026",
    title: "PG Certification in Mobile Computing",
    place: "Sunbeam Infotech Private Limited CDAC",
    details: [
      "Completed an intensive 6-month industry-oriented postgraduate program focused on full-stack application development.",
      "Gained hands-on experience with Java, Advanced Java, Spring Boot, Hibernate, React.js, Node.js, Express.js, and RESTful API development.",
      "Worked extensively with MySQL, MongoDB, Git, GitHub, and software development best practices.",
      "Built multiple real-world full-stack projects following MVC architecture, authentication, database design, and responsive UI principles.",
      "Strengthened problem-solving skills through Data Structures & Algorithms and industry-level coding assignments.",
    ],
    current: true,
  },
];

const AcademicTimeline = () => {
  return (
    <div className="w-full max-w-xl text-left">
      <h2 className="font-mono text-sm text-slate mb-8 text-center">
        <span className="text-amber">$</span> git log --graph --oneline{" "}
        <span className="text-paper">my-journey</span>
      </h2>

      <div className="relative pl-8">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-line" />

        {timeline.map((entry, i) => (
          <motion.div
            key={entry.title}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative mb-10 last:mb-0"
          >
            <span
              className={`absolute -left-8 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-ink
                ${entry.current ? "bg-amber animate-pulse" : "bg-line"}`}
            />

            <p className="font-mono text-xs text-amber mb-1">
              {entry.date}
              {entry.current && (
                <span className="ml-2 text-paper border border-amber rounded-full px-2 py-0.5 text-[10px]">
                  in progress
                </span>
              )}
            </p>
            <h3 className="font-display text-lg sm:text-xl text-paper">
              {entry.title}
            </h3>
            <p className="font-mono text-xs text-slate mt-0.5">{entry.place}</p>

            <ul className="mt-2 space-y-1">
              {entry.details.map((line) => (
                <li
                  key={line}
                  className="font-body text-sm text-slate leading-relaxed
                             before:content-['—'] before:mr-2 before:text-line"
                >
                  {line}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AcademicTimeline;