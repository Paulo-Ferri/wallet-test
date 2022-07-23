import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import walletIcon from '../images/wallet_icon.png';
import { handleUserCreation } from '../utils/apiUtilities';
import toast, { Toaster } from 'react-hot-toast';
import './CSS/Registry.css'

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailValidation = /\S+@\S+\.\S+/;
    if (!emailValidation.test(email)) {
      return setIsEmailValid(false);
    }
    if (password.length < 8) {
      return setIsPasswordValid(false);
    }
    const registryStatus = await handleUserCreation(email, password, name);
    if (registryStatus === 409) {
      return toast.error('Esse email já está em uso!', {
        duration: 5000
      });
    }
    if (registryStatus === 201) {
      toast.success('Conta criada com sucesso! Redirecionando para login.', {
        duration: 5000
      });
      return setTimeout(() => navigate('/'), 5000);
    }
  }

  return (
    <div className="register_page">
      <div><Toaster/></div>
      <div className="login_logo">
        <img src={ walletIcon } alt="icon representing a wallet" />
        <h1>XP WALLET</h1>
      </div>
      <div className="register_container">
        <h1>Dê o primeiro passo rumo à sua independência financeira!</h1>
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
                value={email}
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
              <p>Sua senha deve conter mais de oito dígitos!</p>
            )}
            </label>
            <label
              className="label_container"
              htmlFor="name"
            >
              <input
                className="form_input"
                type="text"
                name="name"
                placeholder="Como você quer ser chamado(a)?"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <div className="invalid_login_message">
            </div>
            <button
              type="submit"
              className="form_button"
              onClick={(event) => handleSubmit(event)}
            >
              Registrar
            </button>
            <button
            className="link_registry_btn"
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

export default Register;