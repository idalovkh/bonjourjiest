import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";

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
    <section id="pricing" className="py-28 bg-muted/40">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3 tracking-tight">
            Программы для <span className="gradient-text">любых целей</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Выберите формат, который подходит именно вам
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto items-start">
          {plans.map((p, i) => (
            <motion.div
              key={p.name}
              className={`relative rounded-2xl p-8 ${
                p.popular
                  ? "gradient-primary text-primary-foreground shadow-2xl shadow-primary/20 scale-[1.04] border-0"
                  : "bg-card text-card-foreground border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {p.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                  <Crown size={12} />
                  Популярный
                </span>
              )}
              <h3 className="font-bold text-xl mb-1">{p.name}</h3>
              <p className={`text-sm mb-5 ${p.popular ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {p.period}
              </p>
              <div className="mb-7">
                <span className="text-4xl font-black">
                  {p.price === "0" ? "Бесплатно" : `${p.price} ₽`}
                </span>
              </div>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check size={16} className={`mt-0.5 shrink-0 ${p.popular ? "text-secondary" : "text-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`w-full rounded-full h-12 font-semibold ${
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
