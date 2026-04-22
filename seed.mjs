import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createConnection(process.env.DATABASE_URL);

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Barbers
    await connection.execute(
      `INSERT INTO barbers (name, bio, specialty, sortOrder, active) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=name`,
      ["Gordim", "Fundador da barbearia, especialista em degradê e barba.", "Degradê & Barba", 1, 1]
    );
    await connection.execute(
      `INSERT INTO barbers (name, bio, specialty, sortOrder, active) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=name`,
      ["Lucas", "Especialista em cortes clássicos e modernos.", "Cortes Clássicos", 2, 1]
    );
    console.log("✅ Barbers seeded");

    // Get barber IDs
    const [barberRows] = await connection.execute(`SELECT id, name FROM barbers ORDER BY sortOrder`);
    const barber1 = barberRows[0]?.id;
    const barber2 = barberRows[1]?.id;

    // Services
    const servicesData = [
      ["Corte Masculino", "Corte clássico ou moderno com acabamento perfeito", "35.00", 30, "✂️", 1],
      ["Degradê / Fade", "Transição suave e precisa para um visual impecável", "40.00", 40, "💈", 2],
      ["Barba Completa", "Aparar, modelar e hidratar com produtos premium", "30.00", 30, "🪒", 3],
      ["Corte + Barba", "Combo completo para o visual perfeito", "60.00", 60, "⭐", 4],
      ["Sobrancelha", "Design e alinhamento profissional", "15.00", 15, "👁️", 5],
      ["Corte Infantil", "Cuidado especial para os pequenos", "25.00", 25, "🧒", 6],
      ["Pigmentação", "Cobertura de fios brancos com resultado natural", "50.00", 45, "🎨", 7],
      ["Hidratação Capilar", "Tratamento profundo para cabelos saudáveis", "45.00", 40, "💧", 8],
    ];
    for (const s of servicesData) {
      await connection.execute(
        `INSERT INTO services (name, description, price, durationMinutes, icon, sortOrder, active) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=name`,
        [...s, 1]
      );
    }
    console.log("✅ Services seeded");

    // Testimonials
    const testimonialsData = [
      ["Carlos Eduardo", 5, "Ótimo atendimento, ambiente legal, música boa e corte excelente. Recomendo demais!", 1],
      ["Rafael Oliveira", 5, "Atendimento sensacional, barbeiros profissionais. Saí muito satisfeito com o resultado.", 2],
      ["Marcos Vinicius", 5, "Lugar agradável, pessoas educadas e ótimo serviço. Com certeza voltarei sempre.", 3],
      ["João Pedro", 5, "Melhor barbearia de Ji-Paraná! Corte perfeito, ambiente top e preço justo.", 4],
      ["André Luiz", 5, "Profissionalismo de alto nível. Cada detalhe é tratado com cuidado. Parabéns!", 5],
    ];
    for (const t of testimonialsData) {
      await connection.execute(
        `INSERT INTO testimonials (clientName, rating, comment, sortOrder, active) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE clientName=clientName`,
        [...t, 1]
      );
    }
    console.log("✅ Testimonials seeded");

    // Working hours for both barbers (Mon-Sat)
    if (barber1) {
      const days = [
        [1, "09:00:00", "19:30:00"],
        [2, "09:00:00", "19:30:00"],
        [3, "09:00:00", "19:30:00"],
        [4, "09:00:00", "19:30:00"],
        [5, "09:00:00", "19:30:00"],
        [6, "08:00:00", "17:00:00"],
      ];
      for (const [day, start, end] of days) {
        await connection.execute(
          `INSERT INTO working_hours (barberId, dayOfWeek, startTime, endTime, active) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE barberId=barberId`,
          [barber1, day, start, end, 1]
        );
        if (barber2) {
          await connection.execute(
            `INSERT INTO working_hours (barberId, dayOfWeek, startTime, endTime, active) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE barberId=barberId`,
            [barber2, day, start, end, 1]
          );
        }
      }
    }
    console.log("✅ Working hours seeded");

    // Gallery
    const galleryData = [
      ["/manus-storage/haircut-1_e799e277.jpg", "Corte clássico masculino", "corte", 1],
      ["/manus-storage/haircut-2_494afabc.jpg", "Degradê moderno", "corte", 2],
      ["/manus-storage/haircut-3_b6b8f677.jpg", "Fade perfeito", "corte", 3],
      ["/manus-storage/beard-trim_319ca192.webp", "Barba modelada", "barba", 4],
      ["/manus-storage/beard-2_7aa52603.webp", "Acabamento de barba", "barba", 5],
      ["/manus-storage/interior-2_ec487eea.jpg", "Ambiente da barbearia", "ambiente", 6],
    ];
    for (const g of galleryData) {
      await connection.execute(
        `INSERT INTO gallery (imageUrl, caption, category, sortOrder, active) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE imageUrl=imageUrl`,
        [...g, 1]
      );
    }
    console.log("✅ Gallery seeded");

    console.log("🎉 Database seeded successfully!");
    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    await connection.end();
    process.exit(1);
  }
}

seed();
