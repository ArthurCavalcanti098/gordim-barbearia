/**
 * Mock Database - Simula um banco de dados em memória
 * Útil para testes e desenvolvimento sem banco de dados real
 */

export interface MockUser {
  id: number;
  openId: string;
  name?: string;
  email?: string;
  loginMethod?: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
}

export interface MockService {
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

export interface MockBarber {
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

export interface MockAppointment {
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

export interface MockGallery {
  id: number;
  imageUrl: string;
  caption?: string;
  category: string;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
}

export interface MockTestimonial {
  id: number;
  clientName: string;
  rating: number;
  comment: string;
  active: boolean;
  sortOrder: number;
  createdAt: Date;
}

class MockDatabase {
  private users: Map<number, MockUser> = new Map();
  private services: Map<number, MockService> = new Map();
  private barbers: Map<number, MockBarber> = new Map();
  private appointments: Map<number, MockAppointment> = new Map();
  private gallery: Map<number, MockGallery> = new Map();
  private testimonials: Map<number, MockTestimonial> = new Map();

  private userIdCounter = 1;
  private serviceIdCounter = 1;
  private barberIdCounter = 1;
  private appointmentIdCounter = 1;
  private galleryIdCounter = 1;
  private testimonialIdCounter = 1;

  constructor() {
    this.initializeData();
  }

