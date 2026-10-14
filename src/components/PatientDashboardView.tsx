"use client";

import React from "react";
import { 
  Bell, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Pill, 
  ShieldAlert, 
  AlertCircle, 
  Activity, 
  User, 
  Phone, 
  Shield, 
  Plus,
  Camera,
  ArrowRight,
  TrendingUp,
  Award
} from "lucide-react";

interface PatientDashboardProps {
  currentUser: any;
  patientMeds: any[];
  logs: any[];
  appointments: any[];
  onOpenReminderModal: (med?: any) => void;
  onOpenMedDetail: (med: any) => void;
  onOpenPillScanner: () => void;
  onOpenInteractionChecker: () => void;
  onOpenAddAppointment: () => void;
}

export const PatientDashboardView: React.FC<PatientDashboardProps> = ({
  currentUser,
  patientMeds,
  logs,
  appointments,
  onOpenReminderModal,
  onOpenMedDetail,
  onOpenPillScanner,
  onOpenInteractionChecker,
  onOpenAddAppointment,
}) => {
  const patientName = currentUser?.name || "Alex Chen";

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      
      {/* Patient Header Profile Card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-red-50 to-transparent pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={currentUser?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                alt={patientName}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-red-500 shadow-md"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold" title="Paciente Activo">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-red-100 text-red-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  PANEL DE CONTROL DE SALUD
                </span>
                <span className="text-xs text-gray-500 font-bold">
                  Historial: <span className="text-gray-900 font-mono">{currentUser?.medicalRecordNumber || "RS-4363742675"}</span>
                </span>
              </div>
              
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight mt-1">
                PACIENTE: {patientName.toUpperCase()}
              </h1>

              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-2">
                <span className="flex items-center gap-1 font-semibold text-gray-700">
                  <Shield className="w-3.5 h-3.5 text-red-600" />
                  Sangre: <strong className="text-red-700">{currentUser?.bloodType || "O+"}</strong>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-gray-700">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  Alergias: <strong className="text-amber-700">{currentUser?.allergies || "Penicilina"}</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Trigger Button matching Image 1 Modal */}
          <div className="flex flex-col sm:flex-row items-stretch gap-2 shrink-0">
            <button
              onClick={() => onOpenReminderModal()}
              className="px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-200 transition-all flex items-center justify-center space-x-2 group animate-bounce"
            >
              <Bell className="w-4 h-4 text-white group-hover:scale-110" />
              <span>RECORDATORIO DE MEDICACIÓN ACTIVA</span>
            </button>

            <button
              onClick={onOpenPillScanner}
              className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition-all flex items-center justify-center space-x-2"
            >
              <Camera className="w-4 h-4 text-slate-600" />
              <span className="hidden sm:inline">Escanear Pastilla</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Schedule + Adherence + Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Today's Prescriptions & Schedule */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-base font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  Programación de Medicación Activa Hoy
                </h3>
                <p className="text-xs text-gray-500 font-medium">
                  {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <span className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
                {patientMeds.length} Medicamentos Recetados
              </span>
            </div>

            {patientMeds.length === 0 ? (
              <div className="p-8 text-center text-gray-500 bg-slate-50 rounded-xl border border-slate-200">
                <Pill className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="font-bold text-sm">No hay tratamientos registrados para este paciente.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {patientMeds.map((pm) => {
                  const m = pm.medication;
                  if (!m) return null;

                  return (
                    <div
                      key={pm.id}
                      className="p-4 rounded-xl border border-gray-200 hover:border-red-300 bg-slate-50/50 hover:bg-red-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                    >
                      <div className="flex items-start space-x-3">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-xs shrink-0 mt-0.5"
                          style={{ backgroundColor: m.colorCode || "#DC2626" }}
                        >
                          💊
                        </div>

                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-extrabold text-sm sm:text-base text-gray-900 group-hover:text-red-700">
                              {m.name}
                            </h4>
                            <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded-md font-extrabold uppercase">
                              {pm.customDose}
                            </span>
                          </div>

                          <p className="text-xs text-gray-600 font-medium mt-0.5">{m.purpose}</p>
                          
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-500 font-medium">
                            <span className="text-red-700 font-bold">⏰ {pm.frequency}</span>
                            <span>•</span>
                            <span>Prescrito por: {pm.prescribedBy}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => onOpenMedDetail(m)}
                          className="px-3 py-1.5 bg-white border border-gray-300 hover:border-red-400 text-gray-700 text-xs font-bold rounded-lg transition-all"
                        >
                          Ver Ficha (7 Puntos)
                        </button>

                        <button
                          onClick={() => onOpenReminderModal(m)}
                          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg shadow-xs transition-all flex items-center gap-1"
                        >
                          <Bell className="w-3.5 h-3.5" />
                          <span>Tomar</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Adherence History Timeline */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-base font-black text-gray-900 uppercase tracking-tight mb-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-600" />
              Historial de Tomas y Cumplimiento de Tratamiento
            </h3>

            <div className="space-y-2">
              {logs.length === 0 ? (
                <p className="text-xs text-gray-500 italic p-3 bg-slate-50 rounded-lg">
                  No hay registros recientes de administración.
                </p>
              ) : (
                logs.slice(0, 5).map((log) => (
                  <div key={log.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-3">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${
                        log.status === "confirmed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                      }`}>
                        {log.status === "confirmed" ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{log.notes || "Administración de dosis"}</p>
                        <p className="text-[10px] text-gray-500">{log.scheduledTime}</p>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      log.status === "confirmed" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {log.status === "confirmed" ? "Confirmado" : "Pospuesto"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column (4 cols): Quick Stats + Appointments + Interaction Widget */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Adherence Score Box */}
          <div className="bg-gradient-to-br from-red-600 to-rose-700 text-white rounded-2xl p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-red-200 uppercase tracking-wider">
                  Nivel de Adherencia Semanal
                </p>
                <h3 className="text-3xl font-black text-white mt-1">96%</h3>
                <p className="text-[11px] text-red-100 mt-1 font-medium">
                  ¡Excelente! Estás cumpliendo puntualmente tus medicamentos.
                </p>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl border border-white/20">
                <Award className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Interaction Checker Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-amber-100 text-amber-800 rounded-xl">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Comprobador de Seguridad</h4>
                <p className="text-[11px] text-gray-500">Verificar cruce entre tus fármacos</p>
              </div>
            </div>

            <p className="text-xs text-gray-600 mb-3">
              Comprueba si existen interacciones de riesgo entre tus medicamentos prescritos.
            </p>

            <button
              onClick={onOpenInteractionChecker}
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-sm transition-all"
            >
              Comprobar Mis Medicamentos
            </button>
          </div>

          {/* Appointments Preview Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-black text-sm text-gray-900 uppercase tracking-tight flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-red-600" />
                Próximas Citas
              </h3>

              <button
                onClick={onOpenAddAppointment}
                className="p-1 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-xs font-bold flex items-center gap-1"
                title="Agendar Cita"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {appointments.length === 0 ? (
              <p className="text-xs text-gray-500 italic p-3 bg-slate-50 rounded-lg">
                No tienes citas agendadas próximamente.
              </p>
            ) : (
              <div className="space-y-2">
                {appointments.map((app) => (
                  <div key={app.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-extrabold text-xs text-gray-900">{app.doctorName}</p>
                        <p className="text-[10px] text-red-700 font-bold">{app.specialty}</p>
                      </div>
                      <span className="text-[10px] bg-red-100 text-red-800 px-2 py-0.5 rounded font-extrabold">
                        {app.appointmentDate}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1">{app.location}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
