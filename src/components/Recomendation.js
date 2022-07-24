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
      <div className="recomendation_card">
      <div className="recomendation_card_texts">
        <p>Como investir dinheiro em ações?</p>
        <p>Dicas essenciais para iniciantes!</p></div>
      </div>
    </div>
  );
};

export default Recomendation;