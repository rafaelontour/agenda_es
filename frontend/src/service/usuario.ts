async function criarUsuarioService(nome: string, email: string, telefone: string, idAgenda: string, tipoAgenda: string, senha: string): Promise<number | undefined> {
    try {
        const resposta = await fetch('http://localhost:8090/usuario', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nome,
                email: email,
                telefone: telefone,
                idAgenda: idAgenda,
                tipoAgenda: tipoAgenda != null ? tipoAgenda : "LIST",
                senha: senha
            })
        })

        if (!resposta.ok) {
            return
        }

        return resposta.status
    } catch(e) {
        return
    }
}

async function logar(nome: string, senha: string): Promise<number | undefined> {
    try {
        const resposta = await fetch('http://localhost:8090/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: nome,
                senha: senha
            }),
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
    criarUsuarioService,
    logar
}