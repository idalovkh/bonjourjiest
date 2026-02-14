import { motion } from "framer-motion";
import { Flame, Rocket, MessageCircle, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    icon: Flame,
    title: "С 2016 года",
    desc: "Проверенный опыт и стабильное качество обучения",
    iconBg: "bg-gradient-to-br from-orange-500 to-amber-400",
    span: "sm:col-span-2 lg:col-span-1 lg:row-span-2",
    tall: true,
  },
  {
    icon: Rocket,
    title: "Своя платформа",
    desc: "Современная платформа и 4 метода заучивания слов",
    iconBg: "bg-gradient-to-br from-sky-500 to-blue-600",
    span: "",
    tall: false,
  },
  {
    icon: MessageCircle,
    title: "Учим говорить",
    desc: "Уроки где учатся говорить, а не делать упражнения",
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
    title: "Первый урок бесплатно",
    desc: "Попробуйте формат обучения без обязательств",
    iconBg: "bg-gradient-to-br from-violet-500 to-purple-500",
    span: "sm:col-span-2 lg:col-span-1",
    tall: false,
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto auto-rows-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className={`group relative rounded-3xl bg-card border border-border/60 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/5 ${f.span} ${f.tall ? "p-10 flex flex-col justify-between min-h-[280px]" : "p-8"}`}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
            >
              <div>
                <div className={`w-14 h-14 rounded-2xl ${f.iconBg} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300 ${f.tall ? "mb-8 w-16 h-16" : "mb-6"}`}>
                  <f.icon size={f.tall ? 30 : 26} className="text-white" strokeWidth={1.8} />
                </div>

                <h3 className={`font-display font-bold text-foreground tracking-tight ${f.tall ? "text-2xl mb-4" : "text-xl mb-2"}`}>
                  {f.title}
                </h3>
              </div>
              <p className={`text-muted-foreground leading-relaxed ${f.tall ? "text-lg" : "text-base"}`}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
