import { create } from "zustand";

export type TimerType = "break" | "work";

export interface Timer {
  id: string;
  name: string;
  type: TimerType;
  elapsed: number;
  running: boolean;
  lastTickTime: number | null;
}

interface TimerStore {
  timers: Timer[];
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  tick: () => void;
  addTimer: (name: string, type: TimerType) => void;
  removeTimer: (id: string) => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
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

  startTimer: (id) =>
    set((state) => {
      const now = Date.now();

      return {
        timers: state.timers.map((t) => ({
          ...t,
          running: t.id === id,
          lastTickTime: t.id === id ? now : null,
        })),
      };
    }),

  pauseTimer: (id) =>
    set((state) => {
      const paused = state.timers.find((t) => t.id === id);
      if (!paused) return state;

      let timers = state.timers.map((t) =>
        t.id === id
          ? { ...t, running: false, lastTickTime: null }
          : t
      );

      if (paused.type === "work") {
        const now = Date.now();
        timers = timers.map((t) =>
          t.id === "break"
            ? { ...t, running: true, lastTickTime: now }
            : t
        );
      }

      return { timers };
    }),

  tick: () =>
    set((state) => {
      const now = Date.now();

      return {
        timers: state.timers.map((t) => {
          if (!t.running || t.lastTickTime === null) return t;

          const delta = now - t.lastTickTime;

          return {
            ...t,
            elapsed: t.elapsed + delta,
            lastTickTime: now,
          };
        }),
      };
    }),

  addTimer: (name, type) =>
    set((state) => ({
      timers: [
        ...state.timers,
        {
          id: crypto.randomUUID(),
          name,
          type,
          elapsed: 0,
          running: false,
          lastTickTime: null,
        },
      ],
    })),

  removeTimer: (id) =>
    set((state) => ({
      timers: state.timers.filter((t) => t.id !== id),
    })),
}));
