package com.engenharia_software.agenda.service;

import org.springframework.stereotype.Service;

import com.engenharia_software.agenda.DTO.ContatoDTO;
import com.engenharia_software.agenda.repository.ContatoRepository;

@Service
public class ContatoService {

    private ContatoRepository cr;
    
    public ContatoService(ContatoRepository cr) {
        this.cr = cr;
    }
    
    public void adicionarContato(ContatoDTO contato) {
        
    }

    public void localizarContato(ContatoDTO contato) {

    }

    public void listarContato(ContatoDTO contato) {
        
    }

    public void Contato(ContatoDTO contato) {

    }
    
    
}