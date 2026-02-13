import { Send } from "lucide-react";
import logo from "@/assets/logo.webp";

export function Footer() {
  return (
    <footer className="bg-muted/50 py-10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Main row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Deshar School" className="h-8 w-auto" />
            <span className="text-base font-bold text-foreground tracking-tight">
              Deshar School
            </span>
          </div>

          {/* Nav links row */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">О школе</a>
            <a href="#teachers" className="hover:text-foreground transition-colors">Преподаватели</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Цены</a>
            <a href="#reviews" className="hover:text-foreground transition-colors">Отзывы</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Записаться</a>
          </div>

          {/* Telegram */}
          <a
            href="https://t.me/+79067742949"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            <Send size={16} />
            Написать в Telegram
          </a>
        </div>

        {/* Divider + bottom */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Deshar School. Все права защищены.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Политика конфиденциальности
            </a>
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
