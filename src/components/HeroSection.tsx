import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "С 2016", label: "года работаем" },
  { value: "Cambridge", label: "аттестация" },
  { value: "Бесплатно", label: "первый урок" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-16 overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute top-32 right-10 w-[420px] h-[420px] bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-[320px] h-[320px] bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats row — floating like Skyeng */}
        <motion.div
          className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-14"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <span className="block text-2xl sm:text-3xl font-extrabold text-foreground">{s.value}</span>
              <span className="text-sm text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Central hero */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-5 py-1.5 rounded-full text-sm font-semibold mb-6">
              Deshar School — это:
            </div>
          </motion.div>

          <motion.ul
            className="text-base sm:text-lg text-muted-foreground mb-6 space-y-1.5 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <li>• Аттестованные <strong className="text-foreground">Cambridge</strong> учителя</li>
            <li>• Современная платформа и 4 метода заучивания слов</li>
            <li>• Уроки где учатся говорить, а не делать упражнения</li>
          </motion.ul>

          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Научим тебя говорить{" "}
            <span className="text-primary">с нуля</span> за 4 месяца
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground mb-10 max-w-md mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Оставь телеграм и имя для пробного урока
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button asChild size="lg" className="rounded-full text-base px-10 shadow-lg shadow-primary/25">
              <a href="#contact">
                Записаться на бесплатный урок
                <ArrowRight size={18} className="ml-2" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full text-base px-8">
              <a href="#pricing">Узнать цены</a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
