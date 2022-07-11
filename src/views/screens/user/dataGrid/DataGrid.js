import React from 'react';
import Button from 'views/components/button/Button';
import TableParameter from 'views/components/tables/TableParameter';
// import PropTypes from 'prop-types';
import SidebarLayout from 'views/layouts/sidebarLayout';
import {StyledContainerDataGrid, StyledOptionData, StyledSidebarLayout} from './DataGrid.Styled';

function DataGrid() {
  return (
    <StyledSidebarLayout>
      {' '}
      <SidebarLayout>
        <div className="flex items-center justify-center mb-20">
          <StyledContainerDataGrid>
            <Button
              className="btn-data my-12"
              variant="primary"
              width="433px"
              height="60px"
              label="Parametrización"
              roundedVariant="full"
            />

            <StyledOptionData>
              <a>Uniforme</a>
              <a>Lista administrable</a>
              <a>Descripción uniformes</a>
              <a>Parámetros de reposición</a>
              <a>Entrega de uniformes</a>
            </StyledOptionData>
          </StyledContainerDataGrid>
        </div>
        <div className="container-table px-48">
          <TableParameter />
        </div>
      </SidebarLayout>
    </StyledSidebarLayout>
  );
}

DataGrid.propTypes = {};

export default DataGrid;
