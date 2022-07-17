import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {NavLink} from 'react-router-dom';
// import {DATA} from 'config/paths';
// import {DATA} from 'config/paths';
import useViews from 'views';
import Button from 'views/components/button/Button';
import SidebarMenu from 'views/components/sidebar';

import {StyledContainerDataGrid, StyledOptionData} from './DataGridLayout.Styled';

// import GridList from 'views/screens/user/dataGridParameters/gridList';

function DataGridLayout({children, titleGrid, userMenuLinks}) {
  const {useLayouts} = useViews();
  const {HeaderLayout} = useLayouts();
  return (
    <>
      <HeaderLayout>
        <div>
          <SidebarMenu />
        </div>
        <StyledContainerDataGrid>
          <Button
            className="btn-data my-12"
            variant="primary"
            width="433px"
            height="60px"
            label={titleGrid}
            roundedVariant="full"
          />

          <StyledOptionData>
            {_.map(userMenuLinks, (link, index) => {
              return (
                <NavLink
                  className={({isActive}) => (isActive ? 'active' : '')}
                  key={index}
                  exact
                  to={link.path}
                >
                  <span>{link.name}</span>
                  <div className={({isActive}) => (isActive ? 'div-bg' : '')} />
                </NavLink>
              );
            })}
          </StyledOptionData>
        </StyledContainerDataGrid>
        {children}
      </HeaderLayout>
    </>
  );
}

DataGridLayout.propTypes = {
  children: PropTypes.node.isRequired,
  titleGrid: PropTypes.string,
  userMenuLinks: PropTypes.array
};

DataGridLayout.defaultProps = {
  userMenuLinks: [],
  titleGrid: ''
};

export default DataGridLayout;
