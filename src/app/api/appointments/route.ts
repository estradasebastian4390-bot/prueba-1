import { NextResponse } from "next/server";
import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patientId");

    let appointments;
    if (patientId) {
      const pId = parseInt(patientId, 10);
      appointments = await db
        .select()
        .from(appointmentsTable)
        .where(eq(appointmentsTable.patientId, pId))
        .orderBy(desc(appointmentsTable.appointmentDate));
    } else {
      appointments = await db
        .select()
        .from(appointmentsTable)
        .orderBy(desc(appointmentsTable.appointmentDate));
    }

    return NextResponse.json({ success: true, appointments });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { patientId, doctorName, specialty, appointmentDate, appointmentTime, location, notes } = body;

    if (!patientId || !doctorName || !appointmentDate || !appointmentTime) {
      return NextResponse.json({ success: false, error: "Faltan datos de la cita médica" }, { status: 400 });
    }

    const [newApp] = await db.insert(appointmentsTable).values({
      patientId: parseInt(patientId, 10),
      doctorName,
      specialty: specialty || "Medicina General",
      appointmentDate,
      appointmentTime,
      location: location || "Consultorio Médico MedicVisual",
      notes: notes || "",
      status: "scheduled",
    }).returning();

    return NextResponse.json({ success: true, appointment: newApp });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
