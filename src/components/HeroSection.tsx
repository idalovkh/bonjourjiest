import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import emblem from "@/assets/emblem.webp";
import { useIsMobile, useHasHover } from "@/hooks/use-mobile";
import { fadeIn, fadeInDelayed, fadeInLate, fadeInMore, instantTransition, scaleIn } from "@/lib/transitions";

/** Lighter blur on mobile to reduce iOS Safari GPU load */
const bgDecorations = (lightBlur = false) => (
  <>
    <div className={`absolute top-0 right-0 w-[60%] h-[70%] rounded-full bg-accent/60 ${lightBlur ? "blur-[80px]" : "blur-[160px]"}`} />
    <div className={`absolute bottom-0 left-0 w-[40%] h-[50%] rounded-full bg-secondary/5 ${lightBlur ? "blur-[60px]" : "blur-[120px]"}`} />
    <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-primary/20 animate-pulse" />
    <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-secondary/30 animate-pulse delay-700" />
    <div className="absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full bg-primary/10 animate-pulse delay-1000" />
  </>
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const hasHover = useHasHover();
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const transition = reducedMotion ? instantTransition : undefined;

  return (
    <section ref={sectionRef} className="relative min-h-screen min-h-screen-ios flex items-center pt-24 pb-16 overflow-hidden safe-bottom">
      {/* Background: static on mobile or reduced-motion to avoid scroll jank */}
      {isMobile || reducedMotion ? (
        <div className="absolute inset-0 -z-10">{bgDecorations(true)}</div>
      ) : (
        <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>{bgDecorations(false)}</motion.div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.1] mb-5 sm:mb-6 tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition ?? fadeIn}
            >
              Научим тебя говорить по-английски{" "}
              <span className="gradient-text">с нуля</span>
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition ?? fadeInDelayed}
            >
              Английский станет для тебя таким же понятным, как и русский
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition ?? fadeInMore}
            >
              <Button
                asChild
                size="lg"
                className="gradient-primary btn-glow rounded-full text-base sm:text-lg px-8 sm:px-12 min-h-[48px] h-14 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-200 touch-manipulation"
              >
                <a href="#contact">
                  Бесплатный пробный урок
                  <ArrowRight size={20} className="ml-2" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-full text-base sm:text-lg px-8 sm:px-10 min-h-[48px] h-14 text-muted-foreground hover:text-foreground touch-manipulation"
              >
                <a href="#pricing">Узнать цены</a>
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2 sm:gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={transition ?? fadeInLate}
            >
              {[
                "Работаем c 2016 года",
                "Профессиональные лингвисты",
                "1-й урок бесплатный",
              ].map((text, i) => (
                <div key={text} className={`py-2 sm:py-0 ${i === 0 ? "sm:pr-8" : "sm:px-8"} shrink-0 text-center lg:text-left first:pt-0 last:pb-0`}>
                  <span className="block text-base sm:text-lg font-bold text-foreground sm:whitespace-nowrap">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — emblem (no float animation on touch devices / mobile; reduces CPU load) */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={transition ?? scaleIn}
          >
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-br from-primary/15 via-transparent to-secondary/10 blur-3xl" />
              {!hasHover || isMobile || reducedMotion ? (
                <img
                  src={emblem}
                  alt="Deshar School — эмблема"
                  className="relative w-64 sm:w-80 lg:w-[22rem] drop-shadow-2xl"
                  width={352}
                  height={352}
                  fetchPriority="high"
                  decoding="async"
                />
              ) : (
                <motion.img
                  src={emblem}
                  alt="Deshar School — эмблема"
                  className="relative w-64 sm:w-80 lg:w-[22rem] drop-shadow-2xl"
                  width={352}
                  height={352}
                  fetchPriority="high"
                  decoding="async"
                  animate={{
                    y: [0, -14, 0],
                    x: [0, 6, 0, -6, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
