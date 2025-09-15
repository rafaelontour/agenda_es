'use client'

import { createContext, Dispatch, SetStateAction, useState } from "react";

export interface UsuarioContextoProps {
    nome: string
    setNome: Dispatch<SetStateAction<string>>
    email: string
    setEmail: Dispatch<SetStateAction<string>>
    telefone: string
    setTelefone: Dispatch<SetStateAction<string>>
    tipoAgenda: string
    setTipoAgenda: Dispatch<SetStateAction<string>>
    dados: boolean
    setDadosUsuario: Dispatch<SetStateAction<boolean>>
}

export const UsuarioContexto = createContext<UsuarioContextoProps | undefined>({} as UsuarioContextoProps)

export const UsuarioContextoProvider = ({ children }: { children: React.ReactNode}) => {
    
    const [nomeUsuario, setNomeUsuario] = useState<string>("")
    const [emailUsuario, setEmailUsuario] = useState<string>("")
    const [telefoneUsuario, setTelefoneUsuario] = useState<string>("")
    const [tipoAgenda, setTipoAgenda] = useState<string>("")
    const [dados, setDados] = useState<boolean>(false)

    return (
        <UsuarioContexto.Provider
            value={{
                nome: nomeUsuario, 
                setNome: setNomeUsuario,
                email: emailUsuario, 
                setEmail: setEmailUsuario,
                telefone: telefoneUsuario, 
                setTelefone: setTelefoneUsuario,
                tipoAgenda, 
                dados: dados,
                setDadosUsuario: setDados,
                setTipoAgenda
            }}
        >
            {children}
        </UsuarioContexto.Provider>
    )
}