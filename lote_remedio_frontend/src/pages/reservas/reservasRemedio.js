import React, { useState } from 'react';
import './reservasRemedio.css';

const ReservasRemedio = () => {
    const [reservas] = useState(JSON.parse(localStorage.getItem("reservas")) || []);

    return (
        <div className="reservas-container">
            <h1>Meus Remédios Reservados</h1>
            {reservas.length === 0 ? (
                <p>Você ainda não reservou nenhum remédio.</p>
            ) : (
                <ul>
                    {reservas.map((reserva, index) => (
                        <li key={index}>
                            <strong>Remédio:</strong> {reserva.nome} <br />
                            <strong>Local:</strong> {reserva.local} <br />
                            <strong>Quantidade Reservada:</strong> {reserva.quantidade}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ReservasRemedio;
