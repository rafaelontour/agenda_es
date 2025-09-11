package com.engenharia_software.agenda.model;

import jakarta.persistence.*;
import java.util.HashMap;
import java.util.Map;

@Entity
public class AgendaMap extends Agenda {

    @Transient
    private Map<String, Contato> contatos = new HashMap<>();

    public void adicionarContato(String chave, Contato contato) {
        contatos.put(chave, contato);
    }

    public Map<String, Contato> getContatos() {
        return contatos;
    }
}
