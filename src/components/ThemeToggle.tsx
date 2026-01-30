import { useDarkMode } from "../hooks/useDarkMode";
import { MoonIcon } from "../icons/Moon";
import { SunIcon } from "../icons/Sun";
import { useRef } from "react";
import type { MoonIconHandle } from "../icons/Moon";
import type { SunIconHandle } from "../icons/Sun";
import { flushSync } from "react-dom";

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

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const audio = new Audio("/click.wav");
    audio.volume = 0.5;
    audio.play();

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      toggle();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        toggle();
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: clipPath,
        },
        {
          duration: 400,
          easing: "ease-in",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  return (
    <button
      onClick={handleToggle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      className="flex items-center gap-2 px-3 py-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-transform hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-95 shadow-sm cursor-pointer"
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
