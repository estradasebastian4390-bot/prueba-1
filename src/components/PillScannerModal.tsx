"use client";

import React, { useState } from "react";
import { X, Camera, Scan, Sparkles, CheckCircle2, Pill } from "lucide-react";

interface PillScannerProps {
  isOpen: boolean;
  onClose: () => void;
  medications: any[];
  onSelectMedication: (med: any) => void;
}

export const PillScannerModal: React.FC<PillScannerProps> = ({
  isOpen,
  onClose,
  medications,
  onSelectMedication,
}) => {
  const [scanning, setScanning] = useState(false);
  const [selectedColor, setSelectedColor] = useState("Rosado");
  const [selectedShape, setSelectedShape] = useState("Redonda");
  const [scannedResult, setScannedResult] = useState<any | null>(null);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setScanning(true);
    setScannedResult(null);

    setTimeout(() => {
      // Find matching pill or default to Amlodipino
      const match = medications.find(
        (m) =>
          m.presentation.toLowerCase().includes(selectedColor.toLowerCase()) ||
          m.presentation.toLowerCase().includes(selectedShape.toLowerCase())
      ) || medications[0];

      setScannedResult(match);
      setScanning(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-gray-200 overflow-hidden my-auto">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-700 to-rose-600 text-white p-5 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 rounded-xl">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Identificador Visual de Pastillas</h2>
              <p className="text-xs text-red-100">Escaneo de medicamentos por forma y color</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs sm:text-sm">
          
          <div className="bg-slate-900 text-white p-6 rounded-2xl text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[160px] border border-slate-700">
            {scanning ? (
              <div className="space-y-3">
                <Scan className="w-12 h-12 text-red-500 animate-spin mx-auto" />
                <p className="font-bold text-sm text-red-400">Analizando características del comprimido...</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Camera className="w-10 h-10 text-red-400 mx-auto" />
                <p className="font-bold text-sm">Simular Análisis Fotográfico de Medicamento</p>
                <p className="text-xs text-slate-400">
                  Ajuste el color y la forma de la gragea o tableta abajo
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Color Predominante</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
              >
                <option value="Rosado">Rosado / Rosa</option>
                <option value="Blanco">Blanco</option>
                <option value="Amarillo">Amarillo / Rojo</option>
                <option value="Azul">Azul</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Forma del Comprimido</label>
              <select
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 font-medium"
              >
                <option value="Redonda">Redonda</option>
                <option value="Ovalada">Ovalada / Elíptica</option>
                <option value="Cápsula">Cápsula</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleSimulateScan}
            disabled={scanning}
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-xl shadow-md uppercase tracking-wider flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{scanning ? "Escaneando..." : "Escanear e Identificar"}</span>
          </button>

          {/* Result Card */}
          {scannedResult && !scanning && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl space-y-2 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold bg-red-600 text-white px-2 py-0.5 rounded-full uppercase">
                  Coincidencia 98%
                </span>
                <span className="text-xs text-gray-500 font-bold">{scannedResult.category}</span>
              </div>
              <h4 className="text-base font-black text-gray-900">{scannedResult.name}</h4>
              <p className="text-xs text-gray-700 font-medium">{scannedResult.presentation}</p>
              
              <button
                onClick={() => {
                  onSelectMedication(scannedResult);
                  onClose();
                }}
                className="w-full mt-2 py-2 bg-white border border-red-300 text-red-700 font-extrabold rounded-lg text-xs hover:bg-red-100 flex items-center justify-center gap-1"
              >
                <CheckCircle2 className="w-4 h-4 text-red-600" />
                <span>Ver Información Completa (7 Preguntas)</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
