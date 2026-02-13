import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const reviews = [
  {
    name: "Ученик",
    initials: "У1",
    text: "Отличная школа! Преподаватели действительно учат говорить, а не просто делать упражнения. За 4 месяца заговорил на английском!",
  },
  {
    name: "Ученик",
    initials: "У2",
    text: "Современная платформа и удобные методы заучивания слов. Рекомендую всем, кто хочет выучить английский!",
  },
  {
    name: "Ученик",
    initials: "У3",
    text: "Аттестованные Cambridge учителя — это чувствуется в качестве обучения. Очень довольна результатами!",
  },
  {
    name: "Ученик",
    initials: "У4",
    text: "Начинал с нуля, а сейчас свободно общаюсь с иностранными коллегами. Школа работает с 2016 года — опыт виден!",
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
            Отзывы наших учеников
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
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
                <p className="text-sm font-medium text-foreground">{r.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
