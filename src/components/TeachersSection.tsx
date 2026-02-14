import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ksenia from "@/assets/teachers/ksenia.webp";
import maryam from "@/assets/teachers/maryam.webp";
import tanzila from "@/assets/teachers/tanzila.webp";
import arina from "@/assets/teachers/arina.webp";
import marianna from "@/assets/teachers/marianna.webp";
import zubair from "@/assets/teachers/zubair.webp";
import anna from "@/assets/teachers/anna.webp";
import oleg from "@/assets/teachers/oleg.webp";
import gais from "@/assets/teachers/gais.webp";
import zuli from "@/assets/teachers/zuli.webp";

const teachers = [
  {
    name: "Зубайр",
    role: "Директор",
    photo: zubair,
    facts: ["Дипломированный переводчик", "Английский, Испанский, Турецкий, Арабский", "МГИМО, Президентская Академия", "Аттестован Кембриджем"],
  },
  {
    name: "Ксения",
    photo: ksenia,
    facts: ["Дипломированный лингвист", "Английский, Немецкий", "Победитель конкурса по методике преподавания", "Любит рисовать"],
  },
  {
    name: "Марьям",
    photo: maryam,
    facts: ["Дипломированный лингвист", "Английский, Немецкий", "Обучает детей", "Любит литературу"],
  },
  {
    name: "Танзила",
    photo: tanzila,
    facts: ["Дипломированный лингвист", "Английский, Немецкий", "Обучает детей", "Любит читать"],
  },
  {
    name: "Арина",
    photo: arina,
    facts: ["Дипломированный педагог", "Преподает в университете", "Готовит к экзаменам", "Фанат хоррор-игр"],
  },
  {
    name: "Марианна",
    photo: marianna,
    facts: ["Дипломированный педагог", "Аттестована IELTS", "Училась в Барселоне", "Обучает детей"],
  },
  {
    name: "Анна",
    photo: anna,
    facts: ["Дипломированный педагог", "Готовит к экзаменам", "Аттестована TPEPS", "1 разряд по плаванию"],
  },
  {
    name: "Олег",
    photo: oleg,
    facts: ["Аттестован Кембриджем", "Учился в Лондоне", "Готовит к экзаменам", "Стреляет из лука"],
  },
  {
    name: "Гайс",
    photo: gais,
    facts: ["Native Speaker", "Английский, Арабский", "Готовит к экзаменам", "Любит читать"],
  },
  {
    name: "Зули",
    photo: zuli,
    facts: ["Аттестована TESOL", "Медицинский английский", "Обучает с 2019 года", "Мастер Dungeon and Dragons"],
  },
];

export function TeachersSection() {
  return (
    <section id="teachers" className="section-padding bg-muted/40">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
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
                  <div className="card-elevated overflow-hidden hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col">
                    {/* Photo — fills container width */}
                    <div className="relative bg-gradient-to-b from-accent/80 to-muted/40 overflow-hidden aspect-square">
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-bold text-foreground text-lg">{t.name}</h3>
                      {t.role && (
                        <p className="text-xs font-semibold text-primary mb-1">{t.role}</p>
                      )}
                      <ul className="mt-2 space-y-1.5 flex-1">
                        {t.facts.map((f) => (
                          <li key={f} className="text-sm text-muted-foreground leading-snug flex items-start gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary/50 mt-1.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
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
