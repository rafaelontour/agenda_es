'use client'

import { Sheet,SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { salvarContatoService } from "@/service/contato";
import { toast } from "sonner";

interface Props {
    nome: string;
    setNome: React.Dispatch<React.SetStateAction<string>>;
    telefone: string;
    setTelefone: React.Dispatch<React.SetStateAction<string>>;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
    buscarContatos: () => Promise<void>;
}

export default function AdicionarContato(props: Props) {

    async function salvarContato() {
       const resposta = await salvarContatoService(props.nome, props.telefone);

        if (resposta !== 201) {
            toast.error('Não foi possível salvar o contato')
            return
        }

        toast.success('Contato salvo com sucesso!')
        props.setOpenDialog(false)
        props.buscarContatos()
    }


    return (
        <Sheet>
            <SheetTrigger asChild>
                <div className="flex w-full p-3 rounded-sm items-center gap-2 hover:cursor-pointer hover:bg-gray-200">
                <UserPlus size={18} />
                <p>Novo contato</p>
                </div>
            </SheetTrigger>

            <SheetContent>
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold">Novo contato</SheetTitle>
                    <SheetDescription className="text-md">Complete os ddos do novo contato</SheetDescription>
                </SheetHeader>

                <form className="flex flex-col gap-3 px-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="nome">Nome:</label>
                        <input
                            id="nome"
                            className="border-2 border-gray-300 rounded-md h-11 w-full px-3"
                            type="text"
                            defaultValue={props.nome}
                            onChange={(e) => props.setNome(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="tel">Telefone:</label>
                        <input
                            id="tel"
                            className="border-2 border-gray-300 rounded-md h-11 w-full px-3"
                            type="number"
                            defaultValue={props.telefone}
                            onChange={(e) => props.setTelefone(e.target.value)}
                        />
                    </div>
                </form>

                <SheetFooter>
                    <Button onClick={salvarContato} className="hover:cursor-pointer" type="submit">Salvar</Button>

                    <SheetClose asChild>
                        <Button className="w-full hover:cursor-pointer" variant={"outline"}>
                            Cancelar
                        </Button>
                    </SheetClose>

                </SheetFooter>

            </SheetContent>
            </Sheet>
    )
}