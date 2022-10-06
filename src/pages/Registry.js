import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

import { handleUserCreation } from '../utils/apiUtilities';
import handleFeedback from '../utils/handleFeedback';

import walletIcon from '../images/wallet-icon.svg';

import './SCSS/Registry.css'
// import './CSS/Registry.css'

const Registry = () => {
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailValidation = /\S+@\S+\.\S+/;
    if (!emailValidation.test(userCredentials.email)) {
      return setIsEmailValid(false);
    }
    if (userCredentials.password.length < 8) {
      return setIsPasswordValid(false);
    }
    return handleUserRegistry();
  }

  const handleUserRegistry = async () => {
    try {
      const registryStatus = await handleUserCreation(userCredentials);
      console.log(registryStatus)
      if (registryStatus.status === 201) {
        handleFeedback('Conta criada com sucesso! Redirecionando para login.', 'success');
        return setTimeout(() => navigate('/'), 5000);
      }
    } catch (error) {
        handleFeedback('Algo deu errado (400)', 'error');
      }
      handleFeedback('Email já cadastrado!', 'error');
  }

  return (
    <div className="registry">
      <div><Toaster/></div>
      <div className="registry__logo">
        <img src={ walletIcon } alt="icon representing a wallet" />
        <h1>XP WALLET</h1>
      </div>
      <div className="registry-container">
        <h1>Dê o primeiro passo rumo à sua independência financeira!</h1>
        <form className="registry__form">
            <label
              className="registry__label"
              htmlFor="email"
            >
              <input
                className={!isEmailValid ? "registry__input registry__input--wrong-infos" : "registry__input"}
                type="email"
                name="email"
                placeholder="E-mail"
                value={userCredentials.email}
                onChange={(e) => setUserCredentials({
                  ...userCredentials,
                  email: e.target.value
                })}
              />
            {!isEmailValid && (
                <p>Você deve informar um e-mail no formato: xp@wallet.com</p>
            )}
            </label>
            <label
              className="registry__label"
              htmlFor="password"
            >
              <input
                className={!isPasswordValid ? "registry__input registry__input--wrong-infos" : "registry__input"}
                type="password"
                name="password"
                placeholder="Senha"
                value={userCredentials.password}
                onChange={(e) => setUserCredentials({
                  ...userCredentials,
                  password: e.target.value
                })}
              />
            {!isPasswordValid && (
              <p>Sua senha deve conter mais de oito dígitos!</p>
            )}
            </label>
            <label
              className="registry__label"
              htmlFor="name"
            >
              <input
                className="registry__input"
                type="text"
                name="name"
                placeholder="Como você quer ser chamado(a)?"
                value={userCredentials.name}
                onChange={(e) => setUserCredentials({
                  ...userCredentials,
                  name: e.target.value
                })}
              />
            </label>
            <button
              type="submit"
              className="registry__submit-btn"
              onClick={(event) => handleSubmit(event)}
            >
              Registrar
            </button>
            <button
            className="registry__login-btn"
            type="button"
            onClick={ () => navigate('/') }
          >
            Já possui uma conta? Clique aqui para entrar!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registry;