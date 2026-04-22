export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{
      background: "oklch(0.06 0.005 60)",
      borderTop: "1px solid oklch(0.18 0.01 60)",
      padding: "4rem 0 2rem",
    }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "3rem" }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.8rem",
                fontWeight: 700,
                background: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.75 0.15 75))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.1em",
              }}>
                GORDIM
              </div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.35em", color: "oklch(0.45 0.01 60)", textTransform: "uppercase" }}>
                Barbearia
              </div>
            </div>
            <p style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.85rem", lineHeight: 1.8, maxWidth: "260px", marginBottom: "1.5rem" }}>
              Cortes premium, atendimento de excelência e experiência única em Ji-Paraná, Rondônia.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "oklch(0.15 0.01 60)",
                  border: "1px solid oklch(0.22 0.01 60)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "oklch(0.65 0.01 60)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "oklch(0.75 0.15 75)"; e.currentTarget.style.color = "oklch(0.75 0.15 75)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "oklch(0.22 0.01 60)"; e.currentTarget.style.color = "oklch(0.65 0.01 60)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a
                href="https://wa.me/5569993135258"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "oklch(0.15 0.01 60)",
                  border: "1px solid oklch(0.22 0.01 60)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "oklch(0.65 0.01 60)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#25D366"; e.currentTarget.style.color = "#25D366"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "oklch(0.22 0.01 60)"; e.currentTarget.style.color = "oklch(0.65 0.01 60)"; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "oklch(0.75 0.15 75)", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.25rem" }}>
              Navegação
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {["sobre", "servicos", "agendamento", "galeria", "avaliacoes"].map((link) => (
                <a
                  key={link}
                  href={`#${link}`}
                  onClick={(e) => { e.preventDefault(); handleNavClick(`#${link}`); }}
                  style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s ease", textTransform: "capitalize" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.75 0.15 75)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.55 0.01 60)")}
                >
                  {link === "sobre" ? "Sobre Nós" : link === "servicos" ? "Serviços" : link === "agendamento" ? "Agendamento" : link === "galeria" ? "Galeria" : "Avaliações"}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "oklch(0.75 0.15 75)", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.25rem" }}>
              Serviços
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {["Corte Masculino", "Degradê / Fade", "Barba Completa", "Corte + Barba", "Sobrancelha"].map((s) => (
                <span key={s} style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.85rem" }}>{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "oklch(0.75 0.15 75)", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.25rem" }}>
              Contato
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.82rem", lineHeight: 1.6 }}>
                Av. Transcontinental, 5071<br />
                Ji-Paraná, RO
              </div>
              <a href="tel:+5569993135258" style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.85rem", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.75 0.15 75)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.55 0.01 60)")}>
                (69) 99313-5258
              </a>
              <div style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.82rem" }}>
                Seg–Sex: 09:00–19:30<br />
                Sáb: 08:00–17:00
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid oklch(0.15 0.01 60)",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}>
          <span style={{ color: "oklch(0.4 0.01 60)", fontSize: "0.78rem" }}>
            © {currentYear} Gordim Barbearia. Todos os direitos reservados.
          </span>
          <a
            href="/admin"
            style={{ color: "oklch(0.35 0.01 60)", fontSize: "0.72rem", textDecoration: "none", transition: "color 0.2s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.55 0.01 60)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.35 0.01 60)")}
          >
            Área Administrativa
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
