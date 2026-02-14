import { useEffect, useRef } from "react";

const trustItems = [
  "Cambridge English",
  "IELTS",
  "TOEFL",
  "TESOL",
  "TPEPS",
];

export function TrustMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let position = 0;

    const step = () => {
      position -= 0.5;
      // Reset when first set is fully scrolled
      const halfWidth = el.scrollWidth / 2;
      if (Math.abs(position) >= halfWidth) {
        position = 0;
      }
      el.style.transform = `translateX(${position}px)`;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-8 sm:py-10 overflow-hidden border-y border-border/40 bg-muted/30">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="flex items-center gap-12 whitespace-nowrap will-change-transform"
        >
          {/* Duplicate items twice for seamless loop */}
          {[...trustItems, ...trustItems, ...trustItems, ...trustItems].map((item, i) => (
            <span
              key={i}
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
