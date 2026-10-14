"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Save, Pill } from "lucide-react";

interface AddEditMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (medData: any) => Promise<void>;
  initialData?: any;
}

export const AddEditMedicationModal: React.FC<AddEditMedicationModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    genericName: "",
    category: "Cardiovascular / Antihipertensivo",
    presentation: "",
    purpose: "",
    dosageInstruction: "",
    route: "",
    sideEffects: "",
    contraindications: "",
    suspensionCriteria: "",
    manufacturer: "",
    prescriptionRequired: true,
    colorCode: "#DC2626",
    shape: "Tableta",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        genericName: initialData.genericName || "",
        category: initialData.category || "Cardiovascular / Antihipertensivo",
        presentation: initialData.presentation || "",
        purpose: initialData.purpose || "",
        dosageInstruction: initialData.dosageInstruction || "",
        route: initialData.route || "",
        sideEffects: initialData.sideEffects || "",
        contraindications: initialData.contraindications || "",
        suspensionCriteria: initialData.suspensionCriteria || "",
        manufacturer: initialData.manufacturer || "",
        prescriptionRequired: Boolean(initialData.prescriptionRequired),
        colorCode: initialData.colorCode || "#DC2626",
        shape: initialData.shape || "Tableta",
      });
    } else {
      setFormData({
        name: "",
        genericName: "",
        category: "Cardiovascular / Antihipertensivo",
        presentation: "",
        purpose: "",
        dosageInstruction: "",
        route: "",
        sideEffects: "",
        contraindications: "",
        suspensionCriteria: "",
        manufacturer: "",
        prescriptionRequired: true,
        colorCode: "#DC2626",
        shape: "Tableta",
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full border border-gray-200 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-red-600 text-white p-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Pill className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">
                {initialData ? "Editar Medicamento" : "Agregar Nuevo Medicamento al Vademécum"}
              </h2>
              <p className="text-xs text-red-100">
                Complete las 7 preguntas de información clínica y ficha técnica
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs sm:text-sm">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nombre Comercial *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Amlodipino Besilato"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nombre Genérico / Principio Activo *</label>
              <input
                type="text"
                required
                value={formData.genericName}
                onChange={(e) => setFormData({ ...formData, genericName: e.target.value })}
                placeholder="Ej: Amlodipino 5mg"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Categoría Terapéutica *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-red-500"
              >
                <option value="Cardiovascular / Antihipertensivo">Cardiovascular / Antihipertensivo</option>
                <option value="Endocrinología / Antidiabético">Endocrinología / Antidiabético</option>
                <option value="Gastroenterología / IBPs">Gastroenterología / IBPs</option>
                <option value="Analgésico / Antiinflamatorio">Analgésico / Antiinflamatorio</option>
                <option value="Antibiótico / Antiinfeccioso">Antibiótico / Antiinfeccioso</option>
                <option value="Neurología / Psiquiatría">Neurología / Psiquiatría</option>
                <option value="Respiratorio / Antihistamínico">Respiratorio / Antihistamínico</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Laboratorio / Fabricante</label>
              <input
                type="text"
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                placeholder="Ej: Pfizer / MedicVisual"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Receta Médica</label>
              <select
                value={formData.prescriptionRequired ? "true" : "false"}
                onChange={(e) => setFormData({ ...formData, prescriptionRequired: e.target.value === "true" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium focus:ring-2 focus:ring-red-500"
              >
                <option value="true">Requiere Receta Médica</option>
                <option value="false">Venta Libre (OTC)</option>
              </select>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-3">
            <p className="text-xs font-black text-red-700 uppercase tracking-wider mb-2">
              Información Estructurada (7 Preguntas)
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-800">1. ¿Para qué sirve el medicamento? (Propósito) *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  placeholder="Ej: Control de Hipertensión - Reduce la presión arterial al relajar los vasos sanguíneos."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800">2. ¿Qué presentación tiene el medicamento? (Forma/Color/Dosis) *</label>
                <input
                  type="text"
                  required
                  value={formData.presentation}
                  onChange={(e) => setFormData({ ...formData, presentation: e.target.value })}
                  placeholder="Ej: Tableta Oral - Tableta redonda, rosada, de 5mg."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800">3. ¿La cantidad a administrar? (Posología) *</label>
                <input
                  type="text"
                  required
                  value={formData.dosageInstruction}
                  onChange={(e) => setFormData({ ...formData, dosageInstruction: e.target.value })}
                  placeholder="Ej: Una Tableta (5mg) - Tomar una vez al día."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800">4. ¿Por qué vía la debo administrar? (Vía e Instrucciones) *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.route}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                  placeholder="Ej: Oral con agua - Tragar entero; No triturar ni masticar."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800">5. ¿Qué efectos secundarios puedo tener al tomar el medicamento? *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.sideEffects}
                  onChange={(e) => setFormData({ ...formData, sideEffects: e.target.value })}
                  placeholder="Ej: Comunes: Mareo, dolor de cabeza. Raros: Hinchazón de tobillos."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800">6. ¿Qué contraindicaciones tiene el medicamento? *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.contraindications}
                  onChange={(e) => setFormData({ ...formData, contraindications: e.target.value })}
                  placeholder="Ej: No tomar si está embarazada o tiene antecedente de angioedema."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-800 text-red-700">7. ¿Cuándo se debe suspender? (Alertas de Emergencia) *</label>
                <textarea
                  required
                  rows={2}
                  value={formData.suspensionCriteria}
                  onChange={(e) => setFormData({ ...formData, suspensionCriteria: e.target.value })}
                  placeholder="Ej: Suspender y contactar al médico si experimenta reacciones alérgicas o dolor torácico."
                  className="w-full px-3 py-2 border border-red-300 bg-red-50/30 rounded-lg text-gray-900 font-medium"
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end space-x-3 rounded-b-xl">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl shadow-md flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Guardando..." : "Guardar Medicamento"}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
