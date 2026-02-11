import { useEffect } from "react";
import { useTimerStore } from "../store/timers.store";
import { setFavicon } from "../utils/favicon";

export function useTimer() {
  const timers = useTimerStore((s) => s.timers);
  const tick = useTimerStore((s) => s.tick);

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);

  useEffect(() => {
    const runningTimer = timers.find((t) => t.running);
    if (runningTimer) {
      const minutes = Math.floor(runningTimer.elapsed / 60000)
        .toString()
        .padStart(2, "0");
      const seconds = Math.floor((runningTimer.elapsed % 60000) / 1000)
        .toString()
        .padStart(2, "0");

      const type = runningTimer.type === 'work' ? 'work' : 'break';
      setFavicon(type);
      document.title = `${minutes}:${seconds} - ${runningTimer.name}`;
    } else {
      setFavicon('default');
      document.title = "Productivity Clock";
    }
  }, [timers]);
}
