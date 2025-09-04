package com.engenharia_software.agenda.Factory;

public class FabricaAgenda {

    public static final int AGENDAMAP = 0;
    public static final int AGENDALIST = 1;

    private static FabricaAgenda fabricaAgenda = new FabricaAgenda();

    private FabricaAgenda() {

    }

    public static FabricaAgenda getInstancia() {
        return instancia;
    }

    public IAgenda criarAgenda(int tipo) {
        if (tipo == AGENDALIST) {
            return new AgendaList();
        } else if (tipo == AGENDAMAP) {
            return new AgendaMap();
        }
        throw new IllegalArgumentException("Tipo inválido: " + tipo);
    }

}