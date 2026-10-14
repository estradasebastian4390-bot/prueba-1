import { db } from "./index";
import { usersTable, medicationsTable, patientMedicationsTable, medicationLogsTable, appointmentsTable, drugInteractionsTable } from "./schema";
import { eq } from "drizzle-orm";

export async function seedDatabase() {
  try {
    // Check if users exist
    const existingUsers = await db.select().from(usersTable).limit(1);
    if (existingUsers.length > 0) {
      console.log("Database already seeded.");
      return;
    }

    console.log("Seeding database...");

    // 1. Insert Users
    const [patientAlex] = await db.insert(usersTable).values({
      name: "Alex Chen",
      email: "alex.chen@gmail.com",
      role: "patient",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      dateOfBirth: "1988-05-14",
      medicalRecordNumber: "RS-4363742675",
      bloodType: "O+",
      allergies: "Penicilina, Polvos de Polen",
      phone: "+1 (555) 234-5678",
      emergencyContact: "Elena Chen (Esposa) - +1 (555) 876-5432",
    }).returning();

    const [patientMaria] = await db.insert(usersTable).values({
      name: "María Rodríguez",
      email: "maria.rodriguez@gmail.com",
      role: "patient",
      avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      dateOfBirth: "1975-11-20",
      medicalRecordNumber: "RS-8839201948",
      bloodType: "A+",
      allergies: "Sulfamidas",
      phone: "+1 (555) 987-6543",
      emergencyContact: "Carlos Rodríguez (Hijo) - +1 (555) 112-2334",
    }).returning();

    const [adminUser] = await db.insert(usersTable).values({
      name: "Dr. Carlos Ramos (Admin)",
      email: "admin@medicvisual.com",
      role: "admin",
      avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
      phone: "+1 (555) 000-9999",
    }).returning();

    // 2. Insert Master Medications
    const [amlodipino] = await db.insert(medicationsTable).values({
      name: "Amlodipino Besilato",
      genericName: "Amlodipino 5mg",
      category: "Cardiovascular / Antihipertensivo",
      presentation: "Tableta Oral - Tableta redonda, rosada, de 5mg",
      purpose: "Control de Hipertensión - Reduce la presión arterial al relajar los vasos sanguíneos.",
      dosageInstruction: "Una Tableta (5mg) - Tomar una vez al día.",
      route: "Oral con agua - Tragar entero; No triturar ni masticar. Tomar con alimentos si ocurre malestar estomacal.",
      sideEffects: "Comunes: Mareo, dolor de cabeza, fatiga. Raros: Hinchazón de tobillos, dificultad para respirar.",
      contraindications: "No tomar si está embarazada, tiene antecedentes de angioedema o enfermedad renal grave.",
      suspensionCriteria: "Suspender y contactar al médico si experimenta reacciones alérgicas (urticaria, dificultad para respirar), mareo intenso o dolor torácico persistente.",
      manufacturer: "Laboratorios Pfizer / MedicVisual Pharma",
      prescriptionRequired: true,
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",
      colorCode: "#F472B6", // Pinkish round pill
      shape: "Redonda",
    }).returning();

    const [metformina] = await db.insert(medicationsTable).values({
      name: "Metformina Clorhidrato",
      genericName: "Metformina 850mg",
      category: "Endocrinología / Antidiabético",
      presentation: "Comprimido Recubierto - Ovalado, blanco, de 850mg",
      purpose: "Control glucémico en diabetes mellitus tipo 2 - Ayuda al cuerpo a responder mejor a la insulina.",
      dosageInstruction: "Un Comprimido (850mg) - Tomar dos veces al día con las comidas principales (Desayuno y Cena).",
      route: "Oral con suficiente líquido durante o inmediatamente después de las comidas para minimizar molestias digestivas.",
      sideEffects: "Comunes: Náuseas, diarrea leve, sabor metálico, gases. Raros: Acidosis láctica, deficiencia de Vitamina B12.",
      contraindications: "Insuficiencia renal moderada a grave, insuficiencia hepática, deshidratación aguda o consumo excesivo de alcohol.",
      suspensionCriteria: "Suspender temporalmente antes de procedimientos con contraste yodado o si presenta vómitos persistentes y debilidad extrema.",
      manufacturer: "Merck S.A. / Pharma Group",
      prescriptionRequired: true,
      imageUrl: "https://images.unsplash.com/photo-1550572017-edd951baa74c?w=400&auto=format&fit=crop&q=80",
      colorCode: "#E2E8F0", // White oval
      shape: "Ovalada",
    }).returning();

    const [losartan] = await db.insert(medicationsTable).values({
      name: "Losartán Potásico",
      genericName: "Losartán 50mg",
      category: "Cardiovascular / ARA-II",
      presentation: "Comprimido Recubierto - Redondo, blanco con ranura central, 50mg",
      purpose: "Tratamiento de la hipertensión arterial y protección renal en pacientes diabéticos.",
      dosageInstruction: "Un Comprimido (50mg) - Tomar 1 vez al día a la misma hora.",
      route: "Oral con medio vaso de agua, con o sin alimentos.",
      sideEffects: "Comunes: Mareo ortostático, congestión nasal, hiperpotasemia leve. Raros: Tos seca, desmayo.",
      contraindications: "Segundo y tercer trimestre de embarazo, uso simultáneo con aliskiren en diabéticos.",
      suspensionCriteria: "Suspender de inmediato en caso de sospecha de embarazo o hinchazón facial/lingual (angioedema).",
      manufacturer: "Bayer Healthcare",
      prescriptionRequired: true,
      imageUrl: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400&auto=format&fit=crop&q=80",
      colorCode: "#FFFFFF",
      shape: "Redonda con ranura",
    }).returning();

    const [omeprazol] = await db.insert(medicationsTable).values({
      name: "Omeprazol Gastroresistente",
      genericName: "Omeprazol 20mg",
      category: "Gastroenterología / IBPs",
      presentation: "Cápsula Dura - Rojo y amarillo, 20mg con microgránulos",
      purpose: "Inhibidor de la bomba de protones para reflujo gastroesofágico, gastritis y úlceras duodenales.",
      dosageInstruction: "Una Cápsula (20mg) - Tomar 1 vez al día en ayunas por la mañana (30 min antes del desayuno).",
      route: "Oral. Tragar entera con agua; no masticar ni triturar los pellets contenidos.",
      sideEffects: "Comunes: Dolor abdominal, estreñimiento, flatulencia, cefalea. Raros: Pólipos gástricos, hipomagnesemia prolongada.",
      contraindications: "Hipersensibilidad al omeprazol o benzimidazoles. Coadministración con nelfinavir.",
      suspensionCriteria: "Si presenta diarrea acuosa grave o sarpullido cutáneo en zonas expuestas al sol.",
      manufacturer: "AstraZeneca",
      prescriptionRequired: false,
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",
      colorCode: "#FBBF24", // Yellow/Red
      shape: "Cápsula",
    }).returning();

    const [atorvastatina] = await db.insert(medicationsTable).values({
      name: "Atorvastatina Cálcica",
      genericName: "Atorvastatina 20mg",
      category: "Cardiovascular / Estatinas",
      presentation: "Tableta Recubierta - Elíptica, blanca, 20mg",
      purpose: "Reducción de niveles de colesterol LDL y triglicéridos; prevención de eventos cardiovasculares.",
      dosageInstruction: "Una Tableta (20mg) - Tomar una vez al día, preferiblemente por la noche.",
      route: "Oral con o sin alimentos. Evitar el consumo de jugo de toronja durante el tratamiento.",
      sideEffects: "Comunes: Dolor muscular leve (mialgia), alteración de pruebas hepáticas, malestar estomacal.",
      contraindications: "Enfermedad hepática activa, embarazo, lactancia y consumo excesivo de alcohol.",
      suspensionCriteria: "Suspender e informar inmediatamente si siente dolor muscular unexplained, debilidad o calambres graves con orina oscura.",
      manufacturer: "Viatris Labs",
      prescriptionRequired: true,
      imageUrl: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&auto=format&fit=crop&q=80",
      colorCode: "#F3F4F6",
      shape: "Elíptica",
    }).returning();

    const [paracetamol] = await db.insert(medicationsTable).values({
      name: "Paracetamol / Acetaminofén",
      genericName: "Paracetamol 500mg",
      category: "Analgésico / Antipirético",
      presentation: "Tableta Ranurada - Blanca, redonda de 500mg",
      purpose: "Alivio del dolor moderado (cefalea, dolor muscular) y reducción de la fiebre.",
      dosageInstruction: "1 o 2 tabletas cada 6 u 8 horas según necesidad (Máximo 4000mg al día).",
      route: "Oral con vaso de agua.",
      sideEffects: "Raros a dosis terapéuticas: Reacciones cutáneas, hepatotoxicidad solo con sobredosis.",
      contraindications: "Insuficiencia hepática grave o hepatitis aguda activa.",
      suspensionCriteria: "Suspender si la fiebre persiste más de 3 días o el dolor más de 5 días.",
      manufacturer: "Bayer Health Care",
      prescriptionRequired: false,
      imageUrl: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&auto=format&fit=crop&q=80",
      colorCode: "#FFFFFF",
      shape: "Redonda",
    }).returning();

    // 3. Assign Prescriptions for Patients
    const [patientMed1] = await db.insert(patientMedicationsTable).values({
      patientId: patientAlex.id,
      medicationId: amlodipino.id,
      prescribedBy: "Dr. Roberto Mendoza (Cardiólogo)",
      startDate: "2026-01-10",
      endDate: "2026-12-31",
      frequency: "Una vez al día (08:00 AM)",
      timesOfDay: ["08:00"],
      customDose: "1 Tableta (5mg)",
      customNotes: "Tomar por la mañana con abundante agua. Monitorear presión semanalmente.",
      status: "active",
    }).returning();

    const [patientMed2] = await db.insert(patientMedicationsTable).values({
      patientId: patientAlex.id,
      medicationId: omeprazol.id,
      prescribedBy: "Dra. Carmen Silva (Gastroenteróloga)",
      startDate: "2026-02-01",
      endDate: "2026-04-30",
      frequency: "Cada 24 horas en ayunas",
      timesOfDay: ["07:30"],
      customDose: "1 Cápsula (20mg)",
      customNotes: "Tomar en ayunas 30 minutos antes del desayuno.",
      status: "active",
    }).returning();

    const [patientMed3] = await db.insert(patientMedicationsTable).values({
      patientId: patientAlex.id,
      medicationId: atorvastatina.id,
      prescribedBy: "Dr. Roberto Mendoza (Cardiólogo)",
      startDate: "2026-01-15",
      endDate: "2026-07-15",
      frequency: "Una vez al día por la noche (21:00)",
      timesOfDay: ["21:00"],
      customDose: "1 Tableta (20mg)",
      customNotes: "Tomar antes de acostarse.",
      status: "active",
    }).returning();

    // Prescriptions for María
    await db.insert(patientMedicationsTable).values({
      patientId: patientMaria.id,
      medicationId: metformina.id,
      prescribedBy: "Dr. Esteban López (Endocrinólogo)",
      startDate: "2025-08-01",
      endDate: "2026-12-31",
      frequency: "Cada 12 horas (Con desayuno y cena)",
      timesOfDay: ["08:30", "20:30"],
      customDose: "1 Comprimido (850mg)",
      customNotes: "No saltear comidas.",
      status: "active",
    });

    await db.insert(patientMedicationsTable).values({
      patientId: patientMaria.id,
      medicationId: losartan.id,
      prescribedBy: "Dr. Roberto Mendoza (Cardiólogo)",
      startDate: "2025-09-10",
      endDate: "2026-09-10",
      frequency: "Cada 24 horas (09:00 AM)",
      timesOfDay: ["09:00"],
      customDose: "1 Comprimido (50mg)",
      customNotes: "Controlar pulso y presión.",
      status: "active",
    });

    // 4. Insert Logs for Alex Chen
    const todayStr = new Date().toISOString().split('T')[0];
    await db.insert(medicationLogsTable).values([
      {
        patientMedicationId: patientMed1.id,
        patientId: patientAlex.id,
        scheduledTime: `${todayStr} 08:00`,
        status: "pending",
        notes: "Recordatorio listo para ser confirmado",
      },
      {
        patientMedicationId: patientMed2.id,
        patientId: patientAlex.id,
        scheduledTime: `${todayStr} 07:30`,
        takenAt: new Date(Date.now() - 3600000 * 3),
        status: "confirmed",
        notes: "Tomado en ayunas a tiempo",
      },
      {
        patientMedicationId: patientMed3.id,
        patientId: patientAlex.id,
        scheduledTime: `${todayStr} 21:00`,
        status: "pending",
        notes: "Programado para esta noche",
      }
    ]);

    // 5. Insert Appointments
    await db.insert(appointmentsTable).values([
      {
        patientId: patientAlex.id,
        doctorName: "Dr. Roberto Mendoza",
        specialty: "Cardiología",
        appointmentDate: "2026-04-12",
        appointmentTime: "10:30",
        location: "Centro Médico MedicVisual - Cons. 402",
        notes: "Control de presión arterial y revisión de ECG de rutina.",
        status: "scheduled",
      },
      {
        patientId: patientAlex.id,
        doctorName: "Dra. Carmen Silva",
        specialty: "Gastroenterología",
        appointmentDate: "2026-04-28",
        appointmentTime: "16:00",
        location: "Clínica San Martín - Piso 3",
        notes: "Evaluación de reflujo gástrico y ajuste de Omeprazol.",
        status: "scheduled",
      }
    ]);

    // 6. Insert Drug Interactions
    await db.insert(drugInteractionsTable).values([
      {
        medicationAId: amlodipino.id,
        medicationBId: losartan.id,
        severity: "Moderada",
        description: "Ambos medicamentos disminuyen la presión arterial. La combinación puede incrementar el riesgo de hipotensión sintomática o hipotensión ortostática.",
        recommendation: "Monitorear la presión arterial con frecuencia si son recetados conjuntamente por el cardiólogo.",
      },
      {
        medicationAId: metformina.id,
        medicationBId: amlodipino.id,
        severity: "Baja",
        description: "Sin interacciones clínicas severas conocidas. Amlodipino puede alterar ligeramente los niveles de glucosa en raros casos.",
        recommendation: "Mantener el monitoreo habitual de glucemia.",
      }
    ]);

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}
