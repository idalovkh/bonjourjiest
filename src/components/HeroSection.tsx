import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-0 w-72 h-72 bg-secondary/10 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
              Deshar School – это:
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <ul className="text-base sm:text-lg text-muted-foreground mb-6 space-y-2">
              <li>• Аттестованные <strong className="text-foreground">Cambridge</strong> учителя</li>
              <li>• Современная платформа и 4 метода заучивания слов</li>
              <li>• Уроки где учатся говорить, а не делать упражнения</li>
            </ul>
          </motion.div>

          <motion.h1
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Научим тебя говорить{" "}
            <span className="text-primary">с нуля</span> за 4 месяца
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-xl mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Оставь телеграм и имя для пробного урока
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button asChild size="lg" className="text-base px-8">
              <a href="#contact">
                Записаться на бесплатный урок
                <ArrowRight size={18} className="ml-2" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base">
              <a href="#pricing">Узнать цены</a>
            </Button>
          </motion.div>

          <motion.div
            className="flex items-center gap-8 mt-12 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div>
              <span className="block font-display text-2xl font-bold text-foreground">С 2016</span>
              года работаем
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <span className="block font-display text-2xl font-bold text-foreground">Cambridge</span>
              аттестация
            </div>
            <div className="w-px h-10 bg-border" />
            <div>
              <span className="block font-display text-2xl font-bold text-foreground">Бесплатно</span>
              первый урок
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
