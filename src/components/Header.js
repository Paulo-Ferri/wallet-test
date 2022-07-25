import React from 'react';
import walletIcon from '../images/wallet-icon.svg'
import './CSS/Header.css';

const Header = () => {

  return (
    <div className="header_component">
      <div className="login_logo_header">
        <img src={ walletIcon } alt="icon representing a wallet" />
        <h1>XP WALLET</h1>
      </div>
    </div>
  );
};

export default Header;