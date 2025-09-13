'use client'

import { Contato } from "@/core/contato";
import { getContatosService } from "@/service/contato";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CartaoContato from "./components/contato/CartaoContato";
import TecladoAdicionarContato from "./components/contato/TecladoAdicionarContato";

export default function Home() {
  
  const [contatos, setContatos] = useState<Contato[]>([]);

  const [loading, setLoading] = useState(false);

  async function buscarContatos() {
    setLoading(true);
    const resposta = await getContatosService();

    if (resposta === undefined) {
      toast.error('Não foi possível buscar os contatos')
      setLoading(false);
      return
    }

    setContatos(resposta)
    setLoading(false);
  }

  useEffect(() => {
    buscarContatos()
  }, [])

  return (
    <div className={`flex md:flex-col xl:flex-row h-screen`}>
      <div className={`flex h-1/2 xl:h-full xl:w-full`}>
        <div
          className={`
             p-10
            gap-3 w-full ${contatos.length == 0 ? "flex justify-center" : "grid md:grid-cols-2 xl:grid-cols-3 items-start auto-rows-min"} mt-12
          `}
        >
          {
            contatos.length > 0 && (
              <TecladoAdicionarContato
                botaoAdicionarContato={
                  <div className="flex w-full p-3 rounded-sm items-center gap-2 hover:cursor-pointer">
                    <UserPlus size={18} />
                    <p>Adicionar novo contato</p>
                  </div>
                }
                buscarContatos={buscarContatos}
              />
            )
          }
          {
            loading ? (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-2xl text-center text-black animate-pulse">
                  Carregando...
                </p>
              </div>
            ) : contatos.length == 0 ? (
              <div className="flex flex-col gap-6 items-center">
                <p className="text-2xl text-center text-black animate-pulse">
                  Nada por aqui ainda... Adicione um contato!
                </p>
                <TecladoAdicionarContato buscarContatos={buscarContatos} />
              </div>
            ) : (
              contatos.map((contato) => (
                <CartaoContato
                  key={contato.id}
                  contato={contato}
                  atualizarContatos={buscarContatos}
                />
              ))
            )
          }
        </div>
      </div>

      <div
        className="
          md:bg-red-400 lg:bg-green-400 p-10
          h-1/2 xl:mt-12 xl:h-full xl:w-[40%]
        "
      >
        sadlkasdfjf
      </div>
    </div>
  );
}
