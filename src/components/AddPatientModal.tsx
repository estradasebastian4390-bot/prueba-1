"use client";

import React, { useState } from "react";
import { X, UserPlus, CheckCircle2 } from "lucide-react";

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (data: any) => Promise<void>;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  isOpen,
  onClose,
  onAddPatient,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("1990-01-01");
  const [bloodType, setBloodType] = useState("O+");
  const [allergies, setAllergies] = useState("Ninguna registrada");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onAddPatient({
        name,
        email,
        phone,
        dateOfBirth,
        bloodType,
        allergies,
        emergencyContact,
        role: "patient",
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
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Registrar Nuevo Paciente</h2>
              <p className="text-xs text-red-100">Crear perfil médico e historial</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-3 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Nombre Completo *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Carlos Silva"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Correo Electrónico *</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="carlos@gmail.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Teléfono</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 555-0123"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Grupo Sanguíneo</label>
              <select
                value={bloodType}
                onChange={(e) => setBloodType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Alergias Conocidas</label>
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="Ej: Penicilina, Sulfas"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Contacto de Emergencia</label>
            <input
              type="text"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              placeholder="Nombre y teléfono del familiar"
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
              <span>{saving ? "Creando..." : "Crear Paciente"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
