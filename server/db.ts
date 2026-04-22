import { and, eq, ne, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  appointments,
  barbers,
  gallery,
  services,
  siteSettings,
  testimonials,
  users,
  workingHours,
  type InsertAppointment,
  type InsertBarber,
  type InsertGallery,
  type InsertService,
  type InsertTestimonial,
  type InsertWorkingHour,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ---- Users ----
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (!db) return;

  const values: InsertUser = { openId: user.openId };
  const updateSet: Record<string, unknown> = {};
  const textFields = ["name", "email", "loginMethod"] as const;
  type TextField = (typeof textFields)[number];
  const assignNullable = (field: TextField) => {
    const value = user[field];
    if (value === undefined) return;
    const normalized = value ?? null;
    values[field] = normalized;
    updateSet[field] = normalized;
  };
  textFields.forEach(assignNullable);
  if (user.lastSignedIn !== undefined) {
    values.lastSignedIn = user.lastSignedIn;
    updateSet.lastSignedIn = user.lastSignedIn;
  }
  if (user.role !== undefined) {
    values.role = user.role;
    updateSet.role = user.role;
  } else if (user.openId === ENV.ownerOpenId) {
    values.role = "admin";
    updateSet.role = "admin";
  }
  if (!values.lastSignedIn) values.lastSignedIn = new Date();
  if (Object.keys(updateSet).length === 0) updateSet.lastSignedIn = new Date();
  await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// ---- Services ----
export async function getServices(activeOnly = true) {
  const db = await getDb();
  if (!db) return [];
  if (activeOnly) {
    return db.select().from(services).where(eq(services.active, true));
  }
  return db.select().from(services);
}

export async function getServiceById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(services).where(eq(services.id, id)).limit(1);
  return result[0];
}

export async function createService(data: InsertService) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(services).values(data);
  return result;
}

export async function updateService(id: number, data: Partial<InsertService>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.update(services).set(data).where(eq(services.id, id));
}

export async function deleteService(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.update(services).set({ active: false }).where(eq(services.id, id));
}

// ---- Barbers ----
export async function getBarbers(activeOnly = true) {
  const db = await getDb();
  if (!db) return [];
  if (activeOnly) {
    return db.select().from(barbers).where(eq(barbers.active, true));
  }
  return db.select().from(barbers);
}

export async function getBarberById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(barbers).where(eq(barbers.id, id)).limit(1);
  return result[0];
}

export async function createBarber(data: InsertBarber) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.insert(barbers).values(data);
}

export async function updateBarber(id: number, data: Partial<InsertBarber>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.update(barbers).set(data).where(eq(barbers.id, id));
}

export async function deleteBarber(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.update(barbers).set({ active: false }).where(eq(barbers.id, id));
}

// ---- Working Hours ----
export async function getWorkingHours(barberId?: number) {
  const db = await getDb();
  if (!db) return [];
  if (barberId !== undefined) {
    return db
      .select()
      .from(workingHours)
      .where(and(eq(workingHours.barberId, barberId), eq(workingHours.active, true)));
  }
  return db.select().from(workingHours).where(eq(workingHours.active, true));
}

export async function upsertWorkingHours(data: InsertWorkingHour[]) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  for (const wh of data) {
    await db.insert(workingHours).values(wh).onDuplicateKeyUpdate({ set: wh });
  }
}

// ---- Appointments ----
export async function getAppointments(filters?: {
  barberId?: number;
  dateFrom?: string;
  dateTo?: string;
  status?: string;
}) {
  const db = await getDb();
  if (!db) return [];
  const conditions = [];
  if (filters?.barberId) conditions.push(eq(appointments.barberId, filters.barberId));
  if (filters?.dateFrom) conditions.push(sql`${appointments.appointmentDate} >= ${filters.dateFrom}`);
  if (filters?.dateTo) conditions.push(sql`${appointments.appointmentDate} <= ${filters.dateTo}`);
  if (filters?.status)
    conditions.push(
      eq(
        appointments.status,
        filters.status as "pending" | "confirmed" | "cancelled" | "completed"
      )
    );
  if (conditions.length > 0) {
    return db.select().from(appointments).where(and(...conditions));
  }
  return db.select().from(appointments);
}

export async function getAppointmentById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(appointments).where(eq(appointments.id, id)).limit(1);
  return result[0];
}

export async function createAppointment(data: InsertAppointment) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  const result = await db.insert(appointments).values(data);
  return result;
}

export async function updateAppointmentStatus(
  id: number,
  status: "pending" | "confirmed" | "cancelled" | "completed"
) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.update(appointments).set({ status }).where(eq(appointments.id, id));
}

export async function getBookedTimesForDate(barberId: number, date: string) {
  const db = await getDb();
  if (!db) return [];
  const result = await db
    .select({ time: appointments.appointmentTime })
    .from(appointments)
    .where(
      and(
        eq(appointments.barberId, barberId),
        sql`${appointments.appointmentDate} = ${date}`,
        ne(appointments.status, "cancelled")
      )
    );
  return result.map((r) => r.time);
}

// ---- Gallery ----
export async function getGallery(activeOnly = true) {
  const db = await getDb();
  if (!db) return [];
  if (activeOnly) {
    return db.select().from(gallery).where(eq(gallery.active, true));
  }
  return db.select().from(gallery);
}

export async function createGalleryItem(data: InsertGallery) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.insert(gallery).values(data);
}

export async function deleteGalleryItem(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.update(gallery).set({ active: false }).where(eq(gallery.id, id));
}

// ---- Testimonials ----
export async function getTestimonials(activeOnly = true) {
  const db = await getDb();
  if (!db) return [];
  if (activeOnly) {
    return db.select().from(testimonials).where(eq(testimonials.active, true));
  }
  return db.select().from(testimonials);
}

export async function createTestimonial(data: InsertTestimonial) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.insert(testimonials).values(data);
}

export async function updateTestimonial(id: number, data: Partial<InsertTestimonial>) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.update(testimonials).set(data).where(eq(testimonials.id, id));
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db.update(testimonials).set({ active: false }).where(eq(testimonials.id, id));
}

// ---- Site Settings ----
export async function getSetting(key: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1);
  return result[0]?.value ?? null;
}

export async function setSetting(key: string, value: string) {
  const db = await getDb();
  if (!db) throw new Error("DB not available");
  return db
    .insert(siteSettings)
    .values({ key, value })
    .onDuplicateKeyUpdate({ set: { value } });
}
