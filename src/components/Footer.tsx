import { Send, Phone } from "lucide-react";
import logo from "@/assets/logo.webp";

export function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2">
              <img src={logo} alt="Deshar School" className="h-8 w-auto" />
              <span className="font-display text-lg font-bold text-foreground">
                Deshar<span className="text-primary">School</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://t.me/+79067742949" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Send size={14} />
              Наш Telegram
            </a>
            <span>Задавай вопросы, не стесняйся!</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Deshar School. Все права защищены.</p>
          <a href="/privacy" className="hover:text-foreground transition-colors">
            Политика конфиденциальности и условия использования
          </a>
        </div>
      </div>
    </footer>
  );
}
