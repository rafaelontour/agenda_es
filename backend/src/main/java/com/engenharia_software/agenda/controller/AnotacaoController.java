package com.engenharia_software.agenda.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.engenharia_software.agenda.DTO.AnotacaoDTO;
import com.engenharia_software.agenda.model.Anotacao;
import com.engenharia_software.agenda.service.AnotacaoService;

@RestController
@RequestMapping("/minha_agenda/anotacoes")
public class AnotacaoController {

    @Autowired
    private AnotacaoService anotacaoService;

    @PostMapping
    public ResponseEntity<Anotacao> criarAnotacao(@RequestBody AnotacaoDTO dto) {
        Anotacao anotacao = anotacaoService.criarAnotacao(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(anotacao);
    }
    
    @GetMapping
     public ResponseEntity<List<Anotacao>> listarAnotacoesPorAgenda(@RequestParam Long agendaId) {
        List<Anotacao> anotacoes = anotacaoService.listarAnotacoes(agendaId);
        return ResponseEntity.ok(anotacoes);
    }

}
