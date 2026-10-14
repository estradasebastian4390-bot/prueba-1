"use client";

import React, { useState } from "react";
import { 
  Search, 
  Pill, 
  Filter, 
  Target, 
  CheckCircle2, 
  ShieldAlert, 
  ChevronRight, 
  Building2, 
  Camera,
  Sparkles
} from "lucide-react";

interface VademecumCatalogProps {
  medications: any[];
  onSelectMedication: (med: any) => void;
  onOpenPillScanner: () => void;
  onOpenInteractionChecker: () => void;
  currentUser: any;
}

export const VademecumCatalogView: React.FC<VademecumCatalogProps> = ({
  medications,
  onSelectMedication,
  onOpenPillScanner,
  onOpenInteractionChecker,
  currentUser,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const categories = [
    "Todas",
    "Cardiovascular / Antihipertensivo",
    "Endocrinología / Antidiabético",
    "Gastroenterología / IBPs",
    "Analgésico / Antipirético",
    "Antibiótico / Antiinfeccioso",
  ];

  const filteredMedications = medications.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.manufacturer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todas" ||
      m.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      
      {/* Vademécum Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-red-100 text-red-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Vademécum de Medicamentos MedicVisual
            </span>
            <span className="text-xs font-bold text-gray-500">
              Total: {filteredMedications.length} Fármacos
            </span>
          </div>

          <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1">
            INFORMACIÓN COMPLETA DE MEDICAMENTOS
          </h1>
          <p className="text-xs text-gray-600">
            Consulte detalles de dosificación, vías de administración, contraindicaciones y criterios de suspensión.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={onOpenPillScanner}
            className="px-4 py-2.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-extrabold text-xs rounded-xl transition-all flex items-center space-x-2"
          >
            <Camera className="w-4 h-4 text-red-600" />
            <span>Escáner Visual</span>
          </button>

          <button
            onClick={onOpenInteractionChecker}
            className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-extrabold text-xs rounded-xl transition-all flex items-center space-x-2"
          >
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>Interacciones</span>
          </button>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-5 h-5 text-red-600" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nombre comercial, principio activo, enfermedad o laboratorio..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-red-600 text-white shadow-xs"
                    : "bg-slate-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Medications Grid */}
      {filteredMedications.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
          <Pill className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <h3 className="font-extrabold text-gray-900 text-base">No se encontraron medicamentos</h3>
          <p className="text-xs text-gray-500 mt-1">Intente cambiar su término de búsqueda o la categoría seleccionada.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMedications.map((m) => (
            <div
              key={m.id}
              onClick={() => onSelectMedication(m)}
              className="bg-white rounded-2xl p-5 border border-gray-200 hover:border-red-400 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="space-y-3">
                
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-black bg-red-50 text-red-700 border border-red-100 px-2.5 py-0.5 rounded-full uppercase">
                    {m.category}
                  </span>
                  
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase ${
                    m.prescriptionRequired ? "bg-amber-100 text-amber-900" : "bg-emerald-100 text-emerald-900"
                  }`}>
                    {m.prescriptionRequired ? "Receta Médica" : "Venta Libre"}
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl text-white font-bold shadow-md shrink-0"
                    style={{ backgroundColor: m.colorCode || "#DC2626" }}
                  >
                    💊
                  </div>
                  <div>
                    <h3 className="text-base font-black text-gray-900 group-hover:text-red-700 transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold">{m.genericName}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1 text-xs">
                  <p className="text-gray-800 font-medium line-clamp-2">
                    <strong className="text-red-700">Propósito:</strong> {m.purpose}
                  </p>
                  <p className="text-gray-600 text-[11px] truncate">
                    <strong>Presentación:</strong> {m.presentation}
                  </p>
                </div>

              </div>

              <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500 text-[11px] font-medium truncate">
                  {m.manufacturer}
                </span>

                <span className="text-red-600 font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Ver Ficha Clínica (7 Preguntas)
                  <ChevronRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
