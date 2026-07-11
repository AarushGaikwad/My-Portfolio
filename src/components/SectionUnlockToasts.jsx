import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DISPLAY_MS = 2200;

/**
 * Finds every element with a `data-unlock-name="..."` attribute (see
 * AboutMe.jsx, SkillsSection.jsx, and future sections) and shows a small
 * "Section Unlocked" toast the first time each one scrolls into view.
 */
const SectionUnlockToasts = () => {
  const [toastText, setToastText] = useState(null);
  const queueRef = useRef([]);
  const seenRef = useRef(new Set());
  const showingRef = useRef(false);

  useEffect(() => {
    const showNext = () => {
      if (queueRef.current.length === 0) {
        showingRef.current = false;
        return;
      }
      showingRef.current = true;
      const next = queueRef.current.shift();
      setToastText(next);

      setTimeout(() => {
        setToastText(null);
        setTimeout(showNext, 300);
      }, DISPLAY_MS);
    };

    const targets = document.querySelectorAll("[data-unlock-name]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const name = entry.target.getAttribute("data-unlock-name");
          if (entry.isIntersecting && !seenRef.current.has(name)) {
            seenRef.current.add(name);
            queueRef.current.push(name);
            if (!showingRef.current) showNext();
          }
        });
      },
      { threshold: 0.35 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {toastText && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 20, x: "-50%" }}
          transition={{ duration: 0.35 }}
          className="fixed bottom-6 left-1/2 z-[90] bg-ink border border-amber
                     rounded-lg px-5 py-3 shadow-[0_0_20px_rgba(217,164,65,0.4)]"
        >
          <p className="font-pixel text-[9px] text-amber mb-1">
            SECTION UNLOCKED
          </p>
          <p className="font-mono text-xs text-paper">{toastText}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionUnlockToasts;