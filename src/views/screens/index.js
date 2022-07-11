import {lazy} from 'react';

// Login
const LoginPage = lazy(() => import('./login/LoginPage'));

// User
const HomePrivate = lazy(() => import('./user/HomePrivate'));
const Logout = lazy(() => import('./user/logout/Logout'));
const DataGrid = lazy(() => import('./user/dataGrid/DataGrid'));

const useScreens = () => {
  return {
    LoginPage,
    HomePrivate,
    Logout,
    DataGrid
  };
};

export default useScreens;
