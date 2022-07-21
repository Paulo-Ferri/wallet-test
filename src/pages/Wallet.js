import React, {useEffect, useState} from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { getAssetsByEmail, getAllAssets } from '../utils/apiUtilities';
import './CSS/Wallet.css'

const Wallet = () => {
  const [userEmail, setUserEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [userAssets, setUserAssets] = useState([]);
  const [allAssets, setAllAssets] = useState([]);
  const [newAssets, setNewAssets] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("email");
    setUserEmail(savedUser);
  }, []);

  useEffect(() => {
    async function fetchUserActives() {
      const fetchedUserActives = await getAssetsByEmail(userEmail);
      setUserAssets(fetchedUserActives.data.message.actives);
      setNickName(fetchedUserActives.data.message.name);
    }
    fetchUserActives();
  }, [userEmail]);

  useEffect(() => {
    async function fetchAllActives() {
      const fetchedAllActives = await getAllAssets();
      setAllAssets(fetchedAllActives.data);
    }
    fetchAllActives();
  }, [])

  useEffect(() => {
    const filteredAssets = allAssets.filter((asset) => {
      return userAssets.every(usedAsset => usedAsset.name !== asset.name)
    });
  
    setNewAssets(filteredAssets)
  }, [userAssets, allAssets]);

  return (
    <div className="wallet_page">
      <Header name={nickName}/>
      <div
        className="personal_assets_container"
      >
        <h2 className="personal_assets_h2">Seus ativos</h2>
        <div className="personal_assets_infos">
          {userAssets.length ? (
          <table className="assets_table">
          <tbody> 
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Valor (R$)</th>
            </tr>
          </tbody>
          {userAssets.map((asset) => {
            return (
              <tbody>
                <tr>
                  <td>{asset.name}</td>
                  <td>{asset.UserActive.quantity}</td>
                  <td>{asset.value}</td>
                  <td className="td_btn"><button className="buy_assets_button">Comprar</button></td>
                  <td className="td_btn"><button className="sell_assets_button">Vender</button></td>
                </tr>
              </tbody>
            )
          })}
        </table>
          ) : (
            <p className="no_assets_message">Você não possui nenhum ativo na sua carteira até o momento!</p>
          )}
        </div>
        <div className="new_assets_container">
          <h2 className="personal_assets_h2">Disponíveis para investir</h2>
          <div className="personal_assets_infos">
          {newAssets.length && (
            <table className="assets_table">
              <tbody> 
                <tr>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Valor (R$)</th>
                </tr>
              </tbody>
              {newAssets.map((active) => {
                return (
                  <tbody>
                  <tr>
                    <td>{active.name}</td>
                    <td>{active.quantity}</td>
                    <td>{active.value}</td>
                    <td className="td_btn"><button className="buy_assets_button">Comprar</button></td>
                    <td className="td_btn"><button disabled={true} className="sell_assets_button">Vender</button></td>
                  </tr>
                </tbody>
                )
              })}
            </table>
          )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wallet;