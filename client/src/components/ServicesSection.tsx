import { trpc } from "@/lib/trpc";

const defaultServices = [
  { name: "Corte Masculino", description: "Corte clássico ou moderno com acabamento perfeito", price: "35,00", durationMinutes: 30, icon: "✂️" },
  { name: "Degradê / Fade", description: "Transição suave e precisa para um visual impecável", price: "40,00", durationMinutes: 40, icon: "💈" },
  { name: "Barba Completa", description: "Aparar, modelar e hidratar com produtos premium", price: "30,00", durationMinutes: 30, icon: "🪒" },
  { name: "Corte + Barba", description: "Combo completo para o visual perfeito", price: "60,00", durationMinutes: 60, icon: "⭐" },
  { name: "Sobrancelha", description: "Design e alinhamento profissional", price: "15,00", durationMinutes: 15, icon: "👁️" },
  { name: "Corte Infantil", description: "Cuidado especial para os pequenos", price: "25,00", durationMinutes: 25, icon: "🧒" },
  { name: "Pigmentação", description: "Cobertura de fios brancos com resultado natural", price: "50,00", durationMinutes: 45, icon: "🎨" },
  { name: "Hidratação Capilar", description: "Tratamento profundo para cabelos saudáveis", price: "45,00", durationMinutes: 40, icon: "💧" },
];

export default function ServicesSection() {
  const { data: services } = trpc.services.list.useQuery();

  const displayServices = (services && services.length > 0) ? services : defaultServices;

  const handleBook = () => {
    const el = document.getElementById("agendamento");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="servicos"
      style={{
        padding: "6rem 0",
        background: "oklch(0.07 0.005 60)",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="fade-in-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            color: "oklch(0.75 0.15 75)",
            textTransform: "uppercase",
            fontWeight: 600,
            display: "block",
            marginBottom: "0.75rem",
          }}>
            O que oferecemos
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              color: "oklch(0.95 0.01 60)",
              marginBottom: "1rem",
            }}
          >
            Nossos{" "}
            <span style={{
              background: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.75 0.15 75))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Serviços
            </span>
          </h2>
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, oklch(0.75 0.15 75), oklch(0.88 0.12 80))", borderRadius: "1px", margin: "0 auto 1rem" }} />
          <p style={{ color: "oklch(0.55 0.01 60)", maxWidth: "500px", margin: "0 auto", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Cada serviço executado com técnica, precisão e os melhores produtos do mercado.
          </p>
        </div>

        {/* Services Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {displayServices.map((service, i) => (
            <div
              key={i}
              className="service-card fade-in-up"
              style={{
                background: "linear-gradient(135deg, oklch(0.12 0.008 60), oklch(0.10 0.006 60))",
                border: "1px solid oklch(0.2 0.01 60)",
                borderRadius: "0.75rem",
                padding: "2rem 1.5rem",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              onClick={handleBook}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.75 0.15 75 / 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "oklch(0.2 0.01 60)";
              }}
            >
              {/* Gold top accent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, transparent, oklch(0.75 0.15 75), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
                className="card-accent"
              />

              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
                {service.icon || "✂️"}
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 600,
                color: "oklch(0.92 0.01 60)",
                marginBottom: "0.5rem",
              }}>
                {service.name}
              </h3>

              <p style={{
                fontSize: "0.8rem",
                color: "oklch(0.55 0.01 60)",
                lineHeight: 1.6,
                marginBottom: "1.5rem",
              }}>
                {service.description}
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <span style={{ fontSize: "0.65rem", color: "oklch(0.45 0.01 60)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    A partir de
                  </span>
                  <div style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "oklch(0.75 0.15 75)",
                    fontFamily: "'Playfair Display', serif",
                  }}>
                    R$ {typeof service.price === "string" ? service.price : Number(service.price).toFixed(2).replace(".", ",")}
                  </div>
                </div>
                <div style={{
                  fontSize: "0.7rem",
                  color: "oklch(0.45 0.01 60)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem",
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {service.durationMinutes} min
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="fade-in-up" style={{ textAlign: "center", marginTop: "3rem" }}>
          <button onClick={handleBook} className="btn-gold" style={{ fontSize: "0.85rem" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Agendar um Serviço</span>
          </button>
        </div>
      </div>
    </section>
  );
}
