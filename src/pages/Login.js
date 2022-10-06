import { Toaster } from 'react-hot-toast';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import AppContext from '../context/Context';
import setLocalStorage from '../utils/localStorageSetItem';
import {sendLogin} from '../utils/apiUtilities';
import handleFeedback from '../utils/handleFeedback';

import walletIcon from '../images/wallet-icon.svg';

import './SCSS/Login.css'
// import './CSS/Login.css';

const Login = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const {setUserId, setUserEmail} = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem('email');
    if (userEmail) return setUserCredentials({
      email: userEmail,
      password: ''
    });
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailValidation = /\S+@\S+\.\S+/;
    if (!emailValidation.test(userCredentials.email)) {
      return setIsEmailValid(false);
    }
    if (userCredentials.password.length < 8) {
      return setIsPasswordValid(false);
    }
    handleUserLogin()
  }

  const handleUserLogin = async () => {
    try {
      const loginStatus = await sendLogin(userCredentials);
      console.log(loginStatus)
      if (loginStatus.data && loginStatus.data.message.id) {
        setUserId(loginStatus.data.message.id);
        setUserEmail(userCredentials.email);
        setLocalStorage("email", userCredentials.email);
        setLocalStorage("userId", loginStatus.data.message.id);
        setLocalStorage("Date", new Date())
        handleFeedback('Sucesso! Redirecionando para carteira!', 'success')
        return setTimeout(() => navigate('/wallet'), 5000)
      }
    } catch {
      handleFeedback('Algo deu errado!', 'error')
    }
    return handleIncorrectLogin()
  }

  const handleIncorrectLogin = () => {
    setUserCredentials({
      email: '',
      password: ''
    })
    handleFeedback('Email ou senha incorretos!', 'error')
    setTimeout(clearInvalidDataMessage, 3000)
  }

  const clearInvalidDataMessage = () => {
    setIsPasswordValid(true);
    setIsEmailValid(true);
  }

  return (
    <div className="login" >
      <div><Toaster/></div>
      <div className="login__logo">
        <img
          src={ walletIcon }
          alt="icon representing a wallet"
        />
        <h1>XP WALLET</h1>
      </div>
      <div className="login-container login__animation">
        <iframe title="investment animation" src="https://embed.lottiefiles.com/animation/73295" />
      </div>
      <div className="login-container">
        <h2>
          Acesse a sua conta!
        </h2>
        <form className="login__form">
          <label
            className="login__label"
            htmlFor="email"
          >
            <input
              className={!isEmailValid ? "wrong_infos login__input" : "login__input"}
              type="email"
              name="email"
              placeholder="E-mail"
              value={ userCredentials.email }
              onChange={(e) => setUserCredentials({
                ...userCredentials,
                email: e.target.value,
              })}
            />
            {!isEmailValid && (
              <p>Você deve informar um e-mail no formato: xp@wallet.com</p>
            )}
          </label>
          <label
            className="login__label"
            htmlFor="password"
          >
            <input
              className={!isPasswordValid ? "login__input login__input--wrong-infos" : "login__input"}
              type="password"
              name="password"
              placeholder="Senha"
              value={userCredentials.password}
              onChange={(e) => setUserCredentials({
                ...userCredentials,
                password: e.target.value,
              })}
            />
            {!isPasswordValid && (
              <p>Sua senha deve ser maior que oito dígitos!</p>
            )}
          </label>
          <button
            type="submit"
            onClick={ (e) => handleSubmit(e) }
            className="login__button"
          >
            Entrar
          </button>
          <button
            className="login__registry-btn"
            type="button"
            onClick={ () => navigate('/registry') }
          >
            Ainda não possui uma conta? Clique aqui para se registrar!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;