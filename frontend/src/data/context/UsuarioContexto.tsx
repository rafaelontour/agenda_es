'use client'

import { Usuario } from "@/core";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";

export interface UsuarioContextoProps {
    id: string
    setId: Dispatch<SetStateAction<string>>
    nome: string
    setNome: Dispatch<SetStateAction<string>>
    email: string
    setEmail: Dispatch<SetStateAction<string>>
    telefone: string
    setTelefone: Dispatch<SetStateAction<string>>
    tipoAgenda: string
    setTipoAgenda: Dispatch<SetStateAction<string>>
    idAgenda: string
    setIdAgenda: Dispatch<SetStateAction<string>>
    usuario: Usuario
}

export const UsuarioContexto = createContext<UsuarioContextoProps | undefined>({} as UsuarioContextoProps)

export const UsuarioContextoProvider = ({ children }: { children: React.ReactNode}) => {
    
    const [id, setId] = useState<string>("")
    const [idAgenda, setIdAgenda] = useState<string>("")
    const [nomeUsuario, setNomeUsuario] = useState<string>("")
    const [emailUsuario, setEmailUsuario] = useState<string>("")
    const [telefoneUsuario, setTelefoneUsuario] = useState<string>("")
    const [tipoAgenda, setTipoAgenda] = useState<string>("")

    const usuario: Usuario = {
        id: "",
        idAgenda: "",
        nome: "",
        email: "",
        telefone: "",
        tipoAgenda: ""
    }

    async function info() {
        const resposta = await fetch('http://localhost:8081/auth/me', { credentials: "include" })
        const json = await resposta.json()
        
        usuario.id = json.id
        usuario.idAgenda = json.idAgenda
        usuario.nome = json.nome
        usuario.email = json.email
        usuario.telefone = json.telefone
        usuario.tipoAgenda = json.tipoAgenda
    }

    useEffect(() => {
        info()
    }, [])

    return (
        <UsuarioContexto.Provider
            value={{
                id: id,
                setId: setId,
                nome: nomeUsuario, 
                setNome: setNomeUsuario,
                email: emailUsuario, 
                setEmail: setEmailUsuario,
                telefone: telefoneUsuario, 
                setTelefone: setTelefoneUsuario,
                tipoAgenda, 
                setTipoAgenda,
                idAgenda: idAgenda,
                setIdAgenda: setIdAgenda,
                usuario

            }}
        >
            {children}
        </UsuarioContexto.Provider>
    )
}