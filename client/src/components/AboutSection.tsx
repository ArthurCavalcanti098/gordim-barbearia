const diferenciais = [
  { icon: "✂️", title: "Técnica Premium", desc: "Barbeiros especializados com anos de experiência em cortes modernos e clássicos." },
  { icon: "🏆", title: "Nota 5.0 no Google", desc: "41 avaliações 5 estrelas. A satisfação dos nossos clientes é nossa maior conquista." },
  { icon: "💈", title: "Ambiente Exclusivo", desc: "Espaço pensado para proporcionar conforto, estilo e uma experiência única." },
  { icon: "⏰", title: "Pontualidade", desc: "Respeitamos seu tempo. Agendamento online para você não esperar." },
];

export default function AboutSection() {
  return (
    <section
      id="sobre"
      style={{
        padding: "6rem 0",
        background: "oklch(0.09 0.006 60)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative background text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "clamp(8rem, 20vw, 18rem)",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          color: "oklch(0.75 0.15 75 / 0.03)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          letterSpacing: "0.1em",
        }}
      >
        GORDIM
      </div>

      <div className="container" style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}
          className="about-grid">
          {/* Left: Image */}
          <div className="fade-in-up" style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: "0.5rem",
                overflow: "hidden",
                aspectRatio: "4/5",
                position: "relative",
              }}
            >
              <img
                src="/manus-storage/interior-1_0231f8ae.jpg"
                alt="Interior da Gordim Barbearia"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, oklch(0.06 0.005 60 / 0.5), transparent)",
                }}
              />
            </div>
            {/* Gold accent box */}
            <div
              style={{
                position: "absolute",
                bottom: "-1.5rem",
                right: "-1.5rem",
                background: "linear-gradient(135deg, oklch(0.75 0.15 75), oklch(0.68 0.16 72))",
                padding: "1.5rem 2rem",
                borderRadius: "0.5rem",
                textAlign: "center",
                boxShadow: "0 10px 40px oklch(0.75 0.15 75 / 0.3)",
              }}
            >
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "oklch(0.08 0.005 60)", fontFamily: "'Playfair Display', serif" }}>
                5.0
              </div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.15em", color: "oklch(0.15 0.005 60)", textTransform: "uppercase", fontWeight: 600 }}>
                ⭐ Google
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="fade-in-up">
            <div style={{ marginBottom: "1rem" }}>
              <span style={{
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                color: "oklch(0.75 0.15 75)",
                textTransform: "uppercase",
                fontWeight: 600,
              }}>
                Nossa História
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                color: "oklch(0.95 0.01 60)",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              Arte, técnica e{" "}
              <span style={{
                background: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.75 0.15 75))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                paixão pelo ofício.
              </span>
            </h2>

            <div style={{ width: "50px", height: "2px", background: "linear-gradient(90deg, oklch(0.75 0.15 75), oklch(0.88 0.12 80))", borderRadius: "1px", marginBottom: "1.5rem" }} />

            <p style={{ color: "oklch(0.65 0.01 60)", lineHeight: 1.8, marginBottom: "1rem", fontSize: "0.95rem" }}>
              Na Gordim Barbearia, cada corte é tratado como arte. Unimos técnica apurada,
              atendimento de excelência e um ambiente acolhedor para entregar a melhor
              experiência em Ji-Paraná.
            </p>
            <p style={{ color: "oklch(0.65 0.01 60)", lineHeight: 1.8, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
              Localizada na Av. Transcontinental, nossa barbearia é referência em qualidade,
              pontualidade e estilo. Cada cliente sai daqui com a autoestima renovada e
              um sorriso no rosto.
            </p>

            {/* Diferenciais */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {diferenciais.map((d, i) => (
                <div
                  key={i}
                  style={{
                    padding: "1rem",
                    background: "oklch(0.12 0.008 60)",
                    borderRadius: "0.5rem",
                    border: "1px solid oklch(0.2 0.01 60)",
                    transition: "border-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "oklch(0.75 0.15 75 / 0.5)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "oklch(0.2 0.01 60)")}
                >
                  <div style={{ fontSize: "1.5rem", marginBottom: "0.4rem" }}>{d.icon}</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "oklch(0.88 0.01 60)", marginBottom: "0.25rem" }}>
                    {d.title}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "oklch(0.55 0.01 60)", lineHeight: 1.5 }}>
                    {d.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
