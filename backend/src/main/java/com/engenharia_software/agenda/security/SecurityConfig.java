package com.engenharia_software.agenda.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // em APIs com frontend separado, normalmente desabilitamos CSRF
            .csrf(csrf -> csrf.disable())
            // definindo quem pode acessar o quê
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/login").permitAll()  // acesso público
                .requestMatchers("/agenda", "/usuario", "/minha_agenda/**").permitAll() // acesso público
                .anyRequest().authenticated()                   // resto precisa estar logado
            )
            .cors(cors -> cors.configurationSource(request -> {
                var corsConfig = new CorsConfiguration();
                corsConfig.setAllowedOrigins(List.of("http://localhost:3000"));
                corsConfig.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
                corsConfig.setAllowCredentials(true);
                corsConfig.setAllowedHeaders(List.of("*"));
                return corsConfig;
            }))
            .formLogin(form -> form
                .loginProcessingUrl("/") // 🔑 define URL de login;
                .successHandler((req, res, auth) -> res.setStatus(HttpServletResponse.SC_OK))
                .failureHandler((req, res, ex) -> res.setStatus(HttpServletResponse.SC_UNAUTHORIZED))
            ); 

        return http.build();
    }
}
