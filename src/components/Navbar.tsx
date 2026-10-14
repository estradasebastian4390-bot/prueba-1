"use client";

import React, { useState } from "react";
import { 
  Pill, 
  Bell, 
  User, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  Menu, 
  X, 
  LogOut, 
  ChevronDown,
  Activity,
  Search,
  AlertTriangle
} from "lucide-react";

interface UserType {
  id: number;
  name: string;
  email: string;
  role: "admin" | "patient";
  medicalRecordNumber?: string;
  avatarUrl?: string;
}

interface NavbarProps {
  currentUser: UserType | null;
  users: UserType[];
  onSelectUser: (user: UserType) => void;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  unreadNotifications: number;
  onOpenReminder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  users,
  onSelectUser,
  onLogout,
  activeTab,
  setActiveTab,
  unreadNotifications,
  onOpenReminder,
}) => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-xs">
      {/* Top Alert Bar / Brand Line */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-rose-600 text-white text-xs py-1.5 px-4 flex justify-between items-center font-medium">
        <div className="flex items-center space-x-2 truncate">
          <span className="bg-white/20 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider">
            MedicVisual v2.5
          </span>
          <span className="truncate">Plataforma de Visualización Médica Avanzada y Vademécum Interactivo</span>
        </div>
        <div className="hidden sm:flex items-center space-x-4 text-[11px] opacity-90">
          <span>☎ Soporte 24/7: 0800-MEDIC-VISUAL</span>
          <span>•</span>
          <span className="text-emerald-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Sistema en Línea
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab("dashboard")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow-md shadow-red-200 border border-red-500">
              <div className="font-extrabold text-sm tracking-tighter flex items-center">
                <span className="text-white text-base font-black">M</span>
                <span className="text-red-200 text-xs font-bold">V</span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl text-gray-900 tracking-tight">MEDIC</span>
                <span className="font-extrabold text-xl text-red-600 tracking-tight">VISUAL</span>
              </div>
              <p className="text-[10px] text-gray-500 font-medium tracking-wide hidden sm:block">
                INFORMACIÓN DE MEDICAMENTOS Y CONTROL DE SALUD
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 ${
                activeTab === "dashboard"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "text-gray-600 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Panel de Control</span>
            </button>

            <button
              onClick={() => setActiveTab("medications")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 ${
                activeTab === "medications"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "text-gray-600 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Vademécum</span>
            </button>

            <button
              onClick={() => setActiveTab("appointments")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 ${
                activeTab === "appointments"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "text-gray-600 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Citas Médicas</span>
            </button>

            <button
              onClick={() => setActiveTab("interactions")}
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 ${
                activeTab === "interactions"
                  ? "bg-red-50 text-red-700 border border-red-200"
                  : "text-gray-600 hover:text-red-600 hover:bg-gray-50"
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Interacciones</span>
            </button>

            {currentUser?.role === "admin" && (
              <button
                onClick={() => setActiveTab("admin")}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 ${
                  activeTab === "admin"
                    ? "bg-red-600 text-white shadow-sm"
                    : "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Gestión Admin</span>
              </button>
            )}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3">
            {/* Quick Active Medication Notification Trigger */}
            <button
              onClick={onOpenReminder}
              className="relative p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors group"
              title="Ver Recordatorio de Medicación Activa"
            >
              <Bell className="w-5 h-5 group-hover:animate-bounce" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-extrabold rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifications}
                </span>
              )}
            </button>

            {/* Profile Selector Dropdown */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50/50 transition-all text-left"
                >
                  <img
                    src={currentUser.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover border border-red-400"
                  />
                  <div className="hidden lg:block text-xs">
                    <p className="font-bold text-gray-900 leading-none">{currentUser.name}</p>
                    <p className="text-[10px] text-gray-500 font-medium">
                      {currentUser.role === "admin" ? "Administrador" : `Paciente ID: ${currentUser.medicalRecordNumber || "RS-10293"}`}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400 hidden lg:block" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/70">
                      <p className="text-xs font-semibold text-gray-500">Sesión Actual</p>
                      <p className="font-bold text-gray-900 text-sm">{currentUser.name}</p>
                      <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${
                        currentUser.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-red-100 text-red-700"
                      }`}>
                        Rol: {currentUser.role === "admin" ? "Administrador MedicVisual" : "Paciente Registrado"}
                      </span>
                    </div>

                    <div className="px-4 py-2">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                        Cambiar de Perfil (Demostración)
                      </p>
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {users.map((u) => (
                          <button
                            key={u.id}
                            onClick={() => {
                              onSelectUser(u);
                              setUserDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2 py-1.5 rounded-md text-xs flex items-center justify-between hover:bg-red-50 ${
                              u.id === currentUser.id ? "bg-red-50 text-red-700 font-bold" : "text-gray-700"
                            }`}
                          >
                            <div className="flex items-center space-x-2 truncate">
                              <span className={`w-2 h-2 rounded-full ${u.role === "admin" ? "bg-purple-500" : "bg-red-500"}`}></span>
                              <span className="truncate">{u.name}</span>
                            </div>
                            <span className="text-[10px] text-gray-400 capitalize">{u.role}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-1 mt-1 px-2">
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-3 py-2 text-xs text-red-600 font-semibold hover:bg-red-50 rounded-md flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Cerrar Sesión</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : null}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-red-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <button
            onClick={() => {
              setActiveTab("dashboard");
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-3 ${
              activeTab === "dashboard" ? "bg-red-50 text-red-700 font-bold" : "text-gray-700"
            }`}
          >
            <Activity className="w-5 h-5 text-red-600" />
            <span>Panel de Control</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("medications");
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-3 ${
              activeTab === "medications" ? "bg-red-50 text-red-700 font-bold" : "text-gray-700"
            }`}
          >
            <Pill className="w-5 h-5 text-red-600" />
            <span>Vademécum Completo</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("appointments");
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-3 ${
              activeTab === "appointments" ? "bg-red-50 text-red-700 font-bold" : "text-gray-700"
            }`}
          >
            <Calendar className="w-5 h-5 text-red-600" />
            <span>Citas Médicas</span>
          </button>

          <button
            onClick={() => {
              setActiveTab("interactions");
              setMobileMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-3 ${
              activeTab === "interactions" ? "bg-red-50 text-red-700 font-bold" : "text-gray-700"
            }`}
          >
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>Interacciones entre Fármacos</span>
          </button>

          {currentUser?.role === "admin" && (
            <button
              onClick={() => {
                setActiveTab("admin");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold bg-red-600 text-white flex items-center space-x-3"
            >
              <ShieldCheck className="w-5 h-5 text-white" />
              <span>Gestión Administrador</span>
            </button>
          )}

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <button
              onClick={onOpenReminder}
              className="w-full py-2 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold text-center flex items-center justify-center space-x-2"
            >
              <Bell className="w-4 h-4 text-red-600 animate-bounce" />
              <span>Ver Recordatorio Activo de Medicación</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
