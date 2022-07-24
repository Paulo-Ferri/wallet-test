import React, {useState, useContext} from 'react';
import {Dialog} from '@headlessui/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/Context';
import closeIcon from '../images/close-icon.png';
import './CSS/Wallet.css';
import './CSS/BuyDialog.css';
import BuyAsset from '../components/BuyAsset';
import SellAsset from '../components/SellAsset';
import Deposit from '../components/Balance';
import Recomendation from '../components/Recomendation';

const Wallet = () => {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const {
    setCurrentAsset,
    setOrderType,
    orderType,
    filteredAssets,
    userAssets,
    userName,
  } = useContext(AppContext);

  const handleOrder = (asset, type) => {
    setOrderType(type);
    setCurrentAsset(asset);
    setIsOrderOpen(true);
  }

  return (
    <div className="wallet_page">
      <Header/>
      <div className="user_greetings_wallet">
        <p>{`Olá, ${userName}`}</p>
      </div>
      <div className="recomendation_and_deposit_container">
        <Deposit />
        <Recomendation />
      </div>
      <div
        className="personal_assets_container"
      >
        <h2 className="personal_assets_h2">Seus ativos</h2>
        <div className="personal_assets_infos">
          {userAssets && userAssets.length ? (
          <table className="assets_table">
          <thead> 
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Valor (R$)</th>
            </tr>
          </thead>
          {userAssets && userAssets.map((asset) => {
            return (
              <tbody>
                <tr>
                  <td>{asset.name}</td>
                  <td>{asset.UserActive.quantity}</td>
                  <td>{asset.value}</td>
                  <td className="td_btn">
                    <button
                      className="buy_assets_button"
                      onClick={() => handleOrder(asset, "compra")}
                    >
                      Comprar
                    </button>
                  </td>
                  <td className="td_btn">
                    <button
                      className="sell_assets_button"
                      onClick={() => handleOrder(asset, "venda")}
                    >
                      Vender
                    </button>
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
          ) : (
            <p className="no_assets_message">
              Você não possui nenhum ativo na sua carteira até o momento!
            </p>
          )}
        </div>
        <div className="new_assets_container">
          <h2 className="personal_assets_h2">Disponíveis para investir</h2>
          <div className="personal_assets_infos">
          {filteredAssets.length && (
            <table className="assets_table">
              <thead> 
                <tr>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Valor (R$)</th>
                </tr>
              </thead>
              {filteredAssets.map((asset) => {
                return (
                  <tbody>
                  <tr>
                    <td>{asset.name}</td>
                    <td>{asset.quantity}</td>
                    <td>{asset.value}</td>
                    <td className="td_btn">
                      <button
                        className="buy_assets_button"
                        onClick={() => handleOrder(asset, "compra")}
                      >
                        Comprar
                      </button>
                    </td>
                    <td className="td_btn">
                      <button
                        disabled={true}
                        className="sell_assets_button"
                      >
                        Vender
                      </button>
                    </td>
                  </tr>
                </tbody>
                )})
              }
            </table>
          )}
          </div>
        </div>
      </div>
      <Footer />
      <Dialog className="dialog_container" open={isOrderOpen} onClose={() => setIsOrderOpen(false)}>
        <div className="backdrop_background" aria-hidden="true" />
        <div className="backdrop_fullscreen_container" >
          <Dialog.Panel className="backdrop_panel">
            <button
              className="backdrop_close_btn"
              onClick={() => setIsOrderOpen(false)}>
              <img className="backdrop_close_icon" src={closeIcon} alt="icon to close order" />
            </button>
            <Dialog.Title className="backdrop_title">
              {`Complete sua ordem de ${orderType}!`}
            </Dialog.Title>
            {orderType === "compra" ? <BuyAsset /> : <SellAsset />}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Wallet;