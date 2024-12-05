package com.example.lote_remedio.controllers;

import com.example.lote_remedio.dto.LoginRequest;
import com.example.lote_remedio.dto.CadastroRequest;
import com.example.lote_remedio.models.Usuario;
import com.example.lote_remedio.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/cadastro")
    public ResponseEntity<String> criarUsuario(@RequestBody CadastroRequest cadastroRequest) {
        if (usuarioRepository.findByNome(cadastroRequest.getNome()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Usuário já existe!");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(cadastroRequest.getNome());
        usuario.setSenha(cadastroRequest.getSenha());
        usuario.setEmail(cadastroRequest.getEmail()); // Adiciona o e-mail
        usuarioRepository.save(usuario);

        return ResponseEntity.status(HttpStatus.CREATED).body("Usuário cadastrado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        Usuario usuario = usuarioRepository.findByNome(loginRequest.getNome());

        // Verificar login usando nome ou e-mail
        if (usuario == null) {
            usuario = usuarioRepository.findByEmail(loginRequest.getNome()); // Se nome não existir, tenta pelo e-mail
        }

        if (usuario != null && usuario.getSenha().equals(loginRequest.getSenha())) {
            Map<String, Object> response = new HashMap<>();
            response.put("id", usuario.getId()); // Retorna o id do usuário
            response.put("nome", usuario.getNome());
            response.put("email", usuario.getEmail());
            return ResponseEntity.ok(response); // Retorna os dados do usuário no corpo da resposta
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Credenciais inválidas!"));
        }
    }

    @PutMapping("/editar-perfil/{id}")
    public ResponseEntity<String> editarPerfil(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        Usuario usuarioExistente = usuarioRepository.findById(id).orElse(null);

        if (usuarioExistente == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrado!");
        }

        usuarioExistente.setNome(usuarioAtualizado.getNome());
        usuarioExistente.setEmail(usuarioAtualizado.getEmail()); // Atualiza o campo de email
        usuarioRepository.save(usuarioExistente);

        return ResponseEntity.ok("Perfil atualizado com sucesso! Novo nome: " + usuarioExistente.getNome() + ", E-mail: " + usuarioExistente.getEmail());
    }

    @GetMapping("/usuarios")
    public ResponseEntity<?> listarUsuarios() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

}
