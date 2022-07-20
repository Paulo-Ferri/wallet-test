import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import { getActivesByEmail, getAllActives } from '../utils/apiUtilities';
import './CSS/Wallet.css'

const Wallet = () => {
  const [userEmail, setUserEmail] = useState('');
  const [nickName, setNickName] = useState('');
  const [userActives, setUserActives] = useState([]);
  const [allActives, setAllActives] = useState([]);
  const [newActives, setNewActives] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("email");
    setUserEmail(savedUser);
  }, []);

  useEffect(() => {
    async function fetchUserActives() {
      const fetchedUserActives = await getActivesByEmail(userEmail);
      setUserActives(fetchedUserActives.data.message.actives);
      setNickName(fetchedUserActives.data.message.name);
    }
    fetchUserActives();
  }, [userEmail]);

  useEffect(() => {
    async function fetchAllActives() {
      const fetchedAllActives = await getAllActives();
      setAllActives(fetchedAllActives.data);
    }
    fetchAllActives();
  }, [])

  useEffect(() => {
    const filteredActives = allActives.filter((el) => {
      return userActives.every(fd => fd.name !== el.name)
    });
    setNewActives(filteredActives)
  }, [userActives, allActives]);

  return (
    <div className="wallet_page">
      <Header name={nickName}/>
      <div
        className="personal_actives_container"
      >
        <h2>Seus ativos</h2>
        <table className="actives_table">
          {userActives.length ? (
          <tbody> 
            <tr>
              <th>Nome</th>
              <th>Quantidade</th>
              <th>Valor (R$)</th>
            </tr>
          </tbody>
          ) : (
            <p>Você ainda não possui nenhum ativo!</p>
          )}
          {userActives.length ? userActives.map((active) => {
            return (
              <tbody>
                <tr>
                  <td>{active.name}</td>
                  <td>{active.UserActive.quantity}</td>
                  <td>{active.value}</td>
                  <td className="td_btn"><button className="buy_active_button">Comprar</button></td>
                  <td className="td_btn"><button className="sell_active_button">Vender</button></td>
                </tr>
              </tbody>
            )
          }) : (
            null
          )}
        </table>
        <div className="new_actives_container">
          <h2>Disponíveis para investir</h2>
          {newActives.length && (
            <table className="actives_table">
              <tbody> 
                <tr>
                  <th>Nome</th>
                  <th>Quantidade</th>
                  <th>Valor (R$)</th>
                </tr>
              </tbody>
              {newActives.map((active) => {
                return (
                  <tbody>
                  <tr>
                    <td>{active.name}</td>
                    <td>{active.quantity}</td>
                    <td>{active.value}</td>
                    <td className="td_btn"><button className="buy_active_button">Comprar</button></td>
                    <td className="td_btn"><button disabled={true} className="sell_active_button">Vender</button></td>
                  </tr>
                </tbody>
                )
              })}
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;