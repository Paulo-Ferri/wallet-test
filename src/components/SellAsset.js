import React, {useContext, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  modifyUserAsset,
  changeAssetBalance,
  changeUserBalance,
  deleteUserAsset
} from '../utils/apiUtilities';
import toast, { Toaster } from 'react-hot-toast';
import AppContext from '../context/Context';
import './CSS/BuyAssets.css';

const SellAsset = () => {
  const {
    currentAsset: {name, value, UserActive},
    allAssets,
    userBalance,
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
  const handleSale = async () => {
    if(+desiredAmount < 0) {
      return toast.error('O valor deve ser maior que 0!', {
        duration: 3000
      });
    }
    if (+desiredAmount > UserActive.quantity) {
      return toast.error('Ações insuficientes!', {
        duration: 3000
      });
    } else if (UserActive.quantity - +desiredAmount <= 0){
      try {
        await changeUserBalance((userBalance + +total), userEmail);
        await changeAssetBalance(currentFilteredAsset.name, (+currentFilteredAsset.quantity + +desiredAmount));
        await deleteUserAsset(+userId, +currentFilteredAsset.id);
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
        await changeUserBalance((userBalance + +total), userEmail);
        await modifyUserAsset(+userId, currentFilteredAsset.id, (+UserActive.quantity - +desiredAmount));
        await changeAssetBalance(currentFilteredAsset.name, (+currentFilteredAsset.quantity + +desiredAmount));
        toast.success('Sucesso! Redirecionando para carteira.', {
          duration: 3000
        });
        return setTimeout(() => navigate(0), 3000);
      } catch {
        toast.error('Algo deu errado.', {
          duration: 3000
        });
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
            <td>{UserActive.quantity}</td>
            <td>{value}</td>
          </tr>
        </tbody>
      </table>
      <div className="asset_order_container asset_order_sell_container">
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
            OK
          </button>
        </label>
        <div className="asset_operation_total">
          <p>Valor total:</p>
          <p className="asset_operation_total_calc"> R$ {isNaN(total) ? 0 : total}</p>
        </div>
        </div>
        <button
          className="asset_confirm_btn"
          onClick={handleSale}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default SellAsset;