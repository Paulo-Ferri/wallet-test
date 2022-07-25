import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import walletIcon from '../images/wallet-icon.svg'
import setLocalStorage from '../utils/localStorageSetItem';
import {handleLogin} from '../utils/apiUtilities';
import toast, { Toaster } from 'react-hot-toast';
import './CSS/Login.css';
import AppContext from '../context/Context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const {setUserId, setUserEmail} = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email) return setEmail(email);
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailValidation = /\S+@\S+\.\S+/;
    if (!emailValidation.test(email)) {
      return setIsEmailValid(false);
    }
    if (password.length < 8) {
      return setIsPasswordValid(false);
    }
    const loginStatus = await handleLogin(email, password);
    if (loginStatus.data && loginStatus.data.message.id) {
      try {
        setUserId(loginStatus.data.message.id);
        setUserEmail(email);
        setLocalStorage("email", email);
        setLocalStorage("userId", loginStatus.data.message.id);
        setLocalStorage("Date", new Date())
        toast.success('Sucesso! Redirecionando para carteira.', {
          duration: 3000
        });
        return setTimeout(() => navigate('/wallet'), 5000)
      } catch {
        toast.error('Algo deu errado.', {
          duration: 3000
        });
      }

    }
   return handleIncorrectLogin();
  }

  const handleIncorrectLogin = () => {
    setEmail('');
    setPassword('')
    toast.error('Email ou senha inválidos!', {
      duration: 3000
    });
    setTimeout(clearInvalidDataMessage, 3000)
  }

  const clearInvalidDataMessage = () => {
    setIsPasswordValid(true);
    setIsEmailValid(true);
  }

  return (
    <div className="login_page" >
      <div><Toaster/></div>
      <div className="login_logo">
        <img src={ walletIcon } alt="icon representing a wallet" />
        <h1>XP WALLET</h1>
      </div>
      <div className="animation_login_container">
        <iframe title="investment animation" src="https://embed.lottiefiles.com/animation/73295" />
      </div>
      <div className="login_container">
        <h2>
          Acesse a sua conta!
        </h2>
        <form className="form_container">
          <label
            className="label_container"
            htmlFor="email"
          >
            <input
              className={!isEmailValid ? "wrong_infos form_input" : "form_input"}
              type="email"
              name="email"
              placeholder="E-mail"
              value={ email }
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && (
              <p>Você deve informar um e-mail no formato: xp@wallet.com</p>
            )}
          </label>
          <label
            className="label_container"
            htmlFor="password"
          >
            <input
              className={!isPasswordValid ? "wrong_infos form_input" : "form_input"}
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isPasswordValid && (
              <p>Sua senha deve ser maior que oito dígitos!</p>
            )}
          </label>
          <button
            type="submit"
            onClick={ (e) => handleSubmit(e) }
            className="form_button"
          >
            Entrar
          </button>
          <button
            className="link_registry_btn"
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