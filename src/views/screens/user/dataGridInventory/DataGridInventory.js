import React from 'react';
import {Route, Routes} from 'react-router';
import useViews from 'views';

// import PropTypes from 'prop-types';

function DataGridInventory() {
  const {useLayouts, useComponents} = useViews();
  const {DataGridLayout} = useLayouts();
  const {useTables} = useComponents();
  const {TableInventory, TableGraphic} = useTables();
  const userMenu = [
    {
      name: 'COMPRA DE UNIFORMES',
      path: 'buy'
    },
    {
      name: 'ESTADOS DE PRODUCTOS',
      path: 'graphic'
    }
  ];
  return (
    <>
      {' '}
      <DataGridLayout titleGrid="Orden de Compra" userMenuLinks={userMenu}>
        <div>
          <Routes>
            <Route path="buy" element={<TableInventory />} />
            <Route path="graphic" element={<TableGraphic />} />
          </Routes>
        </div>
      </DataGridLayout>
    </>
  );
}

// DataGridInventory.propTypes = {};

export default DataGridInventory;
