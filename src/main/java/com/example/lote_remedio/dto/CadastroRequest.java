package com.example.lote_remedio.dto;

public class CadastroRequest {
    private String nome;
    private String senha;
    private String email; // Adiciona o campo email

    // Getters e Setters
    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getEmail() {
        return email; // Retorna o valor correto do e-mail
    }

    public void setEmail(String email) {
        this.email = email; // Define o valor do e-mail
    }
}

