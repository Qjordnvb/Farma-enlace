import React from 'react';

import useViews from 'views';
import useCalcSize from '../../../../hooks/useCalcSize';

// import PropTypes from 'prop-types';

function DataGridReport() {
  const {useLayouts, useComponents} = useViews();
  const {DataGridLayout} = useLayouts();
  const {useTables} = useComponents();
  const {TableReport} = useTables();
  const userMenu = [
    {
      name: 'Envios',
      path: ''
    }
  ];

  const {width: tableWidth, height: tableHeight} = useCalcSize();

  return (
    <>
      {' '}
      <DataGridLayout titleGrid="Reporte" userMenuLinks={userMenu}>
        <div style={{maxWidth: tableWidth + 'px', height: tableHeight}}>
          <TableReport />
        </div>
      </DataGridLayout>
    </>
  );
}

export default DataGridReport;
