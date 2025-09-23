package com.engenharia_software.agenda.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.engenharia_software.agenda.model.Anotacao;
import com.engenharia_software.agenda.repository.AnotacaoRepository;

@Service
public class AnotacaoService {
    
    // aqui conseguimos usar os metodos do jpa repository que estão no repository (salvar, deletar, atualizar, etc)
    @Autowired
    private AnotacaoRepository anotacaoRepository;

    public Anotacao criarAnotacao(Anotacao anotacao) {
        return anotacaoRepository.save(anotacao);
    }

    public List<Anotacao> listarAnotacoes() {
        return anotacaoRepository.findAll();
    }


}
