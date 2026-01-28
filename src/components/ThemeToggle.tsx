import { useDarkMode } from "../hooks/useDarkMode";
import { MoonIcon } from "../icons/Moon";
import { SunIcon } from "../icons/Sun";
import { useRef } from "react";
import type { MoonIconHandle } from "../icons/Moon";
import type { SunIconHandle } from "../icons/Sun";

export default function ThemeToggle() {
  const { isDark, toggle } = useDarkMode();
  const moonRef = useRef<MoonIconHandle>(null);
  const sunRef = useRef<SunIconHandle>(null);

  const handleMouseEnter = () => {
    moonRef.current?.startAnimation();
    sunRef.current?.startAnimation();
  };

  const handleMouseLeave = () => {
    moonRef.current?.stopAnimation();
    sunRef.current?.stopAnimation();
  };

  const handleToggle = () => {
    const audio = new Audio("/click.wav");
    audio.volume = 0.5;
    audio.play();
    toggle();
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-transform hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 shadow-sm cursor-pointer"
      aria-label="Toggle Theme"
    >
      <div className="relative w-4 h-4">
        {isDark ? <SunIcon ref={sunRef} /> : <MoonIcon ref={moonRef} />}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">
        {isDark ? "Light" : "Dark"} Mode
      </span>
    </button>
  );
}
