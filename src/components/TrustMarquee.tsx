import { useEffect, useRef } from "react";

const trustItems = [
  "American English",
  "British English",
  "IELTS",
  "TOEFL",
  "TESOL",
];

export function TrustMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        el.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
      },
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-8 sm:py-10 overflow-hidden border-y border-border/40 bg-muted/30">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex items-center gap-12 whitespace-nowrap animate-trust-marquee w-max">
          {[...trustItems, ...trustItems, ...trustItems, ...trustItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="text-lg sm:text-xl font-bold tracking-wider text-muted-foreground/40 uppercase select-none"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
