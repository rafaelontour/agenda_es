package com.engenharia_software.agenda.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // em APIs com frontend separado, normalmente desabilitamos CSRF
            .csrf(csrf -> csrf.disable())
            // definindo quem pode acessar o quê
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/login").permitAll()  // login é público
                .requestMatchers("/agenda", "/usuario").permitAll() // rota pra criar agenda e usuário
                .anyRequest().authenticated()                   // resto precisa estar logado
            )
            // habilita autenticação HTTP básica só para testar rapidamente
            .httpBasic(); 
            // ⬆️ aqui você pode substituir por formLogin() se quiser página de login no backend

        return http.build();
    }
}
