import { useState } from "react";
import { trpc } from "@/lib/trpc";

const defaultImages = [
  { id: 1, imageUrl: "/manus-storage/haircut-1_e799e277.jpg", caption: "Corte clássico masculino" },
  { id: 2, imageUrl: "/manus-storage/haircut-2_494afabc.jpg", caption: "Degradê moderno" },
  { id: 3, imageUrl: "/manus-storage/haircut-3_b6b8f677.jpg", caption: "Fade perfeito" },
  { id: 4, imageUrl: "/manus-storage/beard-trim_319ca192.webp", caption: "Barba modelada" },
  { id: 5, imageUrl: "/manus-storage/beard-2_7aa52603.webp", caption: "Acabamento de barba" },
  { id: 6, imageUrl: "/manus-storage/interior-2_ec487eea.jpg", caption: "Ambiente da barbearia" },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<{ url: string; caption: string } | null>(null);
  const { data: gallery } = trpc.gallery.list.useQuery();

  const displayImages = gallery && gallery.length > 0 ? gallery : defaultImages;

  return (
    <section
      id="galeria"
      style={{
        padding: "6rem 0",
        background: "oklch(0.07 0.005 60)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="fade-in-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "oklch(0.75 0.15 75)", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "0.75rem" }}>
            Nosso trabalho
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "oklch(0.95 0.01 60)", marginBottom: "1rem" }}>
            Galeria{" "}
            <span style={{ background: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.75 0.15 75))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Premium
            </span>
          </h2>
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, oklch(0.75 0.15 75), oklch(0.88 0.12 80))", borderRadius: "1px", margin: "0 auto 1rem" }} />
          <p style={{ color: "oklch(0.55 0.01 60)", maxWidth: "500px", margin: "0 auto", fontSize: "0.9rem", lineHeight: 1.7 }}>
            Cada corte é uma obra de arte. Confira alguns dos nossos trabalhos.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1rem",
        }}>
          {displayImages.map((img, i) => (
            <div
              key={img.id ?? i}
              className="gallery-item fade-in-up"
              onClick={() => setLightbox({ url: img.imageUrl, caption: img.caption ?? "" })}
              style={{
                aspectRatio: i % 3 === 0 ? "1/1.2" : "1/1",
                position: "relative",
                background: "oklch(0.12 0.008 60)",
              }}
            >
              <img
                src={img.imageUrl}
                alt={img.caption ?? `Trabalho ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                loading="lazy"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, oklch(0.05 0.005 60 / 0.8), transparent)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1rem",
                }}
                className="gallery-overlay"
              >
                <span style={{ color: "oklch(0.92 0.01 60)", fontSize: "0.85rem", fontWeight: 500 }}>
                  {img.caption}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "oklch(0.04 0.005 60 / 0.95)",
            zIndex: 9000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            backdropFilter: "blur(8px)",
          }}
        >
          <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", maxWidth: "90vw", maxHeight: "90vh" }}>
            <img
              src={lightbox.url}
              alt={lightbox.caption}
              style={{ maxWidth: "100%", maxHeight: "80vh", objectFit: "contain", borderRadius: "0.5rem" }}
            />
            {lightbox.caption && (
              <p style={{ textAlign: "center", color: "oklch(0.75 0.01 60)", marginTop: "1rem", fontSize: "0.9rem" }}>
                {lightbox.caption}
              </p>
            )}
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: "absolute",
                top: "-1rem",
                right: "-1rem",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "oklch(0.75 0.15 75)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "oklch(0.08 0.005 60)",
                fontWeight: 700,
                fontSize: "1rem",
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <style>{`
        .gallery-item:hover .gallery-overlay { opacity: 1 !important; }
      `}</style>
    </section>
  );
}
