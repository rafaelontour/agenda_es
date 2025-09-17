package com.engenharia_software.agenda.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")                     // todas as rotas
                        .allowedOrigins("http://localhost:3000") // front-end permitido
                        .allowedMethods("GET", "POST", "PUT", "DELETE")
                        .allowCredentials(true);                // 🔑 necessário para cookies
            }
        };
    }
}
