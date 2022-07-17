import {lazy} from 'react';

// Tables
const TableOrders = lazy(() => import('./TableOrders'));
const TableParameter = lazy(() => import('./TableParameter'));
const TableList = lazy(() => import('./TableParameter/TableList'));

const useTables = () => {
  return {
    TableOrders,
    TableParameter,
    TableList
  };
};

export default useTables;
