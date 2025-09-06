package com.engenharia_software.agenda.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contato")
public class ContatoController {
    
    public ResponseEntity<String> adicionarContato() {
        return null;
    }
    
    public ResponseEntity<String> localizarContato() {
        return null;
    }

    public ResponseEntity<String> removerContato() {
        return null;
    }

    public ResponseEntity<String> listarContatos() {
        return null;
    }
}
