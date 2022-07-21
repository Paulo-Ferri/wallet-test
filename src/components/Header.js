import React, { useContext } from 'react';
import AppContext from '../context/Context';
import walletIcon from '../images/wallet_icon.png'
import './CSS/Header.css';

const Header = () => {
  const {name} = useContext(AppContext);

  return (
    <div className="header_component">
      <div className="login_logo">
        <img src={ walletIcon } alt="icon representing a wallet" />
        <h1>XP WALLET</h1>
      </div>
      <div className="header_email_container">
        {`Olá, ${name}`}
      </div>
    </div>
  );
};

export default Header;