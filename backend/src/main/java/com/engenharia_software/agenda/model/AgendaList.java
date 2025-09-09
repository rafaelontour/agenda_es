package com.engenharia_software.agenda.model;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import com.engenharia_software.agenda.interfaces.IAgenda;
import com.engenharia_software.agenda.interfaces.IContato;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class AgendaList implements IAgenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Contato> listaContato = new ArrayList<>();

    @Override
    public boolean adicionarContato(Contato contato) {
        listaContato.add(contato);
        return true;
    }

    @Override
    public boolean removerContato(Contato contato) {
        listaContato.remove(contato);
        return true;
    }

    @Override
    public Collection<Contato> getListaAgenda() {
        return listaContato;
    }

    @Override
    public String getContato(String telefone) {
        for (Contato contato : listaContato) {
            if (contato.getTelefone().equals(telefone)) {
                return contato.getTelefone();
            }
        }
        return null;
    }
}