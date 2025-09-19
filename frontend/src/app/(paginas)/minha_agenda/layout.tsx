"use client";

import Calendario from "@/components/Calendario";
import "../../globals.css";

import { UsuarioContextoProvider } from "@/data/context/UsuarioContexto";
import useUsuario from "@/data/hook/useUsuario";
import { User, Mail, Phone, Users } from "lucide-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { nome, email, telefone } = useUsuario();

  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <UsuarioContextoProvider>
          <div className="flex h-screen">
            <aside className="flex flex-col min-w-[300px] z-10 bg-gradient-to-b from-indigo-600 to-indigo-400 p-6 gap-6 shadow-lg">
              <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">Minha Agenda</h1>
              <div className="flex flex-col items-center mb-4">
                <div className="h-28 w-28 rounded-full bg-white shadow-lg flex items-center justify-center mb-2 overflow-hidden border-4 border-indigo-300">
                
                  <User size={56} className="text-indigo-400" />
                </div>
                <span className="text-white font-semibold">{nome || "Usuário"}</span>
              </div>

              <div className="flex flex-col gap-4 px-2">
                <div className="flex items-center gap-2 text-white">
                  <Mail size={18} className="opacity-80" />
                  <span className="font-medium">{email || "email@exemplo.com"}</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Phone size={18} className="opacity-80" />
                  <span className="font-medium">{telefone || "(00) 00000-0000"}</span>
                </div>
                <div className="flex items-center gap-2 bg-indigo-800 rounded-lg px-3 py-2 mt-2 shadow text-white">
                  <Users size={18} />
                  <span className="font-semibold">Contatos:</span>
                  <span className="ml-1">100</span>
                </div>
              </div>

   
                <Calendario />
           
            </aside>

            <main className="w-full h-screen py-6 overflow-hidden bg-gradient-to-br from-indigo-50 to-amber-50">
              {children}
            </main>
          </div>
        </UsuarioContextoProvider>
      </body>
    </html>
  );
}