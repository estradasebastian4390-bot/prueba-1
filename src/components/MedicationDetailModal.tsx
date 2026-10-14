"use client";

import React from "react";
import { 
  X, 
  Target, 
  Pill, 
  CupSoda, 
  AlertTriangle, 
  Ban, 
  OctagonAlert, 
  Building2, 
  FileCheck2,
  ShieldAlert,
  Sparkles
} from "lucide-react";

interface MedicationDetailProps {
  medication: any | null;
  isOpen: boolean;
  onClose: () => void;
  onCheckInteraction?: (med: any) => void;
}

export const MedicationDetailModal: React.FC<MedicationDetailProps> = ({
  medication,
  isOpen,
  onClose,
  onCheckInteraction,
}) => {
  if (!isOpen || !medication) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-gray-200 overflow-hidden transform transition-all my-auto">
        
        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-600 text-white p-5 flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 shadow-inner">
              <Pill className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  {medication.category}
                </span>
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase ${
                  medication.prescriptionRequired ? "bg-amber-400 text-amber-950" : "bg-emerald-400 text-emerald-950"
                }`}>
                  {medication.prescriptionRequired ? "Requiere Receta" : "Venta Libre"}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight mt-1">{medication.name}</h2>
              <p className="text-xs text-red-100 font-medium">{medication.genericName}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 7 Structured Questions Content Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[65vh] overflow-y-auto text-xs sm:text-sm text-gray-800 leading-relaxed">
          
          {/* Visual Pill Badge Box */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="w-8 h-8 rounded-full border border-gray-300 shadow-xs flex items-center justify-center font-bold text-[10px]"
                style={{ backgroundColor: medication.colorCode || "#EF4444" }}
              >
                💊
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Forma y Apariencia Física</p>
                <p className="text-xs text-gray-600">{medication.shape || "Tableta"} • {medication.presentation}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-500 font-bold uppercase">Laboratorio</p>
              <p className="text-xs font-bold text-gray-800">{medication.manufacturer}</p>
            </div>
          </div>

          {/* 1. ¿PARA QUÉ SIRVE EL MEDICAMENTO? */}
          <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-red-50/60 border border-red-100">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-gray-900 uppercase text-xs tracking-tight">
                1. ¿PARA QUÉ SIRVE EL MEDICAMENTO? (INDICACIÓN / PROPÓSITO)
              </h4>
              <p className="text-gray-700 font-medium mt-1">{medication.purpose}</p>
            </div>
          </div>

          {/* 2. ¿QUÉ PRESENTACIÓN TIENE EL MEDICAMENTO? */}
          <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-red-50/60 border border-red-100">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-gray-900 uppercase text-xs tracking-tight">
                2. ¿QUÉ PRESENTACIÓN TIENE EL MEDICAMENTO? (DOSIFICACIÓN / FORMA)
              </h4>
              <p className="text-gray-700 font-medium mt-1">{medication.presentation}</p>
            </div>
          </div>

          {/* 3. ¿LA CANTIDAD A ADMINISTRAR? */}
          <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-red-50/60 border border-red-100">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <CupSoda className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-gray-900 uppercase text-xs tracking-tight">
                3. ¿LA CANTIDAD A ADMINISTRAR? (DOSIS Y POSOLOGÍA)
              </h4>
              <p className="text-gray-700 font-medium mt-1">{medication.dosageInstruction}</p>
            </div>
          </div>

          {/* 4. ¿POR QUÉ VÍA LA DEBO ADMINISTRAR? */}
          <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-red-50/60 border border-red-100">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Pill className="w-4 h-4 rotate-45" />
            </div>
            <div>
              <h4 className="font-extrabold text-gray-900 uppercase text-xs tracking-tight">
                4. ¿POR QUÉ VÍA LA DEBO ADMINISTRAR? (VÍA DE ADMINISTRACIÓN)
              </h4>
              <p className="text-gray-700 font-medium mt-1">{medication.route}</p>
            </div>
          </div>

          {/* 5. ¿QUÉ EFECTOS SECUNDARIOS PUEDO TENER? */}
          <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-amber-950 uppercase text-xs tracking-tight">
                5. ¿QUÉ EFECTOS SECUNDARIOS PUEDO TENER AL TOMAR EL MEDICAMENTO?
              </h4>
              <p className="text-amber-900 font-medium mt-1">{medication.sideEffects}</p>
            </div>
          </div>

          {/* 6. ¿QUÉ CONTRAINDICACIONES TIENE EL MEDICAMENTO? */}
          <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-rose-50/80 border border-rose-200">
            <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Ban className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-rose-950 uppercase text-xs tracking-tight">
                6. ¿QUÉ CONTRAINDICACIONES TIENE EL MEDICAMENTO?
              </h4>
              <p className="text-rose-900 font-medium mt-1">{medication.contraindications}</p>
            </div>
          </div>

          {/* 7. ¿CUÁNDO SE DEBE SUSPENDER? */}
          <div className="flex items-start space-x-3 p-3.5 rounded-xl bg-red-100/90 border border-red-300">
            <div className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center shrink-0 shadow-xs">
              <OctagonAlert className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-red-950 uppercase text-xs tracking-tight">
                7. ¿CUÁNDO SE DEBE SUSPENDER EL TRATAMIENTO?
              </h4>
              <p className="text-red-900 font-bold mt-1">{medication.suspensionCriteria}</p>
            </div>
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-3">
          {onCheckInteraction && (
            <button
              onClick={() => onCheckInteraction(medication)}
              className="w-full sm:w-auto px-4 py-2 bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
            >
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>Verificar Interacciones Medicamentosas</span>
            </button>
          )}

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm"
          >
            Cerrar Ficha
          </button>
        </div>

      </div>
    </div>
  );
};
