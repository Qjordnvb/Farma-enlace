import React from 'react';
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
      path: 'consumo',
      key: '7'
    },
    {
      name: ' descuento',
      path: 'descuento',
      key: '8'
    }
  ];
  return (
    <>
      {' '}
      <DataGridLayout titleGrid="Orden de consumo" userMenuLinks={userMenu}>
        <div className="container-table pt-16">
          <TableOrders />
        </div>
      </DataGridLayout>
    </>
  );
}

// DataGridOrders.propTypes = {};

export default DataGridOrders;
