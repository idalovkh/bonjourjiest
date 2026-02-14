import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
    bio: "Основатель и директор Deshar School. Дипломированный переводчик, выпускник МГИМО и Президентской Академии. Владеет четырьмя языками и аттестован Кембриджем.",
  },
  {
    name: "Ксения",
    photo: ksenia,
    facts: ["Дипломированный лингвист", "Английский, Немецкий", "Победитель конкурса по методике преподавания", "Любит рисовать"],
    bio: "Дипломированный лингвист со знанием английского и немецкого. Победитель конкурса по методике преподавания. В свободное время увлекается рисованием.",
  },
  {
    name: "Марьям",
    photo: maryam,
    facts: ["Дипломированный лингвист", "Английский, Немецкий", "Обучает детей", "Любит литературу"],
    bio: "Дипломированный лингвист, специализирующийся на обучении детей. Владеет английским и немецким языками. Увлекается литературой.",
  },
  {
    name: "Танзила",
    photo: tanzila,
    facts: ["Дипломированный лингвист", "Английский, Немецкий", "Обучает детей", "Любит читать"],
    bio: "Дипломированный лингвист с опытом обучения детей. Преподаёт английский и немецкий. Любит проводить время за чтением.",
  },
  {
    name: "Арина",
    photo: arina,
    facts: ["Дипломированный педагог", "Преподает в университете", "Готовит к экзаменам", "Фанат хоррор-игр"],
    bio: "Дипломированный педагог, преподаёт в университете. Специализируется на подготовке к экзаменам. Фанат хоррор-игр.",
  },
  {
    name: "Марианна",
    photo: marianna,
    facts: ["Дипломированный педагог", "Аттестована IELTS", "Училась в Барселоне", "Обучает детей"],
    bio: "Дипломированный педагог с аттестацией IELTS. Училась в Барселоне. Специализируется на обучении детей.",
  },
  {
    name: "Анна",
    photo: anna,
    facts: ["Дипломированный педагог", "Готовит к экзаменам", "Аттестована TPEPS", "1 разряд по плаванию"],
    bio: "Дипломированный педагог с аттестацией TPEPS. Готовит учеников к экзаменам. Имеет 1 разряд по плаванию.",
  },
  {
    name: "Олег",
    photo: oleg,
    facts: ["Аттестован Кембриджем", "Учился в Лондоне", "Готовит к экзаменам", "Стреляет из лука"],
    bio: "Аттестован Кембриджем, учился в Лондоне. Специалист по подготовке к экзаменам. В свободное время стреляет из лука.",
  },
  {
    name: "Гайс",
    photo: gais,
    facts: ["Native Speaker", "Английский, Арабский", "Готовит к экзаменам", "Любит читать"],
    bio: "Носитель языка, владеет английским и арабским. Готовит учеников к экзаменам. Увлекается чтением.",
  },
  {
    name: "Зули",
    photo: zuli,
    facts: ["Аттестована TESOL", "Медицинский английский", "Обучает с 2019 года", "Мастер Dungeon and Dragons"],
    bio: "Аттестована TESOL, специализируется на медицинском английском. Обучает с 2019 года. Мастер Dungeon and Dragons.",
  },
];

type Teacher = typeof teachers[number];

function TeacherModal({ teacher, onClose }: { teacher: Teacher; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} />
        <motion.div
          className="relative bg-card rounded-2xl border border-border/60 shadow-2xl max-w-md w-full overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <X size={16} />
          </button>
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={teacher.photo}
              alt={teacher.name}
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-bold text-foreground">{teacher.name}</h3>
            {teacher.role && (
              <p className="text-sm font-semibold text-primary mb-2">{teacher.role}</p>
            )}
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">{teacher.bio}</p>
            <ul className="space-y-1.5">
              {teacher.facts.map((f) => (
                <li key={f} className="text-sm text-foreground/80 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-1.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function TeachersSection() {
  const [selected, setSelected] = useState<Teacher | null>(null);
  

  return (
    <>
      <section id="teachers" className="section-padding bg-muted/40 overflow-hidden">
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
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Carousel
            opts={{ align: "center", loop: true, dragFree: true }}
            plugins={[Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]}
            className="w-full"
          >
            <CarouselContent className="-ml-3">
              {teachers.map((t) => (
                <CarouselItem key={t.name} className="pl-3 basis-[260px] sm:basis-[280px]">
                  <div
                    className="bg-card rounded-2xl border border-border/40 overflow-hidden hover:border-primary/20 hover:shadow-lg transition-all duration-300 group h-full flex flex-col"
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="font-display font-bold text-foreground">{t.name}</h3>
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
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelected(t); }}
                        className="text-xs text-primary mt-3 font-medium hover:underline text-left cursor-pointer"
                      >
                        Подробнее →
                      </button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </section>

      {selected && <TeacherModal teacher={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
