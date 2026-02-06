import type { Timer } from "../store/timers.store";
import { computeAnalytics } from "../utils/analytics";
import { formatTime } from "../utils/time";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

interface Props {
  timers: Timer[];
}

const TIPS = [
  "Take a break every 25 minutes",
  "Stay hydrated for peak focus",
  "Clear your physical workspace",
  "Review your goals daily",
  "Minimize digital distractions",
  "Stretch your legs often",
  "Practice conscious breathing",
];

export default function AnalyticsSummary({ timers }: Props) {
  const analytics = computeAnalytics(timers);
  const workPercent =
    analytics.totalTime === 0
      ? 0
      : Math.round((analytics.workTime / analytics.totalTime) * 100);

  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((i) => (i + 1) % TIPS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 backdrop-blur-sm p-1">
      <div
        className="absolute top-0 left-0 w-3 h-3 bg-zinc-900 dark:bg-zinc-100"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-3 h-3 bg-zinc-900 dark:bg-zinc-100"
        style={{ clipPath: "polygon(100% 0, 100% 100%, 0 100%)" }}
      />

      <div className="border border-zinc-100 dark:border-zinc-900 p-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-6">
            <div className="space-y-1">
              <div className="display flex">
                <h2 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100 uppercase">
                  Productivity
                </h2>
                <h2 className="text-2xl font-black tracking-tighter text-zinc-900 dark:text-zinc-600 uppercase">
                  .Log
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-0.5 w-4 bg-zinc-900 dark:bg-zinc-100" />
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-[0.3em]">
                  Diagnostic Overview
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <StatItem
                label="Total Runtime"
                value={formatTime(analytics.totalTime)}
                sub="Cumulative delta"
              />
              <StatItem
                label="Work Integrity"
                value={`${workPercent}%`}
                sub="Efficiency rating"
                highlight
              />
            </div>

            {/* Tips Section */}
            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
              <p className="text-[8px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest mb-2">
                System_Encouragement
              </p>
              <div className="h-6 relative overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.p
                    key={tipIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="text-xs font-mono text-zinc-500 dark:text-zinc-400 absolute w-full"
                  >
                    {TIPS[tipIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-px bg-zinc-100 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-900">
            <StatBox
              label="Deep Focus"
              value={formatTime(analytics.workTime)}
              variant="dark"
            />
            <StatBox label="Recovery" value={formatTime(analytics.breakTime)} />
            <StatBox
              label="Total Nodes"
              value={timers.length.toString().padStart(2, "0")}
            />
            <StatBox
              label="Mean Cycle"
              value={formatTime(
                analytics.totalTime / Math.max(timers.length, 1),
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatItem({
  label,
  value,
  sub,
  highlight,
}: {
  label: string;
  value: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div className="space-y-1">
      <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest">
        {label}
      </p>
      <div className="flex items-baseline gap-2">
        <p
          className={`text-4xl font-light tabular-nums tracking-tighter ${highlight ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-500 dark:text-zinc-400"}`}
        >
          {value}
        </p>
      </div>
      <p className="text-[8px] font-bold text-zinc-300 dark:text-zinc-700 uppercase italic">
        // {sub}
      </p>
    </div>
  );
}

function StatBox({
  label,
  value,
  variant,
}: {
  label: string;
  value: string;
  variant?: "dark";
}) {
  return (
    <div
      className={`p-6 bg-white dark:bg-zinc-950 flex flex-col justify-between gap-4 ${variant === "dark" ? "ring-1 ring-inset ring-zinc-900/5 dark:ring-zinc-100/5" : ""}`}
    >
      <div className="flex items-start justify-between">
        <p className="text-[8px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
          {label}
        </p>
        <div
          className={`w-1 h-1 rounded-full ${variant === "dark" ? "bg-zinc-900 dark:bg-zinc-100" : "bg-zinc-200 dark:bg-zinc-800"}`}
        />
      </div>
      <p className="text-xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100 tracking-tight">
        {value}
      </p>
    </div>
  );
}
