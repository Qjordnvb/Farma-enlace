import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

import {NavLink} from 'react-router-dom';
// import {DATA} from 'config/paths';
// import {DATA} from 'config/paths';
import useViews from 'views';
import Button from 'views/components/button/Button';
import SidebarMenu from 'views/components/sidebar';
import BgFigures from '../../../assets/img/bg-figures.png';
import Logo from '../../../assets/img/logo.png';
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
            {_.map(userMenuLinks, (link) => {
              console.log('soy link', link);
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
                  key={link.key}
                >
                  <span>{link.name}</span>
                  <div className={({isActive}) => (isActive ? 'div-bg' : '')} />
                </NavLink>
              );
            })}
          </StyledOptionData>
        </StyledContainerDataGrid>
        {children}
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
  children: PropTypes.node.isRequired,
  titleGrid: PropTypes.string,
  userMenuLinks: PropTypes.array
};

DataGridLayout.defaultProps = {
  userMenuLinks: [],
  titleGrid: ''
};

export default DataGridLayout;
