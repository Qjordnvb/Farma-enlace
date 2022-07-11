import React from 'react';
import PropTypes from 'prop-types';
import Ico1Green from '../../../assets/img/doctor.png';
import Ico1 from '../../../assets/img/parametrizacion.png';

import {StyledContainerSidebar} from './Sidebar.Styled';

function SidebarMenu({isActive}) {
  return (
    <StyledContainerSidebar isActive={isActive}>
      <>
        <div
          className={`${isActive ? 'bg-icon-sidebar ' : 'flex items-center justify-center mt-12'}`}
        >
          <img src={`${isActive ? Ico1 : Ico1Green}`} alt="ico-1" />
        </div>
        <div className={'flex items-center justify-center mt-12'}>
          <img src={Ico1Green} alt="ico-1" />
        </div>
        <div className={'flex items-center justify-center mt-12'}>
          <img src={Ico1Green} alt="ico-1" />
        </div>
        <div className={'flex items-center justify-center mt-12'}>
          <img src={Ico1Green} alt="ico-1" />
        </div>
        <div className={'flex items-center justify-center mt-12'}>
          <img src={Ico1Green} alt="ico-1" />
        </div>
      </>
    </StyledContainerSidebar>
  );
}

SidebarMenu.propTypes = {
  isActive: PropTypes.bool
};

SidebarMenu.defaultProps = {
  isActive: false
};

export default SidebarMenu;
