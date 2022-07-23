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
  // const [isPurchaseInvalid, setIsPurchaseInvalid] = useState(false);
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
    if (+desiredAmount > UserActive.quantity) {
      return toast.error('Ações insuficientes!', {
        duration: 5000
      });
    } else if (UserActive.quantity - +desiredAmount <= 0){
      toast.success('Sucesso! Redirecionando para carteira.', {
        duration: 5000
      });
      await changeUserBalance((userBalance + +total), userEmail);
      await changeAssetBalance(currentFilteredAsset.name, (+currentFilteredAsset.quantity + +desiredAmount));
      await deleteUserAsset(+userId, +currentFilteredAsset.id);
      return setTimeout(() => navigate(0), 5000);
    } else {
      toast.success('Sucesso! Redirecionando para carteira.', {
        duration: 5000
      });
      await changeUserBalance((userBalance + +total), userEmail);
      await modifyUserAsset(+userId, currentFilteredAsset.id, (+UserActive.quantity - +desiredAmount));
      await changeAssetBalance(currentFilteredAsset.name, (+currentFilteredAsset.quantity + +desiredAmount));
      return setTimeout(() => navigate(0), 5000);
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
      <div className="asset_order_container">
        <label className="asset_quantity">
          Quantidade: 
          <input
            className="asset_input_quantity"
            type="number"
            value={desiredAmount}
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
          Valor total: R$ {isNaN(total) ? 0 : total}
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