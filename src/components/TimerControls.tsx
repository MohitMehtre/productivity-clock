import { useTimerStore } from "../store/timers.store";
import { motion } from "motion/react";
import { useState } from "react";

interface Props {
  id: string;
  running: boolean;
}

export default function TimerControls({ id, running }: Props) {
  const startTimer = useTimerStore((s) => s.startTimer);
  const pauseTimer = useTimerStore((s) => s.pauseTimer);

  // Bumping this key re-mounts the glitch layers so the burst re-fires.
  const [glitchKey, setGlitchKey] = useState(0);
  const fireGlitch = () => setGlitchKey((k) => k + 1);

  const label = running ? "STOP" : "START";

  const handleClick = () => {
    fireGlitch();
    if (running) pauseTimer(id);
    else startTimer(id);
  };

  return (
    <motion.button
      onClick={handleClick}
      onHoverStart={fireGlitch}
      initial="idle"
      whileHover="active"
      whileTap="tap"
      aria-label={running ? "Stop timer" : "Start timer"}
      aria-pressed={running}
      variants={{
        idle: {},
        active: {},
        tap: { x: [0, -1.5, 1.5, 0], transition: { duration: 0.12 } },
      }}
      className={[
        "relative flex h-10 items-center gap-3 px-4 group/btn cursor-pointer overflow-hidden select-none",
        running
          ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
          : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border border-zinc-900 dark:border-zinc-100",
      ].join(" ")}
    >
      {/* Scanline sweep on hover */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-6 bg-current opacity-0 mix-blend-difference"
        variants={{
          idle: { x: "-200%", opacity: 0 },
          active: {
            x: ["-200%", "400%"],
            opacity: [0, 0.3, 0],
            transition: { duration: 0.5, ease: "linear" },
          },
        }}
      />

      <div className="flex items-center gap-2">
        {running ? (
          <div className="flex gap-0.5">
            <div className="w-1 h-3 bg-current" />
            <div className="w-1 h-3 bg-current" />
          </div>
        ) : (
          <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-10 border-l-current border-b-[6px] border-b-transparent ml-0.5" />
        )}
      </div>

      {/* Glitch text: solid base + two RGB-split clones that jitter on trigger */}
      <span className="relative inline-block text-[10px] font-black uppercase tracking-[0.2em]">
        <span className="relative z-10">{label}</span>
        <motion.span
          key={`cyan-${glitchKey}`}
          aria-hidden="true"
          className="absolute inset-0 text-cyan-400 mix-blend-screen dark:mix-blend-multiply pointer-events-none"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, -2, 1.5, -1, 0],
            y: [0, 1, -1, 0.5, 0],
            opacity: [0.85, 0.85, 0.85, 0.85, 0],
          }}
          transition={{ duration: 0.32, ease: "linear" }}
        >
          {label}
        </motion.span>
        <motion.span
          key={`magenta-${glitchKey}`}
          aria-hidden="true"
          className="absolute inset-0 text-fuchsia-500 mix-blend-screen dark:mix-blend-multiply pointer-events-none"
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{
            x: [0, 2, -1.5, 1, 0],
            y: [0, -1, 1, -0.5, 0],
            opacity: [0.85, 0.85, 0.85, 0.85, 0],
          }}
          transition={{ duration: 0.32, ease: "linear" }}
        >
          {label}
        </motion.span>
      </span>

      {/* Corner tick */}
      <div className="absolute top-0 right-0 w-1 h-1 bg-zinc-400 dark:bg-zinc-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
    </motion.button>
  );
}
