import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const teachers = [
  {
    name: "Анна Петрова",
    initials: "АП",
    role: "Старший преподаватель",
    exp: "CELTA, 10 лет опыта. Специализация — разговорный английский и подготовка к IELTS.",
  },
  {
    name: "Дмитрий Козлов",
    initials: "ДК",
    role: "Преподаватель",
    exp: "DELTA, 7 лет опыта. Бизнес-английский и корпоративное обучение.",
  },
  {
    name: "Елена Смирнова",
    initials: "ЕС",
    role: "Преподаватель",
    exp: "TKT, 6 лет опыта. Работа с начинающими и детьми от 10 лет.",
  },
  {
    name: "Михаил Волков",
    initials: "МВ",
    role: "Преподаватель",
    exp: "CELTA, 5 лет опыта. Подготовка к экзаменам Cambridge и TOEFL.",
  },
];

export function TeachersSection() {
  return (
    <section id="teachers" className="py-28">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
            Наши преподаватели
          </h2>
          <p className="text-lg text-muted-foreground">
            Команда сертифицированных лингвистов с международным опытом
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {teachers.map((t, i) => (
            <motion.div
              key={t.name}
              className="bg-card rounded-2xl p-7 border border-border text-center hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Avatar className="w-20 h-20 mx-auto mb-5 text-lg">
                <AvatarFallback className="bg-primary text-primary-foreground font-bold text-xl">
                  {t.initials}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-bold text-foreground text-lg">{t.name}</h3>
              <p className="text-sm text-primary font-semibold mb-2">{t.role}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{t.exp}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
