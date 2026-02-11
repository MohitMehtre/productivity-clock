import { useTimerStore, type Timer } from "../store/timers.store";
import { formatTime } from "../utils/time";
import TimerControls from "./TimerControls";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";

export default function TimerCard({ timer }: { timer: Timer }) {
  const removeTimer = useTimerStore((s) => s.removeTimer);
  const renameTimer = useTimerStore((s) => s.renameTimer);
  const serialNumber = timer.id.slice(0, 8).toUpperCase();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(timer.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleRename = () => {
    if (editName.trim()) {
      renameTimer(timer.id, editName.trim());
      setIsEditing(false);
    } else {
      setEditName(timer.name);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRename();
    } else if (e.key === "Escape") {
      setEditName(timer.name);
      setIsEditing(false);
    }
  };

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
          "border bg-white dark:bg-zinc-950/50 backdrop-blur-sm",
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
            <div className="flex items-center gap-2 mb-1 h-6">
              {isEditing ? (
                <input
                  ref={inputRef}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={handleRename}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-b border-zinc-300 dark:border-zinc-700 text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase focus:outline-none focus:border-zinc-900 dark:focus:border-zinc-100 w-full"
                />
              ) : (
                <>
                  <h2 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase">
                    {timer.name}
                  </h2>
                  <div className="flex items-center gap-1">
                    <div className="relative group/edit">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="opacity-0 group-hover:opacity-100 group-hover/edit:opacity-100 transition-opacity text-zinc-300 hover:text-zinc-600 dark:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer p-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max pointer-events-none opacity-0 group-hover/edit:opacity-100 transition-opacity duration-200">
                        <div className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[8px] font-bold uppercase tracking-widest px-2 py-1 relative">
                          Rename_Session
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[3px] border-t-zinc-900 dark:border-t-zinc-100" />
                        </div>
                      </div>
                    </div>

                    <div className="relative group/delete">
                      <button
                        onClick={() => removeTimer(timer.id)}
                        className="opacity-0 group-hover:opacity-100 group-hover/delete:opacity-100 transition-opacity text-zinc-400 hover:text-red-500 dark:text-zinc-600 dark:hover:text-red-400 cursor-pointer p-1.5 flex items-center justify-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        </svg>
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max pointer-events-none opacity-0 group-hover/delete:opacity-100 transition-opacity duration-200">
                        <div className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-[8px] font-bold uppercase tracking-widest px-2 py-1 relative">
                          Delete_Session
                          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[3px] border-t-zinc-900 dark:border-t-zinc-100" />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
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

          <div className="flex items-center gap-2">
            <TimerControls id={timer.id} running={timer.running} />
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] bg-[radial-gradient(circle_at_center,transparent_0%,transparent_100%),linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[20px_20px] -z-10 group-hover:opacity-[0.05] dark:group-hover:opacity-[0.1] transition-opacity" />
      </div>
    </motion.div>
  );
}
