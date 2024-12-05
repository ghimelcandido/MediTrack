import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Comprovante = () => {
    const { idComprovante } = useParams();
    const [comprovante, setComprovante] = useState(null);

    useEffect(() => {
        const reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        const reserva = reservas.find(res => res.idComprovante === parseInt(idComprovante));
        setComprovante(reserva);
    }, [idComprovante]);

    if (!comprovante) {
        return <p>Comprovante não encontrado.</p>;
    }

    return (
        <div className="comprovante">
            <h1>Comprovante de Reserva</h1>
            <p><strong>Nome do Remédio:</strong> {comprovante.nome}</p>
            <p><strong>Local:</strong> {comprovante.local}</p>
            <p><strong>ID de Reserva:</strong> {comprovante.idComprovante}</p>
        </div>
    );
};

export default Comprovante;


