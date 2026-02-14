import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Алексей",
    text: "Отличная школа! Преподаватели действительно учат говорить, а не просто делать упражнения. За 4 месяца заговорил на английском!",
  },
  {
    name: "Мария",
    text: "Современная платформа и удобные методы заучивания слов. Рекомендую всем, кто хочет выучить английский!",
  },
  {
    name: "Ирина",
    text: "Аттестованные Cambridge учителя — это чувствуется в качестве обучения. Очень довольна результатами!",
  },
  {
    name: "Дмитрий",
    text: "Начинал с нуля, а сейчас свободно общаюсь с иностранными коллегами. Школа работает с 2016 года — опыт виден!",
  },
];

export function ReviewsSection() {
  return (
    <section id="reviews" className="section-padding bg-muted/40">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            Отзывы <span className="gradient-text">учеников</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              className="card-elevated p-7 relative hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
            >
              <Quote size={24} className="text-primary/10 absolute top-5 right-5" />
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={13} className="fill-primary/80 text-primary/80" />
                ))}
              </div>
              <p className="text-sm text-foreground/85 mb-4 leading-relaxed">"{r.text}"</p>
              <p className="text-sm font-semibold text-foreground">{r.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
