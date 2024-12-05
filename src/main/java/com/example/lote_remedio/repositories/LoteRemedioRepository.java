package com.example.lote_remedio.repositories;

import com.example.lote_remedio.models.LoteRemedio;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoteRemedioRepository extends JpaRepository<LoteRemedio, Long> {
    // Método de consulta para buscar remédios pelo nome
    List<LoteRemedio> findByNomeContainingIgnoreCase(String nome);
}