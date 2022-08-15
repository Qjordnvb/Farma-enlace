import React from 'react';
import {Route, Routes} from 'react-router';
import useViews from 'views';

// import PropTypes from 'prop-types';

function DataGridOrders() {
  const {useLayouts, useComponents} = useViews();
  const {DataGridLayout} = useLayouts();
  const {useTables} = useComponents();
  const {TableOrders, TableIntake} = useTables();
  const userMenu = [
    {
      name: 'actualización de tallas',
      path: 'actualization'
    },
    {
      name: 'orden de consumo',
      path: 'intake'
    }
  ];
  return (
    <>
      {' '}
      <DataGridLayout titleGrid="Orden de consumo" userMenuLinks={userMenu}>
        <div>
          <Routes>
            <Route path="actualization" element={<TableOrders />} />
            <Route path="intake" element={<TableIntake />} />
          </Routes>
        </div>
      </DataGridLayout>
    </>
  );
}

// DataGridOrders.propTypes = {};

export default DataGridOrders;
