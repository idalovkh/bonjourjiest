import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Сколько длится пробный урок?",
    a: "Пробный урок длится 25 минут. За это время преподаватель определит ваш уровень, покажет формат занятий и подберёт программу.",
  },
  {
    q: "Нужна ли камера для занятий?",
    a: "Камера желательна, но не обязательна. Занятия проходят на нашей онлайн-платформе, где вы видите учебные материалы и преподавателя.",
  },
  {
    q: "А если я полный ноль в английском?",
    a: "Мы работаем с любым уровнем — от полного нуля до Advanced. Для начинающих есть специальная программа, где вы заговорите уже на первых уроках.",
  },
  {
    q: "Можно ли перенести занятие?",
    a: "Да, вы можете перенести занятие, предупредив за 4 часа. Гибкое расписание — одно из наших преимуществ.",
  },
  {
    q: "Чем вы отличаетесь от других школ?",
    a: "Все наши преподаватели имеют сертификат Cambridge. У нас своя платформа с 4 методами заучивания слов, а главное — мы учим говорить, а не делать упражнения.",
  },
  {
    q: "Как оплачивать занятия?",
    a: "Оплата помесячная, без длительных обязательств. Принимаем карты, переводы и электронные кошельки.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="section-padding">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Частые <span className="gradient-text">вопросы</span>
          </h2>
          <p className="text-muted-foreground text-xl">
            Ответы на всё, что вы хотели спросить
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card border border-border/60 rounded-2xl px-7 py-1 data-[state=open]:shadow-lg data-[state=open]:border-primary/20 transition-all duration-300 hover:border-primary/10"
              >
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
