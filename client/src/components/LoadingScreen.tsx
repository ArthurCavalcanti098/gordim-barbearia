export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-logo">Gordim</div>
      <div style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>
        Barbearia
      </div>
      <div className="loading-bar" style={{ marginTop: "1rem" }}>
        <div className="loading-bar-fill" />
      </div>
      <div style={{ color: "oklch(0.45 0.01 60)", fontSize: "0.7rem", letterSpacing: "0.2em", marginTop: "0.5rem" }}>
        Ji-Paraná · RO
      </div>
    </div>
  );
}
