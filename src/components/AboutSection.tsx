import { motion } from "framer-motion";
import { Award, Calendar, Monitor, GraduationCap } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Кембриджская аттестация",
    desc: "Программа обучения соответствует международным стандартам Cambridge Assessment",
  },
  {
    icon: Calendar,
    title: "С 2016 года",
    desc: "8 лет опыта и более 2 000 выпускников, достигших своих целей",
  },
  {
    icon: Monitor,
    title: "Собственная платформа",
    desc: "Удобная онлайн-платформа с интерактивными материалами и прогрессом",
  },
  {
    icon: GraduationCap,
    title: "Профессиональные лингвисты",
    desc: "Все преподаватели — сертифицированные специалисты с опытом от 5 лет",
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
            Почему выбирают нас
          </h2>
          <p className="text-muted-foreground">
            Мы создаём комфортную среду для изучения английского, где каждый
            ученик получает внимание и поддержку
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
