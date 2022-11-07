import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {NavLink} from 'react-router-dom';

import useViews from 'views';

import SidebarMenu from 'views/components/sidebar';
import BgFigures from '../../../assets/img/bg-figures.png';
import Logo from '../../../assets/img/logo.png';
import {
  StyledContainerDataGrid,
  StyledGridContainer,
  StyledOptionData
} from './DataGridLayout.Styled';
import useCalcSize from '../../../hooks/useCalcSize';

function DataGridLayout({children, userMenuLinks}) {
  const {useLayouts} = useViews();
  const {HeaderLayout} = useLayouts();
  const {width: tableWidth} = useCalcSize();
  return (
    <>
      <HeaderLayout>
        <SidebarMenu />

        <StyledGridContainer maxWidth={tableWidth}>
          <StyledContainerDataGrid>
            <StyledOptionData>
              {_.map(userMenuLinks, (link) => {
                return (
                  <NavLink
                    className={({isActive}) =>
                      isActive
                        ? 'active'
                        : `${
                            window.location.pathname === '/private/*parameters/list/reasons' &&
                            link.name === 'Lista administrable'
                              ? 'active'
                              : ''
                          }`
                    }
                    to={link.path}
                    key={link.name}
                  >
                    <span>{link.name}</span>
                    <div className={({isActive}) => (isActive ? 'div-bg' : '')} />
                  </NavLink>
                );
              })}
            </StyledOptionData>
          </StyledContainerDataGrid>

          {children}
        </StyledGridContainer>

        <div className="div-logo flex justify-center">
          <img className="logo-img" width={'168px'} height={'70px'} src={Logo} alt="Logo" />
        </div>
        <div className="div-figures flex justify-end">
          <img
            className="figures-img"
            width={'735.42px'}
            height={'552px'}
            src={BgFigures}
            alt="figures"
          />
        </div>
      </HeaderLayout>
    </>
  );
}

DataGridLayout.propTypes = {
  children: PropTypes.node,
  titleGrid: PropTypes.string,
  userMenuLinks: PropTypes.array
};

DataGridLayout.defaultProps = {
  userMenuLinks: [],
  titleGrid: ''
};

export default DataGridLayout;
