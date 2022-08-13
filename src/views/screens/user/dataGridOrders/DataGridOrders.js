import React from 'react';
import {Route, Routes} from 'react-router';
import useViews from 'views';

// import PropTypes from 'prop-types';

function DataGridOrders() {
  const {useLayouts, useComponents} = useViews();
  const {DataGridLayout} = useLayouts();
  const {useTables} = useComponents();
  const {TableOrders} = useTables();
  const userMenu = [
    {
      name: 'actualización de tallas',
      path: 'actualization',
      key: '6'
    },
    {
      name: 'orden de consumo',
      path: 'intake',
      key: '7'
    }
    // {

    //   element: ,

    // }
  ];
  return (
    <>
      {' '}
      <DataGridLayout titleGrid="Orden de consumo" userMenuLinks={userMenu}>
        <div>
          <Routes>
            <Route path="actualization" element={<TableOrders />} />
            <Route path="intake" element={<TableOrders />} />
          </Routes>
        </div>
      </DataGridLayout>
    </>
  );
}

// DataGridOrders.propTypes = {};

export default DataGridOrders;
