import React from 'react';
import './FaleConosco.css';

const FaleConosco = () => {
    return (
        <div className="container">
            <h1 className="title">Entre em Contato Conosco!</h1>
            <p className="text">
                Tem alguma dúvida, sugestão ou precisa de ajuda? Nossa equipe está pronta para atender você.
            </p>

            <h2 className="subtitle">Como Entrar em Contato:</h2>
            <p className="text">
                A maneira mais simples e direta de falar conosco é pelo email. Envie sua mensagem para:
            </p>
            <a href="mailto:contato@seusite.com" className="email">
                contato@meditrack.com
            </a>

            <h2 className="subtitle">Nosso Compromisso:</h2>
            <p className="text">
                Todas as mensagens enviadas serão respondidas com atenção e agilidade. Queremos garantir que você tenha a melhor experiência possível ao entrar em contato conosco.
            </p>
        </div>
    );
};

export default FaleConosco;