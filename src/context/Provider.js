
import React, { useState } from 'react';
import AppContext from './Context';

function Provider({ children }) {
  const [currentAsset, setCurrentAsset] = useState({});
  const [orderType, setOrderType] = useState('');

  const contextValue = {
    currentAsset,
    setCurrentAsset,
    orderType,
    setOrderType,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default Provider;