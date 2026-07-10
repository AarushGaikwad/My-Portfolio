import Footer from "./components/Footer";
import InteractiveTerminal from "./components/InteractiveTerminal";
import KonamiEasterEgg from "./components/KonamiEasterEgg";
import NavBar from "./components/NavBar";
import ScrollProgressBar from "./components/ScrollProgressBar";
import AboutMe from "./sections/AboutMe";
import SkillsSection from "./sections/SkillsSection";

export default function App() {
  return (
    <>
      <AboutMe />
      <SkillsSection />
      <NavBar />
      <ScrollProgressBar />
      <KonamiEasterEgg />
      <InteractiveTerminal />
      <Footer />
    </>
  );
}
