import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const stats = [
  { value: "С 2016", label: "года работаем" },
  { value: "Cambridge", label: "аттестация" },
  { value: "Бесплатно", label: "первый урок" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-24 right-[10%] w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px] -z-10" />
      <div className="absolute bottom-10 left-[5%] w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[100px] -z-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/40 blur-[120px] -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-2 rounded-full text-sm font-semibold mb-8 border border-primary/10">
              <Sparkles size={14} />
              Deshar School — онлайн-школа английского
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-foreground leading-[1.1] mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Научим говорить{" "}
            <span className="gradient-text">с нуля</span>
            <br />
            за 4 месяца
          </motion.h1>

          {/* Features list */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 text-base text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Cambridge учителя
            </span>
            <span className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Своя платформа
            </span>
            <span className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Говорим, а не зубрим
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button asChild size="lg" className="gradient-primary rounded-full text-base px-10 h-14 shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all">
              <a href="#contact">
                Записаться на бесплатный урок
                <ArrowRight size={18} className="ml-2" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-base px-8 h-14 border-2">
              <a href="#pricing">Узнать цены</a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex justify-center gap-6 sm:gap-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-4">
                {i > 0 && <div className="w-px h-10 bg-border hidden sm:block" />}
                <div className="text-center">
                  <span className="block text-xl sm:text-2xl font-extrabold text-foreground">{s.value}</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">{s.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
