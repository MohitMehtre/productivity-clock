import { useTimerStore } from "../store/timers.store";

interface Props {
  id: string;
  running: boolean;
}

export default function TimerControls({ id, running }: Props) {
  const startTimer = useTimerStore((s) => s.startTimer);
  const pauseTimer = useTimerStore((s) => s.pauseTimer);

  return (
    <button
      onClick={() => (running ? pauseTimer(id) : startTimer(id))}
      className={[
        "relative flex h-10 items-center gap-3 px-4 transition-all duration-300 group/btn cursor-pointer",
        running
          ? "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
          : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border border-zinc-900 dark:border-zinc-100",
      ].join(" ")}
    >
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

      <span className="text-[10px] font-black uppercase tracking-[0.2em]">
        {running ? "STOP" : "START"}
      </span>

      <div className="absolute top-0 right-0 w-1 h-1 bg-zinc-400 dark:bg-zinc-600 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
    </button>
  );
}
