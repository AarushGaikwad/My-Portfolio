import { motion } from "framer-motion";
import TerminalTag from "../components/TerminalTag";
import TypedTagline from "../components/TypedTagline";
import SocialLinks from "../components/SocialLinks";

const bio = `I'm a 2024 graduate with a background in Electronics and
Telecommunication, now building with Java, Spring Boot, and React.
I like taking things apart to understand how they work, then
putting them back together a little better than before.`;

const AboutMe = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-ink flex flex-col items-center
                 justify-center px-6 py-24 text-center"
    >
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
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="mt-10"
      >
        <SocialLinks />
      </motion.div>
    </section>
  );
};

export default AboutMe;
