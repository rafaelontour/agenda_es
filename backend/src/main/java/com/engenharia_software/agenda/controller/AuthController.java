package com.engenharia_software.agenda.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.util.List;

import com.engenharia_software.agenda.service.AuthService;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

import com.engenharia_software.agenda.DTO.LoginDTO;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService as;

    public AuthController(AuthService as) {
        this.as = as;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO login, HttpServletRequest request) {
        boolean sucesso = as.login(login, request);
        if (sucesso) {
            return ResponseEntity.created(null).body("Logado com sucesso!");
        }
        return ResponseEntity.status(401).body("Usuário ou senha inválidos!");
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        // sobrescreve o cookie JSESSIONID no cliente
        Cookie cookie = new Cookie("JSESSIONID", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0); // expira imediatamente
        response.addCookie(cookie);

        return ResponseEntity.ok("Deslogado com sucesso!");
    }

    @GetMapping("/me")
    public ResponseEntity<String> me(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("usuario") != null) {
            return ResponseEntity.ok("Usuário logado: " + session.getAttribute("usuario"));
        }
        return ResponseEntity.status(401).body("Não logado");
    }
}
