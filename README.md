# Productivity Clock

A focused, rule-driven productivity timer that tracks **where your time actually goes** — without distractions, gimmicks, or overdesigned UI.

This project enforces intentional work by making **breaks and focus sessions explicit**, helping you analyze and improve how you spend your time.

[Live Demo](https://productivity-timer-mohit.vercel.app/)

---

## Why this project?

Most timer apps let you start and stop anything freely — which makes it easy to **lose discipline** and **misjudge time usage**.

This app is built around **strict rules**:

- You can’t work endlessly without breaks
- Only one task can run at a time
- Breaks are automatic, not optional
- Analytics come from real behavior, not guesses

The goal is **clarity**, not motivation hacks.

---

## Core Concept

The app uses multiple clocks (timers):

- **Break** (mandatory)
- **Project** (mandatory)
- Optional work timers (DSA, Study, Reading, Anime,. etc.)

### Rules enforced by the system

- Only **one timer** can run at a time
- Pausing a **work timer** automatically starts **Break**
- Pausing **Break** requires starting another work timer
- Time is tracked continuously and centrally
- Analytics are derived from real timer data

These rules are enforced in the **state layer**, not the UI.

---

## Tech Stack

- **Vite** – fast dev environment
- **React + TypeScript** – UI and logic
- **Zustand** – global state management
- **Tailwind CSS** – clean, utility-first styling

No backend, no database, no authentication — this is a **focused frontend system**.

---

## Project Structure

```
src/
 ├─ components/        # UI components (TimerCard, Controls, Analytics)
 ├─ hooks/             # Side effects (timer ticking, rules)
 ├─ store/             # Global state (Zustand)
 ├─ utils/             # Pure logic (time formatting, analytics)
 ├─ pages/             # Screens (Dashboard)
 ├─ App.tsx
 └─ main.tsx
```

### Important files

- `timers.store.ts` → single source of truth for all timer logic
- `analytics.ts` → derives insights from raw timer data
- `useTimer.ts` → handles background ticking
- `TimerCard.tsx` → focused, instrument-style UI

---

## State & Architecture

This app follows a clean data flow:

```
Zustand Store → Analytics (derived data) → UI
```

- UI **never mutates state directly**
- All rules live in the store
- Analytics are pure functions
- Components stay dumb and predictable

This makes the app easy to scale and reason about.

---

## Analytics (Current)

The app computes:

- Total tracked time
- Work vs Break time
- Time spent per timer
- Percentage distribution

Analytics update **live** as time passes.

---

## UI Philosophy

The UI is designed to feel like a **tool**, not a lifestyle app:

- clear hierarchy
- strong typography
- calm colors
- structure over decoration

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install

```

### 2. Start the dev server

```bash
npm run dev

```

### 3. Open in browser

```
https://localhost:5173
```

---

## Status

This is a **personal learning + productivity project**.
The focus is on **architecture, correctness, and clarity**, not feature bloat.

---

## 📌 Why this project matters (for me)

This project helped me understand:

- global state management
- enforcing rules through state
- separating logic from UI
- building analytics-driven features
- designing calm, functional interfaces

---

## License

MIT — feel free to fork, learn, and build on top of it.
