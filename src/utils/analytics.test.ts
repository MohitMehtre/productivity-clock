import { describe, it, expect } from "vitest";
import { computeAnalytics } from "./analytics";
import type { Timer } from "../store/timers.store";

function makeTimer(overrides: Partial<Timer> = {}): Timer {
  return {
    id: crypto.randomUUID(),
    name: "Timer",
    type: "work",
    elapsed: 0,
    running: false,
    lastTickTime: null,
    ...overrides,
  };
}

describe("computeAnalytics", () => {
  it("returns all zeros for an empty list", () => {
    const result = computeAnalytics([]);

    expect(result).toEqual({
      totalTime: 0,
      workTime: 0,
      breakTime: 0,
      byTimer: {},
      percentages: {},
    });
  });

  it("sums total, work, and break time", () => {
    const timers: Timer[] = [
      makeTimer({ name: "Project", type: "work", elapsed: 3000 }),
      makeTimer({ name: "Break", type: "break", elapsed: 1000 }),
    ];

    const result = computeAnalytics(timers);

    expect(result.totalTime).toBe(4000);
    expect(result.workTime).toBe(3000);
    expect(result.breakTime).toBe(1000);
  });

  it("records per-timer elapsed keyed by name", () => {
    const timers: Timer[] = [
      makeTimer({ name: "Project", type: "work", elapsed: 3000 }),
      makeTimer({ name: "Break", type: "break", elapsed: 1000 }),
    ];

    const result = computeAnalytics(timers);

    expect(result.byTimer).toEqual({ Project: 3000, Break: 1000 });
  });

  it("computes rounded percentages that reflect each timer's share", () => {
    const timers: Timer[] = [
      makeTimer({ name: "Project", type: "work", elapsed: 3000 }),
      makeTimer({ name: "Break", type: "break", elapsed: 1000 }),
    ];

    const result = computeAnalytics(timers);

    expect(result.percentages).toEqual({ Project: 75, Break: 25 });
  });

  it("uses 0% for every timer when total time is zero", () => {
    const timers: Timer[] = [
      makeTimer({ name: "Project", type: "work", elapsed: 0 }),
      makeTimer({ name: "Break", type: "break", elapsed: 0 }),
    ];

    const result = computeAnalytics(timers);

    expect(result.percentages).toEqual({ Project: 0, Break: 0 });
  });

  it("collapses timers that share a name (last one wins for byTimer)", () => {
    const timers: Timer[] = [
      makeTimer({ name: "Focus", type: "work", elapsed: 1000 }),
      makeTimer({ name: "Focus", type: "work", elapsed: 2000 }),
    ];

    const result = computeAnalytics(timers);

    // totalTime still counts both, but byTimer collapses by name
    expect(result.totalTime).toBe(3000);
    expect(result.byTimer).toEqual({ Focus: 2000 });
  });
});
