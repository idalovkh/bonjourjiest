import { Send, Youtube, Instagram, Phone, Mail, Clock, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.webp";

const navColumns = [
  {
    title: "Школа",
    links: [
      { label: "О нас", href: "#about" },
      { label: "Преподаватели", href: "#teachers" },
      { label: "Отзывы", href: "#reviews" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Обучение",
    links: [
      { label: "Групповые занятия", href: "#pricing" },
      { label: "Индивидуально", href: "#pricing" },
      { label: "Пробный урок", href: "#contact" },
    ],
  },
];

const socials = [
  { icon: Send, href: "https://t.me/+79067742949", label: "Telegram" },
  { icon: Youtube, href: "https://www.youtube.com/@desharschool", label: "YouTube" },
  { icon: Instagram, href: "https://www.instagram.com/deshar_school/", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background" role="contentinfo">
      {/* CTA strip */}
      <div className="border-b border-background/10">
        <div className="container mx-auto px-4 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
              Готовы начать говорить на&nbsp;английском?
            </h3>
            <p className="text-background/60 mt-1 text-base">Запишитесь на бесплатный пробный урок</p>
          </div>
          <Button
            asChild
            size="lg"
            className="rounded-full h-13 px-8 text-base font-semibold gradient-primary shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35 hover:-translate-y-0.5 transition-all duration-200 shrink-0"
          >
            <a href="#contact">
              Записаться бесплатно
              <ArrowRight size={18} className="ml-2" />
            </a>
          </Button>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <img src={logo} alt="Deshar School" className="h-9 w-auto brightness-0 invert" />
              <span className="text-base font-bold tracking-tight">Deshar School</span>
            </a>
            <p className="text-sm text-background/50 leading-relaxed mb-6">
              Онлайн-школа английского языка с Cambridge-аттестованными преподавателями. С&nbsp;2016&nbsp;года.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-background/8 hover:bg-background/15 flex items-center justify-center transition-colors duration-200"
                  aria-label={s.label}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {navColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-background/40 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-background/40 mb-4">
              Контакты
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a href="tel:+79067742949" className="flex items-center gap-2.5 text-sm text-background/70 hover:text-background transition-colors">
                  <Phone size={15} className="shrink-0 text-primary" />
                  +7 906 774-29-49
                </a>
              </li>
              <li>
                <a href="mailto:c1esi@mail.ru" className="flex items-center gap-2.5 text-sm text-background/70 hover:text-background transition-colors">
                  <Mail size={15} className="shrink-0 text-primary" />
                  c1esi@mail.ru
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-background/70">
                <Clock size={15} className="shrink-0 text-primary" />
                Пн–Сб, 9:00–21:00
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/40">
          <p>© {new Date().getFullYear()} Deshar School. Все права защищены.</p>
          <a href="/privacy" className="hover:text-background/70 transition-colors">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
