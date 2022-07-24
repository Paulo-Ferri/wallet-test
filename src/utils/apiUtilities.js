import axios from 'axios';


const handleLogin = async (email, password) => {
 const response = await axios.post('https://pauloferrixpwallet.herokuapp.com/login', {
    email: email,
    password: password
  }).catch((error) => {
    throw new Error(error)
  });
  console.log(response)
  return response
}

const handleUserCreation = async (email, password, name) => {
  const response = await axios.post('https://pauloferrixpwallet.herokuapp.com/users', {
    email: email,
    password: password,
    balance: "0",
    name: name
  }).catch((error) => {
    throw new Error(error)
  });
  return response.status ? response.status : response.response.status
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
  handleLogin,
  handleUserCreation,
  getAssetsByEmail,
  getAllAssets,
  modifyUserAsset,
  createNewUserAsset,
  changeAssetBalance,
  changeUserBalance,
  deleteUserAsset
};