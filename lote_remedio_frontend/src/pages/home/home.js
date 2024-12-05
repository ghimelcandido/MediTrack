import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";

const Home = ({ userInfo }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Limpa o localStorage
        navigate("/login"); // Redireciona para a página de login
    };

    const handleBuscarRemedio = () => {
        navigate("/buscarremedio");
    };

    const handleMeusSalvos = () => {
        navigate("/reservas");
    };

    const handleEditarPerfil = () => {
        navigate("/editar-perfil");
    };

    const handleFaleComSuporte = () => {
        navigate("/faleconosco"); // Redireciona para a página FaleConosco
    };

    return (
        <div className="home">
            <div className="header">
                <button className="logout-button" onClick={handleLogout}>
                    Sair
                </button>
            </div>

            <div className="action-buttons">
                <button className="action-button" onClick={handleBuscarRemedio}>
                    <span className="icon">💊</span>
                    <span>Procure um remédio...</span>
                </button>
                <button className="action-button" onClick={handleFaleComSuporte}>
                    <span className="icon">📞</span>
                    <span>Fale com o suporte</span>
                </button>
            </div>

            <div className="navigation-buttons">
                <button className="nav-button red" onClick={handleMeusSalvos}>
                    <span className="icon">📁</span>
                    <span>Reservas</span>
                </button>
                <button className="nav-button blue" onClick={handleEditarPerfil}>
                    <span className="icon">✏️</span>
                    <span>Editar perfil</span>
                </button>
            </div>
        </div>
    );
};

export default Home;
