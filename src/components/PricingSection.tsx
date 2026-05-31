import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Группа",
    subtitle: "Занятия в мини-группе",
    price: "9 900",
    period: "/мес",
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
    price: "13 600",
    period: "/мес",
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
    name: "Пробный урок",
    subtitle: "Знакомство со школой",
    price: "0",
    period: "",
    features: [
      "Знакомство с преподавателем",
      "Определение уровня",
      "Подбор программы",
      "Без обязательств",
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
              className={`relative rounded-2xl p-6 sm:p-8 lg:p-9 flex flex-col transition-[transform,box-shadow] duration-300 can-hover:hover:-translate-y-1 ${
                p.popular
                  ? "gradient-primary text-primary-foreground ring-2 ring-primary/20 shadow-xl shadow-primary/15 can-hover:hover:shadow-2xl can-hover:hover:shadow-primary/25"
                  : "card-elevated"
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1, margin: "-20px" }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-semibold px-4 py-1 rounded-full flex items-center gap-1.5 shadow-md">
                  <Sparkles size={11} />
                  Популярный
                </span>
              )}

              <div className="mb-7">
                <h3 className="font-display font-bold text-xl">{p.name}</h3>
                <p className={`text-base ${p.popular ? "text-primary-foreground/65" : "text-muted-foreground"}`}>
                  {p.subtitle}
                </p>
              </div>

              <div className="mb-7">
                <span className="text-4xl font-extrabold font-display">
                  {p.price === "0" ? "Бесплатно" : `${p.price} ₽`}
                </span>
                {p.period && (
                  <span className={`text-base ${p.popular ? "text-primary-foreground/65" : "text-muted-foreground"}`}>
                    {p.period}
                  </span>
                )}
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
                className={`w-full rounded-full min-h-[48px] h-13 font-semibold text-base touch-manipulation ${
                  p.popular
                    ? "bg-white text-primary hover:bg-white/90"
                    : "gradient-primary text-primary-foreground"
                }`}
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
