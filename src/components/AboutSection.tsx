import { motion } from "framer-motion";
import { Award, Calendar, Monitor, GraduationCap, Gift } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "С 2016 года",
    desc: "Проверенный опыт и стабильное качество обучения",
    color: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Monitor,
    title: "Своя онлайн-платформа",
    desc: "Современная платформа и 4 метода заучивания слов",
    color: "from-secondary/10 to-secondary/5",
    iconColor: "text-secondary",
  },
  {
    icon: GraduationCap,
    title: "Учим говорить",
    desc: "Уроки где учатся говорить, а не делать упражнения",
    color: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Award,
    title: "Cambridge аттестация",
    desc: "Учителя с международными сертификатами",
    color: "from-secondary/10 to-secondary/5",
    iconColor: "text-secondary",
  },
  {
    icon: Gift,
    title: "Первый урок бесплатно",
    desc: "Попробуйте формат обучения без обязательств",
    color: "from-primary/10 to-primary/5",
    iconColor: "text-primary",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-28 bg-muted/40">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            Добейтесь <span className="gradient-text">реальных результатов</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Целый комплекс продуктов, которые гарантируют прогресс
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="bg-card rounded-2xl p-7 border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <f.icon size={22} className={f.iconColor} />
              </div>
              <h3 className="font-bold text-foreground mb-1.5 text-lg">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
