package com.engenharia_software.agenda.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.engenharia_software.agenda.DTO.AnotacaoDTO;
import com.engenharia_software.agenda.model.Anotacao;
import com.engenharia_software.agenda.repository.AnotacaoRepository;

@Service
public class AnotacaoService {
    
    // aqui conseguimos usar os metodos do jpa repository que estão no repository (salvar, deletar, atualizar, etc)
    @Autowired
    private AnotacaoRepository anotacaoRepository;

    public AnotacaoDTO criarAnotacao(AnotacaoDTO anotacao) {
        Anotacao novaAnotacao = new Anotacao();
        novaAnotacao.setConteudo(anotacao.getConteudo());
        Anotacao anotacaoSalva = anotacaoRepository.save(novaAnotacao);
        return new AnotacaoDTO(anotacaoSalva.getId(), anotacaoSalva.getConteudo());
    }

    public List<Anotacao> listarAnotacoes() {
        return anotacaoRepository.findAll();
    }


}
