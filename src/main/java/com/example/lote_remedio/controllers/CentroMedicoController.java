package com.example.lote_remedio.controllers;

import com.example.lote_remedio.models.CentroMedico;
import com.example.lote_remedio.repositories.CentroMedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/centros-medicos")
public class CentroMedicoController {

    @Autowired
    private CentroMedicoRepository centroMedicoRepository;

    @GetMapping
    public List<CentroMedico> listarCentros() {
        return centroMedicoRepository.findAll();
    }

    @PostMapping
    public CentroMedico criarCentro(@RequestBody CentroMedico centroMedico) {
        return centroMedicoRepository.save(centroMedico);
    }
}
