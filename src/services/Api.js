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
  baseURL:
    process.env.REACT_APP_NODE_ENV === 'production'
      ? process.env.REACT_APP_PROD_URL
      : process.env.REACT_APP_DEV_URL
});
