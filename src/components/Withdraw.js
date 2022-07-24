import React, {useContext, useState} from 'react';
import { changeUserBalance } from '../utils/apiUtilities';
import { useNavigate } from 'react-router-dom';
import pixIcon from '../images/pix-icon.png';
import cartaoIcon from '../images/cartao-icon.png';
import AppContext from '../context/Context';
import cryptoIcon from '../images/crypto-icon.png';
import toast, { Toaster } from 'react-hot-toast';
import './CSS/Withdraw.css';

const Withdraw = () => {
  const [desiredWithdraw, setDesiredWithdraw] = useState('');
  const [selectedOption, setSelectedOption] = useState('conta');
  const {userBalance, userEmail} = useContext(AppContext);
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    const finalBalance = +userBalance - +desiredWithdraw;
    if(finalBalance <= 0) {
      setDesiredWithdraw('');
      toast.error('Saldo insuficiente!', {
        duration: 5000
      });
    }
    await changeUserBalance(finalBalance, userEmail);
    toast.success('Sucesso! Redirecionando para carteira.', {
      duration: 5000
    });
    setTimeout(() => navigate(0), 5000);
  }

  return (
    <div className="withdraw_component">
      <Toaster />
      {userBalance && <p>Seu saldo: R$ {userBalance.toFixed(2)}</p>}
      <p>Escolha a quantidade para sacar:</p>
      <label className="deposit_withdraw_funds_label">
        <input
          className="deposit_withdraw_funds_input"
          type="number"
          value={desiredWithdraw}
          onChange={(e) => setDesiredWithdraw(e.target.value)}
        />
        <span className="deposit_withdraw_funds_unit">R$</span>
      </label>
      <div
        className="withdraw_funds_options_container"
      >
        <div
            className={selectedOption === "conta" ? "withdraw_funds_option selected_option" : "withdraw_funds_option"}
            onClick={() => setSelectedOption("conta")}
          >
            <p>Conta-Corrente</p>
            <img src={cartaoIcon} alt="credit card" />
          </div>
          <div
            className={selectedOption === "cripto" ? "withdraw_funds_option selected_option" : "withdraw_funds_option"}
            onClick={() => setSelectedOption("cripto")}
          >
            <p>Carteira Cripto</p>
            <img src={cryptoIcon} alt="crypto" />
            </div>
          <div
            className={selectedOption === "pix" ? "withdraw_funds_option selected_option" : "withdraw_funds_option"}
            onClick={() => setSelectedOption("pix")}
          >
            <p>Pix</p>
            <img src={pixIcon} alt="pix" />
          </div>
        </div>
        <label className="withdraw_options">
        {selectedOption === "conta" && 'Informe sua conta bancária:'}
        {selectedOption === "pix" && 'Informe sua chave Pix:'}
        {selectedOption === "cripto" && 'Informe sua carteira cripto:'}
        <input
          className="deposit_withdraw_funds_input"
        />
        </label>
        <button
          className="confirm_deposit_btn"
          onClick={handleWithdraw}
        >
        Sacar
      </button>
    </div>
  );
};

export default Withdraw;