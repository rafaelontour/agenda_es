package com.engenharia_software.agenda.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.engenharia_software.agenda.DTO.LoginDTO;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO login, HttpServletRequest request) {

        if (login.getUsuario().equals("rafaelnargolo") && login.getSenha().equals("12345")) {
            // cria sessão
            HttpSession session = request.getSession(true);
            session.setAttribute("usuario", login.getUsuario());
            return ResponseEntity.ok("Logado com sucesso!");
        }

        return ResponseEntity.status(401).body("Usuário ou senha inválidos!");
    }

    @GetMapping("/me")
    public String me(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            return "Usuário logado: " + session.getAttribute("usuario");
        }
        return "Não logado!";
    }
}
