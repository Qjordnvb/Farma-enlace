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
// Grid Inventory
const DataGridInventory = lazy(() => import('./user/dataGridInventory/DataGridInventory'));
// Grid Discount
const DataGridDiscount = lazy(() => import('./user/dataGridDiscount/DataGridDiscount'));
// Grid Report
const DataGridReport = lazy(() => import('./user/dataGridReport/DataGridReport'));
const ConfigPrivate = lazy(() => import('./user/ConfigPrivate'));

const useScreens = () => {
  return {
    LoginPage,
    HomePrivate,
    Logout,
    // parameters
    DataGridParameters,
    GridList,
    GridParameters,
    GridDescription,
    GridReplacement,
    GridDelivery,
    // orders
    DataGridOrders,
    // inventory
    DataGridInventory,
    // discount
    DataGridDiscount,
    // report
    DataGridReport,
    ConfigPrivate
  };
};

export default useScreens;
