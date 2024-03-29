import {createContext, useCallback, useContext, useMemo, useState} from 'react';
import PropTypes from 'prop-types';
import {LOGIN} from 'config/paths';
import {useUtils} from 'hooks';
import {message} from 'antd';

const MY_AUTH_APP = 'MY_AUTH_APP';

export const AuthContext = createContext();

export default function AuthContextProvider({children}) {
  const [isAuthenticated, setIsAuthenticated] = useState(window.localStorage.getItem(MY_AUTH_APP));
  const [token, setToken] = useState();

  const {LoginRequest, UserLogin} = useUtils();

  const login = useCallback(
    async function (usuario, password) {
      const response = await LoginRequest(usuario, password, token);
      setToken(response.token);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [LoginRequest]
  );

  const userLogin = useCallback(
    async function (usuario, password, app, tokenApp) {
      try {
        const response = await UserLogin(usuario, password, app, tokenApp);
        console.log("estas es la respuestaaaaaaaaaaaaaaa",response);
        window.localStorage.setItem(MY_AUTH_APP, 'test');
       /* if (response.user) {
          setIsAuthenticated(true);
          window.localStorage.setItem(MY_AUTH_APP, JSON.stringify(response));
        } else {
          setIsAuthenticated(false);
          window.localStorage.removeItem(MY_AUTH_APP);
          message.error('Usuario o contraseña incorrectos');
        }*/
      } catch (e) {
        setIsAuthenticated(false);
        window.localStorage.removeItem(MY_AUTH_APP);
        message.error('Usuario o contraseña incorrectos');
      }
    },
    [UserLogin]
  );

  const logout = useCallback(function () {
    window.localStorage.removeItem(MY_AUTH_APP, true);
    window.location.replace(LOGIN);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      login,
      logout,
      isAuthenticated,
      token,
      userLogin
    }),
    [isAuthenticated, login, logout, token, userLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
  children: PropTypes.object
};

export function useAuthContext() {
  return useContext(AuthContext);
}
