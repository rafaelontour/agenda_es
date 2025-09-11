package com.engenharia_software.agenda.Factory;

import com.engenharia_software.agenda.model.Agenda;
import com.engenharia_software.agenda.model.AgendaList;
import com.engenharia_software.agenda.model.AgendaMap;

public class FabricaAgenda {

    private static FabricaAgenda fabricaAgenda = new FabricaAgenda();

    private FabricaAgenda() {}

    public static FabricaAgenda getInstancia() {
        return fabricaAgenda;
    }

    public Agenda criarAgenda(TipoAgenda tipo) {
        switch(tipo) {
            case TipoAgenda.LIST: return new AgendaList();
            case TipoAgenda.MAP: return new AgendaMap();
            default: throw new IllegalArgumentException("Tipo inválido: " + tipo);
        }
    }
}