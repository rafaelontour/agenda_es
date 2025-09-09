package com.engenharia_software.agenda.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.engenharia_software.agenda.model.Contato;

import com.engenharia_software.agenda.DTO.ContatoDTO;
import com.engenharia_software.agenda.repository.ContatoRepository;

import jakarta.transaction.Transactional;

@Service
public class ContatoService {

    private ContatoRepository cr;
    
    public ContatoService(ContatoRepository cr) {
        this.cr = cr;
    }
    
    @Transactional
    public ContatoDTO adicionarContato(ContatoDTO contato) {
        Contato c = new Contato();
        c.setNome(contato.getNome());
        c.setTelefone(contato.getTelefone());

        Contato contatoCriado = cr.save(c);
        ContatoDTO contatoCriadoDTO = new ContatoDTO(contatoCriado);
        return contatoCriadoDTO;
    }

    public void localizarContato(ContatoDTO contato) {

    }

    public List<ContatoDTO> listarContato() {
        List<Contato> contatos = cr.findAll();
        List<ContatoDTO> contatosDTO = contatos.stream().map(x -> new ContatoDTO(x)).toList();
        return contatosDTO;
    }

    public void Contato(ContatoDTO contato) {

    }
    
    
}