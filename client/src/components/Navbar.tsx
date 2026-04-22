import { useEffect, useState } from "react";
import { Link } from "wouter";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Agendamento", href: "#agendamento" },
  { label: "Galeria", href: "#galeria" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Localização", href: "#localizacao" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "1rem 0",
        transition: "all 0.3s ease",
        background: scrolled ? "oklch(0.06 0.005 60 / 0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid oklch(0.22 0.01 60)" : "none",
      }}
    >
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <a
          href="#inicio"
          onClick={(e) => { e.preventDefault(); handleNavClick("#inicio"); }}
          style={{ textDecoration: "none" }}
        >
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.4rem",
              fontWeight: 700,
              background: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.75 0.15 75))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              letterSpacing: "0.1em",
            }}>
              GORDIM
            </span>
            <span style={{
              fontSize: "0.55rem",
              letterSpacing: "0.35em",
              color: "oklch(0.55 0.01 60)",
              textTransform: "uppercase",
            }}>
              Barbearia
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="hidden-mobile">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              style={{
                color: "oklch(0.75 0.01 60)",
                textDecoration: "none",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.75 0.15 75)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.75 0.01 60)")}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#agendamento"
            onClick={(e) => { e.preventDefault(); handleNavClick("#agendamento"); }}
            className="btn-gold"
            style={{ padding: "0.5rem 1.2rem", fontSize: "0.75rem" }}
          >
            <span>Agendar</span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0.5rem",
          }}
          className="show-mobile"
          aria-label="Menu"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: "24px",
                  height: "2px",
                  background: "oklch(0.75 0.15 75)",
                  borderRadius: "1px",
                  transition: "all 0.3s ease",
                  transform: menuOpen
                    ? i === 0 ? "rotate(45deg) translate(5px, 5px)"
                    : i === 1 ? "opacity: 0"
                    : "rotate(-45deg) translate(5px, -5px)"
                    : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "oklch(0.06 0.005 60 / 0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid oklch(0.22 0.01 60)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.2rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              style={{
                color: "oklch(0.8 0.01 60)",
                textDecoration: "none",
                fontSize: "0.9rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 500,
                padding: "0.5rem 0",
                borderBottom: "1px solid oklch(0.18 0.01 60)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#agendamento"
            onClick={(e) => { e.preventDefault(); handleNavClick("#agendamento"); }}
            className="btn-gold"
            style={{ textAlign: "center", marginTop: "0.5rem" }}
          >
            <span>Agendar Horário</span>
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
