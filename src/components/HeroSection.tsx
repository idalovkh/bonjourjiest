import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/brand/BrandMark";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn, fadeInMore, instantTransition } from "@/lib/transitions";
import { QuizLeadModal } from "@/components/QuizLeadModal";

export function HeroSection() {
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion ? instantTransition : undefined;

  return (
    <section className="relative isolate min-h-screen min-h-screen-ios flex flex-col bg-background pt-24 pb-[calc(5.5rem+max(1rem,env(safe-area-inset-bottom)))] sm:justify-center sm:pb-16 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0 hidden sm:block hero-illustration-bg" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-0 hero-illustration-bg-mobile sm:hidden" aria-hidden />

      <div className="flex-1 min-h-0 sm:hidden" aria-hidden />

      <div className="container relative z-20 mx-auto w-full px-4 shrink-0">
        <div className="w-fit max-w-full lg:max-w-xl xl:max-w-2xl mx-auto lg:mx-0 overflow-hidden rounded-3xl border border-primary/15 tricolor-top shadow-md p-6 sm:p-8 lg:p-10 text-center lg:text-left">
          <motion.div
            className="mb-5 flex w-full justify-center sm:mb-6 lg:justify-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition ?? fadeIn}
          >
            <BrandMark size="lg" layout="stacked" />
          </motion.div>

          <motion.h1
            className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-foreground leading-[1.1] mb-6 sm:mb-8 tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition ?? fadeIn}
          >
            Научим тебя говорить
            <br />
            по-французски
            <br />
            <span className="gradient-text">с нуля</span>
          </motion.h1>

          <motion.div
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition ?? fadeInMore}
          >
            <Button
              asChild
              size="lg"
              className="gradient-primary rounded-full text-base sm:text-lg px-8 sm:px-12 min-h-[48px] h-14 hover:opacity-90 transition-opacity touch-manipulation"
            >
              <a href="#contact">Бесплатный пробный урок</a>
            </Button>
            <QuizLeadModal />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
