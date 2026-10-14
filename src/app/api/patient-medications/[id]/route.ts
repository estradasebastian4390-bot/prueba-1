import { NextResponse } from "next/server";
import { db } from "@/db";
import { patientMedicationsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pmId = parseInt(id, 10);
    const body = await request.json();

    const [updated] = await db
      .update(patientMedicationsTable)
      .set(body)
      .where(eq(patientMedicationsTable.id, pmId))
      .returning();

    return NextResponse.json({ success: true, patientMedication: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const pmId = parseInt(id, 10);
    await db.delete(patientMedicationsTable).where(eq(patientMedicationsTable.id, pmId));

    return NextResponse.json({ success: true, message: "Receta eliminada del perfil del paciente" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
