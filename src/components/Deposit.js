import React, {useContext, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/Context';
import cartaoIcon from '../images/cartao-icon.svg';
import boletoIcon from '../images/boleto-icon.svg';
import pixIcon from '../images/pix-icon.svg';
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
    if(finalBalance < 0) {
      return toast.error('O valor deve ser maior que 0!', {
        duration: 3000
      });
    }
    try {
      await changeUserBalance(finalBalance, userEmail);
      toast.success('Sucesso! Redirecionando para carteira.', {
        duration: 3000
      });
      setTimeout(() => navigate(0), 3000);
    } catch {
      toast.error('Algo deu errado.', {
        duration: 3000
      });
    }
  }

  return (
    <div className="deposit_component">
      <Toaster />
      <div className="deposit_balance_message_info">
          <p className="buyasset_balance_message">Seu saldo</p>
          <p className="buyasset_balance_info">R$ {userBalance.toFixed(2)}</p>
      </div>
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
          <img className="pix_option" src={pixIcon} alt="pix" />
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