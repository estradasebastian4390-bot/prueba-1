import { NextResponse } from "next/server";
import { db } from "@/db";
import { medicationsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const medId = parseInt(id, 10);
    const [med] = await db.select().from(medicationsTable).where(eq(medicationsTable.id, medId));
    if (!med) {
      return NextResponse.json({ success: false, error: "Medicamento no encontrado" }, { status: 404 });
    }
    return NextResponse.json({ success: true, medication: med });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const medId = parseInt(id, 10);
    const body = await request.json();

    const [updated] = await db
      .update(medicationsTable)
      .set(body)
      .where(eq(medicationsTable.id, medId))
      .returning();

    return NextResponse.json({ success: true, medication: updated });
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
    const medId = parseInt(id, 10);

    await db.delete(medicationsTable).where(eq(medicationsTable.id, medId));

    return NextResponse.json({ success: true, message: "Medicamento eliminado correctamente" });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
