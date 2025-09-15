'use client'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Delete, Plus } from "lucide-react";
import { useState } from "react";
import AdicionarContato from "./AdicionarContato";
import { Button } from "@/components/ui/button";

interface Props {
    buscarContatos: () => Promise<void>
    botaoAdicionarContato?: React.ReactNode
}

export default function TecladoAdicionarContato({ buscarContatos, botaoAdicionarContato }: Props) {

    const [nome, setNome] = useState<string>("");
    const [numero, setNumero] = useState<string>("");
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    function limparCampos() {
        setNome("")
        setNumero("")
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog} >
            <DialogTrigger asChild className={`${ botaoAdicionarContato && "absolute top-4 right-4"}`}>
                {
                    botaoAdicionarContato ?
                        <Button>{botaoAdicionarContato}</Button> :
                    <div
                        className="
                            w-24 h-24 rounded-full flex justify-center items-center group hover:scale-110 transition-transform duration-500 hover:cursor-pointer active:scale-100
                        "
                        style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
                    >
                        <Plus
                            color="green"
                            size={40}
                            className="transform transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-150"
                        />
                    </div>
                }

            </DialogTrigger>

            <DialogContent onCloseAutoFocus={limparCampos} className="flex flex-col gap-8">
                <DialogHeader>
                    <DialogTitle>Novo contato</DialogTitle>
                    <DialogDescription>Adicione um novo contato</DialogDescription>
                </DialogHeader>

                <div className="relative">
                    <input
                        className="border-2 border-gray-300 rounded-md h-11 w-full px-5"
                        type="number"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                    />
                    <button className="absolute top-3 right-4 hover:cursor-pointer bg-white pl-2" onClick={() => setNumero((prev) => prev.slice(0, -1))}>
                        <Delete size={20} />
                    </button>
                </div>

                {numero.length > 0 && (
                    <AdicionarContato nome={nome} setNome={setNome} telefone={numero} setTelefone={setNumero} setOpenDialog={setOpenDialog} buscarContatos={buscarContatos} />
                )}
                <div className="grid grid-cols-3 gap-2 mx-auto">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-center items-center text-2xl text-center w-28 h-16 border-2 border-gray-300 rounded-md hover:cursor-pointer active:scale-95"
                            onClick={() => setNumero((prev) => prev + item)}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}