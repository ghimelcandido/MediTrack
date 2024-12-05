package com.example.lote_remedio.dto;

public class LoteRequest {
    private String nomeRemedio;
    private int quantidade;
    private Long centroMedicoId;

    // Getters e Setters
    public String getNomeRemedio() {
        return nomeRemedio;
    }

    public void setNomeRemedio(String nomeRemedio) {
        this.nomeRemedio = nomeRemedio;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public Long getCentroMedicoId() {
        return centroMedicoId;
    }

    public void setCentroMedicoId(Long centroMedicoId) {
        this.centroMedicoId = centroMedicoId;
    }
}
