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
      path: 'actualization'
    },
    {
      name: 'orden de consumo',
      path: 'consumo'
    },
    {
      name: ' descuento',
      path: 'descuento'
    }
  ];
  return (
    <>
      {' '}
      <DataGridLayout titleGrid="Orden de consumo" userMenuLinks={userMenu}>
        <div className="container-table px-48 pt-16">
          <TableOrders />
        </div>
      </DataGridLayout>
    </>
  );
}

// DataGridOrders.propTypes = {};

export default DataGridOrders;
