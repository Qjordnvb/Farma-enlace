import React from 'react';

import useViews from 'views';
import useCalcSize from '../../../../hooks/useCalcSize';

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

  const {width: tableWidth, height: tableHeight} = useCalcSize();

  return (
    <>
      {' '}
      <DataGridLayout titleGrid="Orden de consumo - Descuento uniforme" userMenuLinks={userMenu}>
        <div style={{maxWidth: tableWidth + 'px', minHeight: tableHeight - 200 + 'px'}}>
          <TableDiscount />
        </div>
      </DataGridLayout>
    </>
  );
}

// DataGridDiscount.propTypes = {};

export default DataGridDiscount;
