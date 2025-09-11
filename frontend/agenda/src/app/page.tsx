'use client'


import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Contato } from "@/core/contato";
import { getContatosService } from "@/service/contato";
import { Delete, Plus, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import AdicionarContato from "./components/contato/AdicionarContato";
import CartaoContato from "./components/contato/CartaoContato";
import { Button } from "@/components/ui/button";
import TecladoAdicionarContato from "./components/contato/TecladoAdicionarContato";

export default function Home() {

  
  const [contatos, setContatos] = useState<Contato[]>([]);

  async function buscarContatos() {
    const resposta = await getContatosService();

    if (resposta === undefined) {
      toast.error('Não foi possível buscar os contatos')
      return
    }

    setContatos(resposta)
  }

  useEffect(() => {
    buscarContatos()
  }, [])

  return (
    <div className={`flex ${ contatos.length == 0 ? "justify-center" : "flex-row justify-between"}  items-center`}>
      <div className={`flex flex-wrap w-full  ${contatos.length == 0 ? "flex-col items-center justify-center" : "justify-start ml-8"} gap-6 mt-12`}>

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
          contatos.length == 0 ? (
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
                nome={contato.nome}
                telefone={contato.telefone}
              />
            ))
          )
        }


      </div>
    </div>
  );
}
