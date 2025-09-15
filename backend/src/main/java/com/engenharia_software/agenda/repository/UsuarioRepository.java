package com.engenharia_software.agenda.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.engenharia_software.agenda.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    
}
