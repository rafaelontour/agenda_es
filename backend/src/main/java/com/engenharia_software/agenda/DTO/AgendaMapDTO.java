package com.engenharia_software.agenda.DTO;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import com.engenharia_software.agenda.interfaces.IAgenda;
import com.engenharia_software.agenda.interfaces.IContato;

public class AgendaMapDTO {
    
    private Map<String, IContato> agenda = new HashMap<>();

    public AgendaMapDTO(Map<String, IContato> agenda) {
        this.agenda = agenda;
    }


    public Map<String, IContato> getAgenda() {
        return agenda;
    }

    public void setAgenda(Map<String, IContato> agenda) {
        this.agenda = agenda;
    }

    
}