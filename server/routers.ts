import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { notifyOwner } from "./_core/notification";
import * as dbWrapper from "./dbWrapper";

// Admin password check helper
async function checkAdminPassword(password: string) {
  const defaultPassword = "gordim2024";
  return password === defaultPassword;
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
    list: publicProcedure.query(() => dbWrapper.getServices()),
    listAll: publicProcedure.query(() => dbWrapper.getAllServices()),
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          description: z.string().optional(),
          price: z.string(),
          durationMinutes: z.number().min(5),
          icon: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await dbWrapper.createService({
          name: input.name,
          description: input.description,
          price: input.price,
          durationMinutes: input.durationMinutes,
          icon: input.icon ?? "✂️",
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
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await dbWrapper.updateService(id, data);
        return { success: true };
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await dbWrapper.deleteService(input.id);
        return { success: true };
      }),
  }),

  // Public: Barbers
  barbers: router({
    list: publicProcedure.query(() => dbWrapper.getBarbers()),
    listAll: publicProcedure.query(() => dbWrapper.getAllBarbers()),
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1),
          bio: z.string().optional(),
          specialty: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await dbWrapper.createBarber(input);
        return { success: true };
      }),
    update: publicProcedure
      .input(
        z.object({
          id: z.number(),
          name: z.string().optional(),
          bio: z.string().optional(),
          specialty: z.string().optional(),
          active: z.boolean().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { id, ...data } = input;
        await dbWrapper.updateBarber(id, data);
        return { success: true };
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await dbWrapper.deleteBarber(input.id);
        return { success: true };
      }),
  }),

  // Public: Appointments
  appointments: router({
    getAvailableTimes: publicProcedure
      .input(z.object({ barberId: z.number(), date: z.string() }))
      .query(async ({ input }) => {
        const barbers = await dbWrapper.getBarbers();
        const barber = barbers.find(b => b.id === input.barberId);
        if (!barber) throw new TRPCError({ code: "NOT_FOUND" });

        // Generate time slots every 30 min (9:00 to 18:00)
        const slots: string[] = [];
        for (let h = 9; h < 18; h++) {
          for (let m = 0; m < 60; m += 30) {
            const hStr = h.toString().padStart(2, "0");
            const mStr = m.toString().padStart(2, "0");
            slots.push(`${hStr}:${mStr}`);
          }
        }

        // Get booked times for this date
        const appointments = await dbWrapper.getAppointments({
          dateFrom: input.date,
          dateTo: input.date,
        });
        const bookedTimes = appointments
          .filter(a => a.barberId === input.barberId && a.status !== "cancelled")
          .map(a => a.appointmentTime.substring(0, 5));

        const available = slots.filter(s => !bookedTimes.includes(s));

        return { available, booked: bookedTimes };
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
        const appointments = await dbWrapper.getAppointments({
          dateFrom: input.appointmentDate,
          dateTo: input.appointmentDate,
        });
        const bookedTimes = appointments
          .filter(a => a.barberId === input.barberId && a.status !== "cancelled")
          .map(a => a.appointmentTime.substring(0, 5));

        if (bookedTimes.includes(input.appointmentTime)) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Este horário já está ocupado. Por favor, escolha outro.",
          });
        }

        const appointment = await dbWrapper.createAppointment({
          clientName: input.clientName,
          clientPhone: input.clientPhone,
          clientEmail: input.clientEmail,
          serviceId: input.serviceId,
          barberId: input.barberId,
          appointmentDate: new Date(input.appointmentDate),
          appointmentTime: input.appointmentTime,
          notes: input.notes,
        });

        // Fetch service and barber names for notification
        const services = await dbWrapper.getServices();
        const service = services.find(s => s.id === input.serviceId);
        const barbers = await dbWrapper.getBarbers();
        const barber = barbers.find(b => b.id === input.barberId);

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
          dateFrom: z.string().optional(),
          dateTo: z.string().optional(),
        }).optional()
      )
      .query(({ input }) => dbWrapper.getAppointments(input)),

    updateStatus: publicProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum(["pending", "confirmed", "cancelled", "completed"]),
        })
      )
      .mutation(async ({ input }) => {
        await dbWrapper.updateAppointment(input.id, { status: input.status });
        return { success: true };
      }),
  }),

  // Public: Gallery
  gallery: router({
    list: publicProcedure.query(() => dbWrapper.getGallery()),
    listAll: publicProcedure.query(() => dbWrapper.getAllGallery()),
    create: publicProcedure
      .input(
        z.object({
          imageUrl: z.string().url(),
          caption: z.string().optional(),
          category: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        await dbWrapper.createGalleryImage({
          imageUrl: input.imageUrl,
          caption: input.caption,
          category: input.category ?? "geral",
        });
        return { success: true };
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await dbWrapper.deleteGalleryImage(input.id);
        return { success: true };
      }),
  }),

  // Public: Testimonials
  testimonials: router({
    list: publicProcedure.query(() => dbWrapper.getTestimonials()),
    listAll: publicProcedure.query(() => dbWrapper.getAllTestimonials()),
    create: publicProcedure
      .input(
        z.object({
          clientName: z.string().min(2),
          rating: z.number().min(1).max(5),
          comment: z.string().min(5),
        })
      )
      .mutation(async ({ input }) => {
        await dbWrapper.createTestimonial(input);
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
        await dbWrapper.updateTestimonial(id, data);
        return { success: true };
      }),
    delete: publicProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await dbWrapper.deleteTestimonial(input.id);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
