import React, { useState, useEffect } from "react";
import api from "../../api/api"; // Importe o arquivo de configuração da API


const EditarPerfil = ({ userId, userInfo, onProfileUpdate }) => {
    const [nome, setNome] = useState(userInfo.nome);
    const [email, setEmail] = useState(userInfo.email);

    useEffect(() => {
        // Atualiza os valores quando userInfo mudar
        setNome(userInfo.nome);
        setEmail(userInfo.email);
    }, [userInfo]);

    const handleSave = async () => {
        // Cria o objeto de dados atualizados
        const updatedInfo = { nome, email };

        try {
            // Envia as atualizações para o backend
            const response = await api.put(`/editar-perfil/${userId}`, updatedInfo);
            alert(response.data); // Exibe mensagem de sucesso ou erro
            onProfileUpdate(updatedInfo); // Atualiza as informações no App.js
        } catch (error) {
            alert("Erro ao atualizar perfil.");
        }
    };

    return (
        <div>
            <h1>Editar Perfil</h1>
            <div>
                <label>
                    Nome:
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    E-mail:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleSave}>Salvar</button>
        </div>
    );
};

export default EditarPerfil;