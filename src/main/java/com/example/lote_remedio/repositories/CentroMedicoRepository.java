package com.example.lote_remedio.repositories;

import com.example.lote_remedio.models.CentroMedico;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CentroMedicoRepository extends JpaRepository<CentroMedico, Long> {
}