import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  modifyUserAsset,
  createNewUserAsset,
  changeAssetBalance,
  changeUserBalance
} from '../utils/apiUtilities'
import toast, { Toaster } from 'react-hot-toast';
import AppContext from '../context/Context';
import './CSS/BuyAssets.css';

const BuyAsset = () => {
  const {
    currentAsset: {name, value, UserActive},
    allAssets,
    userBalance,
    userAssets,
    userId,
    userEmail,
  } = useContext(AppContext);
  const [currentFilteredAsset, setCurrentFilteredAsset] = useState({});
  const [desiredAmount, setDesiredAmount] = useState('');
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredAsset = allAssets.filter((asset) => {
      return asset.name === name;
    });
    setCurrentFilteredAsset(...filteredAsset);
  }, [allAssets, name])

  const handleOperation = () => {
    const assetValue = +currentFilteredAsset.value;
    const desiredTotal = assetValue * desiredAmount;
    setTotal(desiredTotal.toFixed(2));
  }
  const handlePurchase = async () => {
    if (total > userBalance) {
      setDesiredAmount('');
      setTotal(0)
      return toast.error('Saldo insuficiente!', {
        duration: 5000
      });
    } else if(userAssets.some((asset) => asset.name === currentFilteredAsset.name)) {
      try {
        await changeUserBalance((userBalance - +total), userEmail);
        await modifyUserAsset(userId, currentFilteredAsset.id, (+desiredAmount + +UserActive.quantity));
        await changeAssetBalance(currentFilteredAsset.name, (+currentFilteredAsset.quantity - +desiredAmount));
        toast.success('Sucesso! Redirecionando para carteira.', {
          duration: 3000
        });
        return setTimeout(() => navigate(0), 3000);
      } catch {
        toast.error('Algo deu errado.', {
          duration: 3000
        });
      }
    } else {
      try {
        await changeUserBalance((userBalance - +total), userEmail);
        await createNewUserAsset(userId, currentFilteredAsset.id, desiredAmount)
        await changeAssetBalance(currentFilteredAsset.name, (+currentFilteredAsset.quantity - +desiredAmount));
        toast.success('Sucesso! Redirecionando para carteira.', {
          duration: 3000
        });
        return setTimeout(() => navigate(0), 3000);
      } catch {
        toast.error('Algo deu errado.', {
          duration: 3000
        });
        return setTimeout(() => navigate(0), 3000);
      }
    }
  }

  return (
    <div className="order_container">
      <div><Toaster/></div>
      <table className="assets_table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Quantidade disponível</th>
            <th>Valor unitário (R$)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{currentFilteredAsset.quantity}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
      <div className="asset_order_container">
        <div>
          <p className="buyasset_balance_message">Seu saldo</p>
          <p className="buyasset_balance_info">R$ {userBalance.toFixed(2)}</p>
        </div>
        <div className="asset_quantity_and_total">
          <label className="asset_quantity">
            <input
              className="asset_input_quantity"
              type="number"
              value={desiredAmount}
              placeholder="Quantidade"
              onChange={(e) => setDesiredAmount(e.target.value)}
            />
            <button
              className="asset_btn_quantity"
              onClick={handleOperation}
            >
              Calcular
            </button>
          </label>
        <div className="asset_operation_total">
          <p>Valor total:</p>
          <p className="asset_operation_total_calc"> R$ {isNaN(total) ? 0 : total}</p>
        </div>
        </div>
        <button
          className="asset_confirm_btn"
          onClick={handlePurchase}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default BuyAsset;