import { Contato } from "@/core/contato";

async function getContatosService(idAgenda?: string): Promise<Contato[] | undefined> {
    if (!idAgenda) {
        return
    }

    const idAgendaInt = parseInt(idAgenda);

    try {
        const resposta = await fetch(`http://localhost:8081/minha_agenda/contatos/agenda/${idAgendaInt}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        if (!resposta.ok) {
            return
        }

        return await resposta.json();
    } catch(e) {
        return
    }
}

async function salvarContatoService(idAgenda: string, nome: string, telefone: string): Promise<number | undefined> {
    try {
        const resposta = await fetch('http://localhost:8081/minha_agenda/contatos', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({idAgenda, nome, telefone})
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
        const resposta = await fetch(`http://localhost:8081/minha_agenda/contatos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
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
        const resposta = await fetch(`http://localhost:8081/minha_agenda/contatos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
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