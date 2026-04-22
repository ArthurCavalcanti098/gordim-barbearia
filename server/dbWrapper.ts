/**
 * Database Wrapper - Usa banco de dados real ou mock dependendo da configuração
 * Se DATABASE_URL não estiver configurada, usa o banco de dados em memória
 */

import { mockDb, type MockAppointment, type MockBarber, type MockGallery, type MockService, type MockTestimonial } from "./mockDb";

export interface DbService {
  id: number;
  name: string;
  description?: string;
  price: string;
  durationMinutes: number;
  icon: string;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DbBarber {
  id: number;
  name: string;
  bio?: string;
  photoUrl?: string;
  specialty?: string;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DbAppointment {
  id: number;
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: number;
  barberId: number;
  appointmentDate: Date;
  appointmentTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DbGallery {
  id: number;
  imageUrl: string;
  caption?: string;
  category: string;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
}

export interface DbTestimonial {
  id: number;
  clientName: string;
  rating: number;
  comment: string;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
}

const isUsingMockDb = !process.env.DATABASE_URL;

// ===== SERVICES =====
export async function createService(data: {
  name: string;
  description?: string;
  price: string;
  durationMinutes: number;
  icon: string;
}): Promise<DbService> {
  if (isUsingMockDb) {
    return mockDb.addService({
      ...data,
      active: true,
      sortOrder: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  // TODO: Implementar com banco de dados real
  throw new Error("Real database not implemented");
}

export async function getServices(): Promise<DbService[]> {
  if (isUsingMockDb) {
    return mockDb.getServices();
  }
  throw new Error("Real database not implemented");
}

export async function getAllServices(): Promise<DbService[]> {
  if (isUsingMockDb) {
    return mockDb.getAllServices();
  }
  throw new Error("Real database not implemented");
}

export async function updateService(
  id: number,
  data: Partial<DbService>
): Promise<DbService | undefined> {
  if (isUsingMockDb) {
    return mockDb.updateService(id, data);
  }
  throw new Error("Real database not implemented");
}

export async function deleteService(id: number): Promise<boolean> {
  if (isUsingMockDb) {
    return mockDb.deleteService(id);
  }
  throw new Error("Real database not implemented");
}

// ===== BARBERS =====
export async function createBarber(data: {
  name: string;
  bio?: string;
  specialty?: string;
}): Promise<DbBarber> {
  if (isUsingMockDb) {
    return mockDb.addBarber({
      ...data,
      active: true,
      sortOrder: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  throw new Error("Real database not implemented");
}

export async function getBarbers(): Promise<DbBarber[]> {
  if (isUsingMockDb) {
    return mockDb.getBarbers();
  }
  throw new Error("Real database not implemented");
}

export async function getAllBarbers(): Promise<DbBarber[]> {
  if (isUsingMockDb) {
    return mockDb.getAllBarbers();
  }
  throw new Error("Real database not implemented");
}

export async function updateBarber(
  id: number,
  data: Partial<DbBarber>
): Promise<DbBarber | undefined> {
  if (isUsingMockDb) {
    return mockDb.updateBarber(id, data);
  }
  throw new Error("Real database not implemented");
}

export async function deleteBarber(id: number): Promise<boolean> {
  if (isUsingMockDb) {
    return mockDb.deleteBarber(id);
  }
  throw new Error("Real database not implemented");
}

// ===== APPOINTMENTS =====
export async function createAppointment(data: {
  clientName: string;
  clientPhone: string;
  clientEmail?: string;
  serviceId: number;
  barberId: number;
  appointmentDate: Date;
  appointmentTime: string;
  notes?: string;
}): Promise<DbAppointment> {
  if (isUsingMockDb) {
    return mockDb.addAppointment({
      ...data,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
  throw new Error("Real database not implemented");
}

export async function getAppointments(filters?: {
  dateFrom?: string;
  dateTo?: string;
}): Promise<DbAppointment[]> {
  if (isUsingMockDb) {
    return mockDb.getAppointments(filters);
  }
  throw new Error("Real database not implemented");
}

export async function updateAppointment(
  id: number,
  data: Partial<DbAppointment>
): Promise<DbAppointment | undefined> {
  if (isUsingMockDb) {
    return mockDb.updateAppointment(id, data);
  }
  throw new Error("Real database not implemented");
}

// ===== GALLERY =====
export async function createGalleryImage(data: {
  imageUrl: string;
  caption?: string;
  category: string;
}): Promise<DbGallery> {
  if (isUsingMockDb) {
    return mockDb.addGalleryImage({
      ...data,
      active: true,
      sortOrder: 0,
      createdAt: new Date(),
    });
  }
  throw new Error("Real database not implemented");
}

export async function getGallery(): Promise<DbGallery[]> {
  if (isUsingMockDb) {
    return mockDb.getGallery();
  }
  throw new Error("Real database not implemented");
}

export async function getAllGallery(): Promise<DbGallery[]> {
  if (isUsingMockDb) {
    return mockDb.getAllGallery();
  }
  throw new Error("Real database not implemented");
}

export async function deleteGalleryImage(id: number): Promise<boolean> {
  if (isUsingMockDb) {
    return mockDb.deleteGalleryImage(id);
  }
  throw new Error("Real database not implemented");
}

// ===== TESTIMONIALS =====
export async function createTestimonial(data: {
  clientName: string;
  rating: number;
  comment: string;
}): Promise<DbTestimonial> {
  if (isUsingMockDb) {
    return mockDb.addTestimonial({
      ...data,
      active: true,
      sortOrder: 0,
      createdAt: new Date(),
    });
  }
  throw new Error("Real database not implemented");
}

export async function getTestimonials(): Promise<DbTestimonial[]> {
  if (isUsingMockDb) {
    return mockDb.getTestimonials();
  }
  throw new Error("Real database not implemented");
}

export async function getAllTestimonials(): Promise<DbTestimonial[]> {
  if (isUsingMockDb) {
    return mockDb.getAllTestimonials();
  }
  throw new Error("Real database not implemented");
}

export async function updateTestimonial(
  id: number,
  data: Partial<DbTestimonial>
): Promise<DbTestimonial | undefined> {
  if (isUsingMockDb) {
    return mockDb.updateTestimonial(id, data);
  }
  throw new Error("Real database not implemented");
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  if (isUsingMockDb) {
    return mockDb.deleteTestimonial(id);
  }
  throw new Error("Real database not implemented");
}

export function isUseMockDatabase(): boolean {
  return isUsingMockDb;
}
