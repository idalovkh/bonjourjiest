import { Link } from "react-router-dom";
import { Send, Phone, Mail, Clock } from "lucide-react";
import { BrandName } from "@/components/brand/BrandName";

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
      { label: "Для детей", href: "#pricing" },
    ],
  },
];

const socials = [
  { icon: Send, href: "https://t.me/+79067742949", label: "Telegram" },
];

export function Footer() {
  return (
    <footer className="bg-background border-t border-border" role="contentinfo">
      <div className="container mx-auto py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <BrandName size="md" layout="stacked" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Онлайн-школа французского языка. Аттестован DELF/DALF.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-w-[44px] min-h-[44px] w-11 h-11 rounded-xl bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-200 touch-manipulation"
                  aria-label={s.label}
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {navColumns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground/60 mb-4">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="block py-2.5 min-h-[44px] flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 touch-manipulation -my-2.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-muted-foreground/60 mb-4">
              Контакты
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a href="tel:+79067742949" className="flex items-center gap-2.5 py-2 min-h-[44px] text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation -my-2 whitespace-nowrap">
                  <Phone size={15} className="shrink-0 text-primary" />
                  +7 906 774-29-49
                </a>
              </li>
              <li>
                <a href="mailto:support@bonjourjiest.ru" className="flex items-center gap-2.5 py-2 min-h-[44px] text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation -my-2 whitespace-nowrap">
                  <Mail size={15} className="shrink-0 text-primary" />
                  support@bonjourjiest.ru
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-muted-foreground whitespace-nowrap">
                <Clock size={15} className="shrink-0 text-primary" />
                Пн–Пт, 10:00–20:00
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p className="inline-flex flex-wrap items-baseline justify-center gap-x-1 gap-y-0.5 sm:justify-start">
            <span>© {new Date().getFullYear()}</span>
            <BrandName size="xs" />
            <span>. Все права защищены.</span>
          </p>
          <Link to="/privacy" className="py-2 min-h-[44px] inline-flex items-center hover:text-foreground transition-colors touch-manipulation -my-2">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
