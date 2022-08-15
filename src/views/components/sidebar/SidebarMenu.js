import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {DATA} from 'config/paths';
// Assets
import Ico4 from '../../../assets/img/Ico4.png';
import Ico5 from '../../../assets/img/Ico5.png';
import Ico2 from '../../../assets/img/consumo-white.png';
import Ico2Green from '../../../assets/img/consumo.png';
import Ico4Green from '../../../assets/img/descuento.png';
import Ico1Green from '../../../assets/img/doctor.png';
import Ico3 from '../../../assets/img/ico-3.png';
import Ico3Green from '../../../assets/img/inventario.png';
import Ico1 from '../../../assets/img/parametrizacion.png';

import Ico5Green from '../../../assets/img/reporteria.png';
// StyledComponents
import {StyledContainerSidebar} from './Sidebar.Styled';

function SidebarMenu() {
  return (
    <StyledContainerSidebar>
      <ul>
        <li>
          <NavLink
            to={`${DATA}parameters/uniforms`}
            children={({isActive}) => (
              <img
                src={`${
                  isActive
                    ? Ico1
                    : (Ico1Green &&
                        window.location.pathname == '/private/*parameters/list/garments') ||
                      (Ico1Green &&
                        window.location.pathname == '/private/*parameters/list/reasons') ||
                      (Ico1Green &&
                        window.location.pathname == '/private/*parameters/description') ||
                      (Ico1Green &&
                        window.location.pathname == '/private/*parameters/replacement') ||
                      (Ico1Green && window.location.pathname == '/private/*parameters/entrega')
                    ? Ico1
                    : Ico1Green
                }`}
                alt="ico-2"
              />
            )}
            className={({isActive}) =>
              isActive
                ? 'active'
                : `${
                    window.location.pathname == '/private/*parameters/list/garments'
                      ? 'active'
                      : '' || window.location.pathname == '/private/*parameters/list/reasons'
                      ? 'active'
                      : '' || window.location.pathname == '/private/*parameters/description'
                      ? 'active'
                      : '' || window.location.pathname == '/private/*parameters/replacement'
                      ? 'active'
                      : '' || window.location.pathname == '/private/*parameters/entrega'
                      ? 'active'
                      : ''
                  }`
            }
          />
        </li>

        <li>
          <NavLink
            to={`${DATA}orders/actualization`}
            children={({isActive}) => (
              <img
                src={`${
                  isActive
                    ? Ico2
                    : Ico2Green && window.location.pathname === '/private/*orders/intake'
                    ? Ico2
                    : Ico2Green
                }`}
                alt="ico-2"
              />
            )}
            className={({isActive}) =>
              isActive
                ? 'active'
                : `${window.location.pathname === '/private/*orders/intake' ? 'active' : ''}`
            }
          />
        </li>

        <li>
          <NavLink
            to={`${DATA}inventory/buy`}
            children={({isActive}) => (
              <img
                src={`${
                  isActive
                    ? Ico3
                    : Ico3Green && window.location.pathname === '/private/*inventory/graphic'
                    ? Ico3
                    : Ico3Green
                }`}
                alt="ico-2"
              />
            )}
            className={({isActive}) =>
              isActive
                ? 'active'
                : `${window.location.pathname === '/private/*inventory/graphic' ? 'active' : ''}`
            }
          />
        </li>

        <li>
          <NavLink
            to={`${DATA}discount`}
            children={({isActive}) => <img src={`${isActive ? Ico4 : Ico4Green}`} alt="ico-1" />}
          />
        </li>

        <li>
          <NavLink
            to={`${DATA}report`}
            children={({isActive}) => <img src={`${isActive ? Ico5 : Ico5Green}`} alt="ico-1" />}
          />
        </li>
      </ul>
    </StyledContainerSidebar>
  );
}

SidebarMenu.propTypes = {
  active: PropTypes.bool
};

SidebarMenu.defaultProps = {
  active: false
};

export default SidebarMenu;
