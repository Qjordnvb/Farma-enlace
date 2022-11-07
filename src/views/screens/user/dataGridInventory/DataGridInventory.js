import React, {useState} from 'react';
import {Route, Routes} from 'react-router';
import useViews from 'views';
import useCalcSize from '../../../../hooks/useCalcSize';

// import PropTypes from 'prop-types';

function DataGridInventory() {
  const {useLayouts, useComponents} = useViews();
  const {DataGridLayout} = useLayouts();
  const {useTables} = useComponents();
  const {TableInventory, TableGraphic} = useTables();
  const [selectedProducts, setSelectedProducts] = useState([]);
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

  const {width: tableWidth, height: tableHeight} = useCalcSize();

  return (
    <>
      {' '}
      <DataGridLayout titleGrid="Orden de Compra" userMenuLinks={userMenu}>
        <div style={{maxWidth: tableWidth + 'px', minHeight: tableHeight + 'px'}}>
          <Routes>
            <Route
              path="buy"
              element={
                <TableInventory
                  selectedProducts={selectedProducts}
                  setSelected={setSelectedProducts}
                />
              }
            />
            <Route path="graphic" element={<TableGraphic selectedProducts={selectedProducts} />} />
          </Routes>
        </div>
      </DataGridLayout>
    </>
  );
}

// DataGridInventory.propTypes = {};

export default DataGridInventory;
