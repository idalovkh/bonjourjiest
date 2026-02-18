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
    a: "Пробный урок длится 25 минут. За это время преподаватель определит твой уровень, покажет формат занятий и подберёт программу.",
  },
  {
    q: "Нужна ли камера для занятий?",
    a: "Камера желательна, но не обязательна. Занятия проходят на нашей онлайн-платформе, где ты видишь учебные материалы и преподавателя.",
  },
  {
    q: "А если я полный ноль в английском?",
    a: "Мы работаем с любым уровнем — от полного нуля до Advanced. Для начинающих есть специальная программа, где ты заговоришь уже на первых уроках.",
  },
  {
    q: "Можно ли перенести занятие?",
    a: "Да, ты можешь перенести занятие, предупредив за 4 часа. Гибкое расписание — одно из наших преимуществ.",
  },
  {
    q: "Чем вы отличаетесь от других школ?",
    a: "У наших преподавателей есть международные сертификаты и дипломы, подтверждающие высокий уровень владения языком. У нас своя платформа с 4 методами заучивания слов, а главное — мы учим говорить, а не делать упражнения.",
  },
  {
    q: "Как оплачивать занятия?",
    a: "Оплату можно делать онлайн, как из России, так и из-за рубежа. Работаем официально через ИП.",
  },
  {
    q: "Готовите ли вы к экзаменам?",
    a: "Да, у нас большой опыт подготовки к экзаменам. Наши студенты сдают ЕГЭ, ОГЭ, CAE, CPE, IELTS и другие экзамены на высокие баллы и поступают в международные ВУЗы.",
  },
  {
    q: "Какие у вас гарантии?",
    a: "Мы работаем официально, через ИП. Если тебе не понравились уроки, ты можешь оформить возврат в течение недели с момента оплаты.",
  },
  {
    q: "Занимаетесь ли вы с детьми?",
    a: "Мы работаем с детьми от 6 лет и со взрослыми практически любого возраста.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
