import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "MEDICVISUAL - Tu Plataforma de Visualización Médica Avanzada",
  description: "Plataforma web y móvil para información de medicamentos, vademécum interactivo y recordatorios de medicación activa.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-100 text-slate-900 antialiased min-h-screen selection:bg-red-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
