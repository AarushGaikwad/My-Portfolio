import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const GAME_WIDTH = 300;
const GAME_HEIGHT = 360;
const PLAYER_WIDTH = 30;
const PLAYER_HEIGHT = 14;
const PLAYER_SPEED = 5;
const BUG_SIZE = 14;
const GROUND_Y = GAME_HEIGHT - 30;

/**
 * "Dodge the Bug" — a tiny canvas game living inside a floating widget,
 * same open/close pattern as InteractiveTerminal. Move with ArrowLeft/
 * ArrowRight (or A/D); score is how many bugs you let pass safely.
 * All game state lives in a plain ref object (`state`), not React state,
 * because it changes every animation frame — putting that in useState
 * would cause 60 re-renders a second. React state is only used for the
 * bits the UI actually needs to redraw around (score, game-over flag).
 */
const DodgeGame = () => {
  const [open, setOpen] = useState(false);
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!open) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    const state = {
      playerX: GAME_WIDTH / 2 - PLAYER_WIDTH / 2,
      bugs: [],
      keys: {},
      frame: 0,
      spawnTimer: 0,
      speed: 2,
      score: 0,
      over: false,
      animationId: null,
    };

    const restart = () => {
      state.playerX = GAME_WIDTH / 2 - PLAYER_WIDTH / 2;
      state.bugs = [];
      state.frame = 0;
      state.spawnTimer = 0;
      state.speed = 2;
      state.score = 0;
      state.over = false;
      setGameOver(false);
      setScore(0);
    };

    const handleKeyDown = (e) => {
      state.keys[e.key] = true;
      if (state.over && (e.key === "Enter" || e.key === " ")) restart();
    };
    const handleKeyUp = (e) => {
      state.keys[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const loop = () => {
      if (!state.over) {
        state.frame += 1;

        if (state.keys["ArrowLeft"] || state.keys["a"]) state.playerX -= PLAYER_SPEED;
        if (state.keys["ArrowRight"] || state.keys["d"]) state.playerX += PLAYER_SPEED;
        state.playerX = Math.max(0, Math.min(GAME_WIDTH - PLAYER_WIDTH, state.playerX));

        state.spawnTimer -= 1;
        if (state.spawnTimer <= 0) {
          state.bugs.push({ x: Math.random() * (GAME_WIDTH - BUG_SIZE), y: -BUG_SIZE });
          state.spawnTimer = Math.max(18, 50 - Math.floor(state.frame / 200));
        }

        state.speed = 2 + state.frame / 500;

        for (let i = state.bugs.length - 1; i >= 0; i--) {
          const b = state.bugs[i];
          b.y += state.speed;

          const hit =
            b.y + BUG_SIZE > GROUND_Y &&
            b.y < GROUND_Y + PLAYER_HEIGHT &&
            b.x < state.playerX + PLAYER_WIDTH &&
            b.x + BUG_SIZE > state.playerX;

          if (hit) {
            state.over = true;
            setGameOver(true);
            setBest((prev) => Math.max(prev, state.score));
          }

          if (b.y > GAME_HEIGHT) {
            state.bugs.splice(i, 1);
            state.score += 1;
            setScore(state.score);
          }
        }
      }

      ctx.fillStyle = "#12141C";
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      ctx.strokeStyle = "rgba(42,46,56,0.9)";
      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(GAME_WIDTH, GROUND_Y);
      ctx.stroke();

      ctx.fillStyle = "#D9A441";
      ctx.fillRect(state.playerX, GROUND_Y, PLAYER_WIDTH, PLAYER_HEIGHT);

      ctx.fillStyle = "#E4573D";
      for (const b of state.bugs) {
        ctx.fillRect(b.x, b.y, BUG_SIZE, BUG_SIZE);
      }

      if (state.over) {
        ctx.fillStyle = "rgba(18,20,28,0.75)";
        ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        ctx.fillStyle = "#ECE7DC";
        ctx.font = "14px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 8);
        ctx.font = "11px monospace";
        ctx.fillText("Press Enter or Space to retry", GAME_WIDTH / 2, GAME_HEIGHT / 2 + 14);
      }

      state.animationId = requestAnimationFrame(loop);
    };

    state.animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(state.animationId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Dodge the Bug mini-game"
        className="fixed bottom-6 left-6 z-40 font-mono text-lg px-4 py-3
                   rounded-full bg-ink border border-amber text-amber
                   shadow-[0_0_15px_rgba(217,164,65,0.3)]
                   hover:shadow-[0_0_20px_rgba(217,164,65,0.5)]
                   transition-shadow"
      >
        🐞
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 left-6 z-40 bg-ink border border-line
                       rounded-lg shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-line">
              <span className="font-mono text-xs text-slate">
                dodge-the-bug.exe
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close mini-game"
                className="text-slate hover:text-amber font-mono text-xs"
              >
                ✕
              </button>
            </div>

            <canvas ref={canvasRef} className="block" />

            <div className="flex items-center justify-between px-4 py-2 border-t border-line font-mono text-xs text-slate">
              <span>
                Score: <span className="text-amber">{score}</span>
              </span>
              <span>
                Best: <span className="text-amber">{best}</span>
              </span>
            </div>
            <p className="px-4 pb-3 font-mono text-[10px] text-slate">
              ← → or A/D to dodge
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DodgeGame;