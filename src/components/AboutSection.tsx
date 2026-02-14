import { motion } from "framer-motion";
import { Award, Calendar, Monitor, GraduationCap, Gift } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const features = [
  {
    icon: Calendar,
    title: "С 2016 года",
    desc: "Проверенный опыт и стабильное качество обучения",
  },
  {
    icon: Monitor,
    title: "Своя платформа",
    desc: "Современная платформа и 4 метода заучивания слов",
  },
  {
    icon: GraduationCap,
    title: "Учим говорить",
    desc: "Уроки где учатся говорить, а не делать упражнения",
  },
  {
    icon: Award,
    title: "Cambridge аттестация",
    desc: "Учителя с международными сертификатами",
  },
  {
    icon: Gift,
    title: "Первый урок бесплатно",
    desc: "Попробуйте формат обучения без обязательств",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            Почему <span className="gradient-text">Deshar School</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Целый комплекс продуктов, которые гарантируют прогресс
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {features.map((f, i) => (
                <CarouselItem key={f.title} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="card-elevated p-7 hover:-translate-y-1 transition-all duration-300 group h-full">
                    <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                      <f.icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0 rounded-full border-border" />
              <CarouselNext className="static translate-y-0 rounded-full border-border" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
