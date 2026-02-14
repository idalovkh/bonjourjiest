import { useState, useEffect, useCallback } from "react";

/**
 * Shared scroll-position hook to avoid duplicate scroll listeners.
 * Returns current scrollY value, updated on every scroll event.
 */
export function useScrollY() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
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
