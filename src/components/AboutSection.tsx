import { motion } from "framer-motion";
import { Award, Calendar, Monitor, GraduationCap, Gift } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const features = [
  {
    icon: Calendar,
    title: "С 2016 года",
    desc: "Проверенный опыт и стабильное качество обучения",
    gradient: "from-primary/10 to-secondary/10",
  },
  {
    icon: Monitor,
    title: "Своя платформа",
    desc: "Современная платформа и 4 метода заучивания слов",
    gradient: "from-secondary/10 to-primary/10",
  },
  {
    icon: GraduationCap,
    title: "Учим говорить",
    desc: "Уроки где учатся говорить, а не делать упражнения",
    gradient: "from-primary/10 to-accent/30",
  },
  {
    icon: Award,
    title: "Cambridge аттестация",
    desc: "Учителя с международными сертификатами",
    gradient: "from-accent/30 to-secondary/10",
  },
  {
    icon: Gift,
    title: "Первый урок бесплатно",
    desc: "Попробуйте формат обучения без обязательств",
    gradient: "from-secondary/10 to-primary/10",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
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
          plugins={[Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {features.map((f) => (
              <CarouselItem key={f.title} className="pl-3 basis-[280px] sm:basis-[300px]">
                <div className={`bg-gradient-to-br ${f.gradient} rounded-2xl p-8 h-full border border-border/40 hover:border-primary/20 hover:shadow-lg transition-all duration-300 group`}>
                  <div className="w-14 h-14 rounded-xl bg-card flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <f.icon size={26} className="text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-foreground mb-2 text-lg">{f.title}</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">{f.desc}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
}
