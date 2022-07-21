import React, {useContext, useState, useEffect} from 'react';
import AppContext from '../context/Context';
import './CSS/BuyAssets.css';

const BuyAsset = () => {
  const {currentAsset: {name, value}, allAssets} = useContext(AppContext);
  const [currentFilteredAsset, setCurrentFilteredAsset] = useState({});
  const [desiredAmount, setDesiredAmount] = useState('');

  useEffect(() => {
    const filteredAsset = allAssets.filter((asset) => {
      return asset.name === name
    });
    setCurrentFilteredAsset(...filteredAsset);
  }, [allAssets, name])

  return (
    <div className="order_container">
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
        <label>
          <input
            className="asset_input_quantity"
            type="number"
            placeholder="Informe a quantidade"
            value={desiredAmount}
            onChange={(e) => setDesiredAmount(e.target.value)}
          />
        </label>
        <button
          className="asset_confirm_btn"
        >
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default BuyAsset;