"use client";

import "./globals.css";
import { Toaster } from "sonner";
import Calendario from "./components/Calendario";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useUsuario, UsuarioContextoProvider } from "../../data/context/UsuarioContexto";


// Componente separado para evitar usar o hook fora do provider
function ConteudoPrincipal({ children }: { children: React.ReactNode }) {
  const { nome, setNome, email, setEmail, telefone, setTelefone, tipoAgenda, setTipoAgenda } = useUsuario();

  const [dados, setDados] = useState(false);

  useEffect(() => {
    setDados(false);
  }, []);

  // Função para aplicar máscara no telefone
  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

    if (valor.length > 10) {
      valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (valor.length > 5) {
      valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    }

    setTelefone(valor);
  };

  return (
    <>
      {!dados ? (
        <div className="flex h-screen flex-col justify-start pt-72 gap-6 bg-gradient-to-b from-indigo-900 to-purple-900 px-36">
          <div className="flex flex-col gap-2">
            <h1 className="text-6xl font-bold text-white">Bem-vindo ao nosso sistema de agenda!</h1>
            <p className="text-white text-xl w-xl">
              Sistema de Agendamento, desenvolvido por Alana Abreu, Rafael Argolo e Mateus Oliveira, como parte das atividades da disciplina de Engenharia de Software.
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <button
                className="bg-white hover:bg-amber-100 text-indigo-900 h-11 transition-colors mt-4 px-4 w-fit cursor-pointer"
              >
                Criar agenda
              </button>
            </DialogTrigger>

            <DialogContent>
              <form className="flex flex-col gap-3 px-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="nome">Nome:</label>
                  <input
                    id="nome"
                    placeholder="Nome do usuário"
                    className="border-2 border-gray-300 rounded-md h-11 w-full px-3"
                    type="text"
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    placeholder="exemplo@email.com"
                    className="border-2 border-gray-300 rounded-md h-11 w-full px-3"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="tel">Telefone:</label>
                  <input
                    id="tel"
                    placeholder="(99) 99999-9999"
                    className="border-2 border-gray-300 rounded-md h-11 w-full px-3"
                    type="tel"
                    value={telefone}
                    onChange={handleTelefoneChange}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label>Selecione o tipo de agenda</label>
                  <select
                    onChange={(e) => setTipoAgenda(e.target.value)}
                    className="border-2 border-gray-300 rounded-md h-11 w-full px-3"
                  >
                    <option value="lista">Agenda Lista</option>
                    <option value="map">Agenda Map</option>
                  </select>
                </div>

                <button
                  onClick={(e) => { e.preventDefault(); setDados(true); }}
                  className="bg-purple-900 text-white h-11 rounded-md hover:bg-indigo-900 transition-colors mt-4 cursor-pointer"
                >
                  Criar agenda
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <div>
          <Toaster richColors position="top-right" toastOptions={{ duration: 2500 }} />
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
        </div>
      )}
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <UsuarioContextoProvider>
          <ConteudoPrincipal>{children}</ConteudoPrincipal>
        </UsuarioContextoProvider>
      </body>
    </html>
  );
}
