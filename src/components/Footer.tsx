import { Send } from "lucide-react";
import logo from "@/assets/logo.webp";

const linkGroups = [
  {
    title: "О нас",
    links: [
      { label: "О школе", href: "#about" },
      { label: "Преподаватели", href: "#teachers" },
      { label: "Отзывы", href: "#reviews" },
    ],
  },
  {
    title: "Обучение",
    links: [
      { label: "Цены", href: "#pricing" },
      { label: "Записаться", href: "#contact" },
      { label: "Бесплатный урок", href: "#contact" },
    ],
  },
  {
    title: "Контакты",
    links: [
      { label: "Telegram", href: "https://t.me/+79067742949", external: true },
      { label: "+7 (906) 774-29-49", href: "tel:+79067742949", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="Deshar School" className="h-9 w-auto invert" />
              <span className="text-lg font-bold tracking-tight">
                Deshar School
              </span>
            </div>
            <p className="text-sm text-background/60 leading-relaxed">
              Онлайн-школа английского языка с Cambridge-аттестованными преподавателями
            </p>
          </div>

          {/* Link groups */}
          {linkGroups.map((g) => (
            <div key={g.title}>
              <h4 className="text-sm font-semibold mb-4 text-background/80">{g.title}</h4>
              <ul className="space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-background/50 hover:text-background transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-background/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-background/40">
          <p>© {new Date().getFullYear()} Deshar School. Все права защищены.</p>
          <a href="/privacy" className="hover:text-background/70 transition-colors">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
