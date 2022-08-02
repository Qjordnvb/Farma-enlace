import {lazy} from 'react';

// Login
const LoginPage = lazy(() => import('./login/LoginPage'));

// User
const HomePrivate = lazy(() => import('./user/HomePrivate'));
const Logout = lazy(() => import('./user/logout/Logout'));
// Grid Parameters
const DataGridParameters = lazy(() => import('./user/dataGridParameters/DataGridParameters'));
const GridList = lazy(() => import('./user/dataGridParameters/gridList/GridList'));
const GridParameters = lazy(() => import('./user/dataGridParameters/gridUniforms/GridUniforms'));
const GridDescription = lazy(() =>
  import('./user/dataGridParameters/gridDescription/GridDescription')
);
const GridReplacement = lazy(() =>
  import('./user/dataGridParameters/gridReplacement/GridReplacement')
);
const GridDelivery = lazy(() => import('./user/dataGridParameters/gridDelivery/GridDelivery'));
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
    GridParameters,
    GridDescription,
    GridReplacement,
    GridDelivery
  };
};

export default useScreens;
