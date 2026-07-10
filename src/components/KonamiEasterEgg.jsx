import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

/**
 * Renders nothing until the visitor types the Konami code, then shows
 * a brief "achievement unlocked" toast. A classic dev-portfolio easter egg.
 */
const KonamiEasterEgg = () => {
  const [progressIndex, setProgressIndex] = useState(0);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const expected = CODE[progressIndex];
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      if (key === expected) {
        const nextIndex = progressIndex + 1;
        if (nextIndex === CODE.length) {
          setUnlocked(true);
          setProgressIndex(0);
          console.log("%cAchievement unlocked: Old-school gamer 🎮", "color:#D9A441; font-weight:bold;");
        } else {
          setProgressIndex(nextIndex);
        }
      } else {
        setProgressIndex(key === CODE[0] ? 1 : 0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [progressIndex]);

  useEffect(() => {
    if (!unlocked) return;
    const timer = setTimeout(() => setUnlocked(false), 4000);
    return () => clearTimeout(timer);
  }, [unlocked]);

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: -20, x: "-50%" }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 left-1/2 z-[100] bg-ink border border-amber
                     rounded-lg px-5 py-3 shadow-[0_0_20px_rgba(217,164,65,0.4)]"
        >
          <p className="font-pixel text-[9px] text-amber mb-1">
            ACHIEVEMENT UNLOCKED
          </p>
          <p className="font-mono text-xs text-paper">
            Old-school gamer — you found the Konami code
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiEasterEgg;