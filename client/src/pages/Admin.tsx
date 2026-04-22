import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import { Link } from "wouter";

type AdminTab = "appointments" | "services" | "barbers" | "gallery" | "testimonials";

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.8rem",
  background: "oklch(0.13 0.01 60)",
  border: "1px solid oklch(0.25 0.01 60)",
  borderRadius: "0.375rem",
  color: "oklch(0.95 0.01 60)",
  fontSize: "0.85rem",
  outline: "none",
  fontFamily: "'Inter', sans-serif",
  boxSizing: "border-box",
};

// ===== LOGIN SCREEN =====
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const loginMutation = trpc.auth.adminLogin.useMutation({
    onSuccess: () => { onLogin(); toast.success("Bem-vindo ao painel!"); },
    onError: () => toast.error("Senha incorreta. Tente novamente."),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ password });
  };

  return (
    <div style={{ minHeight: "100vh", background: "oklch(0.07 0.005 60)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: "400px", background: "oklch(0.11 0.008 60)", border: "1px solid oklch(0.2 0.01 60)", borderRadius: "1rem", padding: "3rem 2.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, background: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.75 0.15 75))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "0.1em", marginBottom: "0.25rem" }}>
            GORDIM
          </div>
          <div style={{ fontSize: "0.6rem", letterSpacing: "0.3em", color: "oklch(0.45 0.01 60)", textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Painel Administrativo
          </div>
          <div style={{ width: "40px", height: "2px", background: "linear-gradient(90deg, oklch(0.75 0.15 75), oklch(0.88 0.12 80))", borderRadius: "1px", margin: "0 auto" }} />
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1.5rem" }}>
            <label style={{ display: "block", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "oklch(0.65 0.01 60)", marginBottom: "0.4rem", fontWeight: 500 }}>
              Senha de Acesso
            </label>
            <input
              type="password"
              placeholder="Digite a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "oklch(0.75 0.15 75)")}
              onBlur={(e) => (e.target.style.borderColor = "oklch(0.25 0.01 60)")}
            />
          </div>
          <button type="submit" disabled={loginMutation.isPending || !password} className="btn-gold" style={{ width: "100%", justifyContent: "center", opacity: loginMutation.isPending ? 0.7 : 1 }}>
            <span>{loginMutation.isPending ? "Verificando..." : "Entrar"}</span>
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <Link href="/" style={{ color: "oklch(0.45 0.01 60)", fontSize: "0.8rem", textDecoration: "none" }}>← Voltar ao site</Link>
        </div>
        <p style={{ textAlign: "center", color: "oklch(0.35 0.01 60)", fontSize: "0.72rem", marginTop: "1.5rem" }}>
          Senha padrão: <span style={{ color: "oklch(0.55 0.01 60)" }}>gordim2024</span>
        </p>
      </div>
    </div>
  );
}

