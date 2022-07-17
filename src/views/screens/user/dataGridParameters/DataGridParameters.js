import React from 'react';

import {Routes, Route} from 'react-router-dom';
import useViews from 'views';

// import PropTypes from 'prop-types';

import {StyledSidebarLayout} from './DataGridParameters.Styled';

function DataGridParameters() {
  const {useLayouts, useScreens} = useViews();
  const {DataGridLayout} = useLayouts();
  const {GridList, GridUniforms} = useScreens();
  const userMenu = [
    {
      name: 'Uniforme',
      path: 'uniforms'
    },
    {
      name: 'Lista administrable',
      path: 'list'
    },
    {
      name: 'Descripción uniformes',
      path: 'description'
    },
    {
      name: 'Parámetros de reposición',
      path: 'parameters'
    },
    {
      name: 'Parámetros de reposición',
      path: 'entrega'
    }
  ];
  return (
    <StyledSidebarLayout>
      {' '}
      <DataGridLayout titleGrid="Parametrización" userMenuLinks={userMenu}>
        <div>
          <Routes>
            <Route path="uniforms" element={<GridUniforms />} />
            <Route path="list" element={<GridList />} />
            <Route path="description" element={<GridList />} />
            <Route path="parameters" element={<GridList />} />
            <Route path="entrega" element={<GridList />} />
          </Routes>
        </div>
      </DataGridLayout>
    </StyledSidebarLayout>
  );
}

// DataGridParameters.propTypes = {};

export default DataGridParameters;
