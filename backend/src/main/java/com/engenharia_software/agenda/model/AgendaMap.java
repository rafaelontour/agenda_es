package com.engenharia_software.agenda.model;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.engenharia_software.agenda.interfaces.IAgenda;
import com.engenharia_software.agenda.interfaces.IContato;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class AgendaMap implements IAgenda {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;
    
    private Map<String, IContato> agenda = new HashMap<>();

    @Override
    public boolean adicionarContato(IContato contato) {
        agenda.put(contato.getTelefone(), contato);
        return true;
    }

    @Override
    public boolean removerContato(IContato contato) {
        agenda.remove(contato.getTelefone());
        return true;
    }

    @Override
    public Collection<IContato> getListaAgenda() {
        return agenda.values();
    }

    @Override
    public String getContato(String telefone) {
        return agenda.get(telefone).getTelefone();
    }
}