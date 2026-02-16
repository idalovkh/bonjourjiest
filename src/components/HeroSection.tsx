import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import emblem from "@/assets/emblem.webp";
import { useIsMobile } from "@/hooks/use-mobile";

const bgDecorations = (
  <>
    <div className="absolute top-0 right-0 w-[60%] h-[70%] rounded-full bg-accent/60 blur-[160px]" />
    <div className="absolute bottom-0 left-0 w-[40%] h-[50%] rounded-full bg-secondary/5 blur-[120px]" />
    <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-primary/20 animate-pulse" />
    <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-secondary/30 animate-pulse delay-700" />
    <div className="absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full bg-primary/10 animate-pulse delay-1000" />
  </>
);

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] flex items-center pt-24 pb-16 overflow-hidden safe-bottom">
      {/* Background: static on mobile to avoid scroll jank, parallax on desktop */}
      {isMobile ? (
        <div className="absolute inset-0 -z-10">{bgDecorations}</div>
      ) : (
        <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>{bgDecorations}</motion.div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-foreground leading-[1.1] mb-5 sm:mb-6 tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Английский станет для тебя таким же{" "}
              <span className="gradient-text">лёгким и понятным</span>, как и русский
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Cambridge-сертифицированные преподаватели, своя платформа
              и метод, где ты заговоришь с первого урока
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
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
              className="flex justify-center lg:justify-start divide-x divide-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {[
                { value: "С 2016", label: "года работаем" },
                { value: "Cambridge", label: "аттестация" },
                { value: "1-й урок", label: "бесплатно" },
              ].map((s, i) => (
                <div key={s.label} className={`${i === 0 ? 'pr-8 sm:pr-10' : 'px-8 sm:px-10'} text-center lg:text-left`}>
                  <span className="block text-xl sm:text-2xl font-bold text-foreground">{s.value}</span>
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — emblem (no float animation on mobile to reduce jank) */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 scale-110 rounded-full bg-gradient-to-br from-primary/15 via-transparent to-secondary/10 blur-3xl" />
              {isMobile ? (
                <img
                  src={emblem}
                  alt="Deshar School — эмблема"
                  className="relative w-64 sm:w-80 lg:w-[22rem] drop-shadow-2xl"
                />
              ) : (
                <motion.img
                  src={emblem}
                  alt="Deshar School — эмблема"
                  className="relative w-64 sm:w-80 lg:w-[22rem] drop-shadow-2xl"
                  animate={{
                    y: [0, -14, 0],
                    x: [0, 6, 0, -6, 0],
                    rotate: [0, 2, 0, -2, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
