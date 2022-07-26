import React from 'react';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import {DATA} from 'config/paths';
// Assets
import Ico2 from '../../../assets/img/consumo-white.png';
import Ico2Green from '../../../assets/img/consumo.png';
import Ico4Green from '../../../assets/img/descuento.png';
import Ico1Green from '../../../assets/img/doctor.png';
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
            to={`${DATA}parameters`}
            children={({isActive}) => <img src={`${isActive ? Ico1 : Ico1Green}`} alt="ico-1" />}
          />
        </li>

        <li>
          <NavLink
            to={`${DATA}orders`}
            children={({isActive}) => <img src={`${isActive ? Ico2 : Ico2Green}`} alt="ico-2" />}
          />
        </li>

        <li>
          <NavLink to={'/'}>
            {' '}
            <img src={Ico3Green} alt="ico-3" />{' '}
          </NavLink>
        </li>

        <li>
          <NavLink to={'/'}>
            {' '}
            <img src={Ico4Green} alt="ico-4" />{' '}
          </NavLink>
        </li>

        <li>
          {' '}
          <NavLink to={'/'}>
            {' '}
            <img src={Ico5Green} alt="ico-5" />{' '}
          </NavLink>
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
