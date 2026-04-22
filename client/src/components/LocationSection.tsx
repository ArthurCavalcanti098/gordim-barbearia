const horarios = [
  { dia: "Segunda-feira", hora: "09:00 – 19:30" },
  { dia: "Terça-feira", hora: "09:00 – 19:30" },
  { dia: "Quarta-feira", hora: "09:00 – 19:30" },
  { dia: "Quinta-feira", hora: "09:00 – 19:30" },
  { dia: "Sexta-feira", hora: "09:00 – 19:30" },
  { dia: "Sábado", hora: "08:00 – 17:00" },
  { dia: "Domingo", hora: "Fechado" },
];

export default function LocationSection() {
  const address = "Av. Transcontinental, 5071 - Ji-Paraná, RO, 76901-189";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed&z=16`;

  const today = new Date().getDay(); // 0=Sun, 1=Mon...

  return (
    <section
      id="localizacao"
      style={{
        padding: "6rem 0",
        background: "oklch(0.07 0.005 60)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="fade-in-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "oklch(0.75 0.15 75)", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "0.75rem" }}>
            Onde estamos
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "oklch(0.95 0.01 60)", marginBottom: "1rem" }}>
            Nossa{" "}
            <span style={{ background: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.75 0.15 75))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Localização
            </span>
          </h2>
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, oklch(0.75 0.15 75), oklch(0.88 0.12 80))", borderRadius: "1px", margin: "0 auto" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem", alignItems: "start" }} className="location-grid">
          {/* Left: Info */}
          <div className="fade-in-up">
            {/* Address */}
            <div style={{
              padding: "1.5rem",
              background: "oklch(0.11 0.008 60)",
              borderRadius: "0.75rem",
              border: "1px solid oklch(0.2 0.01 60)",
              marginBottom: "1.5rem",
            }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "oklch(0.75 0.15 75 / 0.1)",
                  border: "1px solid oklch(0.75 0.15 75 / 0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="oklch(0.75 0.15 75)" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "oklch(0.75 0.15 75)", textTransform: "uppercase", marginBottom: "0.25rem", fontWeight: 600 }}>Endereço</div>
                  <div style={{ color: "oklch(0.82 0.01 60)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                    Av. Transcontinental, 5071<br />
                    Ji-Paraná, RO – 76901-189
                  </div>
                </div>
              </div>

              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ width: "100%", justifyContent: "center", fontSize: "0.8rem", padding: "0.65rem" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Como Chegar</span>
              </a>
            </div>

            {/* Phone */}
            <div style={{
              padding: "1.5rem",
              background: "oklch(0.11 0.008 60)",
              borderRadius: "0.75rem",
              border: "1px solid oklch(0.2 0.01 60)",
              marginBottom: "1.5rem",
            }}>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <div style={{
                  width: "40px", height: "40px", borderRadius: "50%",
                  background: "oklch(0.75 0.15 75 / 0.1)",
                  border: "1px solid oklch(0.75 0.15 75 / 0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="oklch(0.75 0.15 75)" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.02z" />
                  </svg>
                </div>
                <div>
                  <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "oklch(0.75 0.15 75)", textTransform: "uppercase", marginBottom: "0.25rem", fontWeight: 600 }}>Telefone / WhatsApp</div>
                  <a href="tel:+5569993135258" style={{ color: "oklch(0.82 0.01 60)", fontSize: "1rem", fontWeight: 500, textDecoration: "none" }}>
                    (69) 99313-5258
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div style={{
              padding: "1.5rem",
              background: "oklch(0.11 0.008 60)",
              borderRadius: "0.75rem",
              border: "1px solid oklch(0.2 0.01 60)",
            }}>
              <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "oklch(0.75 0.15 75)", textTransform: "uppercase", marginBottom: "1rem", fontWeight: 600 }}>
                Horário de Funcionamento
              </div>
              <div style={{ display: "grid", gap: "0.5rem" }}>
                {horarios.map((h, i) => {
                  const isToday = (i === 0 && today === 1) || (i === 1 && today === 2) || (i === 2 && today === 3) || (i === 3 && today === 4) || (i === 4 && today === 5) || (i === 5 && today === 6) || (i === 6 && today === 0);
                  return (
                    <div
                      key={h.dia}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "0.82rem",
                        padding: "0.4rem 0.6rem",
                        borderRadius: "0.25rem",
                        background: isToday ? "oklch(0.75 0.15 75 / 0.08)" : "transparent",
                        border: isToday ? "1px solid oklch(0.75 0.15 75 / 0.2)" : "1px solid transparent",
                      }}
                    >
                      <span style={{ color: isToday ? "oklch(0.88 0.01 60)" : "oklch(0.65 0.01 60)", fontWeight: isToday ? 600 : 400 }}>
                        {h.dia} {isToday && "• Hoje"}
                      </span>
                      <span style={{ color: h.hora === "Fechado" ? "oklch(0.5 0.1 25)" : isToday ? "oklch(0.75 0.15 75)" : "oklch(0.72 0.01 60)", fontWeight: 500 }}>
                        {h.hora}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="fade-in-up" style={{ borderRadius: "0.75rem", overflow: "hidden", border: "1px solid oklch(0.2 0.01 60)", height: "500px" }}>
            <iframe
              src={mapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.8)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Gordim Barbearia"
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .location-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
