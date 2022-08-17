import React from 'react';

import useViews from 'views';

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
  return (
    <>
      {' '}
      <DataGridLayout titleGrid="Reporte" userMenuLinks={userMenu}>
        <div>
          <TableReport />
        </div>
      </DataGridLayout>
    </>
  );
}

export default DataGridReport;
