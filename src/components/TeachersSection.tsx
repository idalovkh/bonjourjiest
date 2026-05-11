import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useScrollScrolling } from "@/hooks/use-scroll-scrolling";
import { useHasHover } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { TeacherModal } from "@/components/TeacherModal";
import { teacherCardPhotoImgClassName } from "@/lib/teacher-photo";

const photoLoaders: Record<string, () => Promise<string>> = {
  zubair: () => import("@/assets/teachers/zubair.webp").then((m) => m.default),
  ksenia: () => import("@/assets/teachers/ksenia.webp").then((m) => m.default),
  maryam: () => import("@/assets/teachers/maryam.webp").then((m) => m.default),
  tanzila: () => import("@/assets/teachers/tanzila.webp").then((m) => m.default),
  arina: () => import("@/assets/teachers/arina.webp").then((m) => m.default),
  marianna: () => import("@/assets/teachers/marianna.webp").then((m) => m.default),
  anna: () => import("@/assets/teachers/anna.webp").then((m) => m.default),
  oleg: () => import("@/assets/teachers/oleg.webp").then((m) => m.default),
  gais: () => import("@/assets/teachers/gais.webp").then((m) => m.default),
  zuli: () => import("@/assets/teachers/zuli.webp").then((m) => m.default),
  erik: () => import("@/assets/teachers/erik.webp").then((m) => m.default),
  angelina: () => import("@/assets/teachers/angelina.webp").then((m) => m.default),
};

const teacherConfigs = [
  {
    name: "Зубайр",
    role: "Директор",
    photoKey: "zubair",
    facts: ["Дипломированный переводчик", "Английский, Испанский, Турецкий, Арабский", "МГИМО, Президентская Академия", "Аттестован Кембриджем"],
    bio: "Основатель и директор Deshar School. Дипломированный переводчик, выпускник МГИМО и Президентской Академии. Владеет четырьмя языками и аттестован Кембриджем.",
  },
  {
    name: "Ксения",
    photoKey: "ksenia",
    facts: ["Дипломированный лингвист", "Английский, Немецкий", "Победитель конкурса по методике преподавания", "Любит рисовать"],
    bio: "Дипломированный лингвист со знанием английского и немецкого. Победитель конкурса по методике преподавания. В свободное время увлекается рисованием.",
  },
  {
    name: "Марьям",
    photoKey: "maryam",
    facts: ["Дипломированный лингвист", "Английский, Немецкий", "Обучает детей", "Любит литературу"],
    bio: "Дипломированный лингвист, специализирующийся на обучении детей. Владеет английским и немецким языками. Увлекается литературой.",
  },
  {
    name: "Танзила",
    photoKey: "tanzila",
    facts: ["Дипломированный лингвист", "Английский, Немецкий", "Обучает детей", "Любит читать"],
    bio: "Дипломированный лингвист с опытом обучения детей. Преподаёт английский и немецкий. Любит проводить время за чтением.",
  },
  {
    name: "Арина",
    photoKey: "arina",
    facts: ["Дипломированный педагог", "Преподает в университете", "Готовит к экзаменам", "Фанат хоррор-игр"],
    bio: "Дипломированный педагог, преподаёт в университете. Специализируется на подготовке к экзаменам. Фанат хоррор-игр.",
  },
  {
    name: "Марианна",
    photoKey: "marianna",
    facts: ["Дипломированный педагог", "Аттестована IELTS", "Училась в Барселоне", "Обучает детей"],
    bio: "Дипломированный педагог с аттестацией IELTS. Училась в Барселоне. Специализируется на обучении детей.",
  },
  {
    name: "Анна",
    photoKey: "anna",
    facts: ["Дипломированный педагог", "Готовит к экзаменам", "Аттестована TPEPS", "1 разряд по плаванию"],
    bio: "Дипломированный педагог с аттестацией TPEPS. Готовит учеников к экзаменам. Имеет 1 разряд по плаванию.",
  },
  {
    name: "Олег",
    photoKey: "oleg",
    facts: ["Аттестован Кембриджем", "Учился в Лондоне", "Готовит к экзаменам", "Стреляет из лука"],
    bio: "Аттестован Кембриджем, учился в Лондоне. Специалист по подготовке к экзаменам. В свободное время стреляет из лука.",
  },
  {
    name: "Гайс",
    photoKey: "gais",
    facts: ["Native Speaker", "Английский, Арабский", "Готовит к экзаменам", "Любит читать"],
    bio: "Носитель языка, владеет английским и арабским. Готовит учеников к экзаменам. Увлекается чтением.",
  },
  {
    name: "Зули",
    photoKey: "zuli",
    facts: ["Аттестована TESOL", "Медицинский английский", "Обучает с 2019 года", "Мастер Dungeon and Dragons"],
    bio: "Аттестована TESOL, специализируется на медицинском английском. Обучает с 2019 года. Мастер Dungeon and Dragons.",
  },
  {
    name: "Эрик",
    photoKey: "erik",
    facts: ["Американец — Native Speaker", "Штат Мичиган", "Говорит по-русски", "Фанат футбола"],
    bio: "Носитель английского языка из США, штат Мичиган. Свободно говорит по-русски, помогает ученикам с живой речью и произношением. Увлекается футболом.",
  },
  {
    name: "Ангелина",
    photoKey: "angelina",
    facts: ["Дипломированный лингвист", "Английский, испанский, немецкий", "Профессиональный переводчик", "Фотограф"],
    bio: "Дипломированный лингвист, владеет английским, испанским и немецким. Работает профессиональным переводчиком. В свободное время занимается фотографией.",
  },
];

