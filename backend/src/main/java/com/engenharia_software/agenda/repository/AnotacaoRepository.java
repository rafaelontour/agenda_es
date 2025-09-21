package com.engenharia_software.agenda.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.engenharia_software.agenda.model.Anotacao;

public interface AnotacaoRepository extends JpaRepository<Anotacao, UUID> {
    
}
