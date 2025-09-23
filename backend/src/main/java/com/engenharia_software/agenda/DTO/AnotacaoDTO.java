package com.engenharia_software.agenda.DTO;

import java.util.UUID;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnotacaoDTO {
    private String titulo;
    private String conteudo;
    private Long agendaId;
}
