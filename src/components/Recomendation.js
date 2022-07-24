import React from 'react';
import lampadaIcon from '../images/lampada-icon.svg'
import './CSS/Recomendation.css';

const Recomendation = () => {
  return (
    <div className="recomendation_component">
      <div className="recomendation_text_img">
        <img src={lampadaIcon} alt="lampada" />
        <div>
          <p>Não sabe por onde começar?</p>
          <p>Veja nossas dicas!</p>
        </div>
      </div>
      <a className="recomendation_card" href="https://blog.xpeducacao.com.br/como-investir-dinheiro-em-acoes/" target="_blank" rel="noreferrer">
        <div className="recomendation_card_texts">
          <p>
            Como investir dinheiro em ações?
          </p>
          <p>
            Dicas essenciais para iniciantes!
          </p>
        </div>
      </a>
    </div>
  );
};

export default Recomendation;