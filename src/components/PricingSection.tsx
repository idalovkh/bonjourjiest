import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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

        <div className="grid md:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto items-stretch">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              data-suppress-hover-during-scroll
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col transition-[transform,box-shadow] duration-300 can-hover:hover:-translate-y-1 ${
                p.popular
                  ? "card-elevated border-l-4 border-l-primary"
                  : "card-elevated"
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1, margin: "-20px" }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary/90 text-secondary-foreground text-xs font-semibold px-4 py-1 rounded-full flex items-center gap-1.5">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
