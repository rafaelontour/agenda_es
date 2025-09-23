

async function salvarAnotacaoService(idAgenda: string | undefined, titulo: string, conteudo: string): Promise<number | undefined> {
    try {
        const resposta = await fetch(`http://localhost:8081/minha_agenda/anotacoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ titulo, conteudo })
        });
        if (!resposta.ok) {
            return undefined;
        }
        return resposta.status;
    } catch (error) {
        return undefined;
    }
}


async function listarAnotacoesService() {
  try {
    const resposta = await fetch('http://localhost:8081/minha_agenda/anotacoes', {
      method: 'GET',
      credentials: 'include', // envia cookies de sessão (JSESSIONID)
    });

    if (!resposta.ok) {
      console.error("Erro ao buscar anotações. Status:", resposta.status);
      return [];
    }

    // Converte a resposta JSON do backend para um array de anotações
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Erro na requisição de anotações:", erro);
    return [];
  }
}



export { salvarAnotacaoService, listarAnotacoesService };