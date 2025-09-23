"use client";

import "../../globals.css";
import Calendario from "@/components/Calendario";
import { UsuarioContextoProvider } from "@/data/context/UsuarioContexto";
import { useEffect, useState } from "react";
import { getContatosService } from "@/service/contato";
import { Contato } from "@/core/contato";
import { User, Mail, Phone, Users, LoaderIcon } from "lucide-react";
import useUsuario from "@/data/hook/useUsuario";
import { toast } from "sonner";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <UsuarioContextoProvider>
      <LayoutInterno>{children}</LayoutInterno>
    </UsuarioContextoProvider>
  );
}

function LayoutInterno({ children }: { children: React.ReactNode }) {
  const { usuario } = useUsuario()
  const [contatos, setContatos] = useState<Contato[] | null>(null);
  const [loading, setLoading] = useState(true);

  // Buscar contatos quando usuário estiver carregado
  useEffect(() => {
    if (!usuario) return;

    async function buscar() {
      setLoading(true);
      try {
        const resposta = await getContatosService(usuario?.idAgenda);
        if (!resposta) {
          toast.error("Não foi possível buscar os contatos");
          setContatos([]);
        } else {
          setContatos(resposta);
        }
      } catch (err) {
        toast.error("Erro ao buscar contatos");
        setContatos([]);
      } finally {
        setLoading(false);
      }
    }

    buscar();
  }, [usuario]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="flex flex-col min-w-[300px] z-10 bg-gradient-to-b from-indigo-600 to-indigo-400 p-6 gap-6 shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">Minha Agenda</h1>

        {/* Usuário */}
        <div className="flex flex-col items-center mb-4">
          <div className="h-28 w-28 rounded-full bg-white shadow-lg flex items-center justify-center mb-2 overflow-hidden border-4 border-indigo-300">
            <User size={56} className="text-indigo-400" />
          </div>
          <span className="text-white font-semibold">{usuario?.nome || "Usuário"}</span>
        </div>

        {/* Contato e email */}
        <div className="flex flex-col gap-4 px-2">
          <div className="flex items-center gap-2 text-white">
            <Mail size={18} className="opacity-80" />
            <span className="font-medium">
              {usuario ? (
                <p>{usuario.email}</p>
              ) : (
                <LoaderIcon size={18} className="animate-spin" />
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 text-white">
            <Phone size={18} className="opacity-80" />
            <span className="font-medium">
              {usuario ? (
                <p>{usuario.telefone}</p>
              ) : (
                <LoaderIcon size={18} className="animate-spin" />
              )}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-indigo-800 rounded-lg px-3 py-2 mt-2 shadow text-white">
            <Users size={18} />
            <span className="font-semibold">Contatos:</span>
            <span className="ml-1">
              {loading ? (
                <LoaderIcon size={18} className="animate-spin" />
              ) :  (
                contatos?.length || 0
              )}
            </span>
          </div>
        </div>

        {/* Calendário */}
        <Calendario />
      </aside>

      {/* Main */}
      <main className="w-full h-screen py-6 overflow-hidden bg-gradient-to-br from-indigo-50 to-amber-50">
        {children}
      </main>
    </div>
  );
}
