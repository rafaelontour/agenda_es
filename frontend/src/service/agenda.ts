async function criarAgendaService(tipo: string): Promise<{resposta: number, idAgenda: number} | undefined> {
    try {
        const resposta = await fetch(`http://localhost:8081/agenda`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tipo)
        })
        
        if (!resposta.ok) {
            return
        }

        const json = await resposta.json();

        return { resposta: resposta.status, idAgenda: json.id }
    } catch(e) {
        return
    }
}

async function login(telefone: string, senha: string): Promise<number | undefined> {
    try {
        const resposta = await fetch('http://localhost:8081/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({telefone, senha})
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
    login,
    criarAgendaService
}