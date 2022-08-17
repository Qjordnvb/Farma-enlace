import {lazy} from 'react';

// Tables Parameters
const TableParameter = lazy(() => import('./TableParameter'));
const TableGarments = lazy(() => import('./TableParameter/TableGarments'));
const TableReasons = lazy(() => import('./TableParameter/TableReasons'));
const TableDescription = lazy(() => import('./TableParameter/TableDescription'));
const TableReplacement = lazy(() => import('./TableParameter/TableReplacement'));
const TableDelivery = lazy(() => import('./TableParameter/TableDelivery'));
// Tables Orders
const TableOrders = lazy(() => import('./TableOrders'));
const TableIntake = lazy(() => import('./TableOrders/TableIntake'));
// Tables Inventory
const TableInventory = lazy(() => import('./TableInventory'));
const TableGraphic = lazy(() => import('./TableInventory/TableGraphic'));
// Table Discount
const TableDiscount = lazy(() => import('./TableDiscount'));
// Table Report
const TableReport = lazy(() => import('./TableReport'));

const useTables = () => {
  return {
    TableParameter,
    TableGarments,
    TableReasons,
    TableDescription,
    TableReplacement,
    TableDelivery,
    TableOrders,
    TableIntake,
    TableInventory,
    TableGraphic,
    TableDiscount,
    TableReport
  };
};

export default useTables;
