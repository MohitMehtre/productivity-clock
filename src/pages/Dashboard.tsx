import TimerCard from "../components/TimerCard";
import { useTimerStore } from "../store/timers.store";
import { useTimer } from "../hooks/useTimer";
import { useState, useRef } from "react";
import AnalyticsSummary from "../components/AnalyticsSummary";
import ThemeToggle from "../components/ThemeToggle";
import { motion, useAnimation } from "motion/react";

export default function Dashboard() {
  useTimer();

  const timers = useTimerStore((s) => s.timers);
  const addTimer = useTimerStore((s) => s.addTimer);
  const controls = useAnimation();

  const [name, setName] = useState("");
  const [type, setType] = useState<"work" | "break">("work");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="min-h-screen selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-20">
        <header className="mb-20 border-b border-zinc-300 dark:border-zinc-800 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="h-1.5 w-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 dark:text-zinc-500">
                Time Tracking System
              </span>
            </div>
            <motion.h1
              className="text-5xl font-bold tracking-tighter mb-6 uppercase text-zinc-900 dark:text-zinc-100 overflow-hidden py-2 -my-2 flex flex-wrap gap-x-[0.2em]"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0 },
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Productivity
              </motion.span>
              <motion.span
                className="inline-block text-zinc-300 dark:text-zinc-700"
                variants={{
                  hidden: { y: "100%" },
                  visible: { y: 0 },
                }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Clock.
              </motion.span>
            </motion.h1>
            <p className="text-zinc-500 dark:text-zinc-400 max-md:max-w-md text-sm leading-relaxed font-medium">
              A minimalist workspace for deep focus. No distractions, just
              precise time management.
            </p>
          </div>
          <ThemeToggle />
        </header>

        <section className="mb-24">
          <AnalyticsSummary timers={timers} />
        </section>

        <section className="mb-24">
          <div className="flex items-end justify-between mb-12">
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-500">
                Active Sessions
              </h2>
              <div className="h-0.5 w-6 bg-zinc-900 dark:bg-zinc-100" />
            </div>

            <div className="hidden md:flex flex-col items-end">
              <span className="text-[9px] font-bold text-zinc-300 dark:text-zinc-600 uppercase tracking-widest">
                System Time
              </span>
              <span className="text-xs font-mono tabular-nums text-zinc-900 dark:text-zinc-100">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {timers.map((t) => (
              <TimerCard key={t.id} timer={t} />
            ))}
          </div>
        </section>

        <section className="max-w-md">
          <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 shadow-lg dark:bg-zinc-900/30">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-6">
              Create New Session
            </h3>
            <div className="flex flex-col gap-6">
              <motion.input
                ref={inputRef}
                animate={controls}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Session Name"
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-4 py-3 text-xs font-medium focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-all placeholder:text-zinc-300 dark:placeholder:text-zinc-700 text-zinc-900 dark:text-zinc-100 w-full"
              />

              <div className="flex flex-col gap-2">
                <label className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                  Session Type
                </label>
                <div className="flex gap-2 relative">
                  {(["work", "break"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setType(t)}
                      className={[
                        "relative flex-1 py-2 text-[10px] font-bold uppercase tracking-widest rounded border transition-all cursor-pointer z-10",
                        type === t
                          ? "border-transparent text-white dark:text-zinc-900"
                          : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600 hover:border-zinc-300 dark:hover:border-zinc-700",
                      ].join(" ")}
                    >
                      {type === t && (
                        <motion.div
                          layoutId="session-pill"
                          className="absolute inset-0 bg-zinc-900 dark:bg-zinc-100 rounded -z-10"
                          transition={{
                            type: "spring",
                            bounce: 0.3,
                            duration: 0.6,
                          }}
                        />
                      )}
                      <span className="relative z-20">
                        {t === "work" ? "Deep Focus" : "Recovery"}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  if (name.trim()) {
                    addTimer(name, type);
                    setName("");
                  } else {
                    inputRef.current?.focus();
                    controls.start({
                      x: [0, -10, 10, -10, 10, 0],
                      transition: { duration: 0.4 },
                    });
                    setTimeout(() => {
                      inputRef.current?.blur();
                    }, 2000);
                  }
                }}
                className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold px-6 py-3 rounded text-[10px] uppercase tracking-widest transition-all hover:bg-black dark:hover:bg-white active:scale-95 cursor-pointer"
              >
                Add Session
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
