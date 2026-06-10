import { Link } from "react-router-dom";
import { Mail, Clock } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandMark";
import { cn } from "@/lib/utils";

const navColumns = [
  {
    title: "Школа",
    links: [
      { label: "О нас", href: "#about" },
      { label: "Отзывы", href: "#reviews" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Обучение",
    links: [
      { label: "Занятия в паре", href: "#pricing" },
      { label: "Для детей", href: "#pricing" },
    ],
  },
];

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-white border-t border-border", className)} role="contentinfo">
      <div className="container mx-auto py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-5">
              <BrandMark size="lg" layout="stacked" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Онлайн-школа французского языка. Аттестован DELF/DALF.
            </p>
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
                <a href="mailto:support@bonjourjiest.com" className="flex items-center gap-2.5 py-2 min-h-[44px] text-sm text-muted-foreground hover:text-foreground transition-colors touch-manipulation -my-2 whitespace-nowrap">
                  <Mail size={15} className="shrink-0 text-primary" />
                  support@bonjourjiest.com
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
            <a
              href="https://bonjourjiest.com"
              className="font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              bonjourjiest.com
            </a>
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
