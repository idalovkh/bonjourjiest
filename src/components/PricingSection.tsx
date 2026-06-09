import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
} from "@/components/ui/carousel";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Группа",
    subtitle: "Занятия в мини-группе",
    features: [
      "Мини-группа до 7 человек",
      "Круглосуточный доступ к платформе",
      "12 уроков в месяц",
      "Разговорный клуб",
      "Сертифицированные преподаватели",
    ],
    popular: false,
  },
  {
    name: "Индивидуально",
    subtitle: "Уроки 1 на 1 с учителем",
    features: [
      "Гибкое расписание",
      "Круглосуточный доступ к платформе",
      "Возможность переноса занятий",
      "8 уроков в месяц",
      "Сертифицированные преподаватели",
    ],
    popular: true,
  },
  {
    name: "Для детей",
    subtitle: "С 6 лет в игровом формате",
    features: [
      "Уроки с учётом возраста ребёнка",
      "Игровые методики и короткие задания",
      "Мини-группы и индивидуально",
      "Поддержка родителей",
      "Сертифицированные преподаватели",
    ],
    popular: false,
  },
];

const carouselOpts = {
  align: "start" as const,
  loop: true,
  containScroll: "trimSnaps" as const,
};

const carouselItemClassName = "pl-4 basis-full sm:basis-1/2 lg:basis-1/3";

export function PricingSection() {
  return (
    <section id="pricing" className="relative section-padding">
      <div className="container mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Тарифы
          </h2>
          <p className="text-xl text-muted-foreground">
            Выбери удобный для себя формат
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          <Carousel opts={carouselOpts} className="w-full">
            <CarouselContent className="-ml-4 items-stretch py-2">
              {plans.map((p) => (
                <CarouselItem key={p.name} className={`${carouselItemClassName} flex`}>
                  <div
                    data-suppress-hover-during-scroll
                    className={`relative flex h-full w-full flex-col rounded-2xl p-6 sm:p-8 transition-[box-shadow] duration-300 ${
                      p.popular
                        ? "card-elevated border-l-4 border-l-primary"
                        : "card-elevated"
                    }`}
                  >
                    {p.popular && (
                      <span className="mb-4 inline-flex w-fit items-center gap-1.5 self-center rounded-full bg-secondary/90 px-4 py-1 text-xs font-semibold text-secondary-foreground">
                        <Sparkles size={11} />
                        Популярный
                      </span>
                    )}

                    <div className="mb-7">
                      <h3 className="font-display font-bold text-xl">{p.name}</h3>
                      <p className="text-base mt-1 text-muted-foreground">
                        {p.subtitle}
                      </p>
                    </div>

                    <ul className="space-y-3 mb-9 flex-1">
                      {p.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-base">
                          <Check
                            size={17}
                            className={`mt-0.5 shrink-0 ${p.popular ? "text-secondary" : "text-primary"}`}
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <Button
                      asChild
                      className="w-full rounded-full min-h-[48px] h-13 font-semibold text-base touch-manipulation gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      <a href="#contact">Записаться</a>
                    </Button>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselControls />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
