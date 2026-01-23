import type { Timer } from "../store/timers.store";
import { computeAnalytics } from "../utils/analytics";
import { formatTime } from "../utils/time";

interface Props {
  timers: Timer[];
}

export default function AnalyticsSummary({ timers }: Props) {
  const analytics = computeAnalytics(timers);
  const workPercent =
    analytics.totalTime === 0
      ? 0
      : Math.round((analytics.workTime / analytics.totalTime) * 100);

  return (
    <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-8 bg-white dark:bg-zinc-900/50 transition-colors duration-300">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Performance Overview
            </h2>
            <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-[0.2em]">
              Data measured today
            </p>
          </div>

          <div className="flex items-center gap-10">
            <Stat
              label="Total Session"
              value={formatTime(analytics.totalTime)}
            />
            <div className="h-4 w-px bg-zinc-400 dark:bg-zinc-700" />
            <Stat label="Work Integrity" value={`${workPercent}%`} highlight />
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-6 border-t border-zinc-400 dark:border-zinc-700">
          <StatMini
            label="Productive"
            value={formatTime(analytics.workTime)}
            color="bg-zinc-900 dark:bg-zinc-100"
          />
          <StatMini
            label="Recovery"
            value={formatTime(analytics.breakTime)}
            color="bg-zinc-400 dark:bg-zinc-600"
          />
          <StatMini
            label="Count"
            value={timers.length.toString()}
            color="bg-zinc-900 dark:bg-zinc-100"
          />
          <StatMini
            label="Avg Session"
            value={formatTime(analytics.totalTime / Math.max(timers.length, 1))}
            color="bg-zinc-400 dark:bg-zinc-600"
          />
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex flex-col items-end md:items-start gap-1">
      <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
        {label}
      </p>
      <p
        className={`text-2xl font-bold tabular-nums ${highlight ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-900 dark:text-zinc-100"}`}
      >
        {value}
      </p>
    </div>
  );
}

function StatMini({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-2">
        <div className={`h-1.5 w-1.5 rounded-full ${color}`} />
        <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
          {label}
        </p>
      </div>
      <p className="text-sm font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
        {value}
      </p>
    </div>
  );
}
