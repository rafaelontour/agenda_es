package com.engenharia_software.agenda.service;

import org.springframework.stereotype.Service;

import com.engenharia_software.agenda.DTO.UsuarioDTO;
import com.engenharia_software.agenda.Factory.FabricaAgenda;
import com.engenharia_software.agenda.model.Agenda;
import com.engenharia_software.agenda.model.Usuario;
import com.engenharia_software.agenda.repository.AgendaRepository;
import com.engenharia_software.agenda.repository.UsuarioRepository;

@Service
public class UsuarioService {
    
    private UsuarioRepository ur;
    private AgendaRepository ar;

    public UsuarioService(UsuarioRepository ur, AgendaRepository ar) {
        this.ur = ur;
        this.ar = ar;
    }

    public boolean criarUsuario(UsuarioDTO usuario) {
        Agenda a = ar.findById(usuario.getIdAgenda()).get();
        
        Usuario u = new Usuario();

        u.setNome(usuario.getNome());
        u.setEmail(usuario.getEmail());
        u.setTelefone(usuario.getTelefone());

        Agenda agenda = FabricaAgenda.getInstancia().criarAgenda(usuario.getTipoAgenda());

        agenda.setId(usuario.getIdAgenda());
        agenda.setTipo(usuario.getTipoAgenda());

        u.setAgenda(a);

        Usuario usuarioSalvo = ur.save(u);
        System.out.println("USUARIO SALVO: ");
        System.out.println(usuarioSalvo.toString());

        return usuarioSalvo.getId() != null;
    }
}
