import { motion } from "framer-motion";
import { Flame, Rocket, MessageCircle, ShieldCheck, Zap } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const features = [
  {
    icon: Flame,
    title: "С 2016 года",
    desc: "Проверенный опыт и стабильное качество обучения",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-400",
  },
  {
    icon: Rocket,
    title: "Своя платформа",
    desc: "Современная платформа и 4 метода заучивания слов",
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
  },
  {
    icon: MessageCircle,
    title: "Учим говорить",
    desc: "Уроки где учатся говорить, а не делать упражнения",
    iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
  },
  {
    icon: ShieldCheck,
    title: "Cambridge аттестация",
    desc: "Учителя с международными сертификатами",
    iconBg: "bg-gradient-to-br from-amber-400 to-yellow-500",
  },
  {
    icon: Zap,
    title: "Первый урок бесплатно",
    desc: "Попробуйте формат обучения без обязательств",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Почему <span className="gradient-text">Deshar School</span>
          </h2>
          <p className="text-muted-foreground text-xl">
            Целый комплекс продуктов, которые гарантируют прогресс
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Carousel
          opts={{ align: "center", loop: true, dragFree: true }}
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="w-full"
        >
          <CarouselContent className="-ml-5">
            {features.map((f) => (
              <CarouselItem key={f.title} className="pl-5 basis-[320px] sm:basis-[360px]">
                <div className="group relative rounded-3xl p-9 h-full bg-card border border-border/60 overflow-hidden transition-all duration-400 hover:-translate-y-1">

                  <div className="relative">
                    <div className={`w-16 h-16 rounded-2xl ${f.iconBg} flex items-center justify-center mb-7 shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                      <f.icon size={28} className="text-white" strokeWidth={1.8} />
                    </div>

                    <h3 className="font-display font-bold text-foreground mb-3 text-xl tracking-tight">{f.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
}
