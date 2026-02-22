import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(() =>
    typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const legacyMql = mql as MediaQueryList & {
      addListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (this: MediaQueryList, ev: MediaQueryListEvent) => void) => void;
    };
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    if ("addEventListener" in mql) {
      mql.addEventListener("change", onChange);
    } else {
      legacyMql.addListener?.(onChange);
    }

    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => {
      if ("removeEventListener" in mql) {
        mql.removeEventListener("change", onChange);
      } else {
        legacyMql.removeListener?.(onChange);
      }
    };
  }, []);

  return isMobile;
}

/** True when primary input can hover (desktop). False on touch-only devices (e.g. iPhone). Defaults to false to avoid animated content flash on first paint on mobile. */
export function useHasHover() {
  const [hasHover, setHasHover] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia("(hover: hover)");
    const legacyMql = mql as MediaQueryList & {
      addListener?: (listener: () => void) => void;
      removeListener?: (listener: () => void) => void;
    };
    const onChange = () => setHasHover(mql.matches);
    if ("addEventListener" in mql) {
      mql.addEventListener("change", onChange);
    } else {
      legacyMql.addListener?.(onChange);
    }
    setHasHover(mql.matches);
    return () => {
      if ("removeEventListener" in mql) {
        mql.removeEventListener("change", onChange);
      } else {
        legacyMql.removeListener?.(onChange);
      }
    };
  }, []);

  return hasHover;
}
