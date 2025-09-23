package com.engenharia_software.agenda.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.engenharia_software.agenda.DTO.AnotacaoDTO;
import com.engenharia_software.agenda.model.Agenda;
import com.engenharia_software.agenda.model.Anotacao;
import com.engenharia_software.agenda.repository.AgendaRepository;
import com.engenharia_software.agenda.repository.AnotacaoRepository;

@Service
public class AnotacaoService {
    
    // aqui conseguimos usar os metodos do jpa repository que estão no repository (salvar, deletar, atualizar, etc)
    @Autowired
    private AnotacaoRepository anotacaoRepository;

    @Autowired
    private AgendaRepository agendaRepository;

    public Anotacao criarAnotacao(AnotacaoDTO dto) {
        Agenda agenda = agendaRepository.findById(dto.getAgendaId())
                          .orElseThrow(() -> new RuntimeException("Agenda não encontrada"));

        Anotacao anotacao = new Anotacao();
        anotacao.setTitulo(dto.getTitulo());
        anotacao.setConteudo(dto.getConteudo());
        anotacao.setAgenda(agenda);

        return anotacaoRepository.save(anotacao);
    }

    public List<Anotacao> listarAnotacoes(Long agendaId) {
         return anotacaoRepository.findByAgendaId(agendaId);
    }


}
