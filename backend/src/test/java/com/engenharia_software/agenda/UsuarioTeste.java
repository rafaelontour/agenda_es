package com.engenharia_software.agenda;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.engenharia_software.agenda.model.Usuario;
import com.engenharia_software.agenda.repository.UsuarioRepository;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UsuarioTeste {

    @Autowired
    private UsuarioRepository ur;

    private Usuario usuario1;
    private Usuario usuario2;
    private Usuario usuario3;

    @BeforeEach
    void setup() {
        ur.deleteAll(); // garante banco limpo

        usuario1 = new Usuario();
        usuario1.setNome("Rafael");
        usuario1.setTelefone("(11) 1111-1111");
        usuario1.setSenha("senha1");

        usuario2 = new Usuario();
        usuario2.setNome("Alana");
        usuario2.setTelefone("(22) 2222-2222");
        usuario2.setSenha("senha2");

        usuario3 = new Usuario();
        usuario3.setNome("Mateus");
        usuario3.setTelefone("(33) 3333-3333");
        usuario3.setSenha("senha3");

        ur.save(usuario1);
        ur.save(usuario2);
        ur.save(usuario3);
    }

    @Test
    void deveCriarUsuario() {
        Usuario novo = new Usuario();
        novo.setNome("Carlos");
        novo.setTelefone("(44) 4444-4444");
        novo.setSenha("senha4");

        Usuario salvo = ur.save(novo);

        assertThat(salvo.getId()).isNotNull();
        assertThat(salvo.getNome()).isEqualTo("Carlos");
        assertThat(salvo.getTelefone()).isEqualTo("(44) 4444-4444");
        assertThat(salvo.getSenha()).isEqualTo("senha4");
    }

    @Test
    void deveBuscarTodosUsuarios() {
        List<Usuario> usuarios = ur.findAll();

        System.out.println("USUARIOS: " + usuarios.toString());

        assertThat(usuarios).hasSize(3)
                            .extracting(Usuario::getNome)
                            .containsExactlyInAnyOrder("Rafael", "Alana", "Mateus");
    }

    @Test
    void deveBuscarUsuarioPorTelefone() {
        Optional<Usuario> encontrado = ur.findByTelefone("(22) 2222-2222");

        assertThat(encontrado).isPresent();
        System.out.println("TELEFONE EXISTE: " + encontrado.isPresent());
        assertThat(encontrado.get().getNome()).isEqualTo("Alana");
        System.out.println("NOME: " + encontrado.get().getNome());
    }

    @Test
    void deveAtualizarUsuario() {
        usuario1.setNome("Rafael Atualizado");
        Usuario atualizado = ur.save(usuario1);

        assertThat(atualizado.getNome()).isEqualTo("Rafael Atualizado");
    }

    @Test
    void deveDeletarUsuario() {
        ur.delete(usuario2);

        List<Usuario> usuarios = ur.findAll();
        assertThat(usuarios).hasSize(2)
                            .extracting(Usuario::getNome)
                            .doesNotContain("Alana");
    }
}
