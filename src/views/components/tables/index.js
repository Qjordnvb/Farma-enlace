import {lazy} from 'react';

// Tables
const TableOrders = lazy(() => import('./TableOrders'));
const TableParameter = lazy(() => import('./TableParameter'));
const TableList = lazy(() => import('./TableParameter/TableList'));
const TableEdit = lazy(() => import('./TableParameter/TableEdit'));

const useTables = () => {
  return {
    TableOrders,
    TableParameter,
    TableList,
    TableEdit
  };
};

export default useTables;
