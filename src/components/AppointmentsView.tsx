"use client";

import React from "react";
import { Calendar, Clock, MapPin, Plus, User, CheckCircle2 } from "lucide-react";

interface AppointmentsViewProps {
  appointments: any[];
  onOpenAddAppointment: () => void;
  currentUser: any;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  appointments,
  onOpenAddAppointment,
  currentUser,
}) => {
  return (
    <div className="space-y-6 pb-20 md:pb-10">
      
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="bg-red-100 text-red-700 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Agenda Médica Paciente
          </span>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-1">CITAS Y CONSULTAS MÉDICAS</h1>
          <p className="text-xs text-gray-600">
            Control de citas de seguimiento, revisiones cardiológicas y consultas de especialista
          </p>
        </div>

        <button
          onClick={onOpenAddAppointment}
          className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md flex items-center space-x-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Agendar Nueva Cita</span>
        </button>
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-gray-200">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-2" />
          <h3 className="font-extrabold text-gray-900 text-base">No hay citas programadas</h3>
          <p className="text-xs text-gray-500 mt-1">Haga clic en 'Agendar Nueva Cita' para registrar su próxima consulta médica.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {appointments.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs hover:border-red-300 transition-all space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    {app.specialty}
                  </span>
                  <h3 className="text-lg font-black text-gray-900 mt-1">{app.doctorName}</h3>
                </div>

                <div className="bg-red-600 text-white p-2.5 rounded-xl text-center min-w-[70px]">
                  <span className="block text-[10px] font-bold uppercase opacity-80">Fecha</span>
                  <span className="block text-xs font-black">{app.appointmentDate}</span>
                </div>
              </div>

              <div className="space-y-1 text-xs text-gray-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 font-semibold">
                  <Clock className="w-4 h-4 text-red-600" />
                  <span>Hora de consulta: <strong className="text-gray-900">{app.appointmentTime || "10:30"} AM</strong></span>
                </div>
                
                <div className="flex items-center gap-2 font-semibold">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>{app.location}</span>
                </div>

                {app.notes && (
                  <p className="text-[11px] text-gray-600 italic pt-1 border-t border-slate-200">
                    "{app.notes}"
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Cita Confirmada
                </span>

                <button
                  onClick={() => alert(`Recordatorio enviado para la cita con ${app.doctorName}`)}
                  className="text-xs text-red-600 font-bold hover:underline"
                >
                  Recordatorio SMS/Email
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
