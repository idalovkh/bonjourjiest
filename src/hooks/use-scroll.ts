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
 * On iOS, overflow: hidden + overscrollBehavior prevents bounce.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (locked) {
      const prev = document.body.style.overflow;
      const prevOverscroll = document.body.style.overscrollBehavior;
      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "none";
      return () => {
        document.body.style.overflow = prev;
        document.body.style.overscrollBehavior = prevOverscroll;
      };
    }
    return undefined;
  }, [locked]);
}
