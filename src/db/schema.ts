import { pgTable, text, serial, timestamp, boolean, integer, jsonb } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("patient"), // 'admin' | 'patient'
  avatarUrl: text("avatar_url"),
  dateOfBirth: text("date_of_birth"),
  medicalRecordNumber: text("medical_record_number"),
  bloodType: text("blood_type"),
  allergies: text("allergies"),
  phone: text("phone"),
  emergencyContact: text("emergency_contact"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const medicationsTable = pgTable("medications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  genericName: text("generic_name").notNull(),
  category: text("category").notNull(), // Cardiólogico, Analgésico, Antibiótico, Endocrino, etc.
  presentation: text("presentation").notNull(), // e.g. "Tableta Oral - Redonda, rosada, de 5mg"
  purpose: text("purpose").notNull(), // ¿Para qué sirve?
  dosageInstruction: text("dosage_instruction").notNull(), // ¿La cantidad a administrar?
  route: text("route").notNull(), // ¿Por qué vía la debo administrar?
  sideEffects: text("side_effects").notNull(), // ¿Qué efectos secundarios puedo tener?
  contraindications: text("contraindications").notNull(), // ¿Qué contraindicaciones tiene?
  suspensionCriteria: text("suspension_criteria").notNull(), // ¿Cuándo se debe suspender?
  manufacturer: text("manufacturer").notNull(),
  prescriptionRequired: boolean("prescription_required").default(true).notNull(),
  imageUrl: text("image_url"),
  colorCode: text("color_code"),
  shape: text("shape"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const patientMedicationsTable = pgTable("patient_medications", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  medicationId: integer("medication_id").notNull().references(() => medicationsTable.id, { onDelete: 'cascade' }),
  prescribedBy: text("prescribed_by").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date"),
  frequency: text("frequency").notNull(), // e.g., "Cada 12 horas", "Una vez al día (Mañana)"
  timesOfDay: jsonb("times_of_day").$type<string[]>().notNull(), // ["08:00", "20:00"]
  customDose: text("custom_dose").notNull(),
  customNotes: text("custom_notes"),
  status: text("status").notNull().default("active"), // 'active' | 'paused' | 'completed'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const medicationLogsTable = pgTable("medication_logs", {
  id: serial("id").primaryKey(),
  patientMedicationId: integer("patient_medication_id").notNull().references(() => patientMedicationsTable.id, { onDelete: 'cascade' }),
  patientId: integer("patient_id").notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  scheduledTime: text("scheduled_time").notNull(), // e.g., "2026-03-30 08:00"
  takenAt: timestamp("taken_at"),
  status: text("status").notNull().default("pending"), // 'confirmed' | 'snoozed' | 'missed' | 'pending'
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const appointmentsTable = pgTable("appointments", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  doctorName: text("doctor_name").notNull(),
  specialty: text("specialty").notNull(),
  appointmentDate: text("appointment_date").notNull(), // e.g., "2026-04-05"
  appointmentTime: text("appointment_time").notNull(), // e.g., "10:30"
  location: text("location").notNull(),
  notes: text("notes"),
  status: text("status").notNull().default("scheduled"), // 'scheduled' | 'completed' | 'cancelled'
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const drugInteractionsTable = pgTable("drug_interactions", {
  id: serial("id").primaryKey(),
  medicationAId: integer("medication_a_id").notNull().references(() => medicationsTable.id, { onDelete: 'cascade' }),
  medicationBId: integer("medication_b_id").notNull().references(() => medicationsTable.id, { onDelete: 'cascade' }),
  severity: text("severity").notNull(), // 'Baja' | 'Moderada' | 'Grave'
  description: text("description").notNull(),
  recommendation: text("recommendation").notNull(),
});
