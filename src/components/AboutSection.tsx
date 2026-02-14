import { motion } from "framer-motion";
import { Flame, Rocket, MessageCircle, ShieldCheck, Zap } from "lucide-react";

const features = [
  {
    icon: Flame,
    emoji: "🔥",
    title: "С 2016 года",
    desc: "Проверенный опыт и стабильное качество обучения",
    accent: "from-orange-500 to-amber-400",
    bg: "bg-orange-500/5",
  },
  {
    icon: Rocket,
    emoji: "🚀",
    title: "Своя платформа",
    desc: "Современная платформа и 4 метода заучивания слов",
    accent: "from-sky-500 to-blue-500",
    bg: "bg-sky-500/5",
  },
  {
    icon: MessageCircle,
    emoji: "💬",
    title: "Учим говорить",
    desc: "Уроки где учатся говорить, а не делать упражнения",
    accent: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-500/5",
  },
  {
    icon: ShieldCheck,
    emoji: "🏅",
    title: "Cambridge аттестация",
    desc: "Учителя с международными сертификатами",
    accent: "from-amber-500 to-yellow-400",
    bg: "bg-amber-500/5",
  },
  {
    icon: Zap,
    emoji: "⚡",
    title: "Первый урок бесплатно",
    desc: "Попробуйте формат обучения без обязательств",
    accent: "from-violet-500 to-purple-400",
    bg: "bg-violet-500/5",
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className={`group relative rounded-3xl p-8 ${f.bg} border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
                i >= 3 ? "lg:col-span-1 sm:col-span-1" : ""
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {/* Accent gradient line at top */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${f.accent} opacity-60 group-hover:opacity-100 transition-opacity`} />

              {/* Large background emoji */}
              <span className="absolute -bottom-4 -right-2 text-[5rem] opacity-[0.06] select-none pointer-events-none group-hover:opacity-[0.1] transition-opacity duration-500">
                {f.emoji}
              </span>

              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.accent} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                  <f.icon size={26} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-2 text-xl">{f.title}</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
