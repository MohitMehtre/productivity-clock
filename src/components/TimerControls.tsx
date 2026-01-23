import { useTimerStore } from "../store/timers.store";

interface Props {
    id: string;
    running: boolean;
}

export default function TimerControls({ id, running }: Props) {
    const startTimer = useTimerStore((s) => s.startTimer);
    const pauseTimer = useTimerStore((s) => s.pauseTimer);

    return running ? (
        <button
            onClick={() => pauseTimer(id)}
            className="flex h-9 items-center justify-center rounded border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 text-[10px] font-bold uppercase tracking-widest text-zinc-900 dark:text-zinc-100 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95"
        >
            Pause
        </button>
    ) : (
        <button
            onClick={() => startTimer(id)}
            className="flex h-9 items-center justify-center rounded bg-zinc-900 dark:bg-zinc-100 px-5 text-[10px] font-bold uppercase tracking-widest text-white dark:text-zinc-900 transition-all hover:bg-black dark:hover:bg-white active:scale-95"
        >
            Start
        </button>
    );
}
