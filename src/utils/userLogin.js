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

const handleUserCreation = async (email, password) => {
  const response = await axios.post('https://pauloferrixpwallet.herokuapp.com/users', {
    email: email,
    password: password,
    balance: "0"
  }).catch((error) => {
    return error.response.data
  });
  return response.status;
}


export {
  handleLogin,
  handleUserCreation
};