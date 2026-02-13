import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            Наши <span className="gradient-text">преподаватели</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Команда сертифицированных лингвистов с международным опытом
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full max-w-5xl mx-auto"
          >
            <CarouselContent className="-ml-4">
              {teachers.map((t) => (
                <CarouselItem key={t.name} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <div className="bg-card rounded-2xl p-7 border border-border text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group h-full">
                    <Avatar className="w-20 h-20 mx-auto mb-5 text-lg ring-4 ring-accent group-hover:ring-primary/20 transition-all">
                      <AvatarFallback className="gradient-primary text-primary-foreground font-bold text-xl">
                        {t.initials}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-foreground text-lg">{t.name}</h3>
                    <p className="text-sm text-primary font-semibold mb-2">{t.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{t.exp}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-8">
              <CarouselPrevious className="static translate-y-0 rounded-full border-border" />
              <CarouselNext className="static translate-y-0 rounded-full border-border" />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
