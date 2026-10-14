"use client";

import React, { useState } from "react";
import { X, Plus, Calendar, Clock, User, Pill, CheckCircle2 } from "lucide-react";

interface AssignPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  patients: any[];
  medications: any[];
  onAssign: (data: any) => Promise<void>;
  preselectedPatientId?: number;
}

export const AssignPrescriptionModal: React.FC<AssignPrescriptionModalProps> = ({
  isOpen,
  onClose,
  patients,
  medications,
  onAssign,
  preselectedPatientId,
}) => {
  const [selectedPatientId, setSelectedPatientId] = useState<number>(
    preselectedPatientId || (patients[0]?.id || 1)
  );
  const [selectedMedicationId, setSelectedMedicationId] = useState<number>(
    medications[0]?.id || 1
  );
  const [prescribedBy, setPrescribedBy] = useState("Dr. Roberto Mendoza (Cardiólogo)");
  const [frequency, setFrequency] = useState("Una vez al día (08:00 AM)");
  const [timesOfDay, setTimesOfDay] = useState("08:00");
  const [customDose, setCustomDose] = useState("1 Tableta (5mg)");
  const [customNotes, setCustomNotes] = useState("Tomar con agua por la mañana.");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onAssign({
        patientId: selectedPatientId,
        medicationId: selectedMedicationId,
        prescribedBy,
        frequency,
        timesOfDay: timesOfDay.split(",").map((t) => t.trim()),
        customDose,
        customNotes,
        startDate: new Date().toISOString().split("T")[0],
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-gray-200 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-rose-600 text-white p-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Prescribir Medicación a Paciente</h2>
              <p className="text-xs text-red-100">Asignar medicamento del vademécum y configurar horario</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs sm:text-sm">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Paciente *</label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-red-500"
            >
              {patients.filter(p => p.role === "patient").map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.medicalRecordNumber || "RS-10293"})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Medicamento del Vademécum *</label>
            <select
              value={selectedMedicationId}
              onChange={(e) => setSelectedMedicationId(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-red-500"
            >
              {medications.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.presentation})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Médico Prescriptor *</label>
            <input
              type="text"
              required
              value={prescribedBy}
              onChange={(e) => setPrescribedBy(e.target.value)}
              placeholder="Ej: Dr. Roberto Mendoza"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Frecuencia *</label>
              <input
                type="text"
                required
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                placeholder="Ej: Cada 12 horas"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Horario(s) (ej: 08:00, 20:00) *</label>
              <input
                type="text"
                required
                value={timesOfDay}
                onChange={(e) => setTimesOfDay(e.target.value)}
                placeholder="08:00, 20:00"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Dosis Prescrita *</label>
            <input
              type="text"
              required
              value={customDose}
              onChange={(e) => setCustomDose(e.target.value)}
              placeholder="Ej: 1 Tableta (5mg)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Instrucciones / Notas Especiales</label>
            <textarea
              rows={2}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              placeholder="Ej: Tomar preferentemente con alimentos por la mañana."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
            />
          </div>

          <div className="pt-4 border-t border-gray-200 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-xl"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl shadow-md flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{saving ? "Asignando..." : "Asignar Medicación"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
