"use client";

import Calendario from "@/components/Calendario";
import "../../globals.css";

import { UsuarioContextoProvider } from "@/data/context/UsuarioContexto";
import useUsuario from "@/data/hook/useUsuario";


export default function RootLayout({ children }: { children: React.ReactNode }) {

  const { nome, email, telefone } = useUsuario();

  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <UsuarioContextoProvider>
          <div className="flex h-screen">
            <div
              className="flex flex-col min-w-[280px] z-10 bg-blue-300 p-4 gap-4"
              style={{ boxShadow: "4px 0px 6px rgba(0, 0, 0, 0.45)" }}
            >
              <h1 className="text-2xl">Minha agenda</h1>
              <div className="h-44 w-[75%] border-2 border-gray-500 mx-auto">
                Foto aqui
              </div>

              <div className="flex flex-col gap-3 mt-5 ml-4">
                <div>
                  <p>Nome de usuário</p>
                  <p>{nome}</p>
                </div>

                <div>
                  <p>Email</p>
                  <p>{email}</p>
                </div>

                <div>
                  <p>Telefone</p>
                  <p>{telefone}</p>
                </div>

                <div>
                  <p>Contatos</p>
                  <p>100</p>
                </div>
              </div>
              <Calendario />
            </div>

            <div className="w-full h-screen py-6 overflow-hidden">
              {children}
            </div>
          </div>
        </UsuarioContextoProvider>
      </body>
    </html>
  );
}