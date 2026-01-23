import { useEffect } from "react";
import { useTimerStore } from "../store/timers.store";

export function useTimer() {
  const tick = useTimerStore((s) => s.tick);

  useEffect(() => {
    const interval = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [tick]);
}
