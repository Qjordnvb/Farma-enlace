import {lazy} from 'react';

// Login
const LoginPage = lazy(() => import('./login/LoginPage'));

// User
const HomePrivate = lazy(() => import('./user/HomePrivate'));
const Logout = lazy(() => import('./user/logout/Logout'));

const useScreens = () => {
  return {
    LoginPage,
    HomePrivate,
    Logout
  };
};

export default useScreens;
