package com.engenharia_software.agenda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public ResponseEntity<AnotacaoDTO> criarAnotacao(@RequestBody AnotacaoDTO anotacao) {
        AnotacaoDTO novaAnotacao = anotacaoService.criarAnotacao(anotacao);
        if (novaAnotacao == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            
        }
        return ResponseEntity.status(201).body(novaAnotacao);
    }

    @GetMapping
    public List<Anotacao> listarAnotacoes() {
        return anotacaoService.listarAnotacoes();
    }

}
