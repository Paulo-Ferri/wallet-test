import React, {useContext, useState} from 'react';
import {Dialog} from '@headlessui/react';
import AppContext from '../context/Context';
import investmentSVG from '../images/investment/Wavy_Tech-24_Single-08.svg';
import closeIcon from '../images/close-icon.png';
import arrowIcon from '../images/arrow-icon.png';
import Deposit from './Deposit';
import './CSS/Balance.css';
import Withdraw from './Withdraw';

const Balance = () => {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const {userBalance} = useContext(AppContext);

  return (
    <div className="balance_component">
      <div className="balance_and_deposit_container">
          {userBalance && (
          <div>
          <p className="balance_informative">Seu saldo</p>
          <p> R$ {userBalance.toFixed(2)}</p>
          </div>
          )}
        <div className="deposit_withdraw_btns">
          <button
            className="balance_btn"
            onClick={() => setIsDepositOpen(true)}
          >
          <img src={arrowIcon} alt="diagonal arrow" />
            Depósito
          </button>
          <button
            className="balance_btn balance_btn_withdraw"
            onClick={() => setIsWithdrawOpen(true)}
          >
            <img src={arrowIcon} alt="diagonal arrow" />
            Saque
          </button>
        </div>
      </div>
      <img src={investmentSVG} alt="representation of an investment" />
      <Dialog className="dialog_container" open={isDepositOpen} onClose={() => setIsDepositOpen(false)}>
        <div className="backdrop_background" aria-hidden="true" />
        <div className="backdrop_fullscreen_container" >
          <Dialog.Panel className="backdrop_panel">
            <button
              className="backdrop_close_btn"
              onClick={() => setIsDepositOpen(false)}>
              <img className="backdrop_close_icon" src={closeIcon} alt="icon to close order" />
            </button>
            <Dialog.Title className="backdrop_title">
              Deposite valores à sua carteira!
            </Dialog.Title>
            <Deposit />
          </Dialog.Panel>
        </div>
      </Dialog>
      <Dialog className="dialog_container" open={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)}>
        <div className="backdrop_background" aria-hidden="true" />
        <div className="backdrop_fullscreen_container" >
          <Dialog.Panel className="backdrop_panel">
            <button
              className="backdrop_close_btn"
              onClick={() => setIsWithdrawOpen(false)}>
              <img className="backdrop_close_icon" src={closeIcon} alt="icon to close order" />
            </button>
            <Dialog.Title className="backdrop_title">
              Saque seus fundos!
            </Dialog.Title>
            <Withdraw />
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Balance;