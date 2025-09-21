async function criarUsuarioService(nome: string, email: string, telefone: string, idAgenda: string | undefined, tipoAgenda: string, senha: string) {
    try {
        const resposta = await fetch('http://localhost:8081/usuario', {
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

        const json = await resposta.json();
        console.log(json)

        return json
    } catch(e) {
        return
    }
}

async function logar(id: string, nome: string, senha: string): Promise<number | undefined> {
    try {
        const resposta = await fetch('http://localhost:8081/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                id: id,
                usuario: nome,
                senha: senha
            }),
        })
    
        if (!resposta.ok) {
            return
        }
        return resposta.status
    } catch(e) {
        return
    }
}

async function logout() {
    const resposta = await fetch('http://localhost:8081/auth/logout', {
        method: "POST",
        credentials: "include"
    })

    console.log("SAIU", "resposta")
}

export {
    criarUsuarioService,
    logar,
    logout
}