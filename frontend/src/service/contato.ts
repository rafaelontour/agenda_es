import { Contato } from "@/core/contato";

async function getContatosService(): Promise<Contato[] | undefined> {
    try {
        const resposta = await fetch('http://localhost:8090/contatos', {
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
        const resposta = await fetch('http://localhost:8090/contatos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({nome, telefone})
        })

        if (!resposta.ok) {
            return
        }

        return resposta.status
    } catch(e) {
        return
    }
}

async function atualizarContatoService(id: string | undefined, nome: string, telefone: string): Promise<number | undefined> {
    try {
        const resposta = await fetch(`http://localhost:8090/contatos/${id}`, {
            method: "PUT",
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

async function excluirContatoService(id: string | undefined): Promise<number | undefined> {
    try {
        const resposta = await fetch(`http://localhost:8090/contatos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })

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
    salvarContatoService,
    atualizarContatoService,
    excluirContatoService
}