'use client'

import { Usuario } from "@/core";
import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";

export interface UsuarioContextoProps {
    usuario: Usuario
}

export const UsuarioContexto = createContext<UsuarioContextoProps | undefined>({} as UsuarioContextoProps)

export const UsuarioContextoProvider = ({ children }: { children: React.ReactNode}) => {

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
    }, [usuario])

    return (
        <UsuarioContexto.Provider
            value={{
                usuario
            }}
        >
            {children}
        </UsuarioContexto.Provider>
    )
}