import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./login.css";

const Login = ({ onLoginSuccess }) => {
    const [nome, setNome] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Enviando a requisição para o backend
            const response = await api.post("/login", { nome, senha });

            // Verificando se a resposta contém o id
            if (response.data && response.data.id) {
                setMensagem("Login bem-sucedido!");
                onLoginSuccess(response.data.id); // Passando o id do usuário para o App
                navigate("/home"); // Redirecionando para a página Home
            } else {
                setMensagem("Credenciais inválidas!");
            }
        } catch (error) {
            setMensagem("Erro ao tentar fazer login. Tente novamente.");
        }
    };

    const goToCadastro = () => {
        navigate("/cadastro");
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h1 className="login-title">MediTrack</h1>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit" className="login-button">Acessar</button>
                <button type="button" className="register-button" onClick={goToCadastro}>
                    Cadastrar
                </button>
                {mensagem && <p>{mensagem}</p>} {/* Exibe a mensagem, caso haja algum erro ou sucesso */}
            </form>
        </div>
    );
};

export default Login;
