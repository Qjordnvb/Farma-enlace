import React from 'react';
import {Route, Routes} from 'react-router';
import useViews from 'views';
import useCalcSize from '../../../../hooks/useCalcSize';

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
  const {width: tableWidth, height: tableHeight} = useCalcSize();

  return (
    <>
      {' '}
      <DataGridLayout titleGrid="Orden de consumo" userMenuLinks={userMenu}>
        <div style={{maxWidth: tableWidth + 'px', minHeight: tableHeight - 200 + 'px'}}>
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
