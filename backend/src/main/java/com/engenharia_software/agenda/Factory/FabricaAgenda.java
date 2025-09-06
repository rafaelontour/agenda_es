package com.engenharia_software.agenda.Factory;

import com.engenharia_software.agenda.interfaces.IAgenda;
import com.engenharia_software.agenda.model.AgendaList;
import com.engenharia_software.agenda.model.AgendaMap;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class FabricaAgenda {

    private static FabricaAgenda fabricaAgenda = new FabricaAgenda();

    private FabricaAgenda() {}

    public static FabricaAgenda getInstancia() {
        return fabricaAgenda;
    }

    public IAgenda criarAgenda(TipoAgenda tipo) {
        switch(tipo) {
            case TipoAgenda.LIST: return new AgendaList();
            case TipoAgenda.MAP: return new AgendaMap();
            default: throw new IllegalArgumentException("Tipo inválido: " + tipo);
        }
    }
}