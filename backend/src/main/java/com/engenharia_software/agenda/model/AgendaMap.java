package com.engenharia_software.agenda.model;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.engenharia_software.agenda.interfaces.IAgenda;
import com.engenharia_software.agenda.interfaces.IContato;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MapKey;
import jakarta.persistence.OneToMany;

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
    
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @MapKey(name = "telefone") // usa o campo 'telefone' da entidade Contato como chave
    private Map<String, Contato> agenda = new HashMap<>();

    @Override
    public boolean adicionarContato(Contato contato) {
        agenda.put(contato.getTelefone(), contato);
        return true;
    }

    @Override
    public boolean removerContato(Contato contato) {
        agenda.remove(contato.getTelefone());
        return true;
    }

    @Override
    public Collection<Contato> getListaAgenda() {
        return agenda.values();
    }

    @Override
    public String getContato(String telefone) {
        return agenda.get(telefone).getTelefone();
    }
}