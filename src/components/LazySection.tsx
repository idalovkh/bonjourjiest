import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  /** Distance from viewport edge at which children start loading */
  rootMargin?: string;
  className?: string;
}

/**
 * Defers rendering children until the section is within rootMargin of the viewport.
 * Wraps content in a div with content-visibility:auto to skip off-screen paint/layout.
 */
export function LazySection({
  children,
  fallback = null,
  rootMargin = "300px",
  className,
}: LazySectionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
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
    <div ref={wrapperRef} className={className ?? "cv-section"}>
      {shouldRender ? children : fallback}
    </div>
  );
}
