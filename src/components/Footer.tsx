import { Send, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-display text-lg font-bold text-foreground">
              Deshar<span className="text-primary">School</span>
            </span>
            <p className="text-sm text-muted-foreground mt-1">
              Онлайн-школа английского языка
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://t.me/desharschool" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Send size={14} />
              Telegram
            </a>
            <a href="tel:+79001234567" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Phone size={14} />
              +7 (900) 123-45-67
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Deshar School. Все права защищены.</p>
          <a href="#" className="hover:text-foreground transition-colors">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
