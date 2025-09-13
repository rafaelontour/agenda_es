async function login(nome: string, email: string, telefone: string): Promise<number | undefined> {
    try {
        const resposta = await fetch('http://localhost:8090/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({nome, email, telefone})
        })

        if (!resposta.ok) {
            return
        }

        return resposta.status
    } catch(e) {
        return
    }
}