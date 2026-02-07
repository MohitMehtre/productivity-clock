import type { Timer } from "../store/timers.store";
import { formatTime } from "../utils/time";
import TimerControls from "./TimerControls";
import { motion, AnimatePresence } from "motion/react";


export default function TimerCard({ timer }: { timer: Timer }) {
  const serialNumber = timer.id.slice(0, 8).toUpperCase();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-full"
    >
      <div
        className={[
          "group relative flex flex-col overflow-hidden h-full",
          "min-h-70",
          "border bg-white dark:bg-zinc-950/50 backdrop-blur-sm transition-all duration-500",
          timer.running
            ? "border-zinc-400 dark:border-zinc-600 shadow-xl shadow-zinc-200/50 dark:shadow-zinc-900/20"
            : "border-zinc-100 dark:border-zinc-800/60 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm",
        ].join(" ")}
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-300 dark:border-zinc-700 m-2 z-10" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-zinc-300 dark:border-zinc-700 m-2 z-10" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-zinc-300 dark:border-zinc-700 m-2 z-10" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-300 dark:border-zinc-700 m-2 z-10" />

        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-50 dark:border-zinc-900/50">
          <div className="flex items-center gap-3">
            <div
              className={[
                "w-1.5 h-1.5 rounded-full",
                timer.running
                  ? "bg-zinc-900 dark:bg-zinc-100 animate-pulse"
                  : "bg-zinc-300 dark:bg-zinc-800",
              ].join(" ")}
            />
            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 dark:text-zinc-500 uppercase">
              REF-{serialNumber}
            </span>
          </div>
          <div
            className={[
              "text-[9px] font-bold px-2 py-0.5 border uppercase tracking-widest",
              timer.running
                ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-900"
                : "bg-transparent border-zinc-200 dark:border-zinc-800 text-zinc-400 dark:text-zinc-600",
            ].join(" ")}
          >
            {timer.running ? "Active" : "Stable"}
          </div>
        </div>

        <div className="flex-1 p-8 flex flex-col">
          <div className="mb-6">
            <h2 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase mb-1">
              {timer.name}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
                Type:
              </span>
              <span className="text-[9px] font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest">
                {timer.type === "break" ? "Recovery" : "Deep Focus"}
              </span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-baseline gap-1">
              <div className="font-mono text-6xl font-light tracking-tighter tabular-nums text-zinc-900 dark:text-zinc-100 flex">
                {formatTime(timer.elapsed)
                  .split("")
                  .map((char, i) => (
                    <span
                      key={i}
                      className="relative inline-flex overflow-hidden"
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={char}
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: "-100%", opacity: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {char}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  ))}
              </div>
              <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase mb-2">
                sec
              </span>
            </div>

            <div className="mt-4 w-full h-px bg-zinc-100 dark:bg-zinc-900 relative overflow-hidden">
              {timer.running && (
                <motion.div
                  className="absolute inset-0 bg-zinc-900 dark:bg-zinc-100"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              )}
              <div
                className={[
                  "absolute inset-0 transition-opacity duration-300 bg-zinc-900 dark:bg-zinc-100",
                  timer.running ? "opacity-20" : "opacity-0",
                ].join(" ")}
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-50/50 dark:bg-zinc-900/20 px-6 py-5 flex items-center justify-between border-t border-zinc-50 dark:border-zinc-900/50">
          <div className="flex flex-col gap-0.5 text-[8px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600">
            <span>Control_IO</span>
            <span
              className={timer.running ? "text-zinc-900 dark:text-zinc-100" : ""}
            >
              {timer.running ? "Timer_Running" : "Idle_State"}
            </span>
          </div>

          <div>
            <TimerControls id={timer.id} running={timer.running} />
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(circle_at_center,transparent_0%,transparent_100%),linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[20px_20px] -z-10 group-hover:opacity-[0.05] dark:group-hover:opacity-[0.1] transition-opacity" />
      </div>
    </motion.div>
  );
}
