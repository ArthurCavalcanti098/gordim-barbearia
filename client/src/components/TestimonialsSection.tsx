import { useEffect, useState } from "react";
import { trpc } from "@/lib/trpc";

const defaultTestimonials = [
  { id: 1, clientName: "Carlos Eduardo", rating: 5, comment: "Ótimo atendimento, ambiente legal, música boa e corte excelente. Recomendo demais!" },
  { id: 2, clientName: "Rafael Oliveira", rating: 5, comment: "Atendimento sensacional, barbeiros profissionais. Saí muito satisfeito com o resultado." },
  { id: 3, clientName: "Marcos Vinicius", rating: 5, comment: "Lugar agradável, pessoas educadas e ótimo serviço. Com certeza voltarei sempre." },
  { id: 4, clientName: "João Pedro", rating: 5, comment: "Melhor barbearia de Ji-Paraná! Corte perfeito, ambiente top e preço justo." },
  { id: 5, clientName: "André Luiz", rating: 5, comment: "Profissionalismo de alto nível. Cada detalhe é tratado com cuidado. Parabéns!" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={star <= rating ? "oklch(0.75 0.15 75)" : "none"}
          stroke="oklch(0.75 0.15 75)"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const { data: testimonials } = trpc.testimonials.list.useQuery();

  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displayTestimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [displayTestimonials.length]);

  const prev = () => setCurrent((c) => (c - 1 + displayTestimonials.length) % displayTestimonials.length);
  const next = () => setCurrent((c) => (c + 1) % displayTestimonials.length);

  return (
    <section
      id="avaliacoes"
      style={{
        padding: "6rem 0",
        background: "oklch(0.09 0.006 60)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background decoration */}
      <div style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, oklch(0.75 0.15 75 / 0.03) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative" }}>
        {/* Header */}
        <div className="fade-in-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "oklch(0.75 0.15 75)", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "0.75rem" }}>
            O que dizem nossos clientes
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "oklch(0.95 0.01 60)", marginBottom: "1rem" }}>
            Avaliações{" "}
            <span style={{ background: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.75 0.15 75))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              5 Estrelas
            </span>
          </h2>
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, oklch(0.75 0.15 75), oklch(0.88 0.12 80))", borderRadius: "1px", margin: "0 auto 1rem" }} />

          {/* Google rating badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 1.5rem", background: "oklch(0.12 0.008 60)", borderRadius: "100px", border: "1px solid oklch(0.22 0.01 60)" }}>
            <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "oklch(0.75 0.15 75)", fontFamily: "'Playfair Display', serif" }}>5.0</span>
            <StarRating rating={5} />
            <span style={{ fontSize: "0.75rem", color: "oklch(0.55 0.01 60)" }}>41 avaliações no Google</span>
          </div>
        </div>

        {/* Slider */}
        <div style={{ maxWidth: "800px", margin: "0 auto", position: "relative" }}>
          <div style={{ overflow: "hidden" }}>
            <div
              style={{
                display: "flex",
                transition: "transform 0.5s ease",
                transform: `translateX(-${current * 100}%)`,
              }}
            >
              {displayTestimonials.map((t, i) => (
                <div
                  key={t.id ?? i}
                  style={{
                    minWidth: "100%",
                    padding: "0 0.5rem",
                  }}
                >
                  <div style={{
                    background: "linear-gradient(135deg, oklch(0.12 0.008 60), oklch(0.10 0.006 60))",
                    border: "1px solid oklch(0.2 0.01 60)",
                    borderRadius: "1rem",
                    padding: "3rem",
                    textAlign: "center",
                    position: "relative",
                  }}>
                    {/* Quote mark */}
                    <div style={{
                      position: "absolute",
                      top: "1.5rem",
                      left: "2rem",
                      fontSize: "5rem",
                      lineHeight: 1,
                      color: "oklch(0.75 0.15 75 / 0.15)",
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 700,
                    }}>
                      "
                    </div>

                    <StarRating rating={t.rating} />

                    <p style={{
                      fontSize: "1.05rem",
                      color: "oklch(0.78 0.01 60)",
                      lineHeight: 1.8,
                      margin: "1.5rem 0",
                      fontStyle: "italic",
                      position: "relative",
                    }}>
                      "{t.comment}"
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem" }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, oklch(0.75 0.15 75), oklch(0.68 0.16 72))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "oklch(0.08 0.005 60)",
                        fontFamily: "'Playfair Display', serif",
                      }}>
                        {t.clientName.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: "oklch(0.88 0.01 60)", fontSize: "0.9rem" }}>{t.clientName}</div>
                        <div style={{ fontSize: "0.72rem", color: "oklch(0.45 0.01 60)", letterSpacing: "0.1em" }}>Cliente verificado</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "2rem" }}>
            <button
              onClick={prev}
              style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "oklch(0.15 0.01 60)",
                border: "1px solid oklch(0.25 0.01 60)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "oklch(0.75 0.15 75)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "oklch(0.75 0.15 75)"; e.currentTarget.style.color = "oklch(0.08 0.005 60)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "oklch(0.15 0.01 60)"; e.currentTarget.style.color = "oklch(0.75 0.15 75)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
            </button>

            {/* Dots */}
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {displayTestimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  style={{
                    width: i === current ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    background: i === current ? "oklch(0.75 0.15 75)" : "oklch(0.25 0.01 60)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                  }}
                />
              ))}
            </div>

            <button
              onClick={next}
              style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "oklch(0.15 0.01 60)",
                border: "1px solid oklch(0.25 0.01 60)",
                cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "oklch(0.75 0.15 75)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "oklch(0.75 0.15 75)"; e.currentTarget.style.color = "oklch(0.08 0.005 60)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "oklch(0.15 0.01 60)"; e.currentTarget.style.color = "oklch(0.75 0.15 75)"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
