import type { Timer } from "../store/timers.store";

export interface TimerAnalytics {
  totalTime: number;
  workTime: number;
  breakTime: number;
  byTimer: Record<string, number>;
  percentages: Record<string, number>;
}

export function computeAnalytics(
  timers: Timer[]
): TimerAnalytics {
  let totalTime = 0;
  let workTime = 0;
  let breakTime = 0;

  const byTimer: Record<string, number> = {};

  for (const timer of timers) {
    totalTime += timer.elapsed;

    byTimer[timer.name] = timer.elapsed;

    if (timer.type === "work") {
      workTime += timer.elapsed;
    } else {
      breakTime += timer.elapsed;
    }
  }

  const percentages: Record<string, number> = {};

  for (const [name, time] of Object.entries(byTimer)) {
    percentages[name] =
      totalTime === 0
        ? 0
        : Math.round((time / totalTime) * 100);
  }

  return {
    totalTime,
    workTime,
    breakTime,
    byTimer,
    percentages,
  };
}
