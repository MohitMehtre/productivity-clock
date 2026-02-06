import TimerCard from "../components/TimerCard";
import { useTimerStore } from "../store/timers.store";
import { useTimer } from "../hooks/useTimer";
import { useState, useRef, useEffect } from "react";
import AnalyticsSummary from "../components/AnalyticsSummary";
import ThemeToggle from "../components/ThemeToggle";
import { motion, useAnimation } from "motion/react";
import Footer from "../components/Footer";
import { SystemTime } from "../components/SystemTime";
import BackgroundPattern from "../components/BackgroundPattern";

const PLACEHOLDERS = ["Deep Work", "Project Alpha", "Reading", "Code Review"];

export default function Dashboard() {
  useTimer();

  const timers = useTimerStore((s) => s.timers);
  const addTimer = useTimerStore((s) => s.addTimer);
  const controls = useAnimation();

  const [name, setName] = useState("");
  const [type, setType] = useState<"work" | "break">("work");
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect for placeholder
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    let currentIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const current = PLACEHOLDERS[currentIdx];

      if (isDeleting) {
        setPlaceholder(current.substring(0, charIdx - 1));
        charIdx--;
      } else {
        setPlaceholder(current.substring(0, charIdx + 1));
        charIdx++;
      }

      let typeSpeed = 100;
      if (isDeleting) typeSpeed /= 2;

      if (!isDeleting && charIdx === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        currentIdx = (currentIdx + 1) % PLACEHOLDERS.length;
        typeSpeed = 500;
      }

      timeoutId = setTimeout(type, typeSpeed);
    };

    timeoutId = setTimeout(type, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen selection:bg-zinc-900 selection:text-white dark:selection:bg-zinc-100 dark:selection:text-zinc-900 relative isolate">
      <BackgroundPattern />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
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
              <SystemTime />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {timers.map((t) => (
              <TimerCard key={t.id} timer={t} />
            ))}
          </div>
        </section>

        <section className="max-w-md">
          <div className="relative overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 backdrop-blur-sm p-1">
            <div
              className="absolute top-0 right-0 w-2 h-2 bg-zinc-900 dark:bg-zinc-100"
              style={{ clipPath: "polygon(100% 0, 100% 100%, 0 0)" }}
            />

            <div className="border border-zinc-100 dark:border-zinc-900 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-3 bg-zinc-900 dark:bg-zinc-100" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-900 dark:text-zinc-100">
                  Initialize Session
                </h3>
              </div>

              <div className="flex flex-col gap-8">
                <div className="space-y-2">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 ml-1">
                    01 // Identifier
                  </label>
                  <motion.input
                    ref={inputRef}
                    animate={controls}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={placeholder}
                    className="bg-transparent border-b border-zinc-200 dark:border-zinc-800 rounded-none px-1 py-3 text-xs font-mono focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 transition-[border-color] placeholder:text-zinc-300 dark:placeholder:text-zinc-700 text-zinc-900 dark:text-zinc-100 w-full"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-[8px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 ml-1">
                    02 // Operational_Mode
                  </label>
                  <div className="flex gap-2 p-1 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-900">
                    {(["work", "break"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setType(t)}
                        className={[
                          "relative flex-1 py-2 text-[9px] font-bold uppercase tracking-widest cursor-pointer z-10",
                          type === t
                            ? "text-white dark:text-zinc-900"
                            : "text-zinc-400 hover:text-zinc-800 dark:text-zinc-600 dark:hover:text-zinc-200",
                        ].join(" ")}
                      >
                        {type === t && (
                          <motion.div
                            layoutId="session-pill"
                            className="absolute inset-0 bg-zinc-900 dark:bg-zinc-100"
                            transition={{
                              type: "spring",
                              bounce: 0.2,
                              duration: 0.6,
                            }}
                          />
                        )}
                        <span className="relative z-20">
                          {t === "work" ? "Deep_Focus" : "Recovery"}
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
                    }
                  }}
                  className="mt-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-black px-6 py-4 text-[10px] uppercase tracking-[0.3em] transition-transform hover:bg-black dark:hover:bg-white active:scale-[0.98] cursor-pointer flex items-center justify-center gap-4 group"
                >
                  Create Session
                  <div className="w-1.5 h-1.5 bg-white/30 dark:bg-black/30 rotate-45 group-hover:rotate-90 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
