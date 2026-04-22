import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const defaultServices = [
  { id: 1, name: "Corte Masculino" },
  { id: 2, name: "Degradê / Fade" },
  { id: 3, name: "Barba Completa" },
  { id: 4, name: "Corte + Barba" },
  { id: 5, name: "Sobrancelha" },
  { id: 6, name: "Corte Infantil" },
  { id: 7, name: "Pigmentação" },
  { id: 8, name: "Hidratação Capilar" },
];

const defaultBarbers = [
  { id: 1, name: "Gordim" },
  { id: 2, name: "Qualquer Barbeiro" },
];

export default function BookingSection() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    clientName: "",
    clientPhone: "",
    clientEmail: "",
    serviceId: 0,
    barberId: 0,
    appointmentDate: "",
    appointmentTime: "",
    notes: "",
  });
  const [confirmed, setConfirmed] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  const { data: services } = trpc.services.list.useQuery();
  const { data: barbers } = trpc.barbers.list.useQuery();
  const { data: availableTimes, isLoading: loadingTimes } = trpc.appointments.getAvailableTimes.useQuery(
    { barberId: form.barberId, date: form.appointmentDate },
    { enabled: form.barberId > 0 && form.appointmentDate !== "" }
  );

  const createMutation = trpc.appointments.create.useMutation({
    onSuccess: (data) => {
      setConfirmed(true);
      setWhatsappUrl(data.whatsappUrl);
      toast.success("Agendamento realizado com sucesso!");
    },
    onError: (err) => {
      toast.error(err.message || "Erro ao realizar agendamento. Tente novamente.");
    },
  });

  const displayServices = services && services.length > 0 ? services : defaultServices;
  const displayBarbers = barbers && barbers.length > 0 ? barbers : defaultBarbers;

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = () => {
    if (!form.clientName || !form.clientPhone || !form.serviceId || !form.barberId || !form.appointmentDate || !form.appointmentTime) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    createMutation.mutate(form);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "oklch(0.13 0.01 60)",
    border: "1px solid oklch(0.25 0.01 60)",
    borderRadius: "0.375rem",
    color: "oklch(0.95 0.01 60)",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.2s ease",
    fontFamily: "'Inter', sans-serif",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.75rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "oklch(0.65 0.01 60)",
    marginBottom: "0.4rem",
    fontWeight: 500,
  };

  if (confirmed) {
    return (
      <section id="agendamento" style={{ padding: "6rem 0", background: "oklch(0.09 0.006 60)" }}>
        <div className="container">
          <div style={{
            maxWidth: "600px",
            margin: "0 auto",
            textAlign: "center",
            padding: "4rem 2rem",
            background: "oklch(0.12 0.008 60)",
            borderRadius: "1rem",
            border: "1px solid oklch(0.75 0.15 75 / 0.3)",
          }}>
            <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🎉</div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2rem",
              color: "oklch(0.95 0.01 60)",
              marginBottom: "1rem",
            }}>
              Agendamento Confirmado!
            </h2>
            <p style={{ color: "oklch(0.65 0.01 60)", marginBottom: "2rem", lineHeight: 1.7 }}>
              Seu horário foi reservado com sucesso. Clique abaixo para confirmar pelo WhatsApp e receber um lembrete.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>Confirmar no WhatsApp</span>
              </a>
              <button
                onClick={() => { setConfirmed(false); setStep(1); setForm({ clientName: "", clientPhone: "", clientEmail: "", serviceId: 0, barberId: 0, appointmentDate: "", appointmentTime: "", notes: "" }); }}
                className="btn-outline-gold"
              >
                <span>Novo Agendamento</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="agendamento" style={{ padding: "6rem 0", background: "oklch(0.09 0.006 60)" }}>
      <div className="container">
        {/* Header */}
        <div className="fade-in-up" style={{ textAlign: "center", marginBottom: "4rem" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", color: "oklch(0.75 0.15 75)", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "0.75rem" }}>
            Reserve seu horário
          </span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: "oklch(0.95 0.01 60)", marginBottom: "1rem" }}>
            Agendamento{" "}
            <span style={{ background: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.75 0.15 75))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Online
            </span>
          </h2>
          <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, oklch(0.75 0.15 75), oklch(0.88 0.12 80))", borderRadius: "1px", margin: "0 auto" }} />
        </div>

        {/* Steps indicator */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginBottom: "3rem" }}>
          {[1, 2, 3].map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: step >= s ? "linear-gradient(135deg, oklch(0.75 0.15 75), oklch(0.68 0.16 72))" : "oklch(0.18 0.01 60)",
                border: step >= s ? "none" : "1px solid oklch(0.25 0.01 60)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.8rem", fontWeight: 600,
                color: step >= s ? "oklch(0.08 0.005 60)" : "oklch(0.45 0.01 60)",
                transition: "all 0.3s ease",
              }}>
                {step > s ? "✓" : s}
              </div>
              {s < 3 && <div style={{ width: "40px", height: "1px", background: step > s ? "oklch(0.75 0.15 75)" : "oklch(0.22 0.01 60)", transition: "background 0.3s ease" }} />}
            </div>
          ))}
        </div>

        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{
            background: "oklch(0.11 0.008 60)",
            border: "1px solid oklch(0.2 0.01 60)",
            borderRadius: "1rem",
            padding: "2.5rem",
          }}>
            {/* Step 1: Service & Barber */}
            {step === 1 && (
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "oklch(0.92 0.01 60)", marginBottom: "2rem" }}>
                  Escolha o serviço e o barbeiro
                </h3>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                  <div>
                    <label style={labelStyle}>Serviço desejado *</label>
                    <select
                      style={inputStyle}
                      value={form.serviceId}
                      onChange={(e) => setForm({ ...form, serviceId: Number(e.target.value) })}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.75 0.15 75)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.25 0.01 60)")}
                    >
                      <option value={0}>Selecione um serviço</option>
                      {displayServices.map((s) => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Barbeiro (opcional)</label>
                    <select
                      style={inputStyle}
                      value={form.barberId}
                      onChange={(e) => setForm({ ...form, barberId: Number(e.target.value), appointmentTime: "" })}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.75 0.15 75)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.25 0.01 60)")}
                    >
                      <option value={0}>Qualquer barbeiro disponível</option>
                      {displayBarbers.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => {
                      if (!form.serviceId) { toast.error("Selecione um serviço."); return; }
                      if (!form.barberId) setForm({ ...form, barberId: displayBarbers[0]?.id ?? 1 });
                      setStep(2);
                    }}
                    className="btn-gold"
                  >
                    <span>Próximo</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Date & Time */}
            {step === 2 && (
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "oklch(0.92 0.01 60)", marginBottom: "2rem" }}>
                  Escolha a data e horário
                </h3>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                  <div>
                    <label style={labelStyle}>Data *</label>
                    <input
                      type="date"
                      style={inputStyle}
                      min={today}
                      value={form.appointmentDate}
                      onChange={(e) => setForm({ ...form, appointmentDate: e.target.value, appointmentTime: "" })}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.75 0.15 75)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.25 0.01 60)")}
                    />
                  </div>

                  {form.appointmentDate && (
                    <div>
                      <label style={labelStyle}>Horário disponível *</label>
                      {loadingTimes ? (
                        <div style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.85rem", padding: "1rem 0" }}>
                          Verificando horários...
                        </div>
                      ) : availableTimes && availableTimes.available.length > 0 ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                          {availableTimes.available.map((time) => (
                            <button
                              key={time}
                              onClick={() => setForm({ ...form, appointmentTime: time })}
                              style={{
                                padding: "0.5rem 1rem",
                                borderRadius: "0.375rem",
                                border: form.appointmentTime === time ? "none" : "1px solid oklch(0.25 0.01 60)",
                                background: form.appointmentTime === time
                                  ? "linear-gradient(135deg, oklch(0.75 0.15 75), oklch(0.68 0.16 72))"
                                  : "oklch(0.15 0.01 60)",
                                color: form.appointmentTime === time ? "oklch(0.08 0.005 60)" : "oklch(0.75 0.01 60)",
                                fontSize: "0.85rem",
                                fontWeight: form.appointmentTime === time ? 600 : 400,
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                              }}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div style={{
                          padding: "1.5rem",
                          background: "oklch(0.13 0.01 60)",
                          borderRadius: "0.5rem",
                          border: "1px solid oklch(0.22 0.01 60)",
                          textAlign: "center",
                        }}>
                          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>📅</div>
                          <p style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.85rem" }}>
                            Nenhum horário disponível para esta data. Tente outro dia ou entre em contato pelo WhatsApp.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
                  <button onClick={() => setStep(1)} className="btn-outline-gold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                    <span>Voltar</span>
                  </button>
                  <button
                    onClick={() => {
                      if (!form.appointmentDate) { toast.error("Selecione uma data."); return; }
                      if (!form.appointmentTime) { toast.error("Selecione um horário."); return; }
                      setStep(3);
                    }}
                    className="btn-gold"
                  >
                    <span>Próximo</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6" /></svg>
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Personal Info */}
            {step === 3 && (
              <div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "oklch(0.92 0.01 60)", marginBottom: "2rem" }}>
                  Seus dados
                </h3>
                <div style={{ display: "grid", gap: "1.5rem" }}>
                  <div>
                    <label style={labelStyle}>Nome completo *</label>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      style={inputStyle}
                      value={form.clientName}
                      onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.75 0.15 75)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.25 0.01 60)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Telefone / WhatsApp *</label>
                    <input
                      type="tel"
                      placeholder="(69) 99999-9999"
                      style={inputStyle}
                      value={form.clientPhone}
                      onChange={(e) => setForm({ ...form, clientPhone: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.75 0.15 75)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.25 0.01 60)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>E-mail (opcional)</label>
                    <input
                      type="email"
                      placeholder="seu@email.com"
                      style={inputStyle}
                      value={form.clientEmail}
                      onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.75 0.15 75)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.25 0.01 60)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Observações (opcional)</label>
                    <textarea
                      placeholder="Alguma preferência ou observação especial..."
                      style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      onFocus={(e) => (e.target.style.borderColor = "oklch(0.75 0.15 75)")}
                      onBlur={(e) => (e.target.style.borderColor = "oklch(0.25 0.01 60)")}
                    />
                  </div>

                  {/* Summary */}
                  <div style={{
                    padding: "1.25rem",
                    background: "oklch(0.13 0.01 60)",
                    borderRadius: "0.5rem",
                    border: "1px solid oklch(0.75 0.15 75 / 0.2)",
                  }}>
                    <div style={{ fontSize: "0.75rem", letterSpacing: "0.1em", color: "oklch(0.75 0.15 75)", textTransform: "uppercase", marginBottom: "0.75rem", fontWeight: 600 }}>
                      Resumo do Agendamento
                    </div>
                    <div style={{ display: "grid", gap: "0.4rem" }}>
                      {[
                        { label: "Serviço", value: displayServices.find(s => s.id === form.serviceId)?.name },
                        { label: "Barbeiro", value: displayBarbers.find(b => b.id === form.barberId)?.name || "Qualquer disponível" },
                        { label: "Data", value: form.appointmentDate ? new Date(form.appointmentDate + "T12:00:00").toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" }) : "" },
                        { label: "Horário", value: form.appointmentTime },
                      ].map((item) => item.value && (
                        <div key={item.label} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                          <span style={{ color: "oklch(0.55 0.01 60)" }}>{item.label}:</span>
                          <span style={{ color: "oklch(0.88 0.01 60)", fontWeight: 500 }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "2rem", display: "flex", justifyContent: "space-between" }}>
                  <button onClick={() => setStep(2)} className="btn-outline-gold">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6" /></svg>
                    <span>Voltar</span>
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={createMutation.isPending}
                    className="btn-gold"
                    style={{ opacity: createMutation.isPending ? 0.7 : 1 }}
                  >
                    {createMutation.isPending ? (
                      <span>Confirmando...</span>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                        <span>Confirmar Agendamento</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
