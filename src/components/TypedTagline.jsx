import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Types out `text` one character at a time, then leaves a
 * blinking cursor. Respects prefers-reduced-motion by just
 * showing the full text instantly if the user has that set.
 */
const TypedTagline = ({ text, className = "", speed = 40, startDelay = 600 }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setDisplayed(text);
      return;
    }

    let i = 0;
    let intervalId;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) clearInterval(intervalId);
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={className}>
      {displayed}
      <motion.span
        aria-hidden="true"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-amber ml-1 align-middle"
      />
    </span>
  );
};

export default TypedTagline;
