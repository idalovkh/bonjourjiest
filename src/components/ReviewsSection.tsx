import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
    <section id="reviews" className="section-padding bg-muted/40 overflow-hidden">
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
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <Carousel
          opts={{ align: "center", loop: true, dragFree: true }}
          plugins={[Autoplay({ delay: 3500, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {reviews.map((r, i) => (
              <CarouselItem key={i} className="pl-3 basis-[300px] sm:basis-[340px]">
                <div className="bg-card rounded-2xl border border-border/40 p-7 relative hover:border-primary/20 hover:shadow-lg transition-all duration-300 h-full">
                  <Quote size={24} className="text-primary/10 absolute top-5 right-5" />
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={13} className="fill-primary/80 text-primary/80" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/85 mb-4 leading-relaxed">"{r.text}"</p>
                  <p className="text-sm font-semibold text-foreground">{r.name}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </section>
  );
}
