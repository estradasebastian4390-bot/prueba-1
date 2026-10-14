"use client";

import React, { useState } from "react";
import { X, ShieldAlert, AlertTriangle, CheckCircle2, Pill, Search } from "lucide-react";

interface InteractionCheckerProps {
  isOpen: boolean;
  onClose: () => void;
  medications: any[];
  initialSelectedMeds?: any[];
}

export const InteractionCheckerModal: React.FC<InteractionCheckerProps> = ({
  isOpen,
  onClose,
  medications,
  initialSelectedMeds = [],
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(
    initialSelectedMeds.map((m) => m.id)
  );

  if (!isOpen) return null;

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Mock safety analysis
  const hasAmlodipino = selectedIds.some(
    (id) => medications.find((m) => m.id === id)?.name.includes("Amlodipino")
  );
  const hasLosartan = selectedIds.some(
    (id) => medications.find((m) => m.id === id)?.name.includes("Losartán")
  );
  const hasMetformina = selectedIds.some(
    (id) => medications.find((m) => m.id === id)?.name.includes("Metformina")
  );

  const foundInteractions = [];

  if (hasAmlodipino && hasLosartan) {
    foundInteractions.push({
      med1: "Amlodipino Besilato",
      med2: "Losartán Potásico",
      severity: "Moderada",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      description:
        "Ambos son antihipertensivos. La coadministración potencia la reducción tensional. Se aconseja monitorear la presión arterial frecuentemente para prevenir episodios de hipotensión.",
    });
  }

  if (hasMetformina && hasAmlodipino) {
    foundInteractions.push({
      med1: "Metformina Clorhidrato",
      med2: "Amlodipino Besilato",
      severity: "Baja",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
      description:
        "Sin interacción mayor reportada. Mantener controles glucémicos periódicos habituales.",
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-200 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-600 text-white p-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Comprobador de Interacciones Medicamentosas</h2>
              <p className="text-xs text-red-100">Seleccione 2 o más fármacos para verificar incompatibilidades</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs sm:text-sm max-h-[70vh] overflow-y-auto">
          
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">
              Seleccionar Medicamentos de la lista ({selectedIds.length} seleccionados):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2 bg-slate-50 border border-slate-200 rounded-xl">
              {medications.map((m) => {
                const isSelected = selectedIds.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => toggleSelect(m.id)}
                    className={`p-2 rounded-lg text-left transition-all border flex items-center justify-between ${
                      isSelected
                        ? "bg-red-50 text-red-700 border-red-300 font-bold"
                        : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="truncate">
                      <p className="truncate text-xs font-bold">{m.name}</p>
                      <p className="text-[10px] text-gray-500 truncate">{m.genericName}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Analysis */}
          <div className="pt-2">
            <h3 className="text-xs font-black text-gray-900 uppercase tracking-wider mb-2">
              Resultado del Análisis de Seguridad
            </h3>

            {selectedIds.length < 2 ? (
              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-center text-gray-500">
                <Pill className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                <p className="font-bold text-xs">Seleccione al menos 2 medicamentos para realizar la comprobación.</p>
              </div>
            ) : foundInteractions.length === 0 ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-center space-x-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-extrabold text-sm">Sin Interacciones Incompatibles Detectadas</p>
                  <p className="text-xs text-emerald-800">
                    Los fármacos seleccionados pueden ser administrados según indicación médica estándar.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {foundInteractions.map((item, idx) => (
                  <div key={idx} className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                        <span className="font-extrabold text-gray-900 text-xs sm:text-sm">
                          {item.med1} ↔ {item.med2}
                        </span>
                      </div>
                      <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase ${item.badgeColor}`}>
                        Riesgo: {item.severity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl"
          >
            Entendido
          </button>
        </div>

      </div>
    </div>
  );
};
