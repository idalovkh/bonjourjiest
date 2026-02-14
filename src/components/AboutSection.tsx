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
    glow: "shadow-orange-500/20",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-400",
    glowColor: "bg-orange-500/20",
  },
  {
    icon: Rocket,
    title: "Своя платформа",
    desc: "Современная платформа и 4 метода заучивания слов",
    glow: "shadow-sky-500/20",
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
    glowColor: "bg-sky-500/20",
  },
  {
    icon: MessageCircle,
    title: "Учим говорить",
    desc: "Уроки где учатся говорить, а не делать упражнения",
    glow: "shadow-emerald-500/20",
    iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
    glowColor: "bg-emerald-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Cambridge аттестация",
    desc: "Учителя с международными сертификатами",
    glow: "shadow-amber-500/20",
    iconBg: "bg-gradient-to-br from-amber-400 to-yellow-500",
    glowColor: "bg-amber-500/20",
  },
  {
    icon: Zap,
    title: "Первый урок бесплатно",
    desc: "Попробуйте формат обучения без обязательств",
    glow: "shadow-violet-500/20",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    glowColor: "bg-violet-500/20",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-28 sm:py-36 overflow-hidden">
      {/* Dark premium background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[hsl(220,25%,8%)] via-[hsl(220,25%,6%)] to-[hsl(220,25%,8%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(217,91%,60%,0.08),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,hsl(172,66%,50%,0.06),transparent_50%)]" />

      <div className="relative container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-sky-400 mb-4">Преимущества</p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mb-5 tracking-tight">
            Почему{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-teal-400">
              Deshar School
            </span>
          </h2>
          <p className="text-white/50 text-xl leading-relaxed">
            Целый комплекс продуктов, которые гарантируют прогресс
          </p>
        </motion.div>
      </div>

      <motion.div
        className="relative"
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
                <div className={`group relative rounded-3xl p-9 h-full border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:bg-white/[0.06] hover:shadow-2xl ${f.glow}`}>
                  {/* Subtle glow behind card on hover */}
                  <div className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${f.glowColor} blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                  <div className="relative">
                    {/* Icon with glow */}
                    <div className="relative mb-7">
                      <div className={`absolute inset-0 w-16 h-16 rounded-2xl ${f.iconBg} blur-xl opacity-40 group-hover:opacity-60 transition-opacity`} />
                      <div className={`relative w-16 h-16 rounded-2xl ${f.iconBg} flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-300`}>
                        <f.icon size={28} className="text-white" strokeWidth={1.8} />
                      </div>
                    </div>

                    <h3 className="font-display font-bold text-white mb-3 text-xl tracking-tight">{f.title}</h3>
                    <p className="text-base text-white/45 leading-relaxed group-hover:text-white/60 transition-colors duration-300">{f.desc}</p>
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
