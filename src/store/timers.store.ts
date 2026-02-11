import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  lastInitDate: string;
  startTimer: (id: string) => void;
  pauseTimer: (id: string) => void;
  tick: () => void;
  addTimer: (name: string, type: TimerType) => void;
  removeTimer: (id: string) => void;
  renameTimer: (id: string, newName: string) => void;
}

const getInitialTimers = (): Timer[] => [
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
];

export const useTimerStore = create<TimerStore>()(
  persist(
    (set) => ({
      timers: getInitialTimers(),
      lastInitDate: new Date().toDateString(),

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

      renameTimer: (id, newName) =>
        set((state) => ({
          timers: state.timers.map((t) =>
            t.id === id ? { ...t, name: newName } : t
          ),
        })),
    }),
    {
      name: "timer-storage",
      merge: (persistedState, currentState) => {
        const state = persistedState as TimerStore | undefined;
        const today = new Date().toDateString();

        if (!state || state.lastInitDate !== today) {
          // Reset if the date has changed or no state exists
          return {
            ...currentState,
            lastInitDate: today,
            timers: getInitialTimers(), // Reset timers to initial state
          };
        }

        return {
          ...currentState,
          ...state,
        };
      },
    }
  )
);
