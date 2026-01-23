import AnalyticsSummary from "./components/AnalyticsSummary";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useTimerStore } from "./store/timers.store";

export default function App() {
  const timers = useTimerStore((s) => s.timers);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/dashboard"
          element={<AnalyticsSummary timers={timers} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
