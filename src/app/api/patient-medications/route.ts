import { NextResponse } from "next/server";
import { db } from "@/db";
import { patientMedicationsTable, medicationsTable, usersTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patientId");

    let query = db
      .select({
        id: patientMedicationsTable.id,
        patientId: patientMedicationsTable.patientId,
        medicationId: patientMedicationsTable.medicationId,
        prescribedBy: patientMedicationsTable.prescribedBy,
        startDate: patientMedicationsTable.startDate,
        endDate: patientMedicationsTable.endDate,
        frequency: patientMedicationsTable.frequency,
        timesOfDay: patientMedicationsTable.timesOfDay,
        customDose: patientMedicationsTable.customDose,
        customNotes: patientMedicationsTable.customNotes,
        status: patientMedicationsTable.status,
        medication: medicationsTable,
      })
      .from(patientMedicationsTable)
      .innerJoin(medicationsTable, eq(patientMedicationsTable.medicationId, medicationsTable.id));

    if (patientId) {
      const pId = parseInt(patientId, 10);
      const results = await query.where(eq(patientMedicationsTable.patientId, pId));
      return NextResponse.json({ success: true, patientMedications: results });
    }

    const results = await query;
    return NextResponse.json({ success: true, patientMedications: results });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, medicationId, prescribedBy, startDate, endDate, frequency, timesOfDay, customDose, customNotes } = body;

    if (!patientId || !medicationId || !prescribedBy) {
      return NextResponse.json({ success: false, error: "Paciente y Medicamento son requeridos" }, { status: 400 });
    }

    const [newPrescription] = await db.insert(patientMedicationsTable).values({
      patientId: parseInt(patientId, 10),
      medicationId: parseInt(medicationId, 10),
      prescribedBy,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || null,
      frequency: frequency || "Una vez al día",
      timesOfDay: timesOfDay || ["08:00"],
      customDose: customDose || "1 tableta",
      customNotes: customNotes || "",
      status: "active",
    }).returning();

    return NextResponse.json({ success: true, prescription: newPrescription });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
