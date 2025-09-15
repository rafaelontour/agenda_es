package com.engenharia_software.agenda.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.engenharia_software.agenda.DTO.UsuarioDTO;
import com.engenharia_software.agenda.service.UsuarioService;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {
    
    private UsuarioService us;

    public UsuarioController(UsuarioService us) {
        this.us = us;
    }

    @PostMapping
    public ResponseEntity<String> criarUsuario(@RequestBody UsuarioDTO usuario) {
        System.out.println("USUARIO: " + usuario.getIdAgenda() + " - " + usuario.getNome() + " - " + usuario.getEmail() + " - " + usuario.getTelefone() + " - " + usuario.getTipoAgenda());
        boolean resposta = us.criarUsuario(usuario);
// 
        if (resposta) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Usuário criado com sucesso.");
        }

        return ResponseEntity.badRequest().body("Erro ao criar usuário.");
    }
}
