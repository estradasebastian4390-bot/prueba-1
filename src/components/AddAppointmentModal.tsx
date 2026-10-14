"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, User, MapPin, CheckCircle2 } from "lucide-react";

interface AddAppointmentProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: number;
  onAddAppointment: (data: any) => Promise<void>;
}

export const AddAppointmentModal: React.FC<AddAppointmentProps> = ({
  isOpen,
  onClose,
  patientId,
  onAddAppointment,
}) => {
  const [doctorName, setDoctorName] = useState("Dr. Roberto Mendoza");
  const [specialty, setSpecialty] = useState("Cardiología");
  const [appointmentDate, setAppointmentDate] = useState("2026-04-15");
  const [appointmentTime, setAppointmentTime] = useState("10:30");
  const [location, setLocation] = useState("Centro Médico MedicVisual - Cons. 402");
  const [notes, setNotes] = useState("Control de presión arterial y revisión de estudios.");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onAddAppointment({
        patientId,
        doctorName,
        specialty,
        appointmentDate,
        appointmentTime,
        location,
        notes,
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-200 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-rose-600 text-white p-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Agendar Cita Médica</h2>
              <p className="text-xs text-red-100">Programar consulta o control especialista</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-3 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Especialista / Médico *</label>
            <input
              type="text"
              required
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
              placeholder="Ej: Dr. Roberto Mendoza"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Especialidad *</label>
              <input
                type="text"
                required
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                placeholder="Ej: Cardiología"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Ubicación / Consultorio</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Cons. 402"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Fecha *</label>
              <input
                type="date"
                required
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Hora *</label>
              <input
                type="time"
                required
                value={appointmentTime}
                onChange={(e) => setAppointmentTime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Motivo / Notas</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Control de rutina, chequeo de prescripciones"
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
              className="px-6 py-2 bg-red-600 text-white font-extrabold rounded-xl shadow-md flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{saving ? "Guardando..." : "Agendar Cita"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
