import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  /** Distance from viewport edge at which children start loading */
  rootMargin?: string;
}

/**
 * Defers rendering children until the section is within rootMargin of the viewport.
 * Prevents network requests for off-screen lazy chunks on initial load.
 */
export function LazySection({
  children,
  fallback = null,
  rootMargin = "300px",
}: LazySectionProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    // Fallback for environments without IntersectionObserver (e.g. old WebView)
    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      {shouldRender ? children : fallback}
    </>
  );
}
