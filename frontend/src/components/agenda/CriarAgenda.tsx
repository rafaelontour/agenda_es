'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useUsuario from "@/data/hook/useUsuario";
import { criarAgendaService } from "@/service/agenda";
import { criarUsuarioService } from "@/service/usuario";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CriarAgenda() {

    const [tipoAgenda, setTipoAgenda] = useState<string>("LIST");
    const nav = useRouter();

    const { nome, setNome, email, setEmail, telefone, setTelefone, setDadosUsuario } = useUsuario();
    
    async function criarAgendaUsuario() {
        const resposta = await criarAgendaService(tipoAgenda)

        console.log("AGENDA E ID", resposta?.resposta, resposta?.idAgenda)

        if (resposta?.resposta !== 201) {
            toast.error('Não foi possível criar a agenda')
            return
        }

        const respostaUsuario = await criarUsuarioService(nome, email, telefone, resposta.idAgenda.toString(), tipoAgenda)

        switch (respostaUsuario) {
            case 201:
                setDadosUsuario(true)
                toast.success('Agenda criada com sucesso! Redirecionando...')
                nav.push('/minha_agenda')
                break;
            case 400:
                toast.error('Preencha todos os campos corretamente')
                break;
            default:
                toast.error('Não foi possível criar o usuário')
                break;
        }
    }

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

    function limparCampos() {
        setNome("")
        setEmail("")
        setTelefone("")
        setTipoAgenda("")
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
              <button
                className="bg-white hover:bg-amber-100 text-indigo-900 h-11 transition-colors mt-4 px-4 w-fit cursor-pointer"
              >
                Criar agenda
              </button>
            </DialogTrigger>


            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Criar nova agenda</DialogTitle>
                    <DialogDescription>
                        Preencha os dados abaixo para criar uma nova agenda
                    </DialogDescription>
                </DialogHeader>

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
                            defaultValue="selecionar"
                            onChange={(e) => setTipoAgenda(e.target.value)}
                            className="border-2 border-gray-300 rounded-md h-11 w-full px-3"
                        >
                            <option disabled value="selecionar">Selecione uma opção</option>
                            <option value="LIST">Agenda Lista</option>
                            <option value="MAP">Agenda Map</option>
                        </select>
                    </div>

                    <Button
                        onClick={(e) => { e.preventDefault(); criarAgendaUsuario() }}
                        className="bg-purple-900 text-white h-11 rounded-md hover:bg-indigo-900 transition-colors mt-4 cursor-pointer"
                    >
                        Criar agenda
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}