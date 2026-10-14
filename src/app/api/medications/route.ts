import { NextResponse } from "next/server";
import { db } from "@/db";
import { medicationsTable } from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { ilike, or, eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    await seedDatabase(); // Ensure initial seed exists

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const category = searchParams.get("category") || "";

    let conditions = [];

    if (query) {
      conditions.push(
        or(
          ilike(medicationsTable.name, `%${query}%`),
          ilike(medicationsTable.genericName, `%${query}%`),
          ilike(medicationsTable.purpose, `%${query}%`),
          ilike(medicationsTable.manufacturer, `%${query}%`)
        )
      );
    }

    if (category && category !== "Todas") {
      conditions.push(ilike(medicationsTable.category, `%${category}%`));
    }

    const medications = await db
      .select()
      .from(medicationsTable)
      .orderBy(desc(medicationsTable.id));

    // Filter in JS if multiple conditions or simple query
    let filtered = medications;
    if (query) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.genericName.toLowerCase().includes(q) ||
          m.purpose.toLowerCase().includes(q) ||
          m.manufacturer.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q)
      );
    }

    if (category && category !== "Todas") {
      const cat = category.toLowerCase();
      filtered = filtered.filter((m) => m.category.toLowerCase().includes(cat));
    }

    return NextResponse.json({ success: true, medications: filtered });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      genericName,
      category,
      presentation,
      purpose,
      dosageInstruction,
      route,
      sideEffects,
      contraindications,
      suspensionCriteria,
      manufacturer,
      prescriptionRequired,
      imageUrl,
      colorCode,
      shape,
    } = body;

    if (!name || !genericName || !category || !presentation || !purpose) {
      return NextResponse.json(
        { success: false, error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const [newMed] = await db
      .insert(medicationsTable)
      .values({
        name,
        genericName,
        category,
        presentation,
        purpose,
        dosageInstruction: dosageInstruction || "Consultar a su médico",
        route: route || "Vía oral",
        sideEffects: sideEffects || "Consulte con el profesional de la salud",
        contraindications: contraindications || "Consulte las indicaciones del prospecto",
        suspensionCriteria: suspensionCriteria || "Suspender ante reacción alérgica",
        manufacturer: manufacturer || "Laboratorio Farmacéutico",
        prescriptionRequired: Boolean(prescriptionRequired),
        imageUrl: imageUrl || "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop&q=80",
        colorCode: colorCode || "#DC2626",
        shape: shape || "Tableta",
      })
      .returning();

    return NextResponse.json({ success: true, medication: newMed });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
