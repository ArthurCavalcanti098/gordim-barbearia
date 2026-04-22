import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import {
  getServices,
  getBarbers,
  getWorkingHours,
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointmentStatus,
  getBookedTimesForDate,
  getGallery,
  createGalleryItem,
  deleteGalleryItem,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  createService,
  updateService,
  deleteService,
  createBarber,
  updateBarber,
  deleteBarber,
  getSetting,
  setSetting,
  getBarberById,
  getServiceById,
} from "./db";

// Admin password check helper
async function checkAdminPassword(password: string) {
  const storedHash = await getSetting("admin_password");
  // Default password if not set
  const defaultPassword = "gordim2024";
  return password === (storedHash ?? defaultPassword);
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
    adminLogin: publicProcedure
      .input(z.object({ password: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const valid = await checkAdminPassword(input.password);
        if (!valid) throw new TRPCError({ code: "UNAUTHORIZED", message: "Senha incorreta" });
        // Set admin session cookie
        ctx.res.cookie("gordim_admin", "1", {
          httpOnly: true,
          secure: ctx.req.protocol === "https",
          sameSite: "strict",
          maxAge: 60 * 60 * 8 * 1000, // 8 hours
          path: "/",
        });
        return { success: true };
      }),
    adminLogout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie("gordim_admin", { path: "/" });
      return { success: true };
    }),
    checkAdmin: publicProcedure.query(({ ctx }) => {
      const { parse: parseCookies } = require("cookie");
      const cookieHeader = ctx.req.headers.cookie ?? "";
      const cookies = parseCookies(cookieHeader);
      return { isAdmin: cookies.gordim_admin === "1" };
    }),
  }),

  // Public: Services
  services: router({
    list: publicProcedure.query(() => getServices(true)),
    listAll: publicProcedure.query(() => getServices(false)),
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          description: z.string().optional(),
          price: z.string(),
          durationMinutes: z.number().min(5),
          icon: z.string().optional(),
          sortOrder: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createService({
          name: input.name,
          description: input.description,
          price: input.price,
          durationMinutes: input.durationMinutes,
          icon: input.icon ?? "scissors",
          sortOrder: input.sortOrder ?? 0,
          active: true,
        });
        return { success: true };
      }),
    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().min(1).optional(),
          description: z.string().optional(),
          price: z.string().optional(),
          durationMinutes: z.number().min(5).optional(),
          icon: z.string().optional(),
          active: z.boolean().optional(),
          sortOrder: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateService(id, data);
        return { success: true };
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteService(input.id);
        return { success: true };
      }),
  }),

  // Public: Barbers
  barbers: router({
    list: publicProcedure.query(() => getBarbers(true)),
    listAll: publicProcedure.query(() => getBarbers(false)),
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          bio: z.string().optional(),
          photoUrl: z.string().optional(),
          specialty: z.string().optional(),
          sortOrder: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createBarber({ ...input, active: true });
        return { success: true };
      }),
    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          bio: z.string().optional(),
          photoUrl: z.string().optional(),
          specialty: z.string().optional(),
          active: z.boolean().optional(),
          sortOrder: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateBarber(id, data);
        return { success: true };
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteBarber(input.id);
        return { success: true };
      }),
    workingHours: publicProcedure
      .input(z.object({ barberId: z.number() }))
      .query(({ input }) => getWorkingHours(input.barberId)),
  }),

  // Public: Appointments
  appointments: router({
    getAvailableTimes: publicProcedure
      .input(z.object({ barberId: z.number(), date: z.string() }))
      .query(async ({ input }) => {
        const barber = await getBarberById(input.barberId);
        if (!barber) throw new TRPCError({ code: "NOT_FOUND" });

        // Parse day of week from date string
        const dateObj = new Date(input.date + "T12:00:00");
        const dayOfWeek = dateObj.getDay();

        const workHours = await getWorkingHours(input.barberId);
        const todayHours = workHours.find((wh) => wh.dayOfWeek === dayOfWeek);

        if (!todayHours) return { available: [], booked: [] };

        // Generate time slots every 30 min
        const slots: string[] = [];
        const [startH, startM] = todayHours.startTime.split(":").map(Number);
        const [endH, endM] = todayHours.endTime.split(":").map(Number);
        let current = startH * 60 + startM;
        const end = endH * 60 + endM;
        while (current + 30 <= end) {
          const h = Math.floor(current / 60).toString().padStart(2, "0");
          const m = (current % 60).toString().padStart(2, "0");
          slots.push(`${h}:${m}`);
          current += 30;
        }

        const booked = await getBookedTimesForDate(input.barberId, input.date);
        const bookedStrings = booked.map((t) => {
          if (typeof t === "string") return t.substring(0, 5);
          return t;
        });
        const available = slots.filter((s) => !bookedStrings.includes(s));

        return { available, booked: bookedStrings };
      }),

    create: publicProcedure
      .input(
        z.object({
          clientName: z.string().min(2),
          clientPhone: z.string().min(8),
          clientEmail: z.string().email().optional(),
          serviceId: z.number(),
          barberId: z.number(),
          appointmentDate: z.string(),
          appointmentTime: z.string(),
          notes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        // Check if slot is still available
        const booked = await getBookedTimesForDate(input.barberId, input.appointmentDate);
        const bookedStrings = booked.map((t) => {
          if (typeof t === "string") return t.substring(0, 5);
          return String(t);
        });
        if (bookedStrings.includes(input.appointmentTime)) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Este horário já está ocupado. Por favor, escolha outro.",
          });
        }

        await createAppointment({
          clientName: input.clientName,
          clientPhone: input.clientPhone,
          clientEmail: input.clientEmail,
          serviceId: input.serviceId,
          barberId: input.barberId,
          appointmentDate: input.appointmentDate as unknown as Date,
          appointmentTime: input.appointmentTime,
          notes: input.notes,
          status: "pending",
        });

        // Fetch service and barber names for notification
        const service = await getServiceById(input.serviceId);
        const barber = await getBarberById(input.barberId);

        // Notify owner
        try {
          await notifyOwner({
            title: "🗓️ Novo Agendamento - Gordim Barbearia",
            content: `**Novo agendamento recebido!**\n\n` +
              `👤 **Cliente:** ${input.clientName}\n` +
              `📱 **Telefone:** ${input.clientPhone}\n` +
              `✂️ **Serviço:** ${service?.name ?? "N/A"}\n` +
              `💈 **Barbeiro:** ${barber?.name ?? "N/A"}\n` +
              `📅 **Data:** ${input.appointmentDate}\n` +
              `🕐 **Horário:** ${input.appointmentTime}\n` +
              `${input.notes ? `📝 **Obs:** ${input.notes}` : ""}`,
          });
        } catch (e) {
          console.error("Failed to notify owner:", e);
        }

        // Build WhatsApp message
        const whatsappMsg = encodeURIComponent(
          `Olá! Meu agendamento foi confirmado:\n` +
          `Nome: ${input.clientName}\n` +
          `Serviço: ${service?.name ?? ""}\n` +
          `Barbeiro: ${barber?.name ?? ""}\n` +
          `Data: ${input.appointmentDate}\n` +
          `Horário: ${input.appointmentTime}`
        );
        const whatsappUrl = `https://wa.me/5569993135258?text=${whatsappMsg}`;

        return { success: true, whatsappUrl };
      }),

    list: publicProcedure
      .input(
        z.object({
          barberId: z.number().optional(),
          dateFrom: z.string().optional(),
          dateTo: z.string().optional(),
          status: z.string().optional(),
        }).optional()
      )
      .query(({ input }) => getAppointments(input)),

    updateStatus: publicProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
        })
      )
      .mutation(async ({ input }) => {
        await updateAppointmentStatus(input.id, input.status);
        return { success: true };
      }),
  }),

  // Public: Gallery
  gallery: router({
    list: publicProcedure.query(() => getGallery(true)),
    listAll: publicProcedure.query(() => getGallery(false)),
    create: publicProcedure
      .input(
        z.object({
          imageUrl: z.string().url(),
          caption: z.string().optional(),
          category: z.string().optional(),
          sortOrder: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createGalleryItem({ ...input, active: true });
        return { success: true };
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteGalleryItem(input.id);
        return { success: true };
      }),
  }),

  // Public: Testimonials
  testimonials: router({
    list: publicProcedure.query(() => getTestimonials(true)),
    listAll: publicProcedure.query(() => getTestimonials(false)),
    create: publicProcedure
      .input(
        z.object({
          clientName: z.string().min(2),
          rating: z.number().min(1).max(5),
          comment: z.string().min(5),
          sortOrder: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await createTestimonial({ ...input, active: true });
        return { success: true };
      }),
    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          clientName: z.string().optional(),
          rating: z.number().min(1).max(5).optional(),
          comment: z.string().optional(),
          active: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await updateTestimonial(id, data);
        return { success: true };
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteTestimonial(input.id);
        return { success: true };
      }),
  }),

  // Settings
  settings: router({
    get: publicProcedure
      .input(z.object({ key: z.string() }))
      .query(({ input }) => getSetting(input.key)),
    set: publicProcedure
      .input(z.object({ key: z.string(), value: z.string() }))
      .mutation(async ({ input }) => {
        await setSetting(input.key, input.value);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