  private initializeData() {
    // Adicionar serviços iniciais
    this.services.set(1, {
      id: 1,
      name: 'Corte Clássico',
      description: 'Corte tradicional com acabamento perfeito',
      price: '35.00',
      durationMinutes: 30,
      icon: '✂️',
      active: true,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.services.set(2, {
      id: 2,
      name: 'Corte Premium',
      description: 'Corte personalizado com design exclusivo',
      price: '50.00',
      durationMinutes: 45,
      icon: '✂️',
      active: true,
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.services.set(3, {
      id: 3,
      name: 'Barba Completa',
      description: 'Barba com acabamento profissional',
      price: '30.00',
      durationMinutes: 25,
      icon: '🧔',
      active: true,
      sortOrder: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.services.set(4, {
      id: 4,
      name: 'Corte + Barba',
      description: 'Combo: corte e barba',
      price: '60.00',
      durationMinutes: 50,
      icon: '💈',
      active: true,
      sortOrder: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.services.set(5, {
      id: 5,
      name: 'Sobrancelha',
      description: 'Design de sobrancelha',
      price: '15.00',
      durationMinutes: 15,
      icon: '👁️',
      active: true,
      sortOrder: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Adicionar barbeiros iniciais
    this.barbers.set(1, {
      id: 1,
      name: 'Carlos',
      bio: 'Barbeiro experiente com 10 anos de profissão',
      specialty: 'Cortes clássicos',
      active: true,
      sortOrder: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.barbers.set(2, {
      id: 2,
      name: 'João',
      bio: 'Especialista em design e cortes modernos',
      specialty: 'Cortes modernos',
      active: true,
      sortOrder: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Adicionar galeria inicial
    this.gallery.set(1, {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1599351431202-924373718618?w=400',
      caption: 'Corte clássico perfeito',
      category: 'corte',
      active: true,
      sortOrder: 1,
      createdAt: new Date(),
    });

    this.gallery.set(2, {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1585747860715-cd4628902d4a?w=400',
      caption: 'Barba bem cuidada',
      category: 'barba',
      active: true,
      sortOrder: 2,
      createdAt: new Date(),
    });

    // Adicionar depoimentos iniciais
    this.testimonials.set(1, {
      id: 1,
      clientName: 'Pedro Silva',
      rating: 5,
      comment: 'Excelente atendimento! Voltarei com certeza.',
      active: true,
      sortOrder: 1,
      createdAt: new Date(),
    });

    this.testimonials.set(2, {
      id: 2,
      clientName: 'Lucas Costa',
      rating: 5,
      comment: 'Melhor barbearia da região! Recomendo!',
      active: true,
      sortOrder: 2,
      createdAt: new Date(),
    });
  }

  // ===== USERS =====
  addUser(user: Omit<MockUser, 'id'>): MockUser {
    const id = this.userIdCounter++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  getUserByOpenId(openId: string): MockUser | undefined {
    return Array.from(this.users.values()).find(u => u.openId === openId);
  }

  // ===== SERVICES =====
  addService(service: Omit<MockService, 'id'>): MockService {
    const id = this.serviceIdCounter++;
    const newService = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }

  getServices(): MockService[] {
    return Array.from(this.services.values()).filter(s => s.active);
  }

  getAllServices(): MockService[] {
    return Array.from(this.services.values());
  }

  updateService(id: number, updates: Partial<MockService>): MockService | undefined {
    const service = this.services.get(id);
    if (!service) return undefined;
    const updated = { ...service, ...updates, updatedAt: new Date() };
    this.services.set(id, updated);
    return updated;
  }

  deleteService(id: number): boolean {
    return this.services.delete(id);
  }

  // ===== BARBERS =====
  addBarber(barber: Omit<MockBarber, 'id'>): MockBarber {
    const id = this.barberIdCounter++;
    const newBarber = { ...barber, id };
    this.barbers.set(id, newBarber);
    return newBarber;
  }

  getBarbers(): MockBarber[] {
    return Array.from(this.barbers.values()).filter(b => b.active);
  }

  getAllBarbers(): MockBarber[] {
    return Array.from(this.barbers.values());
  }

  updateBarber(id: number, updates: Partial<MockBarber>): MockBarber | undefined {
    const barber = this.barbers.get(id);
    if (!barber) return undefined;
    const updated = { ...barber, ...updates, updatedAt: new Date() };
    this.barbers.set(id, updated);
    return updated;
  }

  deleteBarber(id: number): boolean {
    return this.barbers.delete(id);
  }

  // ===== APPOINTMENTS =====
  addAppointment(appointment: Omit<MockAppointment, 'id'>): MockAppointment {
    const id = this.appointmentIdCounter++;
    const newAppointment = { ...appointment, id };
    this.appointments.set(id, newAppointment);
    return newAppointment;
  }

  getAppointments(filters?: {
    dateFrom?: string;
    dateTo?: string;
  }): MockAppointment[] {
    let result = Array.from(this.appointments.values());

    if (filters?.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      result = result.filter(a => new Date(a.appointmentDate) >= fromDate);
    }

    if (filters?.dateTo) {
      const toDate = new Date(filters.dateTo);
      result = result.filter(a => new Date(a.appointmentDate) <= toDate);
    }

    return result.sort((a, b) => new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime());
  }

  updateAppointment(id: number, updates: Partial<MockAppointment>): MockAppointment | undefined {
    const appointment = this.appointments.get(id);
    if (!appointment) return undefined;
    const updated = { ...appointment, ...updates, updatedAt: new Date() };
    this.appointments.set(id, updated);
    return updated;
  }

  // ===== GALLERY =====
  addGalleryImage(image: Omit<MockGallery, 'id'>): MockGallery {
    const id = this.galleryIdCounter++;
    const newImage = { ...image, id };
    this.gallery.set(id, newImage);
    return newImage;
  }

  getGallery(): MockGallery[] {
    return Array.from(this.gallery.values()).filter(g => g.active);
  }

  getAllGallery(): MockGallery[] {
    return Array.from(this.gallery.values());
  }

  deleteGalleryImage(id: number): boolean {
    return this.gallery.delete(id);
  }

  // ===== TESTIMONIALS =====
  addTestimonial(testimonial: Omit<MockTestimonial, 'id'>): MockTestimonial {
    const id = this.testimonialIdCounter++;
    const newTestimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }

  getTestimonials(): MockTestimonial[] {
    return Array.from(this.testimonials.values()).filter(t => t.active);
  }

  getAllTestimonials(): MockTestimonial[] {
    return Array.from(this.testimonials.values());
  }

  updateTestimonial(id: number, updates: Partial<MockTestimonial>): MockTestimonial | undefined {
    const testimonial = this.testimonials.get(id);
    if (!testimonial) return undefined;
    const updated = { ...testimonial, ...updates };
    this.testimonials.set(id, updated);
    return updated;
  }

  deleteTestimonial(id: number): boolean {
    return this.testimonials.delete(id);
  }

  // ===== UTILITY =====
  clear() {
    this.users.clear();
    this.services.clear();
    this.barbers.clear();
    this.appointments.clear();
    this.gallery.clear();
    this.testimonials.clear();
    this.userIdCounter = 1;
    this.serviceIdCounter = 1;
    this.barberIdCounter = 1;
    this.appointmentIdCounter = 1;
    this.galleryIdCounter = 1;
    this.testimonialIdCounter = 1;
  }
}

// Exportar instância singleton
export const mockDb = new MockDatabase();
