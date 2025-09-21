'use client'

import { Contato } from "@/core/contato";
import { getContatosService } from "@/service/contato";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CartaoContato from "../../../components/contato/CartaoContato";
import TecladoAdicionarContato from "../../../components/contato/TecladoAdicionarContato";
import { Button } from "@/components/ui/button";
import { logout } from "@/service/usuario";

export default function Home() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(false);
  const [anotacao, setAnotacao] = useState("");

  async function buscarContatos() {
    setLoading(true);
    const resposta = await getContatosService();

    if (resposta === undefined) {
      toast.error('Não foi possível buscar os contatos');
      setLoading(false);
      return;
    }

    setContatos(resposta);
    setLoading(false);
  }

  useEffect(() => {
    buscarContatos();
  }, []);

  function handleSalvarAnotacao() {
    toast.success('Anotação salva!');
    setAnotacao("");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-amber-50">
      {/* Cabeçalho */}
      <header className="w-full bg-indigo-700 text-white flex items-center justify-between px-8 py-4 shadow-md fixed top-0 z-10">
          <h1 className="text-2xl font-bold">Minha Agenda</h1>
      </header>

      <div className="absolute top-3 right-4 z-20">
        <Button
          onClick={() => {
            logout()
            window.location.href = "/";
          }}
          className="hover:cursor-pointer"
        >
          Sair
        </Button>
      </div>

      {/* Conteúdo principal */}
      <main className="flex flex-col xl:flex-row pt-24 px-6 gap-8">
        {/* Lista de contatos */}
        <section className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-indigo-900">Contatos</h2>
            <TecladoAdicionarContato
              botaoAdicionarContato={
                <span
                  className="bg-indigo-800  text-white font-semibold px-4 py-2 rounded-lg shadow flex items-center gap-2 cursor-pointer transition-all duration-200"
                  tabIndex={0}
                  role="button"
                >
                  <UserPlus size={20} />
                  Adicionar contato
                </span>
              }
              buscarContatos={buscarContatos}
            />
          </div>
          <div className={`grid gap-6 ${contatos.length === 0 ? "justify-center" : "md:grid-cols-2 xl:grid-cols-3"}`}>
            {loading ? (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-2xl text-center text-black animate-pulse">
                  Carregando...
                </p>
              </div>
            ) : contatos.length === 0 ? (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-2xl text-center text-black animate-pulse">
                  Nada por aqui ainda... Adicione um contato!
                </p>
              </div>
            ) : (
              contatos.map((contato) => (
                <CartaoContato
                  key={contato.id}
                  contato={contato}
                  atualizarContatos={buscarContatos}
                />
              ))
            )}
          </div>
        </section>

        {/* Anotações */}
        <aside className="xl:w-[35%] bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 h-fit">
          <h2 className="text-xl font-semibold text-indigo-900 mb-2">Anotações da Agenda</h2>
          <textarea
            className="w-full h-32 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300"
            placeholder="Digite sua anotação aqui..."
            value={anotacao}
            onChange={e => setAnotacao(e.target.value)}
          />
          <button
            className="bg-indigo-700 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg font-semibold transition-all"
            onClick={handleSalvarAnotacao}
            disabled={!anotacao}
          >
            Salvar anotação
          </button>
        </aside>
      </main>
    </div>
  );
}