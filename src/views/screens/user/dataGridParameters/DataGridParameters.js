import React from 'react';

import {Routes, Route} from 'react-router-dom';
import useViews from 'views';

// import PropTypes from 'prop-types';

import {StyledSidebarLayout} from './DataGridParameters.Styled';

function DataGridParameters() {
  const {useLayouts, useScreens} = useViews();
  const {DataGridLayout} = useLayouts();
  const {GridList, GridUniforms, GridDescription} = useScreens();
  const userMenu = [
    {
      name: 'Uniforme',
      path: 'uniforms',
      key: '1'
    },
    {
      name: 'Lista administrable',
      path: 'list',
      key: '2'
    },
    {
      name: 'Descripción uniformes',
      path: 'description',
      key: '3'
    },
    {
      name: 'Parámetros de reposición',
      path: 'replacement',
      key: '4'
    },
    {
      name: 'Entrega de uniformes',
      path: 'entrega',
      key: '5'
    }
  ];
  return (
    <StyledSidebarLayout>
      {' '}
      <DataGridLayout titleGrid="Parametrización" userMenuLinks={userMenu}>
        <div>
          <Routes>
            <Route path="uniforms" element={<GridUniforms />} />
            <Route path="list/*" element={<GridList />} />

            <Route path="description" element={<GridDescription />} />
            <Route path="replacement" element={<GridUniforms />} />
            <Route path="entrega" element={<GridUniforms />} />
          </Routes>
        </div>
      </DataGridLayout>
    </StyledSidebarLayout>
  );
}

// DataGridParameters.propTypes = {};

export default DataGridParameters;