// ===== APPOINTMENTS TAB =====
function AppointmentsTab() {
  const today = new Date().toISOString().split("T")[0];
  const weekEnd = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
  const [filter, setFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<"today" | "week" | "all">("today");

  const queryInput = dateRange === "today"
    ? { dateFrom: today, dateTo: today }
    : dateRange === "week"
      ? { dateFrom: today, dateTo: weekEnd }
      : {};

  const { data: appointments, refetch } = trpc.appointments.list.useQuery(queryInput);
  const { data: services } = trpc.services.listAll.useQuery();
  const { data: barbers } = trpc.barbers.listAll.useQuery();

  const updateStatus = trpc.appointments.updateStatus.useMutation({
    onSuccess: () => { refetch(); toast.success("Status atualizado!"); },
    onError: () => toast.error("Erro ao atualizar status."),
  });

  const serviceMap = Object.fromEntries((services ?? []).map(s => [s.id, s.name]));
  const barberMap = Object.fromEntries((barbers ?? []).map(b => [b.id, b.name]));

  const statusColors: Record<string, string> = {
    pending: "oklch(0.75 0.15 75)",
    confirmed: "oklch(0.65 0.18 145)",
    cancelled: "oklch(0.65 0.2 25)",
    completed: "oklch(0.55 0.01 60)",
  };
  const statusLabels: Record<string, string> = {
    pending: "Pendente",
    confirmed: "Confirmado",
    cancelled: "Cancelado",
    completed: "Concluído",
  };

  const filtered = filter === "all" ? appointments : appointments?.filter(a => a.status === filter);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "oklch(0.92 0.01 60)" }}>Agendamentos</h2>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {[
            { id: "today", label: "Hoje" },
            { id: "week", label: "7 dias" },
            { id: "all", label: "Todos" },
          ].map(r => (
            <button key={r.id} onClick={() => setDateRange(r.id as "today" | "week" | "all")}
              style={{ padding: "0.35rem 0.8rem", borderRadius: "100px", border: dateRange === r.id ? "none" : "1px solid oklch(0.25 0.01 60)", background: dateRange === r.id ? "oklch(0.75 0.15 75 / 0.2)" : "transparent", color: dateRange === r.id ? "oklch(0.75 0.15 75)" : "oklch(0.55 0.01 60)", fontSize: "0.75rem", cursor: "pointer", fontWeight: dateRange === r.id ? 600 : 400 }}>
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Status filter */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.5rem" }}>
        {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            style={{ padding: "0.35rem 0.8rem", borderRadius: "100px", border: filter === s ? "none" : "1px solid oklch(0.22 0.01 60)", background: filter === s ? "linear-gradient(135deg, oklch(0.75 0.15 75), oklch(0.68 0.16 72))" : "oklch(0.13 0.01 60)", color: filter === s ? "oklch(0.08 0.005 60)" : "oklch(0.55 0.01 60)", fontSize: "0.72rem", cursor: "pointer", fontWeight: filter === s ? 600 : 400 }}>
            {s === "all" ? "Todos" : statusLabels[s]}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
        {["pending", "confirmed", "completed", "cancelled"].map(s => {
          const count = appointments?.filter(a => a.status === s).length ?? 0;
          return (
            <div key={s} style={{ background: "oklch(0.12 0.008 60)", border: "1px solid oklch(0.18 0.01 60)", borderRadius: "0.5rem", padding: "0.75rem 1rem" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 700, color: statusColors[s] }}>{count}</div>
              <div style={{ fontSize: "0.7rem", color: "oklch(0.45 0.01 60)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{statusLabels[s]}</div>
            </div>
          );
        })}
      </div>

      {!filtered || filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "oklch(0.45 0.01 60)", fontSize: "0.9rem" }}>
          Nenhum agendamento encontrado.
        </div>
      ) : (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {filtered.map((apt) => (
            <div key={apt.id} style={{ background: "oklch(0.12 0.008 60)", border: "1px solid oklch(0.2 0.01 60)", borderRadius: "0.75rem", padding: "1.25rem 1.5rem", display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "center" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.75rem" }}>
                <div>
                  <div style={{ fontSize: "0.62rem", color: "oklch(0.45 0.01 60)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Cliente</div>
                  <div style={{ fontSize: "0.88rem", color: "oklch(0.88 0.01 60)", fontWeight: 500 }}>{apt.clientName}</div>
                  <div style={{ fontSize: "0.75rem", color: "oklch(0.55 0.01 60)" }}>{apt.clientPhone}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.62rem", color: "oklch(0.45 0.01 60)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Data/Hora</div>
                  <div style={{ fontSize: "0.82rem", color: "oklch(0.82 0.01 60)" }}>{String(apt.appointmentDate).substring(0, 10)}</div>
                  <div style={{ fontSize: "0.88rem", color: "oklch(0.75 0.15 75)", fontWeight: 600 }}>{String(apt.appointmentTime).substring(0, 5)}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.62rem", color: "oklch(0.45 0.01 60)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Serviço</div>
                  <div style={{ fontSize: "0.82rem", color: "oklch(0.78 0.01 60)" }}>{serviceMap[apt.serviceId] ?? `#${apt.serviceId}`}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.62rem", color: "oklch(0.45 0.01 60)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Barbeiro</div>
                  <div style={{ fontSize: "0.82rem", color: "oklch(0.78 0.01 60)" }}>{barberMap[apt.barberId] ?? `#${apt.barberId}`}</div>
                </div>
                <div>
                  <div style={{ fontSize: "0.62rem", color: "oklch(0.45 0.01 60)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Status</div>
                  <span style={{ display: "inline-block", padding: "0.18rem 0.55rem", borderRadius: "100px", fontSize: "0.7rem", fontWeight: 600, color: statusColors[apt.status], background: `${statusColors[apt.status]}18`, border: `1px solid ${statusColors[apt.status]}40` }}>
                    {statusLabels[apt.status]}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {apt.status === "pending" && (
                  <button onClick={() => updateStatus.mutate({ id: apt.id, status: "confirmed" })}
                    style={{ padding: "0.35rem 0.7rem", background: "oklch(0.65 0.18 145 / 0.12)", border: "1px solid oklch(0.65 0.18 145 / 0.35)", borderRadius: "0.375rem", color: "oklch(0.65 0.18 145)", fontSize: "0.72rem", cursor: "pointer" }}>
                    Confirmar
                  </button>
                )}
                {(apt.status === "pending" || apt.status === "confirmed") && (
                  <>
                    <button onClick={() => updateStatus.mutate({ id: apt.id, status: "completed" })}
                      style={{ padding: "0.35rem 0.7rem", background: "oklch(0.75 0.15 75 / 0.1)", border: "1px solid oklch(0.75 0.15 75 / 0.3)", borderRadius: "0.375rem", color: "oklch(0.75 0.15 75)", fontSize: "0.72rem", cursor: "pointer" }}>
                      Concluir
                    </button>
                    <button onClick={() => updateStatus.mutate({ id: apt.id, status: "cancelled" })}
                      style={{ padding: "0.35rem 0.7rem", background: "oklch(0.65 0.2 25 / 0.1)", border: "1px solid oklch(0.65 0.2 25 / 0.3)", borderRadius: "0.375rem", color: "oklch(0.65 0.2 25)", fontSize: "0.72rem", cursor: "pointer" }}>
                      Cancelar
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ===== SERVICES TAB =====
function ServicesTab() {
  const { data: services, refetch } = trpc.services.listAll.useQuery();
  const [form, setForm] = useState({ name: "", description: "", price: "", durationMinutes: 30, icon: "✂️" });

  const createMutation = trpc.services.create.useMutation({ onSuccess: () => { refetch(); setForm({ name: "", description: "", price: "", durationMinutes: 30, icon: "✂️" }); toast.success("Serviço criado!"); } });
  const updateMutation = trpc.services.update.useMutation({ onSuccess: () => { refetch(); toast.success("Atualizado!"); } });
  const deleteMutation = trpc.services.delete.useMutation({ onSuccess: () => { refetch(); toast.success("Serviço removido!"); } });

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "oklch(0.92 0.01 60)", marginBottom: "1.5rem" }}>Serviços</h2>
      <div style={{ background: "oklch(0.12 0.008 60)", border: "1px solid oklch(0.2 0.01 60)", borderRadius: "0.75rem", padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.78rem", color: "oklch(0.75 0.15 75)", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Adicionar Serviço</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 80px", gap: "0.75rem" }}>
          <input placeholder="Nome do serviço" style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Ícone" style={inputStyle} value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} />
          <input placeholder="Preço (ex: 35.00)" style={inputStyle} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          <input type="number" placeholder="Min" style={inputStyle} value={form.durationMinutes} onChange={(e) => setForm({ ...form, durationMinutes: Number(e.target.value) })} />
          <input placeholder="Descrição" style={{ ...inputStyle, gridColumn: "1 / -1" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        </div>
        <button onClick={() => createMutation.mutate(form)} className="btn-gold" style={{ marginTop: "1rem", fontSize: "0.78rem" }}><span>Adicionar</span></button>
      </div>
      <div style={{ display: "grid", gap: "0.6rem" }}>
        {services?.map((s) => (
          <div key={s.id} style={{ background: "oklch(0.12 0.008 60)", border: "1px solid oklch(0.2 0.01 60)", borderRadius: "0.5rem", padding: "0.9rem 1.2rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
              <div>
                <div style={{ fontSize: "0.88rem", color: "oklch(0.88 0.01 60)", fontWeight: 500 }}>{s.name}</div>
                <div style={{ fontSize: "0.72rem", color: "oklch(0.55 0.01 60)" }}>R$ {Number(s.price).toFixed(2)} · {s.durationMinutes} min</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <button onClick={() => updateMutation.mutate({ id: s.id, active: !s.active })}
                style={{ padding: "0.3rem 0.65rem", background: s.active ? "oklch(0.65 0.18 145 / 0.1)" : "oklch(0.65 0.2 25 / 0.1)", border: `1px solid ${s.active ? "oklch(0.65 0.18 145 / 0.3)" : "oklch(0.65 0.2 25 / 0.3)"}`, borderRadius: "0.375rem", color: s.active ? "oklch(0.65 0.18 145)" : "oklch(0.65 0.2 25)", fontSize: "0.7rem", cursor: "pointer" }}>
                {s.active ? "Ativo" : "Inativo"}
              </button>
              <button onClick={() => { if (confirm("Remover este serviço?")) deleteMutation.mutate({ id: s.id }); }}
                style={{ padding: "0.3rem 0.65rem", background: "oklch(0.65 0.2 25 / 0.1)", border: "1px solid oklch(0.65 0.2 25 / 0.3)", borderRadius: "0.375rem", color: "oklch(0.65 0.2 25)", fontSize: "0.7rem", cursor: "pointer" }}>
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== BARBERS TAB =====
function BarbersTab() {
  const { data: barbers, refetch } = trpc.barbers.listAll.useQuery();
  const [form, setForm] = useState({ name: "", bio: "", specialty: "" });

  const createMutation = trpc.barbers.create.useMutation({ onSuccess: () => { refetch(); setForm({ name: "", bio: "", specialty: "" }); toast.success("Barbeiro adicionado!"); } });
  const updateMutation = trpc.barbers.update.useMutation({ onSuccess: () => { refetch(); toast.success("Atualizado!"); } });
  const deleteMutation = trpc.barbers.delete.useMutation({ onSuccess: () => { refetch(); toast.success("Removido!"); } });

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "oklch(0.92 0.01 60)", marginBottom: "1.5rem" }}>Barbeiros</h2>
      <div style={{ background: "oklch(0.12 0.008 60)", border: "1px solid oklch(0.2 0.01 60)", borderRadius: "0.75rem", padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.78rem", color: "oklch(0.75 0.15 75)", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Adicionar Barbeiro</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
          <input placeholder="Nome" style={inputStyle} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Especialidade" style={inputStyle} value={form.specialty} onChange={(e) => setForm({ ...form, specialty: e.target.value })} />
          <input placeholder="Bio" style={{ ...inputStyle, gridColumn: "1 / -1" }} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        </div>
        <button onClick={() => createMutation.mutate(form)} className="btn-gold" style={{ marginTop: "1rem", fontSize: "0.78rem" }}><span>Adicionar</span></button>
      </div>
      <div style={{ display: "grid", gap: "0.6rem" }}>
        {barbers?.map((b) => (
          <div key={b.id} style={{ background: "oklch(0.12 0.008 60)", border: "1px solid oklch(0.2 0.01 60)", borderRadius: "0.5rem", padding: "0.9rem 1.2rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg, oklch(0.75 0.15 75), oklch(0.68 0.16 72))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.95rem", fontWeight: 700, color: "oklch(0.08 0.005 60)", fontFamily: "'Playfair Display', serif", flexShrink: 0 }}>
                {b.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: "0.88rem", color: "oklch(0.88 0.01 60)", fontWeight: 500 }}>{b.name}</div>
                <div style={{ fontSize: "0.72rem", color: "oklch(0.55 0.01 60)" }}>{b.specialty || "Barbeiro"}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              <button onClick={() => updateMutation.mutate({ id: b.id, active: !b.active })}
                style={{ padding: "0.3rem 0.65rem", background: b.active ? "oklch(0.65 0.18 145 / 0.1)" : "oklch(0.65 0.2 25 / 0.1)", border: `1px solid ${b.active ? "oklch(0.65 0.18 145 / 0.3)" : "oklch(0.65 0.2 25 / 0.3)"}`, borderRadius: "0.375rem", color: b.active ? "oklch(0.65 0.18 145)" : "oklch(0.65 0.2 25)", fontSize: "0.7rem", cursor: "pointer" }}>
                {b.active ? "Ativo" : "Inativo"}
              </button>
              <button onClick={() => { if (confirm("Remover este barbeiro?")) deleteMutation.mutate({ id: b.id }); }}
                style={{ padding: "0.3rem 0.65rem", background: "oklch(0.65 0.2 25 / 0.1)", border: "1px solid oklch(0.65 0.2 25 / 0.3)", borderRadius: "0.375rem", color: "oklch(0.65 0.2 25)", fontSize: "0.7rem", cursor: "pointer" }}>
                Remover
              </button>
            </div>
          </div>
        ))}
        {(!barbers || barbers.length === 0) && (
          <div style={{ textAlign: "center", padding: "2rem", color: "oklch(0.45 0.01 60)", fontSize: "0.85rem" }}>Nenhum barbeiro cadastrado.</div>
        )}
      </div>
    </div>
  );
}

// ===== GALLERY TAB =====
function GalleryTab() {
  const { data: gallery, refetch } = trpc.gallery.listAll.useQuery();
  const [form, setForm] = useState({ imageUrl: "", caption: "", category: "corte" });

  const createMutation = trpc.gallery.create.useMutation({ onSuccess: () => { refetch(); setForm({ imageUrl: "", caption: "", category: "corte" }); toast.success("Foto adicionada!"); } });
  const deleteMutation = trpc.gallery.delete.useMutation({ onSuccess: () => { refetch(); toast.success("Foto removida!"); } });

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "oklch(0.92 0.01 60)", marginBottom: "1.5rem" }}>Galeria</h2>
      <div style={{ background: "oklch(0.12 0.008 60)", border: "1px solid oklch(0.2 0.01 60)", borderRadius: "0.75rem", padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.78rem", color: "oklch(0.75 0.15 75)", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Adicionar Foto</div>
        <div style={{ display: "grid", gap: "0.75rem" }}>
          <input placeholder="URL da imagem (https://...)" style={inputStyle} value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
            <input placeholder="Legenda" style={inputStyle} value={form.caption} onChange={(e) => setForm({ ...form, caption: e.target.value })} />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
              style={{ ...inputStyle, cursor: "pointer" }}>
              <option value="corte">Corte</option>
              <option value="barba">Barba</option>
              <option value="ambiente">Ambiente</option>
              <option value="outros">Outros</option>
            </select>
          </div>
        </div>
        <button onClick={() => createMutation.mutate(form)} disabled={!form.imageUrl} className="btn-gold" style={{ marginTop: "1rem", fontSize: "0.78rem", opacity: !form.imageUrl ? 0.5 : 1 }}><span>Adicionar</span></button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
        {gallery?.map((g) => (
          <div key={g.id} style={{ background: "oklch(0.12 0.008 60)", border: "1px solid oklch(0.2 0.01 60)", borderRadius: "0.5rem", overflow: "hidden" }}>
            <div style={{ width: "100%", height: "140px", overflow: "hidden", position: "relative" }}>
              <img src={g.imageUrl} alt={g.caption ?? ""} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>
            <div style={{ padding: "0.75rem" }}>
              <div style={{ fontSize: "0.78rem", color: "oklch(0.72 0.01 60)", marginBottom: "0.25rem" }}>{g.caption || "Sem legenda"}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.65rem", color: "oklch(0.45 0.01 60)", textTransform: "uppercase" }}>{g.category}</span>
                <button onClick={() => { if (confirm("Remover esta foto?")) deleteMutation.mutate({ id: g.id }); }}
                  style={{ padding: "0.25rem 0.55rem", background: "oklch(0.65 0.2 25 / 0.1)", border: "1px solid oklch(0.65 0.2 25 / 0.3)", borderRadius: "0.3rem", color: "oklch(0.65 0.2 25)", fontSize: "0.68rem", cursor: "pointer" }}>
                  Remover
                </button>
              </div>
            </div>
          </div>
        ))}
        {(!gallery || gallery.length === 0) && (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "2rem", color: "oklch(0.45 0.01 60)", fontSize: "0.85rem" }}>Nenhuma foto na galeria.</div>
        )}
      </div>
    </div>
  );
}

// ===== TESTIMONIALS TAB =====
function TestimonialsTab() {
  const { data: testimonials, refetch } = trpc.testimonials.listAll.useQuery();
  const [form, setForm] = useState({ clientName: "", rating: 5, comment: "" });

  const createMutation = trpc.testimonials.create.useMutation({ onSuccess: () => { refetch(); setForm({ clientName: "", rating: 5, comment: "" }); toast.success("Depoimento adicionado!"); } });
  const updateMutation = trpc.testimonials.update.useMutation({ onSuccess: () => { refetch(); toast.success("Atualizado!"); } });
  const deleteMutation = trpc.testimonials.delete.useMutation({ onSuccess: () => { refetch(); toast.success("Removido!"); } });

  return (
    <div>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: "oklch(0.92 0.01 60)", marginBottom: "1.5rem" }}>Depoimentos</h2>
      <div style={{ background: "oklch(0.12 0.008 60)", border: "1px solid oklch(0.2 0.01 60)", borderRadius: "0.75rem", padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ fontSize: "0.78rem", color: "oklch(0.75 0.15 75)", fontWeight: 600, marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Adicionar Depoimento</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "0.75rem" }}>
          <input placeholder="Nome do cliente" style={inputStyle} value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
          <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
            style={{ ...inputStyle, width: "80px" }}>
            {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} ⭐</option>)}
          </select>
          <textarea placeholder="Comentário do cliente" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })}
            style={{ ...inputStyle, gridColumn: "1 / -1", minHeight: "80px", resize: "vertical" }} />
        </div>
        <button onClick={() => createMutation.mutate(form)} disabled={!form.clientName || !form.comment} className="btn-gold" style={{ marginTop: "1rem", fontSize: "0.78rem", opacity: (!form.clientName || !form.comment) ? 0.5 : 1 }}><span>Adicionar</span></button>
      </div>

      <div style={{ display: "grid", gap: "0.75rem" }}>
        {testimonials?.map((t) => (
          <div key={t.id} style={{ background: "oklch(0.12 0.008 60)", border: "1px solid oklch(0.2 0.01 60)", borderRadius: "0.5rem", padding: "1rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                <span style={{ fontSize: "0.88rem", color: "oklch(0.88 0.01 60)", fontWeight: 500 }}>{t.clientName}</span>
                <span style={{ color: "oklch(0.75 0.15 75)", fontSize: "0.8rem" }}>{"★".repeat(t.rating)}</span>
              </div>
              <p style={{ fontSize: "0.82rem", color: "oklch(0.62 0.01 60)", margin: 0, lineHeight: 1.5 }}>{t.comment}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem", flexShrink: 0 }}>
              <button onClick={() => updateMutation.mutate({ id: t.id, active: !t.active })}
                style={{ padding: "0.28rem 0.6rem", background: t.active ? "oklch(0.65 0.18 145 / 0.1)" : "oklch(0.65 0.2 25 / 0.1)", border: `1px solid ${t.active ? "oklch(0.65 0.18 145 / 0.3)" : "oklch(0.65 0.2 25 / 0.3)"}`, borderRadius: "0.3rem", color: t.active ? "oklch(0.65 0.18 145)" : "oklch(0.65 0.2 25)", fontSize: "0.68rem", cursor: "pointer" }}>
                {t.active ? "Visível" : "Oculto"}
              </button>
              <button onClick={() => { if (confirm("Remover este depoimento?")) deleteMutation.mutate({ id: t.id }); }}
                style={{ padding: "0.28rem 0.6rem", background: "oklch(0.65 0.2 25 / 0.1)", border: "1px solid oklch(0.65 0.2 25 / 0.3)", borderRadius: "0.3rem", color: "oklch(0.65 0.2 25)", fontSize: "0.68rem", cursor: "pointer" }}>
                Remover
              </button>
            </div>
          </div>
        ))}
        {(!testimonials || testimonials.length === 0) && (
          <div style={{ textAlign: "center", padding: "2rem", color: "oklch(0.45 0.01 60)", fontSize: "0.85rem" }}>Nenhum depoimento cadastrado.</div>
        )}
      </div>
    </div>
  );
}

// ===== MAIN ADMIN PAGE =====
export default function Admin() {
  const [tab, setTab] = useState<AdminTab>("appointments");
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  const { data: adminCheck } = trpc.auth.checkAdmin.useQuery();
  const logoutMutation = trpc.auth.adminLogout.useMutation({
    onSuccess: () => { setIsAdmin(false); toast.success("Saiu do painel."); },
  });

  useEffect(() => {
    if (adminCheck !== undefined) {
      setIsAdmin(adminCheck.isAdmin);
      setChecking(false);
    }
  }, [adminCheck]);

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", background: "oklch(0.07 0.005 60)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.9rem" }}>Verificando acesso...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return <AdminLogin onLogin={() => setIsAdmin(true)} />;
  }

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: "appointments", label: "Agendamentos", icon: "📅" },
    { id: "services", label: "Serviços", icon: "✂️" },
    { id: "barbers", label: "Barbeiros", icon: "💈" },
    { id: "gallery", label: "Galeria", icon: "🖼️" },
    { id: "testimonials", label: "Depoimentos", icon: "⭐" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "oklch(0.07 0.005 60)" }}>
      {/* Header */}
      <div style={{ background: "oklch(0.09 0.006 60)", borderBottom: "1px solid oklch(0.18 0.01 60)", padding: "1rem 0", position: "sticky", top: 0, zIndex: 100 }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, background: "linear-gradient(135deg, oklch(0.88 0.12 80), oklch(0.75 0.15 75))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", letterSpacing: "0.1em" }}>
                GORDIM
              </div>
            </Link>
            <span style={{ color: "oklch(0.35 0.01 60)", fontSize: "0.8rem" }}>/</span>
            <span style={{ color: "oklch(0.55 0.01 60)", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Admin</span>
          </div>
          <button onClick={() => logoutMutation.mutate()} className="btn-outline-gold" style={{ padding: "0.4rem 1rem", fontSize: "0.75rem" }}>
            <span>Sair</span>
          </button>
        </div>
      </div>

      <div className="container" style={{ padding: "2rem 1.5rem" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{ padding: "0.55rem 1.1rem", borderRadius: "0.5rem", border: tab === t.id ? "none" : "1px solid oklch(0.22 0.01 60)", background: tab === t.id ? "linear-gradient(135deg, oklch(0.75 0.15 75), oklch(0.68 0.16 72))" : "oklch(0.12 0.008 60)", color: tab === t.id ? "oklch(0.08 0.005 60)" : "oklch(0.65 0.01 60)", fontSize: "0.8rem", cursor: "pointer", fontWeight: tab === t.id ? 600 : 400, display: "flex", alignItems: "center", gap: "0.4rem", transition: "all 0.2s ease" }}>
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ background: "oklch(0.10 0.007 60)", border: "1px solid oklch(0.18 0.01 60)", borderRadius: "1rem", padding: "2rem", minHeight: "500px" }}>
          {tab === "appointments" && <AppointmentsTab />}
          {tab === "services" && <ServicesTab />}
          {tab === "barbers" && <BarbersTab />}
          {tab === "gallery" && <GalleryTab />}
          {tab === "testimonials" && <TestimonialsTab />}
        </div>
      </div>
    </div>
  );
}
