import { useTimerStore } from "../store/timers.store";

export function useBreakRules() {
  const timers = useTimerStore((s) => s.timers);

  const breakRunning = timers.find((t) => t.type === "break")?.running;
  const anyWorkRunning = timers.some(
    (t) => t.type === "work" && t.running
  );

  return {
    breakRunning,
    anyWorkRunning,
  };
}
