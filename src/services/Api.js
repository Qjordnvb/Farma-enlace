import axios from 'axios';

// export const getToken = (key) => {
//   const dataEncode = localStorage.getItem(key);
//   if (!dataEncode) {
//     return false;
//   }
// };

// const access = getToken('access');

// const {accessToken} = access;

export const Api = axios.create({
  baseURL: 'https://serviciosexternos.farmaenlace.com:3002/'
});

export const Apilocal = axios.create({
  baseURL: 'http://159.223.195.98:3002/'
});
