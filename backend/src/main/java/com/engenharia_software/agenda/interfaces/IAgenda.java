package com.engenharia_software.agenda.interfaces;

import java.util.Collection;

public interface IAgenda {
    public String getContato(String telefone);
    public boolean adicionarContato(IContato contato);
    public boolean removerContato(IContato contato);
    public Collection<IContato> getListaAgenda();
}
