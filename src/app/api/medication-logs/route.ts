import { NextResponse } from "next/server";
import { db } from "@/db";
import { medicationLogsTable, patientMedicationsTable, medicationsTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patientId");

    let logs;
    if (patientId) {
      const pId = parseInt(patientId, 10);
      logs = await db
        .select()
        .from(medicationLogsTable)
        .where(eq(medicationLogsTable.patientId, pId))
        .orderBy(desc(medicationLogsTable.id));
    } else {
      logs = await db.select().from(medicationLogsTable).orderBy(desc(medicationLogsTable.id));
    }

    return NextResponse.json({ success: true, logs });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientMedicationId, patientId, scheduledTime, action, notes } = body;
    // action: 'confirm' | 'snooze' | 'miss'

    if (!patientMedicationId || !patientId) {
      return NextResponse.json({ success: false, error: "Faltan datos de la toma" }, { status: 400 });
    }

    let status = "confirmed";
    let takenAt: Date | null = new Date();

    if (action === "snooze") {
      status = "snoozed";
      takenAt = null;
    } else if (action === "miss") {
      status = "missed";
      takenAt = null;
    }

    const [log] = await db
      .insert(medicationLogsTable)
      .values({
        patientMedicationId: parseInt(patientMedicationId, 10),
        patientId: parseInt(patientId, 10),
        scheduledTime: scheduledTime || new Date().toISOString(),
        takenAt: takenAt,
        status: status,
        notes: notes || (action === "snooze" ? "Pospuesto 15 minutos" : action === "confirm" ? "Administración confirmada por el paciente" : "Toma omitida"),
      })
      .returning();

    return NextResponse.json({ success: true, log });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
