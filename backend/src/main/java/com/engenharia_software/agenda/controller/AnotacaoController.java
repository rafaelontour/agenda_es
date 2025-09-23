package com.engenharia_software.agenda.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.engenharia_software.agenda.model.Anotacao;
import com.engenharia_software.agenda.service.AnotacaoService;

@RestController
@RequestMapping("/minha_agenda/anotacoes")
public class AnotacaoController {

    @Autowired
    private AnotacaoService anotacaoService;

    @PostMapping
    public Anotacao criarAnotacao(@RequestBody Anotacao anotacao) {
        return anotacaoService.criarAnotacao(anotacao);
    }
    
    @GetMapping
    public List<Anotacao> listarAnotacoes() {
        return anotacaoService.listarAnotacoes();
    }

}
