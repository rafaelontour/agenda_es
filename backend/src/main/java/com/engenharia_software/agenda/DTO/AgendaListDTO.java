package com.engenharia_software.agenda.DTO;

import java.util.List;
import com.engenharia_software.agenda.interfaces.IContato;

public class AgendaListDTO {
    private List<IContato> listaContato;

    public AgendaListDTO(List<IContato> listaContato) {
        this.listaContato = listaContato;
    }

    public List<IContato> getListaContato() {
        return listaContato;
    }

    public void setListaContato(List<IContato> listaContato) {
        this.listaContato = listaContato;
    }


}