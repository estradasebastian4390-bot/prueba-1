"use client";

import React from "react";
import { Activity, Pill, Calendar, ShieldCheck, Bell } from "lucide-react";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  role?: "admin" | "patient";
  onOpenReminder: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  role = "patient",
  onOpenReminder,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-30 px-2 py-1.5 flex justify-around items-center">
      <button
        onClick={() => setActiveTab("dashboard")}
        className={`flex flex-col items-center justify-center w-16 py-1 ${
          activeTab === "dashboard" ? "text-red-600 font-bold" : "text-gray-500 hover:text-gray-800"
        }`}
      >
        <Activity className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Inicio</span>
      </button>

      <button
        onClick={() => setActiveTab("medications")}
        className={`flex flex-col items-center justify-center w-16 py-1 ${
          activeTab === "medications" ? "text-red-600 font-bold" : "text-gray-500 hover:text-gray-800"
        }`}
      >
        <Pill className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Vademécum</span>
      </button>

      {/* Center Floating Quick Reminder Button */}
      <button
        onClick={onOpenReminder}
        className="flex flex-col items-center justify-center relative -top-3"
      >
        <div className="w-12 h-12 bg-gradient-to-tr from-red-600 to-rose-500 text-white rounded-full shadow-lg border-2 border-white flex items-center justify-center animate-pulse">
          <Bell className="w-6 h-6" />
        </div>
        <span className="text-[9px] font-bold text-red-600 mt-0.5">Recordatorio</span>
      </button>

      <button
        onClick={() => setActiveTab("appointments")}
        className={`flex flex-col items-center justify-center w-16 py-1 ${
          activeTab === "appointments" ? "text-red-600 font-bold" : "text-gray-500 hover:text-gray-800"
        }`}
      >
        <Calendar className="w-5 h-5" />
        <span className="text-[10px] mt-0.5">Citas</span>
      </button>

      {role === "admin" ? (
        <button
          onClick={() => setActiveTab("admin")}
          className={`flex flex-col items-center justify-center w-16 py-1 ${
            activeTab === "admin" ? "text-red-600 font-bold" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <ShieldCheck className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Admin</span>
        </button>
      ) : (
        <button
          onClick={() => setActiveTab("interactions")}
          className={`flex flex-col items-center justify-center w-16 py-1 ${
            activeTab === "interactions" ? "text-red-600 font-bold" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Alertas</span>
        </button>
      )}
    </nav>
  );
};
