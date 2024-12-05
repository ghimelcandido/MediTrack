import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import Home from './pages/home/home';
import BuscarRemedio from "./pages/search/buscarRemedio";
import ReservasRemedio from "./pages/reservas/reservasRemedio";
import EditarPerfil from "./pages/editar perfil/editarPerfil";
import Comprovante from './pages/comprovante/comprovante'; // Adicionando a rota para o comprovante
import FaleConosco from './pages/faleConosco/FaleConosco'; // Importando a página FaleConosco

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null);
    const [userInfo, setUserInfo] = useState({});

    const handleLoginSuccess = (id) => {
        setIsAuthenticated(true);
        setUserId(id);
    };

    const handleProfileUpdate = (updatedInfo) => {
        setUserInfo(updatedInfo);
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
                    <Route path="/cadastro" element={<Cadastro />} />
                    <Route path="/home" element={isAuthenticated ? <Home userInfo={userInfo} /> : <Navigate to="/login" />} />
                    <Route path="/buscarremedio" element={<BuscarRemedio />} />
                    <Route path="/reservas" element={isAuthenticated ? <ReservasRemedio /> : <Navigate to="/login" />} />
                    <Route path="/editar-perfil" element={<EditarPerfil userId={userId} userInfo={userInfo} onProfileUpdate={handleProfileUpdate} />} />
                    <Route path="/comprovante/:idComprovante" element={<Comprovante />} />
                    <Route path="/faleconosco" element={<FaleConosco />} /> {/* Rota para FaleConosco */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;

