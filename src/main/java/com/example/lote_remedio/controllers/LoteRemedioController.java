package com.example.lote_remedio.controllers;

import com.example.lote_remedio.dto.LoteRequest;
import com.example.lote_remedio.models.CentroMedico;
import com.example.lote_remedio.models.LoteRemedio;
import com.example.lote_remedio.repositories.CentroMedicoRepository;
import com.example.lote_remedio.repositories.LoteRemedioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lotes")
public class LoteRemedioController {

    @Autowired
    private LoteRemedioRepository loteRemedioRepository;

    @Autowired
    private CentroMedicoRepository centroMedicoRepository;

    @GetMapping
    public List<LoteRemedio> listarLotes() {
        List<LoteRemedio> lotes = loteRemedioRepository.findAll();
        return lotes;
    }

    @GetMapping("/buscar")
    public List<LoteRemedio> buscarRemedios(@RequestParam String nome) {
        return loteRemedioRepository.findByNomeContainingIgnoreCase(nome);
    }

    @PostMapping
    public LoteRemedio adicionarLote(@RequestBody LoteRequest loteRequest) {
        Optional<CentroMedico> centroMedicoOptional = centroMedicoRepository.findById(loteRequest.getCentroMedicoId());

        if (centroMedicoOptional.isEmpty()) {
            throw new RuntimeException("Centro médico não encontrado com o ID: " + loteRequest.getCentroMedicoId());
        }

        LoteRemedio loteRemedio = new LoteRemedio();
        loteRemedio.setNome(loteRequest.getNomeRemedio());
        loteRemedio.setQuantidade(loteRequest.getQuantidade());
        loteRemedio.setCentroMedico(centroMedicoOptional.get());

        return loteRemedioRepository.save(loteRemedio);
    }

    @PatchMapping("/{id}/reservar")
    public LoteRemedio reservarRemedio(@PathVariable Long id) {
        Optional<LoteRemedio> loteRemedioOptional = loteRemedioRepository.findById(id);

        if (loteRemedioOptional.isEmpty()) {
            throw new RuntimeException("Lote de remédio não encontrado com o ID: " + id);
        }

        LoteRemedio loteRemedio = loteRemedioOptional.get();
        if (loteRemedio.getQuantidade() > 0) {
            loteRemedio.setQuantidade(loteRemedio.getQuantidade() - 1);
            LoteRemedio updatedLote = loteRemedioRepository.save(loteRemedio);
            System.out.println("Remédio atualizado: " + updatedLote); // Adicionando log para verificar o lote
            return updatedLote;
        } else {
            throw new RuntimeException("Quantidade de remédio insuficiente.");
        }
    }

}