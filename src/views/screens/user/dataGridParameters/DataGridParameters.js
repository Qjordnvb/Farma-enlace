import React from 'react';

import {Route, Routes} from 'react-router-dom';
import useViews from 'views';

// import PropTypes from 'prop-types';
import {StyledSidebarLayout} from './DataGridParameters.Styled';

function DataGridParameters() {
  const {useLayouts, useScreens} = useViews();
  const {DataGridLayout} = useLayouts();
  const {GridList, GridParameters, GridDescription, GridReplacement, GridDelivery} = useScreens();
  const userMenu = [
    {
      name: 'Uniforme',
      path: 'uniforms'
    },
    {
      name: 'Lista administrable',
      path: 'list/garments'
    },
    {
      name: 'Descripción uniformes',
      path: 'description'
    },
    {
      name: 'Parámetros de reposición',
      path: 'replacement'
    },
    {
      name: 'Entrega de uniformes',
      path: 'entrega'
    }
  ];
  return (
    <StyledSidebarLayout>
      <DataGridLayout titleGrid="Parametrización" userMenuLinks={userMenu}>
        <div>
          <Routes>
            <Route path="uniforms" element={<GridParameters />} />
            <Route path="list/*" element={<GridList />} />
            <Route path="description" element={<GridDescription />} />
            <Route path="replacement" element={<GridReplacement />} />
            <Route path="entrega" element={<GridDelivery />} />
          </Routes>
        </div>
      </DataGridLayout>
    </StyledSidebarLayout>
  );
}

// DataGridParameters.propTypes = {};

export default DataGridParameters;
