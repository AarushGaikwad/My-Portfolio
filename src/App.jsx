import DodgeGame from "./components/DodgeGame";
import Footer from "./components/Footer";
import InteractiveTerminal from "./components/InteractiveTerminal";
import KonamiEasterEgg from "./components/KonamiEasterEgg";
import NavBar from "./components/NavBar";
import ScrollProgressBar from "./components/ScrollProgressBar";
import SectionUnlockToasts from "./components/SectionUnlockToasts";
import AboutMe from "./sections/AboutMe";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";

export default function App() {
  return (
    <>
      <AboutMe />
      <SkillsSection />
      <ProjectsSection />
      <NavBar />
      <ScrollProgressBar />
      <KonamiEasterEgg />
      <InteractiveTerminal />
      <DodgeGame />
      <SectionUnlockToasts />
      <Footer />
    </>
  );
}
