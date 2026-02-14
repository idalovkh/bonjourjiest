import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import owlEmblem from "@/assets/owl-emblem.webp";
import heroIllustration from "@/assets/hero-illustration.webp";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 pb-12 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[60%] h-[70%] rounded-full bg-accent/60 blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] rounded-full bg-secondary/5 blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-3 h-3 rounded-full bg-primary/20 animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 rounded-full bg-secondary/30 animate-pulse delay-700" />
        <div className="absolute bottom-1/4 left-1/3 w-4 h-4 rounded-full bg-primary/10 animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — text content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Owl emblem — mobile only */}
            <motion.img
              src={owlEmblem}
              alt="Deshar School"
              className="mx-auto lg:hidden w-20 mb-6 drop-shadow-sm"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            <motion.h1
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-foreground leading-[1.1] mb-5 tracking-tight"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Научим говорить{" "}
              <span className="gradient-text">на английском</span>
              <br />
              за 4 месяца
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Cambridge-сертифицированные преподаватели, своя платформа
              и метод, где вы говорите с первого урока
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 mb-10"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                asChild
                size="lg"
                className="gradient-primary rounded-full text-base px-10 h-13 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-200"
              >
                <a href="#contact">
                  Бесплатный пробный урок
                  <ArrowRight size={17} className="ml-2" />
                </a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="rounded-full text-base px-8 h-13 text-muted-foreground hover:text-foreground"
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
                <div key={s.label} className={`${i === 0 ? 'pr-6 sm:pr-8' : 'px-6 sm:px-8'} text-center lg:text-left`}>
                  <span className="block text-lg sm:text-xl font-bold text-foreground">{s.value}</span>
                  <span className="text-xs text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — illustration */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-xl" />
              <img
                src={heroIllustration}
                alt="Онлайн обучение английскому"
                className="relative w-full max-w-md lg:max-w-lg rounded-3xl"
              />
              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-3 -left-3 bg-card rounded-2xl border border-border/60 shadow-lg px-4 py-3"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <p className="text-xs font-semibold text-foreground">🎓 10 преподавателей</p>
                <p className="text-[10px] text-muted-foreground">готовы начать сегодня</p>
              </motion.div>
              <motion.div
                className="absolute -top-3 -right-3 bg-card rounded-2xl border border-border/60 shadow-lg px-4 py-3"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <p className="text-xs font-semibold text-foreground">⭐ 4.9 / 5</p>
                <p className="text-[10px] text-muted-foreground">средняя оценка</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
