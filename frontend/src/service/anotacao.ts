

async function salvarAnotacaoService(idAgenda: string, conteudo: string): Promise<number | undefined> {
    try {
        const resposta = await fetch(`http://localhost:8081/minha_agenda/anotacoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ conteudo })
        });
        if (!resposta.ok) {
            return undefined;
        }
        return resposta.status;
    } catch (error) {
        return undefined;
    }
}


export { salvarAnotacaoService };