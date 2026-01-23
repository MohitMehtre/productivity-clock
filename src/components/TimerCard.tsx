import type { Timer } from "../store/timers.store";
import { formatTime } from "../utils/time";
import TimerControls from "./TimerControls";

export default function TimerCard({ timer }: { timer: Timer }) {
  return (
    <div
      className={[
        "minimal-card relative flex flex-col justify-between overflow-hidden",
        "min-h-60",
        "rounded-xl p-8 transition-colors duration-300",
        timer.running
          ? "border-zinc-900 dark:border-zinc-100 ring-1 ring-zinc-900 dark:ring-zinc-100 bg-white dark:bg-zinc-900"
          : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50",
      ].join(" ")}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase">
              {timer.name}
            </h2>
          </div>
          <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            {timer.type === "break" ? "Recovery" : "Deep Focus"}
          </span>
        </div>

        <div
          className={[
            "text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-tight transition-colors",
            timer.running
              ? "bg-zinc-900 dark:bg-zinc-100 border-zinc-900 dark:border-zinc-100 text-white dark:text-zinc-900"
              : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400",
          ].join(" ")}
        >
          {timer.running ? "Active" : "Idle"}
        </div>
      </div>

      <div className="my-8">
        <div className="font-mono text-5xl font-medium tracking-tighter tabular-nums text-zinc-900 dark:text-zinc-100">
          {formatTime(timer.elapsed)}
        </div>
        <div className="mt-2 h-0.5 w-8 bg-zinc-900 dark:bg-zinc-100" />
      </div>

      <div className="mt-auto flex items-center justify-between">
        <div className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
          {timer.running ? "Running..." : "Paused"}
        </div>

        <TimerControls id={timer.id} running={timer.running} />
      </div>
    </div>
  );
}
