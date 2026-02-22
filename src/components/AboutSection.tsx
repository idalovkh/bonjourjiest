import { motion } from "framer-motion";
import { Flame, Rocket, MessageCircle, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "Работаем с 2016 года",
    desc: "У нас богатый опыт. Наши ученики поступают в международные ВУЗы и работают в иностранных компаниях",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-400",
    span: "sm:col-span-2 lg:col-span-1 lg:row-span-2",
    tall: true,
  },
  {
    icon: Rocket,
    title: "Своя платформа",
    desc: "Современная платформа и\n4 метода заучивания слов",
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
    span: "",
    tall: false,
  },
  {
    icon: MessageCircle,
    title: "Разговорный английский",
    desc: "Уроки, на которых учим говорить, а не просто делать грамматические упражнения",
    iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
    span: "",
    tall: false,
  },
  {
    icon: ShieldCheck,
    title: "Cambridge аттестация",
    desc: "Учителя с международными сертификатами",
    iconBg: "bg-gradient-to-br from-amber-400 to-yellow-500",
    span: "lg:col-span-1",
    tall: false,
  },
  {
    icon: Zap,
    title: "Первый урок бесплатный",
    desc: "Попробуй формат обучения без обязательств",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    span: "sm:col-span-2 lg:col-span-1",
    tall: false,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding overflow-hidden pt-28 sm:pt-36 lg:pt-40">
      <div className="container mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Почему <span className="gradient-text">Deshar School</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto auto-rows-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              data-suppress-hover-during-scroll
              className={`group relative rounded-3xl bg-card border border-border/60 overflow-hidden transition-[transform,box-shadow,border-color] duration-300 can-hover:hover:-translate-y-1.5 can-hover:hover:shadow-xl can-hover:hover:shadow-primary/5 ${f.span} ${f.tall ? "p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[260px] sm:min-h-[280px]" : "p-5 sm:p-6 lg:p-8"}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1, margin: "-20px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            >
              <div>
                <div data-suppress-hover-icon className={`w-14 h-14 rounded-2xl ${f.iconBg} flex items-center justify-center shadow-lg can-hover:group-hover:scale-105 transition-[transform] duration-300 ${f.tall ? "mb-8 w-16 h-16" : "mb-6"}`}>
                  <f.icon size={f.tall ? 30 : 26} className="text-white" strokeWidth={1.8} />
                </div>

                <h3 className={`font-display font-bold text-foreground tracking-tight ${f.tall ? "text-2xl mb-4" : "text-xl mb-2"}`}>
                  {f.title}
                </h3>
              </div>
              <p className={`text-muted-foreground leading-relaxed whitespace-pre-line ${f.tall ? "text-lg" : "text-base"}`}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
