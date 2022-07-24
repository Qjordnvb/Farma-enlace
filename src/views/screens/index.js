import {lazy} from 'react';

// Login
const LoginPage = lazy(() => import('./login/LoginPage'));

// User
const HomePrivate = lazy(() => import('./user/HomePrivate'));
const Logout = lazy(() => import('./user/logout/Logout'));
// Grid Parameters
const DataGridParameters = lazy(() => import('./user/dataGridParameters/DataGridParameters'));
const GridList = lazy(() => import('./user/dataGridParameters/gridList/GridList'));
const GridUniforms = lazy(() => import('./user/dataGridParameters/gridUniforms/GridUniforms'));
const GridDescription = lazy(() =>
  import('./user/dataGridParameters/gridDescription/GridDescription')
);
// Grid Orders
const DataGridOrders = lazy(() => import('./user/dataGridOrders/DataGridOrders'));

const useScreens = () => {
  return {
    LoginPage,
    HomePrivate,
    Logout,
    DataGridParameters,
    DataGridOrders,
    GridList,
    GridUniforms,
    GridDescription
  };
};

export default useScreens;
