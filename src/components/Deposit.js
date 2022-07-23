import React, {useContext} from 'react';
import AppContext from '../context/Context';
import investmentSVG from '../images/investment/Wavy_Tech-24_Single-08.svg';
import './CSS/Deposit.css';

const Deposit = () => {
  const {userBalance} = useContext(AppContext)
  return (
    <div className="deposit_component">
      <div>
        <p>Seu saldo: R$ {userBalance.toFixed(2)}</p>
      </div>
      <img src={investmentSVG} alt="representation of an investment" />
    </div>
  );
};

export default Deposit;