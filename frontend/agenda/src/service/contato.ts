import { Contato } from "@/core/contato";

async function getContatosService(): Promise<Contato[] | undefined> {
    try {
        const resposta = await fetch('http://localhost:3000/api/contatos', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!resposta.ok) {
            return
        }

        return await resposta.json();
    } catch(e) {
        return
    }
}

async function salvarContatoService(nome: string, telefone: string): Promise<number | undefined> {
    try {
        const resposta = await fetch('/api/contatos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({nome, telefone})
        }
        )

        if (!resposta.ok) {
            return
        }

        return resposta.status
    } catch(e) {
        return
    }
}

export {
    getContatosService,
    salvarContatoService
}