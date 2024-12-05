import React, { useState } from "react";
import api from "../../api/api";


const Cadastro = () => {
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");

    const handleCadastro = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/cadastro", { nome, senha });
            setMensagem(response.data); // Exibe a mensagem de sucesso
        } catch (error) {
            setMensagem("Erro ao realizar o cadastro. Tente novamente.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1 className="login-title">Cadastro</h1>
                <form onSubmit={handleCadastro}>
                    <div className="form-group">
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Digite seu nome"
                            required
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Digite sua senha"
                            required
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="login-button">
                        Cadastrar
                    </button>
                </form>

                {mensagem && <p>{mensagem}</p>}
            </div>
        </div>
    );
};

export default Cadastro;