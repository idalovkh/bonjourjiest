import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Мария К.",
    initials: "МК",
    course: "Разговорный английский",
    text: "За 4 месяца я начала свободно общаться с коллегами из-за рубежа. Преподаватель подбирал темы именно под мои задачи.",
  },
  {
    name: "Алексей Д.",
    initials: "АД",
    course: "Подготовка к IELTS",
    text: "Набрал 7.5 на IELTS с первой попытки! Структурированная подготовка и постоянная практика дали результат.",
  },
  {
    name: "Ольга С.",
    initials: "ОС",
    course: "Бизнес-английский",
    text: "Отличная школа! Удобная платформа, классные преподаватели. Занимаюсь уже полгода и вижу огромный прогресс.",
  },
  {
    name: "Игорь В.",
    initials: "ИВ",
    course: "С нуля до B1",
    text: "Начинал с полного нуля, а сейчас смотрю сериалы без субтитров. Групповые занятия — отличная мотивация!",
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Отзывы учеников
          </h2>
          <p className="text-muted-foreground">
            Более 2 000 выпускников уже достигли своих целей
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              className="bg-card rounded-2xl p-6 border border-border"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="text-sm text-foreground mb-4 leading-relaxed">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarFallback className="bg-accent text-accent-foreground text-xs font-bold">
                    {r.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.course}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
