import { NextResponse } from "next/server";
import { db } from "@/db";
import { drugInteractionsTable, medicationsTable } from "@/db/schema";
import { inArray, or, and, eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const medIdsStr = searchParams.get("ids"); // e.g., "1,2,3"

    if (!medIdsStr) {
      const allInteractions = await db.select().from(drugInteractionsTable);
      return NextResponse.json({ success: true, interactions: allInteractions });
    }

    const medIds = medIdsStr.split(",").map(id => parseInt(id.trim(), 10)).filter(Boolean);

    if (medIds.length < 2) {
      return NextResponse.json({ success: true, interactions: [] });
    }

    const allInteractions = await db.select().from(drugInteractionsTable);
    const matched = allInteractions.filter(
      item => medIds.includes(item.medicationAId) && medIds.includes(item.medicationBId)
    );

    return NextResponse.json({ success: true, interactions: matched });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
