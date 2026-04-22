import { useEffect, useRef } from "react";

export default function HeroSection() {
  const handleBook = () => {
    const el = document.getElementById("agendamento");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent("Olá! Gostaria de agendar um horário na Gordim Barbearia.");
    window.open(`https://wa.me/5569993135258?text=${msg}`, "_blank");
  };

  return (
    <section
      id="inicio"
      style={{
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('/manus-storage/hero-barbershop_d86c4d84.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          transform: "scale(1.05)",
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, oklch(0.04 0.005 60 / 0.92) 0%, oklch(0.06 0.005 60 / 0.75) 50%, oklch(0.04 0.005 60 / 0.88) 100%)",
        }}
      />

      {/* Gold accent line */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: "linear-gradient(180deg, transparent, oklch(0.75 0.15 75), transparent)",
        }}
      />

      {/* Content */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "8rem 1.5rem 4rem",
        }}
      >
        {/* Pre-title */}
        <div
          className="fade-in"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "1.5rem",
            padding: "0.4rem 1.2rem",
            border: "1px solid oklch(0.75 0.15 75 / 0.3)",
            borderRadius: "100px",
          }}
        >
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "oklch(0.75 0.15 75)" }} />
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "oklch(0.75 0.15 75)", textTransform: "uppercase" }}>
            Ji-Paraná · Rondônia
          </span>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "oklch(0.75 0.15 75)" }} />
        </div>

        {/* Main Title */}
        <h1
          className="fade-in-up"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(3rem, 8vw, 6.5rem)",
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: "1.5rem",
            color: "oklch(0.97 0.01 60)",
          }}
        >
          Seu estilo{" "}
          <span
            style={{
              background: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.75 0.15 75), oklch(0.58 0.14 70))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
            }}
          >
            começa aqui.
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="fade-in-up"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "oklch(0.72 0.01 60)",
            maxWidth: "600px",
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
            fontWeight: 300,
          }}
        >
          Cortes premium, atendimento de verdade e experiência única.
          <br />
          <span style={{ color: "oklch(0.75 0.15 75)", fontWeight: 400 }}>Nota 5.0 ⭐ no Google</span>
        </p>

        {/* CTA Buttons */}
        <div
          className="fade-in-up"
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <button onClick={handleBook} className="btn-gold" style={{ fontSize: "0.85rem", padding: "0.9rem 2.5rem" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>Agendar Horário</span>
          </button>
          <button onClick={handleWhatsApp} className="btn-outline-gold" style={{ fontSize: "0.85rem", padding: "0.9rem 2.5rem" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>Chamar no WhatsApp</span>
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          className="fade-in"
          style={{ marginTop: "4rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}
        >
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "oklch(0.45 0.01 60)", textTransform: "uppercase" }}>
            Role para baixo
          </span>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(180deg, oklch(0.75 0.15 75), transparent)",
              animation: "scrollPulse 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(0.8); }
          50% { opacity: 1; transform: scaleY(1); }
        }
      `}</style>
    </section>
  );
}
