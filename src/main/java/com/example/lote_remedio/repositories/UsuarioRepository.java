package com.example.lote_remedio.repositories;

import com.example.lote_remedio.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByNome(String nome);
    Usuario findByEmail(String email); // Novo método para buscar por e-mail
}

