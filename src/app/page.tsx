"use client";

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { ActiveMedicationModal } from "@/components/ActiveMedicationModal";
import { WelcomeAuthView } from "@/components/WelcomeAuthView";
import { MedicationDetailModal } from "@/components/MedicationDetailModal";
import { AddEditMedicationModal } from "@/components/AddEditMedicationModal";
import { AssignPrescriptionModal } from "@/components/AssignPrescriptionModal";
import { InteractionCheckerModal } from "@/components/InteractionCheckerModal";
import { PillScannerModal } from "@/components/PillScannerModal";
import { AddAppointmentModal } from "@/components/AddAppointmentModal";
import { AddPatientModal } from "@/components/AddPatientModal";
import { PatientDashboardView } from "@/components/PatientDashboardView";
import { VademecumCatalogView } from "@/components/VademecumCatalogView";
import { AppointmentsView } from "@/components/AppointmentsView";
import { AdminDashboardView } from "@/components/AdminDashboardView";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  const [patientMeds, setPatientMeds] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);

  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const [loading, setLoading] = useState<boolean>(true);

  // Modals state
  const [isReminderOpen, setIsReminderOpen] = useState<boolean>(false);
  const [activeReminderMed, setActiveReminderMed] = useState<any | null>(null);

  const [selectedMedForDetail, setSelectedMedForDetail] = useState<any | null>(null);

  const [isAddEditMedOpen, setIsAddEditMedOpen] = useState<boolean>(false);
  const [editingMedData, setEditingMedData] = useState<any | null>(null);

  const [isAssignPrescriptionOpen, setIsAssignPrescriptionOpen] = useState<boolean>(false);
  const [prescriptionPatientId, setPrescriptionPatientId] = useState<number | undefined>(undefined);

  const [isInteractionCheckerOpen, setIsInteractionCheckerOpen] = useState<boolean>(false);
  const [isPillScannerOpen, setIsPillScannerOpen] = useState<boolean>(false);
  const [isAddAppointmentOpen, setIsAddAppointmentOpen] = useState<boolean>(false);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState<boolean>(false);

  // Load initial data
  const fetchData = async () => {
    try {
      setLoading(true);
      // Ensure seed endpoint is called
      await fetch("/api/seed");

      const [uRes, mRes, pRes, lRes, aRes, sRes] = await Promise.all([
        fetch("/api/users"),
        fetch("/api/medications"),
        fetch("/api/patient-medications"),
        fetch("/api/medication-logs"),
        fetch("/api/appointments"),
        fetch("/api/stats"),
      ]);

      const uData = await uRes.json();
      const mData = await mRes.json();
      const pData = await pRes.json();
      const lData = await lRes.json();
      const aData = await aRes.json();
      const sData = await sRes.json();

      if (uData.success) setUsers(uData.users || []);
      if (mData.success) setMedications(mData.medications || []);
      if (pData.success) setPatientMeds(pData.patientMedications || []);
      if (lData.success) setLogs(lData.logs || []);
      if (aData.success) setAppointments(aData.appointments || []);
      if (sData.success) setStats(sData.stats);

      // Default user to Alex Chen if not set
      if (!currentUser && uData.users && uData.users.length > 0) {
        const alex = uData.users.find((u: any) => u.name.includes("Alex")) || uData.users[0];
        setCurrentUser(alex);
      }
    } catch (error) {
      console.error("Error loading application data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter patient-specific prescriptions
  const currentPatientMeds = currentUser
    ? patientMeds.filter((pm) => pm.patientId === currentUser.id)
    : patientMeds;

  const currentPatientLogs = currentUser
    ? logs.filter((l) => l.patientId === currentUser.id)
    : logs;

  const currentPatientAppointments = currentUser
    ? appointments.filter((a) => a.patientId === currentUser.id)
    : appointments;

  // Handle active reminder confirmation / snooze
  const handleConfirmReminder = async () => {
    if (!currentUser) return;
    try {
      const pm = currentPatientMeds[0] || patientMeds[0];
      await fetch("/api/medication-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientMedicationId: pm?.id || 1,
          patientId: currentUser.id,
          action: "confirm",
          notes: `Administración de ${activeReminderMed?.name || 'Amlodipino 5mg'} confirmada por el paciente`,
        }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSnoozeReminder = async () => {
    if (!currentUser) return;
    try {
      const pm = currentPatientMeds[0] || patientMeds[0];
      await fetch("/api/medication-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientMedicationId: pm?.id || 1,
          patientId: currentUser.id,
          action: "snooze",
          notes: `Recordatorio de ${activeReminderMed?.name || 'Amlodipino 5mg'} pospuesto 15 min`,
        }),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Save Medication (Add or Edit)
  const handleSaveMedication = async (medData: any) => {
    try {
      if (editingMedData) {
        await fetch(`/api/medications/${editingMedData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(medData),
        });
      } else {
        await fetch("/api/medications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(medData),
        });
      }
      setEditingMedData(null);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMedication = async (id: number) => {
    try {
      await fetch(`/api/medications/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Assign Prescription
  const handleAssignPrescription = async (data: any) => {
    try {
      await fetch("/api/patient-medications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePrescription = async (id: number) => {
    try {
      await fetch(`/api/patient-medications/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Add Patient
  const handleAddPatient = async (data: any) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success && result.user) {
        setCurrentUser(result.user);
      }
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // Add Appointment
  const handleAddAppointment = async (data: any) => {
    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  // If not logged in, show welcome auth screen (Reference Image 2)
  if (!currentUser) {
    return (
      <WelcomeAuthView
        users={users}
        onLoginSuccess={(user) => setCurrentUser(user)}
        onRegisterPatient={handleAddPatient}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-gray-900 flex flex-col">
      
      {/* Responsive Top Navbar */}
      <Navbar
        currentUser={currentUser}
        users={users}
        onSelectUser={(u) => {
          setCurrentUser(u);
          if (u.role === "admin") {
            setActiveTab("admin");
          } else {
            setActiveTab("dashboard");
          }
        }}
        onLogout={() => setCurrentUser(null)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unreadNotifications={1}
        onOpenReminder={() => {
          setActiveReminderMed(medications[0]);
          setIsReminderOpen(true);
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {loading ? (
          <div className="py-20 text-center space-y-3">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-extrabold text-red-700 uppercase tracking-widest">
              Cargando MedicVisual Vademécum...
            </p>
          </div>
        ) : (
          <>
            {/* Tab Views */}
            {activeTab === "dashboard" && (
              <PatientDashboardView
                currentUser={currentUser}
                patientMeds={currentPatientMeds}
                logs={currentPatientLogs}
                appointments={currentPatientAppointments}
                onOpenReminderModal={(med) => {
                  setActiveReminderMed(med || medications[0]);
                  setIsReminderOpen(true);
                }}
                onOpenMedDetail={(med) => setSelectedMedForDetail(med)}
                onOpenPillScanner={() => setIsPillScannerOpen(true)}
                onOpenInteractionChecker={() => setIsInteractionCheckerOpen(true)}
                onOpenAddAppointment={() => setIsAddAppointmentOpen(true)}
              />
            )}

            {activeTab === "medications" && (
              <VademecumCatalogView
                medications={medications}
                onSelectMedication={(med) => setSelectedMedForDetail(med)}
                onOpenPillScanner={() => setIsPillScannerOpen(true)}
                onOpenInteractionChecker={() => setIsInteractionCheckerOpen(true)}
                currentUser={currentUser}
              />
            )}

            {activeTab === "appointments" && (
              <AppointmentsView
                appointments={currentPatientAppointments}
                onOpenAddAppointment={() => setIsAddAppointmentOpen(true)}
                currentUser={currentUser}
              />
            )}

            {activeTab === "interactions" && (
              <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-4">
                <h2 className="text-xl font-black text-gray-900">Módulo de Interacciones Medicamentosas</h2>
                <p className="text-xs text-gray-600">Verifique posibles contraindicaciones cruzadas entre fármacos.</p>
                <button
                  onClick={() => setIsInteractionCheckerOpen(true)}
                  className="px-6 py-3 bg-red-600 text-white font-extrabold text-xs uppercase rounded-xl shadow-md"
                >
                  Abrir Evaluador de Interacciones
                </button>
              </div>
            )}

            {activeTab === "admin" && (
              <AdminDashboardView
                stats={stats}
                medications={medications}
                users={users}
                patientMeds={patientMeds}
                logs={logs}
                onOpenAddMedication={() => {
                  setEditingMedData(null);
                  setIsAddEditMedOpen(true);
                }}
                onOpenEditMedication={(med) => {
                  setEditingMedData(med);
                  setIsAddEditMedOpen(true);
                }}
                onDeleteMedication={handleDeleteMedication}
                onOpenAssignPrescription={(pid) => {
                  setPrescriptionPatientId(pid);
                  setIsAssignPrescriptionOpen(true);
                }}
                onDeletePrescription={handleDeletePrescription}
                onOpenAddPatient={() => setIsAddPatientOpen(true)}
              />
            )}
          </>
        )}

      </main>

      {/* Mobile Touch Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role={currentUser?.role}
        onOpenReminder={() => {
          setActiveReminderMed(medications[0]);
          setIsReminderOpen(true);
        }}
      />

      {/* ALL MODALS */}
      {/* 1. RECORDATORIO DE MEDICACIÓN ACTIVA MODAL (Matching Image 1!) */}
      <ActiveMedicationModal
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
        patientName={currentUser?.name || "Alex Chen"}
        medication={activeReminderMed}
        onConfirm={handleConfirmReminder}
        onSnooze={handleSnoozeReminder}
      />

      {/* 2. Medication Detail Modal (All 7 Questions) */}
      <MedicationDetailModal
        isOpen={Boolean(selectedMedForDetail)}
        onClose={() => setSelectedMedForDetail(null)}
        medication={selectedMedForDetail}
        onCheckInteraction={() => {
          setSelectedMedForDetail(null);
          setIsInteractionCheckerOpen(true);
        }}
      />

      {/* 3. Add/Edit Medication Modal */}
      <AddEditMedicationModal
        isOpen={isAddEditMedOpen}
        onClose={() => setIsAddEditMedOpen(false)}
        onSave={handleSaveMedication}
        initialData={editingMedData}
      />

      {/* 4. Assign Prescription Modal */}
      <AssignPrescriptionModal
        isOpen={isAssignPrescriptionOpen}
        onClose={() => setIsAssignPrescriptionOpen(false)}
        patients={users}
        medications={medications}
        onAssign={handleAssignPrescription}
        preselectedPatientId={prescriptionPatientId}
      />

      {/* 5. Interaction Checker Modal */}
      <InteractionCheckerModal
        isOpen={isInteractionCheckerOpen}
        onClose={() => setIsInteractionCheckerOpen(false)}
        medications={medications}
      />

      {/* 6. Pill Scanner Modal */}
      <PillScannerModal
        isOpen={isPillScannerOpen}
        onClose={() => setIsPillScannerOpen(false)}
        medications={medications}
        onSelectMedication={(med) => setSelectedMedForDetail(med)}
      />

      {/* 7. Add Appointment Modal */}
      <AddAppointmentModal
        isOpen={isAddAppointmentOpen}
        onClose={() => setIsAddAppointmentOpen(false)}
        patientId={currentUser?.id || 1}
        onAddAppointment={handleAddAppointment}
      />

      {/* 8. Add Patient Modal */}
      <AddPatientModal
        isOpen={isAddPatientOpen}
        onClose={() => setIsAddPatientOpen(false)}
        onAddPatient={handleAddPatient}
      />

    </div>
  );
}
