package com.engenharia_software.agenda.model;

import jakarta.persistence.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Entity
@PrimaryKeyJoinColumn(name = "agenda_id") 
public class AgendaMap extends Agenda {

    @Transient
    private Map<String, Contato> contatos = new HashMap<>();

    public void adicionarContato(String chave, Contato contato) {
        contatos.put(chave, contato);
    }

    @Override
    public void adicionarContato(Contato contato) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'adicionarContato'");
    }

    @Override
    public Contato atualizarContato(Contato contato) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'atualizarContato'");
    }

    @Override
    public boolean removerContato(Contato contato) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'removerContato'");
    }

    @Override
    public Collection<Contato> getListaAgenda() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getListaAgenda'");
    }

    @Override
    public Contato getContato(String telefone) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getContato'");
    }
}
