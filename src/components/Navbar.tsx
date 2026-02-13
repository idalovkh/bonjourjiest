import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.webp";

const navLinks = [
  { href: "#about", label: "О школе" },
  { href: "#teachers", label: "Учителя" },
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <img src={logo} alt="Deshar School" className="h-9 w-auto" />
          <span className="text-lg font-bold text-foreground tracking-tight">
            Deshar School
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Button asChild size="sm" className="rounded-full px-6">
            <a href="#contact">Записаться</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border px-4 pb-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="w-full mt-2 rounded-full" size="sm">
            <a href="#contact" onClick={() => setMobileOpen(false)}>
              Записаться
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
}
