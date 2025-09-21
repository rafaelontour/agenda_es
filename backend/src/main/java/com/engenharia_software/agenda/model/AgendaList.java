package com.engenharia_software.agenda.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import jakarta.persistence.Transient;


@Entity
@PrimaryKeyJoinColumn(name = "agenda_id") 
public class AgendaList extends Agenda {

    @Transient
    private List<Contato> contatos = new ArrayList<>();

    public void adicionarContato(Contato contato) {
        contatos.add(contato);
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