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
    a: "Пробный урок длится 25 минут. За это время преподаватель познакомится с тобой, определит уровень и покажет, как проходят занятия.",
  },
  {
    q: "Нужна ли камера для занятий?",
    a: "Камера желательна, но не обязательна. Главное, чтобы тебе было комфортно заниматься и участвовать в уроке.",
  },
  {
    q: "А если я полный ноль во французском?",
    a: "Это нормально. Мы занимаемся с учениками с любого уровня и спокойно ведём от самых основ к уверенной разговорной практике.",
  },
  {
    q: "Можно ли перенести занятие?",
    a: "Да, занятие можно перенести, если предупредить заранее. Мы стараемся подстраивать расписание под твой ритм.",
  },
  {
    q: "Чем вы отличаетесь от других школ?",
    a: "Мы делаем упор на живую речь, понятные объяснения и регулярную практику. На уроках ты не просто учишь правила, а постепенно начинаешь говорить.",
  },
  {
    q: "Как оплачивать занятия?",
    a: "Оплата проходит онлайн. Подходящий способ оплаты можно обсудить перед началом занятий.",
  },
  {
    q: "Готовите ли вы к экзаменам?",
    a: "Да, готовим к DELF, DALF, TCF, TEF и другим экзаменам. Разбираем формат, тренируем задания и работаем над тем, что нужно именно тебе.",
  },
  {
    q: "Какие у вас гарантии?",
    a: "Если формат занятий тебе не подойдёт, мы обсудим ситуацию и найдём честное решение.",
  },
  {
    q: "Занимаетесь ли вы с детьми?",
    a: "Да, занимаемся с детьми от 6 лет. Уроки проходят индивидуально, в спокойном темпе и с заданиями по возрасту.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: "-20px" }}
        >
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Частые <span className="gradient-text">вопросы</span>
          </h2>
          <p className="text-muted-foreground text-xl">
            Ответы на всё, что ты хотел спросить
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1, margin: "-20px" }}
          transition={{ delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={faq.q}
                value={`faq-${i}`}
                data-suppress-hover-during-scroll
                className="bg-card border border-border/60 rounded-2xl px-7 py-1 data-[state=open]:shadow-lg data-[state=open]:border-primary/20 transition-[box-shadow,border-color] duration-300 can-hover:hover:border-primary/10"
              >
                <AccordionTrigger className="text-base sm:text-lg font-semibold text-foreground hover:no-underline py-4 sm:py-5 min-h-[48px] touch-manipulation">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-5 whitespace-pre-line">
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
