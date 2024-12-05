import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './buscarRemedio.css';

const BuscarRemedio = () => {
    const [nomeRemedio, setNomeRemedio] = useState('');
    const [resultados, setResultados] = useState([]);
    const [remedioSelecionado, setRemedioSelecionado] = useState(null);
    const [modalVisivel, setModalVisivel] = useState(false);
    const navigate = useNavigate();

    const buscarRemedios = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/lotes/buscar?nome=${nomeRemedio}`);
            if (!response.ok) throw new Error(`Erro na busca: ${response.statusText}`);
            const data = await response.json();
            setResultados(data.length > 0 ? data : [{ nome: 'Nenhum remédio encontrado.', quantidade: 0 }]);
        } catch (error) {
            console.error('Erro ao buscar remédios:', error);
        }
    };

    const abrirModal = (id, quantidade, nome, local) => {
        setRemedioSelecionado({ id, quantidade, nome, local });
        setModalVisivel(true);
    };

    const fecharModal = () => {
        setModalVisivel(false);
    };

    const reservarRemedio = async () => {
        if (remedioSelecionado) {
            const { id, nome, local } = remedioSelecionado;
            try {
                const response = await fetch(`http://localhost:8080/api/lotes/${id}/reservar`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) throw new Error(`Erro na reserva: ${response.statusText}`);
                const updatedLote = await response.json();
                console.log("Remédio reservado com sucesso:", updatedLote); // Verifique a resposta da API

                setResultados((prevResultados) =>
                    prevResultados.map((lote) =>
                        lote.id === id ? { ...lote, quantidade: updatedLote.quantidade } : lote
                    )
                );

                // Processo de redirecionamento e armazenar reserva
                const idComprovante = Math.floor(Math.random() * 1000000);
                const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
                reservas.push({ idComprovante, nome, local });
                localStorage.setItem("reservas", JSON.stringify(reservas));
                navigate(`/comprovante/${idComprovante}`);
                fecharModal();
            } catch (error) {
                console.error('Erro ao reservar remédio:', error);
                fecharModal();
            }
        }
    };


    return (
        <div className="home">
            <h1>Buscar Remédios</h1>
            <form onSubmit={buscarRemedios}>
                <label htmlFor="nome">Nome do Remédio:</label>
                <input
                    type="text"
                    id="nome"
                    value={nomeRemedio}
                    onChange={(e) => setNomeRemedio(e.target.value)}
                    required
                />
                <button type="submit">Buscar</button>
            </form>
            <h2>Resultados da Busca:</h2>
            <ul id="resultados">
                {resultados.map((lote, index) => (
                    <li key={index}>
                        {lote.nome} - Quantidade:{' '}
                        <span id={`quantidade-${lote.id}`}>{lote.quantidade}</span>
                        <br />
                        {lote.centroMedicoNome && (
                            <>
                                Centro Médico: {lote.centroMedicoNome} ({lote.centroMedicoBairro})
                            </>
                        )}
                        {lote.nome !== 'Nenhum remédio encontrado.' && (
                            <button onClick={() => abrirModal(lote.id, lote.quantidade, lote.nome, lote.centroMedicoNome)}>
                                Reservar
                            </button>
                        )}
                    </li>
                ))}
            </ul>
            {modalVisivel && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Deseja reservar este remédio?</p>
                        <button onClick={reservarRemedio}>Sim</button>
                        <button onClick={fecharModal}>Não</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuscarRemedio;