type TeacherConfig = (typeof teacherConfigs)[number];
type Teacher = TeacherConfig & { photo: string };

export function TeachersSection() {
  const [photos, setPhotos] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<Teacher | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { isScrolling } = useScrollScrolling();
  const hasHover = useHasHover();
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: false })
  );

  useEffect(() => {
    Promise.all(
      Object.entries(photoLoaders).map(([key, loader]) =>
        loader().then((url) => [key, url] as const)
      )
    ).then((pairs) => setPhotos(Object.fromEntries(pairs)));
  }, []);

  // Reset JS-driven tilt when scroll starts so no jump when scroll ends
  useEffect(() => {
    if (!isScrolling) return;
    const root = sectionRef.current;
    if (!root) return;
    root.querySelectorAll<HTMLElement>("[data-suppress-hover-during-scroll]").forEach((el) => {
      el.style.transform = "";
    });
  }, [isScrolling]);

  return (
    <>
      <section ref={sectionRef} id="teachers" className="section-padding bg-muted/40 overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1, margin: "-20px" }}
          >
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
              Наши <span className="gradient-text">преподаватели</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Команда сертифицированных лингвистов с большим опытом
            </p>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: "-20px" }}
          transition={{ duration: 0.6 }}
        >
          <Carousel
            opts={{ align: "center", loop: true, startIndex: 0 }}
            plugins={[autoplayRef.current]}
            className="w-full pb-16 sm:pb-20"
          >
            <CarouselPrevious className="top-auto left-1/2 bottom-2 z-10 -translate-x-14 translate-y-0 h-11 w-11 min-w-[44px] min-h-[44px] touch-manipulation rounded-full border-0 bg-card shadow-lg shadow-foreground/10 text-foreground can-hover:hover:bg-primary can-hover:hover:text-primary-foreground can-hover:hover:shadow-xl transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none" />
            <CarouselNext className="top-auto right-1/2 bottom-2 z-10 translate-x-14 translate-y-0 h-11 w-11 min-w-[44px] min-h-[44px] touch-manipulation rounded-full border-0 bg-card shadow-lg shadow-foreground/10 text-foreground can-hover:hover:bg-primary can-hover:hover:text-primary-foreground can-hover:hover:shadow-xl transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none" />
            <CarouselContent className="-ml-3">
              {teacherConfigs.map((t) => {
                const photo = photos[t.photoKey];
                return (
                <CarouselItem key={t.name} className="pl-3 basis-[260px] sm:basis-[280px]">
                  <article
                    aria-labelledby={`teacher-name-${t.photoKey}`}
                    data-suppress-hover-during-scroll
                    className={`bg-card rounded-2xl border border-border/40 overflow-hidden can-hover:hover:border-primary/20 can-hover:hover:shadow-lg transition-[transform,box-shadow,border-color] duration-300 group h-full flex flex-col ${hasHover ? "teacher-card-perspective" : ""}`}
                    onMouseMove={
                      hasHover
                        ? (e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const x = (e.clientX - rect.left) / rect.width - 0.5;
                            const y = (e.clientY - rect.top) / rect.height - 0.5;
                            e.currentTarget.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale(1.02)`;
                          }
                        : undefined
                    }
                    onMouseLeave={
                      hasHover
                        ? (e) => {
                            e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
                          }
                        : undefined
                    }
                  >
                    <div className="relative min-h-0 shrink-0 overflow-hidden aspect-[3/4] w-full bg-muted/30">
                      {photo ? (
                        <img
                          src={photo}
                          alt={t.name}
                          width={300}
                          height={400}
                          loading="lazy"
                          decoding="async"
                          className={`absolute inset-0 size-full object-cover ${teacherCardPhotoImgClassName(t.photoKey)}`}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-muted/50 animate-pulse" />
                      )}
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 id={`teacher-name-${t.photoKey}`} className="font-display font-bold text-foreground">{t.name}</h3>
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
                        onClick={(e) => {
                          e.stopPropagation();
                          if (photo) setSelected({ ...t, photo });
                        }}
                        disabled={!photo}
                        className="text-xs text-primary mt-3 font-medium hover:underline text-left cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Подробнее →
                      </button>
                    </div>
                  </article>
                </CarouselItem>
              );
              })}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </section>

      <TeacherModal
        teacher={selected}
        onClose={() => setSelected(null)}
      />
    </>
  );
}
