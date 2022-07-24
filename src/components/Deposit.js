import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/Context';
import cartaoIcon from '../images/cartao-icon.png';
import boletoIcon from '../images/boleto-icon.png';
import pixIcon from '../images/pix-icon.png';
import { changeUserBalance } from '../utils/apiUtilities';
import toast, { Toaster } from 'react-hot-toast';
import './CSS/Deposit.css';

const Deposit = () => {
  const [selectedOption, setSelectedOption] = useState('cartao');
  const [desiredDeposit, setDesiredDeposit] = useState('');
  const { userBalance, userEmail } = useContext(AppContext);
  const navigate = useNavigate();

  const handleDeposit = async () => {
    const finalBalance = +userBalance + +desiredDeposit;
    console.log(finalBalance, userEmail);
    await changeUserBalance(finalBalance, userEmail);
    toast.success('Sucesso! Redirecionando para carteira.', {
      duration: 5000
    });
    setTimeout(() => navigate(0), 5000);
  }

  return (
    <div className="deposit_component">
      <Toaster />
      {userBalance && <p>Seu saldo: R$ {userBalance.toFixed(2)}</p>}
      <p>Escolha a quantidade para depositar:</p>
      <label className="deposit_withdraw_funds_label">
        <input
          className="deposit_withdraw_funds_input"
          type="number"
          value={desiredDeposit}
          onChange={(e) => setDesiredDeposit(e.target.value)}
        />
        <span className="deposit_withdraw_funds_unit">R$</span>
      </label>
      <div
        className="deposit_funds_options_container"
      >
        <div
          className={selectedOption === "cartao" ? "deposit_funds_option selected_option" : "deposit_funds_option"}
          onClick={() => setSelectedOption("cartao")}
        >
          <p>Cartão</p>
          <img src={cartaoIcon} alt="credit card" />
        </div>
        <div
          className={selectedOption === "boleto" ? "deposit_funds_option selected_option" : "deposit_funds_option"}
          onClick={() => setSelectedOption("boleto")}
        >
          <p>Boleto</p>
          <img src={boletoIcon} alt="ticket" />
          </div>
        <div
          className={selectedOption === "pix" ? "deposit_funds_option selected_option" : "deposit_funds_option"}
          onClick={() => setSelectedOption("pix")}
        >
          <p>Pix</p>
          <img src={pixIcon} alt="pix" />
        </div>
      </div>
      <button
        className="confirm_deposit_btn"
        onClick={handleDeposit}
      >
        Depositar
      </button>
    </div>
  );
};

export default Deposit;