import {lazy} from 'react';

// Tables
const TableOrders = lazy(() => import('./TableOrders'));
const TableParameter = lazy(() => import('./TableParameter'));
// const TableList = lazy(() => import('./TableParameter/TableList'));
const TableGarments = lazy(() => import('./TableParameter/TableGarments'));
const TableReasons = lazy(() => import('./TableParameter/TableReasons'));
const TableDescription = lazy(() => import('./TableParameter/TableDescription'));
const TableReplacement = lazy(() => import('./TableParameter/TableReplacement'));
const TableDelivery = lazy(() => import('./TableParameter/TableDelivery'));

const useTables = () => {
  return {
    TableOrders,
    TableParameter,
    // TableList,
    TableGarments,
    TableReasons,
    TableDescription,
    TableReplacement,
    TableDelivery
  };
};

export default useTables;
