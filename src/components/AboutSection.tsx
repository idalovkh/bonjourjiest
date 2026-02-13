import { motion } from "framer-motion";
import { Award, Calendar, Monitor, GraduationCap, Gift } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "С 2016 года",
    desc: "Работаем с 2016 года — проверенный опыт и стабильное качество обучения",
  },
  {
    icon: Monitor,
    title: "Собственная онлайн-платформа",
    desc: "Современная платформа и 4 метода заучивания слов",
  },
  {
    icon: GraduationCap,
    title: "Профессиональные лингвисты",
    desc: "Уроки где учатся говорить, а не делать упражнения",
  },
  {
    icon: Award,
    title: "Аттестованы Кембриджем",
    desc: "Аттестованные Cambridge учителя с международными сертификатами",
  },
  {
    icon: Gift,
    title: "Первый урок — бесплатный",
    desc: "Попробуйте формат обучения без обязательств",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            О школе
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="bg-card rounded-2xl p-6 border border-border hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-4">
                <f.icon size={24} className="text-accent-foreground" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
