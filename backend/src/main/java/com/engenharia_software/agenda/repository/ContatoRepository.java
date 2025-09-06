package com.engenharia_software.agenda.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.engenharia_software.agenda.model.Contato;

public interface ContatoRepository extends JpaRepository<Contato, Long> {
    
}
