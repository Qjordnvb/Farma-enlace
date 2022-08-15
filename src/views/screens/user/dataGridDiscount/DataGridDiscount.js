import React from 'react';

import useViews from 'views';

// import PropTypes from 'prop-types';

function DataGridDiscount() {
  const {useLayouts, useComponents} = useViews();
  const {DataGridLayout} = useLayouts();
  const {useTables} = useComponents();
  const {TableDiscount} = useTables();
  const userMenu = [
    {
      name: 'Descuento',
      path: ''
    }
  ];
  return (
    <>
      {' '}
      <DataGridLayout titleGrid="Orden de consumo - Descuento uniforme" userMenuLinks={userMenu}>
        <div className="container-table pt-16">
          <TableDiscount />
        </div>
      </DataGridLayout>
    </>
  );
}

// DataGridDiscount.propTypes = {};

export default DataGridDiscount;
