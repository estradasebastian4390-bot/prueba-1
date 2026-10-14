"use client";

import React, { useState } from "react";
import { 
  Users, 
  Pill, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  ShieldCheck, 
  Activity, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Search,
  UserPlus
} from "lucide-react";

interface AdminDashboardProps {
  stats: any;
  medications: any[];
  users: any[];
  patientMeds: any[];
  logs: any[];
  onOpenAddMedication: () => void;
  onOpenEditMedication: (med: any) => void;
  onDeleteMedication: (id: number) => Promise<void>;
  onOpenAssignPrescription: (patientId?: number) => void;
  onDeletePrescription: (id: number) => Promise<void>;
  onOpenAddPatient: () => void;
}

export const AdminDashboardView: React.FC<AdminDashboardProps> = ({
  stats,
  medications,
  users,
  patientMeds,
  logs,
  onOpenAddMedication,
  onOpenEditMedication,
  onDeleteMedication,
  onOpenAssignPrescription,
  onDeletePrescription,
  onOpenAddPatient,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<"medications" | "patients" | "reports">("medications");
  const [searchFilter, setSearchFilter] = useState("");

  const patientsList = users.filter((u) => u.role === "patient");

  const filteredMeds = medications.filter(
    (m) =>
      m.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      
      {/* Admin Header Banner */}
      <div className="bg-gradient-to-r from-red-800 via-red-700 to-rose-700 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
              Consola de Administración
            </span>
            <span className="text-xs text-red-100 font-bold">MedicVisual Vademécum System</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight mt-1">
            PANEL DE CONTROL ADMINISTRATIVO
          </h1>
          <p className="text-xs text-red-100">
            Gestión completa de vademécum, pacientes, recetas médicas y monitoreo de adherencia.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenAddMedication}
            className="px-4 py-2.5 bg-white text-red-700 hover:bg-red-50 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Medicamento</span>
          </button>

          <button
            onClick={onOpenAddPatient}
            className="px-4 py-2.5 bg-red-900/60 hover:bg-red-900 text-white border border-white/30 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center space-x-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Registrar Paciente</span>
          </button>
        </div>
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <p className="text-xs font-bold text-gray-500 uppercase">Pacientes Registrados</p>
          <h3 className="text-2xl font-black text-gray-900 mt-1">{stats?.patientsCount || patientsList.length}</h3>
          <span className="text-[10px] text-emerald-600 font-bold">● Perfiles Activos</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <p className="text-xs font-bold text-gray-500 uppercase">Fármacos en Vademécum</p>
          <h3 className="text-2xl font-black text-red-600 mt-1">{stats?.medicationsCount || medications.length}</h3>
          <span className="text-[10px] text-gray-500 font-bold">Fichas con 7 Preguntas</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <p className="text-xs font-bold text-gray-500 uppercase">Recetas Activas</p>
          <h3 className="text-2xl font-black text-gray-900 mt-1">{stats?.activePrescriptionsCount || patientMeds.length}</h3>
          <span className="text-[10px] text-red-600 font-bold">Horarios Asignados</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <p className="text-xs font-bold text-gray-500 uppercase">Adherencia Global</p>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">{stats?.adherenceRatePercentage || 95}%</h3>
          <span className="text-[10px] text-emerald-600 font-bold">Tomas Confirmadas</span>
        </div>
      </div>

      {/* Admin Tab Buttons */}
      <div className="bg-white p-2 rounded-2xl border border-gray-200 flex items-center space-x-2">
        <button
          onClick={() => setActiveAdminTab("medications")}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center space-x-2 ${
            activeAdminTab === "medications"
              ? "bg-red-600 text-white shadow-xs"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Pill className="w-4 h-4" />
          <span>Gestión de Vademécum ({medications.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab("patients")}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center space-x-2 ${
            activeAdminTab === "patients"
              ? "bg-red-600 text-white shadow-xs"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Pacientes y Recetas ({patientsList.length})</span>
        </button>

        <button
          onClick={() => setActiveAdminTab("reports")}
          className={`flex-1 py-2.5 text-xs font-extrabold rounded-xl transition-all flex items-center justify-center space-x-2 ${
            activeAdminTab === "reports"
              ? "bg-red-600 text-white shadow-xs"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Auditoría & Adherencia</span>
        </button>
      </div>

      {/* Tab 1: Vademécum Management */}
      {activeAdminTab === "medications" && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filtrar catálogo..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-gray-300 rounded-xl text-xs font-medium"
              />
            </div>

            <button
              onClick={onOpenAddMedication}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-xs flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Añadir Medicamento</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-slate-50 uppercase text-[10px] text-gray-500 font-extrabold border-b border-gray-200">
                <tr>
                  <th className="p-3">Fármaco</th>
                  <th className="p-3">Categoría</th>
                  <th className="p-3">Presentación</th>
                  <th className="p-3">Propósito (¿Para qué sirve?)</th>
                  <th className="p-3">Laboratorio</th>
                  <th className="p-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredMeds.map((m) => (
                  <tr key={m.id} className="hover:bg-red-50/30 transition-colors">
                    <td className="p-3">
                      <p className="font-bold text-gray-900">{m.name}</p>
                      <p className="text-[10px] text-gray-500">{m.genericName}</p>
                    </td>
                    <td className="p-3">
                      <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded text-[10px] font-bold">
                        {m.category}
                      </span>
                    </td>
                    <td className="p-3 text-gray-600 max-w-[180px] truncate">{m.presentation}</td>
                    <td className="p-3 text-gray-600 max-w-[200px] truncate">{m.purpose}</td>
                    <td className="p-3 text-gray-600">{m.manufacturer}</td>
                    <td className="p-3 text-right space-x-1 whitespace-nowrap">
                      <button
                        onClick={() => onOpenEditMedication(m)}
                        className="p-1.5 bg-slate-100 hover:bg-slate-200 text-gray-700 rounded-lg"
                        title="Editar Ficha"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar ${m.name} del vademécum?`)) {
                            onDeleteMedication(m.id);
                          }
                        }}
                        className="p-1.5 bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Patients & Prescriptions Management */}
      {activeAdminTab === "patients" && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex justify-between items-center">
            <div>
              <h3 className="text-base font-black text-gray-900">Listado de Pacientes y Recetas Asignadas</h3>
              <p className="text-xs text-gray-500">Gestione la medicación activa para cada paciente registrado</p>
            </div>

            <button
              onClick={() => onOpenAssignPrescription()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase rounded-xl shadow-xs flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Prescribir Medicamento</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientsList.map((patient) => {
              const pMeds = patientMeds.filter((pm) => pm.patientId === patient.id);

              return (
                <div key={patient.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={patient.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                        alt={patient.name}
                        className="w-12 h-12 rounded-xl object-cover border border-red-300"
                      />
                      <div>
                        <h4 className="font-extrabold text-sm text-gray-900">{patient.name}</h4>
                        <p className="text-xs text-gray-500 font-mono">{patient.medicalRecordNumber || "RS-10293"}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => onOpenAssignPrescription(patient.id)}
                      className="px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 font-bold text-xs rounded-lg border border-red-200 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Recetar</span>
                    </button>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-2">
                    <p className="text-xs font-bold text-gray-700 uppercase">Tratamientos Activos ({pMeds.length}):</p>
                    {pMeds.length === 0 ? (
                      <p className="text-xs text-gray-400 italic">Sin recetas activas actualmente.</p>
                    ) : (
                      pMeds.map((pm) => (
                        <div key={pm.id} className="flex justify-between items-center text-xs bg-white p-2 rounded-lg border border-gray-200">
                          <div>
                            <p className="font-bold text-gray-900">{pm.medication?.name || "Medicamento"}</p>
                            <p className="text-[10px] text-gray-500">{pm.customDose} • {pm.frequency}</p>
                          </div>
                          <button
                            onClick={() => {
                              if (confirm("¿Remover esta receta del paciente?")) {
                                onDeletePrescription(pm.id);
                              }
                            }}
                            className="text-rose-600 p-1 hover:bg-rose-50 rounded"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Reports */}
      {activeAdminTab === "reports" && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 space-y-4">
          <h3 className="text-base font-black text-gray-900">Auditoría en Tiempo Real de Tomas de Medicación</h3>
          
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    log.status === "confirmed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}>
                    {log.status === "confirmed" ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="font-extrabold text-gray-900">{log.notes || "Registro de toma"}</p>
                    <p className="text-[10px] text-gray-500">Programado: {log.scheduledTime}</p>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                  log.status === "confirmed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                }`}>
                  {log.status === "confirmed" ? "Confirmado" : "Pospuesto 15 min"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
