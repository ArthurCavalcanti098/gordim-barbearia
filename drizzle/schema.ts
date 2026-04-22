import {
  boolean,
  int,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
  decimal,
  time,
  date,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Serviços oferecidos pela barbearia
export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  durationMinutes: int("durationMinutes").notNull().default(30),
  icon: varchar("icon", { length: 50 }).default("scissors"),
  active: boolean("active").default(true).notNull(),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Service = typeof services.$inferSelect;
export type InsertService = typeof services.$inferInsert;

// Barbeiros
export const barbers = mysqlTable("barbers", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  bio: text("bio"),
  photoUrl: text("photoUrl"),
  specialty: varchar("specialty", { length: 200 }),
  active: boolean("active").default(true).notNull(),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Barber = typeof barbers.$inferSelect;
export type InsertBarber = typeof barbers.$inferInsert;

// Horários de funcionamento por dia da semana
export const workingHours = mysqlTable("working_hours", {
  id: int("id").autoincrement().primaryKey(),
  barberId: int("barberId").notNull(),
  dayOfWeek: int("dayOfWeek").notNull(), // 0=Dom, 1=Seg, ..., 6=Sab
  startTime: time("startTime").notNull(),
  endTime: time("endTime").notNull(),
  active: boolean("active").default(true).notNull(),
});

export type WorkingHour = typeof workingHours.$inferSelect;
export type InsertWorkingHour = typeof workingHours.$inferInsert;

// Agendamentos
export const appointments = mysqlTable("appointments", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 100 }).notNull(),
  clientPhone: varchar("clientPhone", { length: 20 }).notNull(),
  clientEmail: varchar("clientEmail", { length: 320 }),
  serviceId: int("serviceId").notNull(),
  barberId: int("barberId").notNull(),
  appointmentDate: date("appointmentDate").notNull(),
  appointmentTime: time("appointmentTime").notNull(),
  notes: text("notes"),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled", "completed"])
    .default("pending")
    .notNull(),
  whatsappSent: boolean("whatsappSent").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = typeof appointments.$inferInsert;

// Galeria de fotos
export const gallery = mysqlTable("gallery", {
  id: int("id").autoincrement().primaryKey(),
  imageUrl: text("imageUrl").notNull(),
  caption: varchar("caption", { length: 200 }),
  category: varchar("category", { length: 50 }).default("work"),
  active: boolean("active").default(true).notNull(),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Gallery = typeof gallery.$inferSelect;
export type InsertGallery = typeof gallery.$inferInsert;

// Depoimentos de clientes
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 100 }).notNull(),
  rating: int("rating").notNull().default(5),
  comment: text("comment").notNull(),
  active: boolean("active").default(true).notNull(),
  sortOrder: int("sortOrder").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// Configurações do site (admin)
export const siteSettings = mysqlTable("site_settings", {
  id: int("id").autoincrement().primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SiteSetting = typeof siteSettings.$inferSelect;
