import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock db module
vi.mock("./db", () => ({
  getServices: vi.fn().mockResolvedValue([
    { id: 1, name: "Corte Masculino", description: "Corte clássico", price: "35.00", durationMinutes: 30, icon: "✂️", active: true, sortOrder: 1 },
    { id: 2, name: "Barba Completa", description: "Barba premium", price: "30.00", durationMinutes: 30, icon: "🪒", active: true, sortOrder: 2 },
  ]),
  getBarbers: vi.fn().mockResolvedValue([
    { id: 1, name: "Gordim", bio: "Fundador", specialty: "Degradê", active: true, sortOrder: 1 },
  ]),
  getWorkingHours: vi.fn().mockResolvedValue([
    { id: 1, barberId: 1, dayOfWeek: 1, startTime: "09:00:00", endTime: "19:30:00", active: true },
    { id: 2, barberId: 1, dayOfWeek: 2, startTime: "09:00:00", endTime: "19:30:00", active: true },
    { id: 3, barberId: 1, dayOfWeek: 3, startTime: "09:00:00", endTime: "19:30:00", active: true },
    { id: 4, barberId: 1, dayOfWeek: 4, startTime: "09:00:00", endTime: "19:30:00", active: true },
    { id: 5, barberId: 1, dayOfWeek: 5, startTime: "09:00:00", endTime: "19:30:00", active: true },
    { id: 6, barberId: 1, dayOfWeek: 6, startTime: "08:00:00", endTime: "17:00:00", active: true },
  ]),
  getAppointments: vi.fn().mockResolvedValue([]),
  getAppointmentById: vi.fn().mockResolvedValue(null),
  createAppointment: vi.fn().mockResolvedValue({ id: 1 }),
  updateAppointmentStatus: vi.fn().mockResolvedValue(undefined),
  getBookedTimesForDate: vi.fn().mockResolvedValue([]),
  getGallery: vi.fn().mockResolvedValue([
    { id: 1, imageUrl: "/manus-storage/haircut-1.jpg", caption: "Corte", category: "corte", active: true, sortOrder: 1 },
  ]),
  createGalleryItem: vi.fn().mockResolvedValue(undefined),
  deleteGalleryItem: vi.fn().mockResolvedValue(undefined),
  getTestimonials: vi.fn().mockResolvedValue([
    { id: 1, clientName: "Carlos", rating: 5, comment: "Ótimo!", active: true, sortOrder: 1 },
  ]),
  createTestimonial: vi.fn().mockResolvedValue(undefined),
  updateTestimonial: vi.fn().mockResolvedValue(undefined),
  deleteTestimonial: vi.fn().mockResolvedValue(undefined),
  createService: vi.fn().mockResolvedValue(undefined),
  updateService: vi.fn().mockResolvedValue(undefined),
  deleteService: vi.fn().mockResolvedValue(undefined),
  createBarber: vi.fn().mockResolvedValue(undefined),
  updateBarber: vi.fn().mockResolvedValue(undefined),
  deleteBarber: vi.fn().mockResolvedValue(undefined),
  getSetting: vi.fn().mockResolvedValue(null),
  setSetting: vi.fn().mockResolvedValue(undefined),
  getBarberById: vi.fn().mockResolvedValue({ id: 1, name: "Gordim", active: true }),
  getServiceById: vi.fn().mockResolvedValue({ id: 1, name: "Corte Masculino" }),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(null),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicCtx(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: { cookie: "" },
      cookies: {},
    } as TrpcContext["req"],
    res: {
      cookie: vi.fn(),
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("services router", () => {
  it("lists active services", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.services.list();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("price");
  });
});

describe("barbers router", () => {
  it("lists active barbers", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.barbers.list();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty("name", "Gordim");
  });
});

describe("gallery router", () => {
  it("lists gallery items", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.gallery.list();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty("imageUrl");
  });
});

describe("testimonials router", () => {
  it("lists testimonials", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.testimonials.list();
    expect(Array.isArray(result)).toBe(true);
    expect(result[0]).toHaveProperty("clientName", "Carlos");
    expect(result[0]).toHaveProperty("rating", 5);
  });
});

describe("appointments router", () => {
  it("returns available times for a barber on a weekday", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    // Use a Monday (2026-04-27 is a Monday)
    const result = await caller.appointments.getAvailableTimes({
      barberId: 1,
      date: "2026-04-28",
    });
    expect(result).toHaveProperty("available");
    expect(result).toHaveProperty("booked");
    expect(Array.isArray(result.available)).toBe(true);
    // Should have slots from 09:00 to 19:00 (30 min intervals)
    expect(result.available.length).toBeGreaterThan(0);
    expect(result.available[0]).toBe("09:00");
  });

  it("creates an appointment and returns whatsapp URL", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.appointments.create({
      clientName: "João Teste",
      clientPhone: "69999999999",
      serviceId: 1,
      barberId: 1,
      appointmentDate: "2026-05-01",
      appointmentTime: "10:00",
    });
    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("whatsappUrl");
    expect(result.whatsappUrl).toContain("wa.me");
    // URL is encoded, so check for encoded version
    expect(result.whatsappUrl).toContain("Jo%C3%A3o");
  });

  it("rejects appointment when slot is already booked", async () => {
    const { getBookedTimesForDate } = await import("./db");
    vi.mocked(getBookedTimesForDate).mockResolvedValueOnce(["10:00"]);

    const caller = appRouter.createCaller(createPublicCtx());
    await expect(
      caller.appointments.create({
        clientName: "Maria Teste",
        clientPhone: "69988888888",
        serviceId: 1,
        barberId: 1,
        appointmentDate: "2026-05-01",
        appointmentTime: "10:00",
      })
    ).rejects.toThrow("Este horário já está ocupado");
  });
});

describe("auth router", () => {
  it("checkAdmin returns false when no admin cookie", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    const result = await caller.auth.checkAdmin();
    expect(result).toEqual({ isAdmin: false });
  });

  it("adminLogin fails with wrong password", async () => {
    const caller = appRouter.createCaller(createPublicCtx());
    await expect(caller.auth.adminLogin({ password: "wrongpassword" })).rejects.toThrow();
  });

  it("adminLogin succeeds with correct password", async () => {
    const ctx = createPublicCtx();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.adminLogin({ password: "gordim2024" });
    expect(result).toEqual({ success: true });
    expect(ctx.res.cookie).toHaveBeenCalledWith("gordim_admin", "1", expect.any(Object));
  });
});
