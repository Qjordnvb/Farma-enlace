import {Api} from 'services/Api';

export const useUstils = () => {
  const setUserLocalStorage = (data) => {
    window.localeStorage.setItem('user', JSON.stringify(data));
  };

  async function LoginRequest(usuario, password) {
    try {
      const request = await Api.post('/usuarios/login', {usuario, password});
      return request.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return false;
    }
  }

  async function UserLogin(usuario, password, app, token) {
    try {
      const request = await Api.post(
        'ServiceDesk/loginUsuarios',
        {usuario, password, app},
        {headers: {Authorization: `Bearer ${token}`}}
      );

      return request.data;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return false;
    }
  }

  return {
    LoginRequest,
    setUserLocalStorage,
    UserLogin
  };
};
