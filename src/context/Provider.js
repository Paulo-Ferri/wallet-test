
import React, { useState, useEffect } from 'react';
import AppContext from './Context';
import {getAllAssets, getAssetsByEmail } from '../utils/apiUtilities';

function Provider({ children }) {
  const [currentAsset, setCurrentAsset] = useState({});
  const [orderType, setOrderType] = useState('');
  const [allAssets, setAllAssets] = useState([]);
  const [userAssets, setUserAssets] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [userBalance, setUserBalance] = useState('');

  useEffect(() => {
    async function fetchAllActives() {
      const fetchedAllActives = await getAllAssets();
      setAllAssets(fetchedAllActives.data);
    }
    fetchAllActives();
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("email");
    setUserEmail(savedUser);
  }, []);

  useEffect(() => {
    async function fetchUserAssets() {
      const fetchedUserAssets = await getAssetsByEmail(userEmail);
      setUserAssets(fetchedUserAssets.data.message.actives);
      setUserBalance(fetchedUserAssets.data.message.balance);
      setUserName(fetchedUserAssets.data.message.name)
    }
    fetchUserAssets();
  }, [userEmail]);

  useEffect(() => {
    const filteredAssets = allAssets.filter((asset) => {
      return userAssets.every(usedAsset => usedAsset.name !== asset.name)
    });
    setFilteredAssets(filteredAssets)
  }, [userAssets, allAssets]);

  const contextValue = {
    currentAsset,
    setCurrentAsset,
    orderType,
    setOrderType,
    allAssets,
    userAssets,
    filteredAssets,
    userBalance,
    userName
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;