import React from 'react';
import walletIcon from '../images/wallet_icon.png'
import './CSS/Header.css';

const Header = ({name}) => {
  return (
    <div className="header_component">
      <div className="login_logo">
        <img src={ walletIcon } alt="icon representing a wallet" />
        <h1>XP WALLET</h1>
      </div>
      <div className="header_email_container">
        {`Usuário: ${name}`}
      </div>
    </div>
  );
};

export default Header;