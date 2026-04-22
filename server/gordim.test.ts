import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";
import * as dbWrapper from "./dbWrapper";

// Mock dbWrapper
vi.mock("./dbWrapper", () => ({
  getServices: vi.fn().mockResolvedValue([
    { id: 1, name: "Corte Masculino", description: "Corte clássico", price: "35.00", durationMinutes: 30, icon: "✂️", active: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: "Barba Completa", description: "Barba premium", price: "30.00", durationMinutes: 30, icon: "🪒", active: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
  ]),
  getAllServices: vi.fn().mockResolvedValue([
    { id: 1, name: "Corte Masculino", description: "Corte clássico", price: "35.00", durationMinutes: 30, icon: "✂️", active: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: "Barba Completa", description: "Barba premium", price: "30.00", durationMinutes: 30, icon: "🪒", active: true, sortOrder: 2, createdAt: new Date(), updatedAt: new Date() },
  ]),
  getBarbers: vi.fn().mockResolvedValue([
    { id: 1, name: "Gordim", bio: "Fundador", specialty: "Degradê", active: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
  ]),
  getAllBarbers: vi.fn().mockResolvedValue([
    { id: 1, name: "Gordim", bio: "Fundador", specialty: "Degradê", active: true, sortOrder: 1, createdAt: new Date(), updatedAt: new Date() },
  ]),
  getAppointments: vi.fn().mockResolvedValue([]),
  createAppointment: vi.fn().mockResolvedValue({ id: 1, clientName: "Test", clientPhone: "123456789", serviceId: 1, barberId: 1, appointmentDate: new Date(), appointmentTime: "10:00", status: "pending", createdAt: new Date(), updatedAt: new Date() }),
  updateAppointment: vi.fn().mockResolvedValue(undefined),
  getGallery: vi.fn().mockResolvedValue([
    { id: 1, imageUrl: "/manus-storage/haircut-1.jpg", caption: "Corte", category: "corte", active: true, sortOrder: 1, createdAt: new Date() },
  ]),
  getAllGallery: vi.fn().mockResolvedValue([
    { id: 1, imageUrl: "/manus-storage/haircut-1.jpg", caption: "Corte", category: "corte", active: true, sortOrder: 1, createdAt: new Date() },
  ]),
  createGalleryImage: vi.fn().mockResolvedValue(undefined),
  deleteGalleryImage: vi.fn().mockResolvedValue(true),
  getTestimonials: vi.fn().mockResolvedValue([
    { id: 1, clientName: "Carlos", rating: 5, comment: "Ótimo!", active: true, sortOrder: 1, createdAt: new Date() },
  ]),
  getAllTestimonials: vi.fn().mockResolvedValue([
    { id: 1, clientName: "Carlos", rating: 5, comment: "Ótimo!", active: true, sortOrder: 1, createdAt: new Date() },
  ]),
  createTestimonial: vi.fn().mockResolvedValue(undefined),
  updateTestimonial: vi.fn().mockResolvedValue(undefined),
  deleteTestimonial: vi.fn().mockResolvedValue(true),
  createService: vi.fn().mockResolvedValue(undefined),
  updateService: vi.fn().mockResolvedValue(undefined),
  deleteService: vi.fn().mockResolvedValue(true),
  createBarber: vi.fn().mockResolvedValue(undefined),
  updateBarber: vi.fn().mockResolvedValue(undefined),
  deleteBarber: vi.fn().mockResolvedValue(true),
  isUseMockDatabase: vi.fn().mockReturnValue(true),
}));

function createPublicCtx(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: { cookie: "" },
    } as TrpcContext["req"],
    res: {
      cookie: vi.fn(),
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("Gordim Barbearia API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("services router", () => {
    it("should list services", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const services = await caller.services.list();
      expect(services).toHaveLength(2);
      expect(services[0]?.name).toBe("Corte Masculino");
    });

    it("should create a service", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const result = await caller.services.create({
        name: "Corte Premium",
        description: "Corte com design exclusivo",
        price: "50.00",
        durationMinutes: 45,
        icon: "✂️",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("barbers router", () => {
    it("should list barbers", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const barbers = await caller.barbers.list();
      expect(barbers).toHaveLength(1);
      expect(barbers[0]?.name).toBe("Gordim");
    });

    it("should create a barber", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const result = await caller.barbers.create({
        name: "João",
        bio: "Barbeiro experiente",
        specialty: "Cortes modernos",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("appointments router", () => {
    it("should get available times", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const result = await caller.appointments.getAvailableTimes({
        barberId: 1,
        date: "2026-04-25",
      });
      expect(result.available).toBeDefined();
      expect(Array.isArray(result.available)).toBe(true);
    });

    it("should create an appointment", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const result = await caller.appointments.create({
        clientName: "Pedro Silva",
        clientPhone: "11999999999",
        clientEmail: "pedro@example.com",
        serviceId: 1,
        barberId: 1,
        appointmentDate: "2026-04-25",
        appointmentTime: "10:00",
      });
      expect(result.success).toBe(true);
      expect(result.whatsappUrl).toContain("wa.me");
    });

    it("should list appointments", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const appointments = await caller.appointments.list();
      expect(Array.isArray(appointments)).toBe(true);
    });

    it("should update appointment status", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const result = await caller.appointments.updateStatus({
        id: 1,
        status: "confirmed",
      });
      expect(result.success).toBe(true);
    });
  });

  describe("gallery router", () => {
    it("should list gallery images", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const gallery = await caller.gallery.list();
      expect(gallery).toHaveLength(1);
      expect(gallery[0]?.imageUrl).toContain("haircut");
    });

    it("should create gallery image", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const result = await caller.gallery.create({
        imageUrl: "https://example.com/image.jpg",
        caption: "Novo corte",
        category: "corte",
      });
      expect(result.success).toBe(true);
    });

    it("should delete gallery image", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const result = await caller.gallery.delete({ id: 1 });
      expect(result.success).toBe(true);
    });
  });

  describe("testimonials router", () => {
    it("should list testimonials", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const testimonials = await caller.testimonials.list();
      expect(testimonials).toHaveLength(1);
      expect(testimonials[0]?.clientName).toBe("Carlos");
      expect(testimonials[0]?.rating).toBe(5);
    });

    it("should create testimonial", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const result = await caller.testimonials.create({
        clientName: "Lucas",
        rating: 5,
        comment: "Excelente atendimento!",
      });
      expect(result.success).toBe(true);
    });

    it("should update testimonial", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const result = await caller.testimonials.update({
        id: 1,
        clientName: "Carlos Silva",
        active: true,
      });
      expect(result.success).toBe(true);
    });

    it("should delete testimonial", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const result = await caller.testimonials.delete({ id: 1 });
      expect(result.success).toBe(true);
    });
  });

  describe("auth router", () => {
    it("should check admin status", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      const result = await caller.auth.checkAdmin();
      expect(result.isAdmin).toBe(false);
    });

    it("should login with correct password", async () => {
      const ctx = createPublicCtx();
      const caller = appRouter.createCaller(ctx);
      const result = await caller.auth.adminLogin({ password: "gordim2024" });
      expect(result.success).toBe(true);
    });

    it("should reject incorrect password", async () => {
      const caller = appRouter.createCaller(createPublicCtx());
      await expect(
        caller.auth.adminLogin({ password: "wrongpassword" })
      ).rejects.toThrow("Senha incorreta");
    });
  });
});
