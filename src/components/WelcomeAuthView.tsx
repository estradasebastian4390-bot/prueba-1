"use client";

import React, { useState } from "react";
import { User, Lock, ArrowRight, ShieldCheck, Pill, CheckCircle2, UserPlus, KeyRound } from "lucide-react";

interface UserType {
  id: number;
  name: string;
  email: string;
  role: "admin" | "patient";
  medicalRecordNumber?: string;
  avatarUrl?: string;
}

interface WelcomeAuthViewProps {
  users: UserType[];
  onLoginSuccess: (user: UserType) => void;
  onRegisterPatient: (userData: any) => Promise<void>;
}

export const WelcomeAuthView: React.FC<WelcomeAuthViewProps> = ({
  users,
  onLoginSuccess,
  onRegisterPatient,
}) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Registration form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regBlood, setRegBlood] = useState("O+");
  const [regAllergies, setRegAllergies] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!emailInput) {
      setErrorMessage("Por favor ingrese su correo o usuario");
      return;
    }

    const found = users.find(
      (u) =>
        u.email.toLowerCase() === emailInput.toLowerCase() ||
        u.name.toLowerCase().includes(emailInput.toLowerCase())
    );

    if (found) {
      onLoginSuccess(found);
    } else {
      // Default fallback to first patient if user typed arbitrary text
      const patient = users.find((u) => u.role === "patient") || users[0];
      onLoginSuccess(patient);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail) {
      setErrorMessage("Por favor complete los campos obligatorios");
      return;
    }
    await onRegisterPatient({
      name: regName,
      email: regEmail,
      phone: regPhone,
      bloodType: regBlood,
      allergies: regAllergies || "Ninguna registrada",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans relative overflow-x-hidden">
      
      {/* Top App Bar Header */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-600 text-white py-4 px-6 shadow-md flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white text-red-600 rounded-xl flex items-center justify-center font-black text-xl shadow-inner border border-red-200">
            MV
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              MEDICVISUAL
            </h1>
            <p className="text-[10px] text-red-100 font-medium tracking-wide uppercase">
              Plataforma de Visualización Médica Avanzada
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-2 text-xs font-semibold bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>Acceso Seguro Encriptado SSL</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto w-full px-4 py-8 md:py-12 flex-1 flex flex-col justify-center items-center">
        
        {/* Banner Title */}
        <div className="text-center mb-8 max-w-2xl">
          <span className="bg-red-100 text-red-700 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
            Vademécum & Control de Adherencia
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-red-700 tracking-tight leading-none uppercase">
            ¡BIENVENIDO A MEDICVISUAL!
          </h2>
          <p className="text-sm sm:text-base text-gray-700 font-bold uppercase tracking-widest mt-1">
            TU PLATAFORMA DE VISUALIZACIÓN MÉDICA AVANZADA
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8 lg:p-10">
          
          {/* Left Visual Illustration & Highlights */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center text-center lg:border-r lg:border-gray-100 lg:pr-8">
            <div className="relative mb-6">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-gradient-to-tr from-red-50 to-rose-100 flex items-center justify-center p-4 border border-red-200 shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=80"
                  alt="Medicación MedicVisual"
                  className="w-full h-full object-cover rounded-2xl shadow-md border border-white"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-red-600 text-white font-black text-xs px-3 py-1.5 rounded-xl shadow-md flex items-center space-x-1.5 border border-white">
                <Pill className="w-4 h-4" />
                <span>Vademécum Interactivo</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full text-left">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-gray-900 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600" /> 7 Puntos Clave
                </p>
                <p className="text-[11px] text-gray-600">Indicaciones, dosis, vías, efectos y contraindicaciones.</p>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <p className="text-xs font-bold text-gray-900 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-red-600" /> Alertas en Vivo
                </p>
                <p className="text-[11px] text-gray-600">Recordatorios de tomas con botón de confirmación.</p>
              </div>
            </div>
          </div>

          {/* Right Login / Register Card */}
          <div className="lg:col-span-6 lg:pl-4">
            
            {!isRegistering ? (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight uppercase">
                    ACCEDER A TU CUENTA
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Ingresa con tu usuario registrado o prueba uno de los perfiles demo
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-xl">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Nombre de Usuario o Correo Electrónico
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-600">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="ejemplo@gmail.com o Alex Chen"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Contraseña
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-600">
                        <Lock className="w-5 h-5" />
                      </div>
                      <input
                        type="password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-gray-300 rounded-xl text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-red-200 active:scale-98 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>INICIAR SESIÓN</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                <div className="mt-4 flex flex-col sm:flex-row justify-between text-xs text-center sm:text-left gap-2">
                  <button
                    type="button"
                    onClick={() => setErrorMessage("Para demostración, seleccione un usuario directo abajo.")}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsRegistering(true)}
                    className="text-red-700 font-bold underline"
                  >
                    ¿No tienes cuenta? Registrate aquí
                  </button>
                </div>

                {/* Direct Demo Switch Buttons */}
                <div className="mt-6 pt-5 border-t border-gray-200">
                  <p className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-2">
                    Acceso Rápido Directo (Demo Users)
                  </p>
                  <div className="space-y-2">
                    {users.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => onLoginSuccess(u)}
                        className="w-full p-2.5 rounded-xl border border-gray-200 hover:border-red-400 bg-slate-50 hover:bg-red-50/60 transition-all flex items-center justify-between text-left group"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={u.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                            alt={u.name}
                            className="w-8 h-8 rounded-full object-cover border border-red-300"
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-900 group-hover:text-red-700">{u.name}</p>
                            <p className="text-[10px] text-gray-500">{u.email}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                          u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-red-100 text-red-700"
                        }`}>
                          {u.role === "admin" ? "Administrador" : "Paciente"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              /* Registration View */
              <div className="animate-in fade-in duration-150">
                <div className="mb-4">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Crear Cuenta</span>
                  <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                    REGISTRO DE PACIENTE
                  </h3>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nombre Completo *</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Ej: Lucía Gómez"
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-300 rounded-lg text-sm text-gray-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Correo Electrónico *</label>
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="lucia@gmail.com"
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-300 rounded-lg text-sm text-gray-900 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Teléfono</label>
                      <input
                        type="text"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+1 555-0192"
                        className="w-full px-3 py-2 bg-slate-50 border border-gray-300 rounded-lg text-sm text-gray-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Grupo Sanguíneo</label>
                      <select
                        value={regBlood}
                        onChange={(e) => setRegBlood(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-gray-300 rounded-lg text-sm text-gray-900 font-medium"
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
                      value={regAllergies}
                      onChange={(e) => setRegAllergies(e.target.value)}
                      placeholder="Ej: Penicilina, polen, AINEs"
                      className="w-full px-3 py-2 bg-slate-50 border border-gray-300 rounded-lg text-sm text-gray-900 font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md"
                  >
                    REGISTRAR Y INGRESAR
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setIsRegistering(false)}
                    className="text-xs font-bold text-gray-600 hover:text-red-600 underline"
                  >
                    ← Volver a Iniciar Sesión
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 text-center text-xs text-gray-500">
        <p>© 2026 MEDICVISUAL. Todos los derechos reservados. Sistema para información y visualización de medicamentos.</p>
      </footer>

    </div>
  );
};
