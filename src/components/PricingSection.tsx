import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Уроки в группе",
    price: "6 490",
    period: "месяц занятий",
    features: [
      "Занятия в мини-группе",
      "Доступ к онлайн-платформе",
      "Домашние задания с проверкой",
      "Сертифицированные преподаватели",
    ],
    popular: false,
  },
  {
    name: "Индивидуальные уроки",
    price: "13 600",
    period: "месяц занятий",
    features: [
      "Персональная программа",
      "Гибкое расписание",
      "Доступ к онлайн-платформе",
      "Индивидуальный подход",
      "Сертифицированные преподаватели",
    ],
    popular: true,
  },
  {
    name: "Первый урок",
    price: "0",
    period: "Бесплатный",
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
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Цены
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              className={`relative rounded-2xl p-8 border ${
                p.popular
                  ? "bg-primary text-primary-foreground border-primary shadow-xl scale-105"
                  : "bg-card text-card-foreground border-border"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Популярный
                </span>
              )}
              <h3 className="font-display font-bold text-xl mb-1">{p.name}</h3>
              <p className={`text-sm mb-4 ${p.popular ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {p.period}
              </p>
              <div className="mb-6">
                <span className="font-display text-4xl font-extrabold">
                  {p.price === "0" ? "Бесплатно" : `${p.price} руб.`}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check size={16} className="mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="w-full"
                variant={p.popular ? "secondary" : "default"}
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
