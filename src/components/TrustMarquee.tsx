import { useEffect, useRef } from "react";

const trustItems = [
  "Français standard",
  "Français québécois",
  "DELF",
  "DALF",
  "TCF",
];

const trustItemBase =
  "text-lg sm:text-xl font-bold tracking-wider uppercase select-none";

const trustTextColors = [
  "text-primary",
  "text-tricolor-white",
  "text-secondary",
] as const;

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
    <section className="py-8 sm:py-10 overflow-hidden border-y border-border/60 bg-background">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div ref={trackRef} className="flex items-center gap-12 whitespace-nowrap animate-trust-marquee motion-reduce:animate-none w-max">
          {[...trustItems, ...trustItems, ...trustItems, ...trustItems].map((item, i) => (
            <span key={`${item}-${i}`} className={`${trustItemBase} ${trustTextColors[i % 3]}`}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
