import { motion } from "framer-motion";
import TerminalTag from "../components/TerminalTag";
import TypedTagline from "../components/TypedTagline";
import SocialLinks from "../components/SocialLinks";
import GithubContributions from "../components/GithubContributions";
import AcademicTimeline from "../components/AcademicTimeline";
import NetworkGraphBackground from "../components/NetworkGraphBackground";
import QuestLog from "../components/QuestLog";

const bio = `I'm a backend-focused software engineer who enjoys designing clean,
scalable systems — REST APIs, well-structured services, and architecture
that stays easy to reason about as it grows. Java and Spring Boot are my
core toolkit, with Node.js and Express in the mix when a project calls
for it, and React or React Native on the front end when I want to own a
feature end to end, from database to UI.`;

const AboutMe = () => {
  return (
    <section
      id="about"
      data-unlock-name="About Me"
      className="relative overflow-hidden min-h-screen bg-ink flex flex-col
                 items-center justify-center px-6 pt-32 pb-24 text-center"
    >
      <NetworkGraphBackground />

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <TerminalTag />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl
                   font-semibold text-paper"
        >
          Aarush Gaikwad
        </motion.h1>

        <p className="font-mono text-amber text-base sm:text-lg mt-5 h-6">
          <TypedTagline text="Building software, one working piece at a time." />
        </p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="font-body text-slate max-w-xl mt-8 leading-relaxed
                   whitespace-pre-line"
        >
          {bio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mt-16 w-full flex justify-center"
        >
          <QuestLog />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10"
        >
          <SocialLinks />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="mt-16 w-full"
        >
          <GithubContributions />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe;
