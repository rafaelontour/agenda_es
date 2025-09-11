package com.engenharia_software.agenda.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Transient;


@Entity
public class AgendaList extends Agenda {

    @Transient
    private List<Contato> contatos = new ArrayList<>();

    public void adicionarContato(Contato contato) {
        contatos.add(contato);
    }

    public List<Contato> getContatos() {
        return contatos;
    }
}