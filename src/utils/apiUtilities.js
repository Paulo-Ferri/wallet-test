import axios from 'axios';

const sendLogin = async (credentials) => {
  const {email, password} = credentials;
  const response = await axios.post('https://pauloferrixpwallet.herokuapp.com/login', {
    email: email,
    password: password
  }).catch((error) => {
    if (error.response.status === 401) {
      return 'Invalid Data'
    }
    throw new Error(error)
  });
  return response
}

const handleUserCreation = async (credentials) => {
  const {name, email, password} = credentials;
  const response = await axios.post('https://pauloferrixpwallet.herokuapp.com/users', {
    email: email,
    password: password,
    balance: "0",
    name: name
  }).catch((error) => {
    if (error.response.status === 409) {
      return 'Conflict'
    }
    throw new Error(error)
  });
  return response
}

const getAssetsByEmail = async (email) => {
  const actives = await axios.get('https://pauloferrixpwallet.herokuapp.com/useractives/email', {
    params: {
      email: email
    }
  }).catch((error) => {
    throw new Error(error)
  });
  return actives;
}

const getAllAssets = async () => {
  const allAssets = await axios.get('https://pauloferrixpwallet.herokuapp.com/actives')
  .catch((error) => {
    throw new Error(error)
  });
  return allAssets;
}

const modifyUserAsset = async (userId, activeId, quantity) => {
  const modifiedAsset = await axios.put('https://pauloferrixpwallet.herokuapp.com/useractives', {
    userId,
    activeId,
    quantity
  }).catch((error) => {
    throw new Error(error)
  });
  return modifiedAsset
}

const createNewUserAsset = async (userId, activeId, quantity) => {
  const createdUserAsset = await axios.post('https://pauloferrixpwallet.herokuapp.com/useractives', {
    userId,
    activeId,
    quantity
  }).catch((error) => {
    throw new Error(error)
  });
  return createdUserAsset
}

const changeAssetBalance = async (name, quantity) => {
  const newAssetBalance = await axios.put('https://pauloferrixpwallet.herokuapp.com/actives/balance', {
    name,
    quantity
  }).catch((error) => {
    throw new Error(error)
  });
  return newAssetBalance
}

const changeUserBalance = async (balance, email) => {
  const newUserBalance = await axios.put('https://pauloferrixpwallet.herokuapp.com/users/balance', {
    balance,
    email
  }).catch((error) => {
    throw new Error(error)
  });
  return newUserBalance
}

const deleteUserAsset = async (userId, activeId) => {
  const deletedUserAsset = await axios.delete('https://pauloferrixpwallet.herokuapp.com/useractives', {
    data: {
      userId,
      activeId
    }
  }).catch((error) => {
    throw new Error(error)
  });
  return deletedUserAsset
}

export {
  sendLogin,
  handleUserCreation,
  getAssetsByEmail,
  getAllAssets,
  modifyUserAsset,
  createNewUserAsset,
  changeAssetBalance,
  changeUserBalance,
  deleteUserAsset
};