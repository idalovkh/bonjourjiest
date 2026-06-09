import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { sectionTransition } from "@/lib/transitions";
import { Star } from "lucide-react";

/** Заполните name и text для каждого отзыва */
const reviews = [
  { name: "", text: "" },
  { name: "", text: "" },
  { name: "", text: "" },
  { name: "", text: "" },
];

const ReviewCard = memo(function ReviewCard({
  name,
  text,
  className = "",
}: {
  name: string;
  text: string;
  className?: string;
}) {
  return (
    <div
      data-suppress-hover-during-scroll
      className={`shrink-0 w-[280px] max-w-[calc(100vw-2rem)] sm:w-[380px] bg-card rounded-2xl border border-border/40 p-5 sm:p-8 relative can-hover:hover:border-primary/20 can-hover:hover:shadow-lg can-hover:hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300 h-full ${className}`}
    >
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, j) => (
          <Star key={j} size={16} className="fill-primary/80 text-primary/80" />
        ))}
      </div>
      <div className="min-h-[5.5rem] mb-5">
        {text ? (
          <p className="text-base text-foreground/85 leading-relaxed">&ldquo;{text}&rdquo;</p>
        ) : null}
      </div>
      <div className="min-h-[1.5rem]">
        {name ? <p className="text-base font-semibold text-foreground">{name}</p> : null}
      </div>
    </div>
  );
});

export function ReviewsSection() {
  const duplicatedReviews = [...reviews, ...reviews];
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
    <section id="reviews" className="section-padding bg-background overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: "-20px" }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Отзывы <span className="gradient-text">учеников</span>
          </h2>
        </motion.div>
      </div>

      <motion.div
        className="group"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1, margin: "-20px" }}
        transition={sectionTransition}
      >
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-muted/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-muted/40 to-transparent z-10 pointer-events-none" />
          <div className="overflow-hidden">
            <div ref={trackRef} className="flex gap-3 w-max animate-reviews-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
              {duplicatedReviews.map((r, i) => (
                <ReviewCard key={i} name={r.name} text={r.text} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
