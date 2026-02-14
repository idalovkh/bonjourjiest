import { Send, Youtube, Instagram } from "lucide-react";
import logo from "@/assets/logo.webp";

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Deshar School" className="h-9 w-auto" />
            <span className="text-base font-bold text-foreground">Deshar School</span>
          </div>

          <div className="flex flex-wrap items-center gap-8 text-base text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">О школе</a>
            <a href="#teachers" className="hover:text-foreground transition-colors">Преподаватели</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Цены</a>
            <a href="#reviews" className="hover:text-foreground transition-colors">Отзывы</a>
          </div>

          <div className="flex items-center gap-5">
            <a href="https://t.me/+79067742949" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Telegram">
              <Send size={20} />
            </a>
            <a href="https://www.youtube.com/@desharschool" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="YouTube">
              <Youtube size={20} />
            </a>
            <a href="https://www.instagram.com/deshar_school/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Instagram">
              <Instagram size={20} />
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Deshar School</p>
          <a href="/privacy" className="hover:text-foreground transition-colors">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
