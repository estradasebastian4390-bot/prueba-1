import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { seedDatabase } from "@/db/seed";
import { eq, desc } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    await seedDatabase();
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    let users;
    if (role) {
      users = await db.select().from(usersTable).where(eq(usersTable.role, role)).orderBy(desc(usersTable.id));
    } else {
      users = await db.select().from(usersTable).orderBy(desc(usersTable.id));
    }

    return NextResponse.json({ success: true, users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, role, phone, dateOfBirth, medicalRecordNumber, bloodType, allergies, emergencyContact } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Nombre y Correo son requeridos" }, { status: 400 });
    }

    const [newUser] = await db.insert(usersTable).values({
      name,
      email,
      role: role || "patient",
      avatarUrl: `https://images.unsplash.com/photo-${Math.floor(1500000000000 + Math.random()*100000000)}?w=150&auto=format&fit=crop&q=80`,
      phone: phone || "",
      dateOfBirth: dateOfBirth || "",
      medicalRecordNumber: medicalRecordNumber || `RS-${Math.floor(1000000000 + Math.random()*9000000000)}`,
      bloodType: bloodType || "O+",
      allergies: allergies || "Ninguna registrada",
      emergencyContact: emergencyContact || "",
    }).returning();

    return NextResponse.json({ success: true, user: newUser });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
