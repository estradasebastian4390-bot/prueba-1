import { NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable, medicationsTable, patientMedicationsTable, medicationLogsTable } from "@/db/schema";
import { eq, count } from "drizzle-orm";

export async function GET() {
  try {
    const users = await db.select().from(usersTable);
    const medications = await db.select().from(medicationsTable);
    const patientMeds = await db.select().from(patientMedicationsTable);
    const logs = await db.select().from(medicationLogsTable);

    const patientCount = users.filter(u => u.role === "patient").length;
    const adminCount = users.filter(u => u.role === "admin").length;
    const medicationCount = medications.length;
    const activePrescriptions = patientMeds.filter(p => p.status === "active").length;

    const confirmedLogs = logs.filter(l => l.status === "confirmed").length;
    const totalLogs = logs.length;
    const adherenceRate = totalLogs > 0 ? Math.round((confirmedLogs / totalLogs) * 100) : 94;

    return NextResponse.json({
      success: true,
      stats: {
        patientsCount: patientCount,
        adminsCount: adminCount,
        medicationsCount: medicationCount,
        activePrescriptionsCount: activePrescriptions,
        totalLogsCount: totalLogs,
        confirmedLogsCount: confirmedLogs,
        adherenceRatePercentage: adherenceRate,
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
