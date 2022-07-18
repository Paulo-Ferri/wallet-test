import React from 'react';
import walletIcon from '../images/wallet_icon.png'
import './CSS/Login.css';

const Login = () => {
  return (
    <div className="login_page" >
      <div className="animation_login_container">
      <div className="login_logo">
        <img src={walletIcon} alt="icon representing a wallet" />
        <h1>XP WALLET</h1>
      </div>
        <iframe title="investment animation" src="https://embed.lottiefiles.com/animation/73295" />
      </div>
      <div className="login_container">
        <h2>
          Acesse a sua conta!
        </h2>
        <form className="login_form_container">
          <label htmlFor="email">
            <input
              className="login_form_input"
              type="email"
              name="email"
              placeholder="Email"
            />
          </label>
          <label htmlFor="password">
            <input
              className="login_form_input"
              type="password"
              name="password"
              placeholder="Senha"
            />
          </label>
          <button className="login_form_button">
            Entrar
          </button>
      </form>
    </div>
    </div>
  );
};

export default Login;