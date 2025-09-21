'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { login } from "@/service/agenda";
import { useState } from "react";
import { toast } from "sonner";

export default function EntrarAgenda() {

    const [telefone, setTelefone] = useState<string>("");
    const [senha, setSenha] = useState<string>("");

     async function entrarAgenda() {
        const resposta = await login(telefone, senha)
        
        if (resposta !== 200) {
            toast.error('Não foi possível criar a agenda')
            return
        }

        toast.success('Agenda criada com sucesso! Redirecionando...')
    }
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="bg-white hover:bg-amber-100 text-indigo-900 h-11 transition-colors mt-4 px-4 w-fit cursor-pointer">
                    Entrar na agenda
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Entrar na agenda</DialogTitle>
                    <DialogDescription>Insira o telefone e o tipo de agenda</DialogDescription>
                </DialogHeader>

                <form className="flex flex-col gap-3 px-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nome">Telefone:</label>
                        <input
                            id="nome"
                            placeholder="Nome do usuário"
                            className="border-2 border-gray-300 rounded-md h-11 w-full px-3"
                            type="text"
                            onChange={(e) => setTelefone(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="senha">Senha</label>
                        <input
                            id="senha"
                            placeholder="Senha"
                            className="border-2 border-gray-300 rounded-md h-11 w-full px-3"
                            type="password"
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <Button
                        onClick={(e) => { e.preventDefault(); entrarAgenda(); }}
                        className="bg-purple-900 text-white h-11 rounded-md hover:bg-indigo-900 transition-colors mt-4 cursor-pointer"
                    >
                        Entrar
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}