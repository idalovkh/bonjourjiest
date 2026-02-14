import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";

const navLinks = [
  { href: "#about", label: "О школе" },
  { href: "#teachers", label: "Преподаватели" },
  { href: "#pricing", label: "Цены" },
  { href: "#reviews", label: "Отзывы" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-3">
      <nav
        className={`mx-auto max-w-4xl flex items-center justify-between h-13 px-6 rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-background/90 backdrop-blur-xl shadow-sm border border-border/50"
            : "bg-background/60 backdrop-blur-md border border-transparent"
        }`}
      >
        <a href="#" className="flex items-center gap-2">
          <img src={logo} alt="Deshar School" className="h-7 w-auto" />
          <span className="text-sm font-bold text-foreground tracking-tight hidden sm:inline">
            Deshar School
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <Button
            asChild
            size="sm"
            className="rounded-full px-5 h-8 gradient-primary text-xs font-semibold shadow-sm"
          >
            <a href="#contact">Записаться</a>
          </Button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden mx-auto max-w-4xl mt-2 bg-background/95 backdrop-blur-xl rounded-2xl border border-border/50 shadow-lg px-5 pb-4 pt-2">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm text-muted-foreground hover:text-foreground border-b border-border/30 last:border-0"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="w-full mt-3 rounded-full gradient-primary text-sm" size="sm">
            <a href="#contact" onClick={() => setMobileOpen(false)}>Записаться</a>
          </Button>
        </div>
      )}
    </header>
  );
}
