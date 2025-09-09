package com.engenharia_software.agenda.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.engenharia_software.agenda.DTO.ContatoDTO;
import com.engenharia_software.agenda.model.Contato;
import com.engenharia_software.agenda.service.ContatoService;

@RestController
@RequestMapping("/contato")
public class ContatoController {

    private ContatoService cs;

    public ContatoController(ContatoService cs) {
        this.cs = cs;
    }
    
    @PostMapping
    public ResponseEntity<ContatoDTO> adicionarContato(@RequestBody ContatoDTO contato) {
        ContatoDTO contatoCriado = cs.adicionarContato(contato);
        return ResponseEntity.status(HttpStatus.CREATED).body(contatoCriado);
    }
    
    @GetMapping
    public ResponseEntity<List<ContatoDTO>> listarContatos() {
        List<ContatoDTO> contatos = cs.listarContato();
        return ResponseEntity.status(HttpStatus.OK).body(contatos);
    }

    public ResponseEntity<String> localizarContato() {
        return null;
    }

    public ResponseEntity<String> removerContato() {
        return null;
    }

}
