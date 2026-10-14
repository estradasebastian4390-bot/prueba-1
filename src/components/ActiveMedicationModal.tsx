"use client";

import React, { useState } from "react";
import { 
  X, 
  Target, 
  Pill, 
  CupSoda, 
  AlertTriangle, 
  Ban, 
  OctagonAlert, 
  CheckCircle2, 
  Clock,
  Sparkles
} from "lucide-react";

interface MedicationData {
  id?: number;
  name: string;
  genericName?: string;
  category?: string;
  presentation: string;
  purpose: string;
  dosageInstruction: string;
  route: string;
  sideEffects: string;
  contraindications: string;
  suspensionCriteria: string;
  imageUrl?: string;
}

interface ActiveMedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
  medication?: MedicationData;
  onConfirm: () => void;
  onSnooze: () => void;
}

export const ActiveMedicationModal: React.FC<ActiveMedicationModalProps> = ({
  isOpen,
  onClose,
  patientName,
  medication,
  onConfirm,
  onSnooze,
}) => {
  const [confirmed, setConfirmed] = useState(false);
  const [snoozed, setSnoozed] = useState(false);

  if (!isOpen) return null;

  // Fallback defaults matching the exact reference image if no custom med passed
  const med = medication || {
    name: "Amlodipino 5mg",
    purpose: "Control de Hipertensión - Reduce la presión arterial al relajar los vasos sanguíneos.",
    presentation: "Tableta Oral - Tableta redonda, rosada, de 5mg.",
    dosageInstruction: "Una Tableta (5mg) - Tomar una vez al día.",
    route: "Oral con agua - Tragar entero; No triturar ni masticar. Tomar con alimentos si ocurre malestar estomacal.",
    sideEffects: "Comunes: Mareo, dolor de cabeza, fatiga. Raros: Hinchazón de tobillos, dificultad para respirar.",
    contraindications: "No tomar si está embarazada, tiene antecedentes de angioedema o enfermedad renal grave.",
    suspensionCriteria: "Suspender y contactar al médico si experimenta reacciones alérgicas (urticaria, dificultad para respirar), mareo intenso o dolor torácico persistente.",
  };

  const handleConfirmAction = () => {
    setConfirmed(true);
    setTimeout(() => {
      onConfirm();
      setConfirmed(false);
    }, 1200);
  };

  const handleSnoozeAction = () => {
    setSnoozed(true);
    setTimeout(() => {
      onSnooze();
      setSnoozed(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-gray-200 overflow-hidden transform transition-all my-auto">
        
        {/* Modal Header Banner - Crimson Red */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white p-4 sm:p-5 flex justify-between items-start relative shadow-inner">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 font-serif font-bold text-2xl text-white">
              Rx
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold tracking-wide uppercase font-sans flex items-center gap-2">
                RECORDATORIO DE MEDICACIÓN ACTIVA
              </h2>
              <p className="text-xs sm:text-sm text-red-100 font-medium flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                Paciente: <span className="font-bold underline underline-offset-2">{patientName || "Alex Chen"}</span>
                {med.name && <span className="ml-1 bg-black/20 px-2 py-0.5 rounded text-[11px] font-mono">{med.name}</span>}
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white hover:bg-white/20 p-1.5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation or Snooze Success Banner */}
        {confirmed && (
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-center space-x-2 animate-in zoom-in-95 duration-150">
            <CheckCircle2 className="w-6 h-6 animate-bounce" />
            <span className="font-bold text-base">¡Administración Registrada Correctamente!</span>
          </div>
        )}

        {snoozed && (
          <div className="bg-amber-600 text-white p-4 flex items-center justify-center space-x-2 animate-in zoom-in-95 duration-150">
            <Clock className="w-6 h-6 animate-spin" />
            <span className="font-bold text-base">Recordatorio pospuesto por 15 minutos</span>
          </div>
        )}

        {/* Structured Questions Content */}
        {!confirmed && !snoozed && (
          <div className="p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto text-gray-800 text-xs sm:text-sm leading-relaxed">
            
            {/* 1. ¿PARA QUÉ SIRVE EL MEDICAMENTO? */}
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-red-50/50 border border-red-100 hover:border-red-200 transition-colors">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-gray-900 uppercase tracking-tight text-xs sm:text-sm">
                  ¿PARA QUÉ SIRVE EL MEDICAMENTO?
                </h4>
                <p className="text-gray-700 font-medium mt-0.5">{med.purpose}</p>
              </div>
            </div>

            {/* 2. ¿QUÉ PRESENTACIÓN TIENE EL MEDICAMENTO? */}
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-red-50/50 border border-red-100 hover:border-red-200 transition-colors">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Pill className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-gray-900 uppercase tracking-tight text-xs sm:text-sm">
                  ¿QUÉ PRESENTACIÓN TIENE EL MEDICAMENTO?
                </h4>
                <p className="text-gray-700 font-medium mt-0.5">{med.presentation}</p>
              </div>
            </div>

            {/* 3. ¿LA CANTIDAD A ADMINISTRAR? */}
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-red-50/50 border border-red-100 hover:border-red-200 transition-colors">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CupSoda className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-gray-900 uppercase tracking-tight text-xs sm:text-sm">
                  ¿LA CANTIDAD A ADMINISTRAR?
                </h4>
                <p className="text-gray-700 font-medium mt-0.5">{med.dosageInstruction}</p>
              </div>
            </div>

            {/* 4. ¿POR QUÉ VÍA LA DEBO ADMINISTRAR? */}
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-red-50/50 border border-red-100 hover:border-red-200 transition-colors">
              <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Pill className="w-4 h-4 rotate-45" />
              </div>
              <div>
                <h4 className="font-black text-gray-900 uppercase tracking-tight text-xs sm:text-sm">
                  ¿POR QUÉ VÍA LA DEBO ADMINISTRAR?
                </h4>
                <p className="text-gray-700 font-medium mt-0.5">{med.route}</p>
              </div>
            </div>

            {/* 5. ¿QUÉ EFECTOS SECUNDARIOS PUEDO TENER AL TOMAR EL MEDICAMENTO? */}
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200 hover:border-amber-300 transition-colors">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-amber-950 uppercase tracking-tight text-xs sm:text-sm">
                  ¿QUÉ EFECTOS SECUNDARIOS PUEDO TENER AL TOMAR EL MEDICAMENTO?
                </h4>
                <p className="text-amber-900 font-medium mt-0.5">{med.sideEffects}</p>
              </div>
            </div>

            {/* 6. ¿QUE CONTRAINDICACIONES TIENE EL MEDICAMENTO? */}
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-rose-50/70 border border-rose-200 hover:border-rose-300 transition-colors">
              <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Ban className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-rose-950 uppercase tracking-tight text-xs sm:text-sm">
                  ¿QUE CONTRAINDICACIONES TIENE EL MEDICAMENTO?
                </h4>
                <p className="text-rose-900 font-medium mt-0.5">{med.contraindications}</p>
              </div>
            </div>

            {/* 7. ¿CUÁNDO SE DEBE SUSPENDER? */}
            <div className="flex items-start space-x-3 p-3 rounded-xl bg-red-100/80 border border-red-300 hover:border-red-400 transition-colors">
              <div className="w-8 h-8 rounded-full bg-red-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                <OctagonAlert className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-red-950 uppercase tracking-tight text-xs sm:text-sm">
                  ¿CUÁNDO SE DEBE SUSPENDER?
                </h4>
                <p className="text-red-900 font-semibold mt-0.5">{med.suspensionCriteria}</p>
              </div>
            </div>

          </div>
        )}

        {/* Modal Action Buttons */}
        {!confirmed && !snoozed && (
          <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleSnoozeAction}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl border-2 border-red-600 text-red-700 font-bold hover:bg-red-50 active:scale-98 transition-all text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <Clock className="w-4 h-4" />
              <span>POSPONER (15 mins)</span>
            </button>
            
            <button
              onClick={handleConfirmAction}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold shadow-md shadow-red-200 active:scale-98 transition-all text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>CONFIRMAR ADMINISTRACIÓN</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
