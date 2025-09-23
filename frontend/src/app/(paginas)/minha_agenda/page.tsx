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
import useUsuario from "@/data/hook/useUsuario";
import { listarAnotacoesService, salvarAnotacaoService } from "@/service/anotacao";
import { useRouter } from "next/navigation";

export default function Home() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const [loading, setLoading] = useState(false);
  const [anotacao, setAnotacao] = useState("");

  const [titulo, setTitulo] = useState("");

  interface Anotacao {
  id: string;
  texto: string;
  createdAt: string;
}

  const { usuario } = useUsuario();


  const [anotacoes, setAnotacoes] = useState<{id: string, titulo: string, conteudo: string,createdAt: string}[]>([]);
  
  async function carregarAnotacoes() {
    if (!usuario?.idAgenda) return;
    const lista = await listarAnotacoesService(usuario.idAgenda);
    setAnotacoes(lista);
  }
  
  useEffect(() => {
    if (usuario?.idAgenda) {
      carregarAnotacoes();
    }
    
  }, [usuario]);
  
  
  const router = useRouter();


  async function buscarContatos() {
    setLoading(true);
    const resposta = await getContatosService(usuario?.idAgenda);

    if (resposta === undefined) {
      toast.error('Não foi possível buscar os contatos');
      setLoading(false);
      return;
    }

    setContatos(resposta);
    setLoading(false);
  }

  useEffect(() => {
    if (usuario?.idAgenda) {
      buscarContatos();
    }
  }, [usuario]);

  async function handleSalvarAnotacao() {
    if (!usuario?.idAgenda) return;

    const resposta = await salvarAnotacaoService(usuario?.idAgenda, titulo, anotacao);
    if (resposta !== 201) {
      toast.error('Não foi possível salvar a anotação');
      return;
    } 

    toast.success('Anotação salva!');
    setTitulo("");
    setAnotacao("");
    carregarAnotacoes();
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
            usuario!.id = "";
            usuario!.idAgenda = "";
            usuario!.nome = "";
            usuario!.email = "";
            usuario!.telefone = "";
            usuario!.tipoAgenda = "";
            toast.success('Saindo...')
            logout()
            router.push('/')
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
          <label htmlFor="">Titulo:</label>
          <input 
            id="titulo"
            type="text" 
            className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 " 
            placeholder="Digite o titulo da sua anotação aqui..."
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
          
          />

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

          <div className="mt-4">
            <h3 className="text-lg font-semibold text-indigo-800 mb-2">Minhas Anotações</h3>

            <div className="max-h-64 overflow-y-auto border rounded-lg p-3 bg-gray-50">
              {anotacoes.length === 0 ? (
                <p className="text-gray-500 text-center">Nenhuma anotação encontrada.</p>
              ) : (
                anotacoes.map((anotacao) => (
                  <div 
                    key={anotacao.id} 
                    className="p-3 mb-2 bg-white border rounded shadow-sm hover:shadow-md transition"
                  >
                    <p className="text-gray-800">{anotacao.titulo}</p>
                    <span className="text-xs text-gray-500 block mt-1">
                      {anotacao.conteudo}
                    </span>
                    
                  </div>
                ))
              )}
            </div>
          </div>

        </aside>
      </main>
    </div>
  );
}