import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useTimerStore } from "./timers.store";

/** Convenience accessors for the vanilla store API. */
const store = useTimerStore;

function reset() {
  // Restore the store to its initial default timers before each test.
  store.setState({
    timers: [
      {
        id: "break",
        name: "Break",
        type: "break",
        elapsed: 0,
        running: false,
        lastTickTime: null,
      },
      {
        id: "project",
        name: "Project",
        type: "work",
        elapsed: 0,
        running: true,
        lastTickTime: Date.now(),
      },
    ],
    lastInitDate: new Date().toDateString(),
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date("2026-08-19T10:00:00.000Z"));
  reset();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("startTimer", () => {
  it("marks only the target timer as running and stamps lastTickTime", () => {
    store.getState().startTimer("break");

    const { timers } = store.getState();
    const breakTimer = timers.find((t) => t.id === "break")!;
    const project = timers.find((t) => t.id === "project")!;

    expect(breakTimer.running).toBe(true);
    expect(breakTimer.lastTickTime).toBe(Date.now());
    expect(project.running).toBe(false);
    expect(project.lastTickTime).toBeNull();
  });
});

describe("pauseTimer", () => {
  it("pausing a work timer auto-starts the Break timer", () => {
    store.getState().startTimer("project");
    store.getState().pauseTimer("project");

    const { timers } = store.getState();
    const project = timers.find((t) => t.id === "project")!;
    const breakTimer = timers.find((t) => t.id === "break")!;

    expect(project.running).toBe(false);
    expect(breakTimer.running).toBe(true);
    expect(breakTimer.lastTickTime).toBe(Date.now());
  });

  it("pausing the Break timer stops it without starting anything else", () => {
    store.getState().startTimer("break");
    store.getState().pauseTimer("break");

    const { timers } = store.getState();
    const breakTimer = timers.find((t) => t.id === "break")!;
    const project = timers.find((t) => t.id === "project")!;

    expect(breakTimer.running).toBe(false);
    expect(project.running).toBe(false);
  });

  it("is a no-op when the id does not exist", () => {
    const before = store.getState().timers;
    store.getState().pauseTimer("does-not-exist");
    expect(store.getState().timers).toEqual(before);
  });
});

describe("tick", () => {
  it("accumulates elapsed time using the delta since lastTickTime", () => {
    store.getState().startTimer("project");

    vi.advanceTimersByTime(5000);
    store.getState().tick();

    const project = store.getState().timers.find((t) => t.id === "project")!;
    expect(project.elapsed).toBe(5000);
    expect(project.lastTickTime).toBe(Date.now());
  });

  it("does not advance timers that are not running", () => {
    store.getState().startTimer("project");

    vi.advanceTimersByTime(5000);
    store.getState().tick();

    const breakTimer = store.getState().timers.find((t) => t.id === "break")!;
    expect(breakTimer.elapsed).toBe(0);
  });
});

describe("addTimer", () => {
  it("appends a new, paused timer with a generated id", () => {
    const countBefore = store.getState().timers.length;
    store.getState().addTimer("Reading", "work");

    const { timers } = store.getState();
    expect(timers).toHaveLength(countBefore + 1);

    const added = timers[timers.length - 1];
    expect(added.name).toBe("Reading");
    expect(added.type).toBe("work");
    expect(added.elapsed).toBe(0);
    expect(added.running).toBe(false);
    expect(added.id).toBeTruthy();
  });
});

describe("removeTimer", () => {
  it("removes the timer with the given id", () => {
    store.getState().removeTimer("break");

    const ids = store.getState().timers.map((t) => t.id);
    expect(ids).not.toContain("break");
    expect(ids).toContain("project");
  });
});

describe("renameTimer", () => {
  it("updates only the matching timer's name", () => {
    store.getState().renameTimer("project", "Deep Work");

    const project = store.getState().timers.find((t) => t.id === "project")!;
    const breakTimer = store.getState().timers.find((t) => t.id === "break")!;

    expect(project.name).toBe("Deep Work");
    expect(breakTimer.name).toBe("Break");
  });
});
