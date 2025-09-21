package com.engenharia_software.agenda.service;

import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.engenharia_software.agenda.DTO.LoginDTO;
import com.engenharia_software.agenda.model.Usuario;
import com.engenharia_software.agenda.repository.UsuarioRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UsuarioRepository usuarioRepository, PasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean login(LoginDTO login, HttpServletRequest request) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findById(login.getId());

        if (usuarioOpt.isEmpty()) return false;

        Usuario usuario = usuarioOpt.get();

        // compara senha com hash
        if (!passwordEncoder.matches(login.getSenha(), usuario.getSenha())) {
            return false;
        }

        // cria sessão
        HttpSession session = request.getSession(true);
        session.setAttribute("usuario", usuario.getNome());

        // define autenticação pro Spring Security
        Authentication auth = new UsernamePasswordAuthenticationToken(
            usuario.getNome(), null, List.of(new SimpleGrantedAuthority("ROLE_USER"))
        );
        SecurityContextHolder.getContext().setAuthentication(auth);

        return true;
    }
}
