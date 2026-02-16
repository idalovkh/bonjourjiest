import { useState, useEffect, useRef } from "react";

const THROTTLE_MS = 120;

/**
 * Shared scroll-position hook. Updates are throttled to reduce re-renders and scroll jank.
 */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  const lastRun = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafId.current != null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        const now = Date.now();
        if (now - lastRun.current < THROTTLE_MS) return;
        lastRun.current = now;
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    setScrollY(window.scrollY);
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId.current != null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return scrollY;
}

/**
 * Lock body scroll (e.g. when modals/menus are open).
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [locked]);
}
