import axios from 'axios';


const handleLogin = async (email, password) => {
 const response = await axios.post('https://pauloferrixpwallet.herokuapp.com/login', {
    email: email,
    password: password
  }).catch((error) => {
    return error
  });
  return response
}

const handleUserCreation = async (email, password, name) => {
  const response = await axios.post('https://pauloferrixpwallet.herokuapp.com/users', {
    email: email,
    password: password,
    balance: "0",
    name: name
  }).catch((error) => {
    return error
  });
  return response.status ? response.status : response.response.status
}

const getAssetsByEmail = async (email) => {
  const actives = await axios.get('https://pauloferrixpwallet.herokuapp.com/useractives/email', {
    params: {
      email: email
    }
  }).catch((error) => {
    return error
  });
  return actives;
}

const getAllAssets = async () => {
  const allActives = await axios.get('https://pauloferrixpwallet.herokuapp.com/actives')
  .catch((error) => {
    return error
  });
  return allActives;
}

export {
  handleLogin,
  handleUserCreation,
  getAssetsByEmail,
  getAllAssets,
};