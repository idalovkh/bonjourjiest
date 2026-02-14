import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import owlEmblem from "@/assets/owl-emblem.webp";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 pb-16 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[60%] h-[70%] rounded-full bg-accent/60 blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[50%] rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Owl emblem */}
          <motion.img
            src={owlEmblem}
            alt="Deshar School"
            className="mx-auto w-24 sm:w-28 lg:w-32 mb-8 drop-shadow-sm"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
            }}
          />

          {/* Headline */}
          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.1] mb-5 tracking-tight"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Научим говорить{" "}
            <span className="gradient-text">на английском</span>
            <br />
            за 4 месяца
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Cambridge-сертифицированные преподаватели, своя платформа
            и метод, где вы говорите с первого урока
          </motion.p>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-3 mb-20"
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

          {/* Stats - clean horizontal */}
          <motion.div
            className="flex justify-center divide-x divide-border"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[
              { value: "С 2016", label: "года работаем" },
              { value: "Cambridge", label: "аттестация" },
              { value: "1-й урок", label: "бесплатно" },
            ].map((s) => (
              <div key={s.label} className="px-6 sm:px-10 text-center">
                <span className="block text-lg sm:text-xl font-bold text-foreground">{s.value}</span>
                <span className="text-xs text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
