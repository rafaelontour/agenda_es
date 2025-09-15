package com.engenharia_software.agenda.model;

import java.util.ArrayList;
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
}