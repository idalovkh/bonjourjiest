import { useEffect, useRef, useState } from "react";

const SCROLL_START_DELAY_MS = 60;
const SCROLL_END_DEBOUNCE_MS = 150;
const SCROLL_JUST_ENDED_MS = 80;
const CLASS_SCROLLING = "is-scrolling";
const CLASS_JUST_ENDED = "scroll-just-ended";

/**
 * Adds/removes classes on <html> while the user is scrolling and returns current state.
 * - is-scrolling: added after scroll has been ongoing for SCROLL_START_DELAY_MS
 * - scroll-just-ended: added for SCROLL_JUST_ENDED_MS after scroll stops (suppresses transition wave)
 * @returns { isScrolling } – use to reset JS-driven transforms etc. when scroll starts
 */
export function useScrollScrolling() {
  const startTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const endTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const justEndedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollingRef = useRef(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const setScrolling = (value: boolean) => {
      if (scrollingRef.current === value) return;
      scrollingRef.current = value;
      setIsScrolling(value);
      document.documentElement.classList.toggle(CLASS_SCROLLING, value);
      if (!value) {
        document.documentElement.classList.add(CLASS_JUST_ENDED);
        if (justEndedTimerRef.current) clearTimeout(justEndedTimerRef.current);
        justEndedTimerRef.current = setTimeout(() => {
          justEndedTimerRef.current = null;
          document.documentElement.classList.remove(CLASS_JUST_ENDED);
        }, SCROLL_JUST_ENDED_MS);
      }
    };

    const onScroll = () => {
      if (!scrollingRef.current) {
        if (startTimerRef.current) clearTimeout(startTimerRef.current);
        startTimerRef.current = setTimeout(() => {
          startTimerRef.current = null;
          setScrolling(true);
        }, SCROLL_START_DELAY_MS);
      }
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
      endTimerRef.current = setTimeout(() => {
        endTimerRef.current = null;
        setScrolling(false);
      }, SCROLL_END_DEBOUNCE_MS);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (startTimerRef.current) clearTimeout(startTimerRef.current);
      if (endTimerRef.current) clearTimeout(endTimerRef.current);
      if (justEndedTimerRef.current) clearTimeout(justEndedTimerRef.current);
      document.documentElement.classList.remove(CLASS_SCROLLING, CLASS_JUST_ENDED);
    };
  }, []);

  return { isScrolling };
}
