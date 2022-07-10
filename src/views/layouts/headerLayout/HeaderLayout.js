import React from 'react';
import PropTypes from 'prop-types';
import IcoBtn from '../../../assets/img/ico-btn.png';
import IcoProfile from '../../../assets/img/ico-profile.png';
import Logo from '../../../assets/img/logo.png';

import {StyledContainerLayout} from './HeaderLayout.Styled';

function HeaderLayout({children}) {
  return (
    <StyledContainerLayout>
      <header>
        <img src={Logo} alt="logo" />
        <div className="flex items-center">
          <button>
            <img src={IcoBtn} alt="ico-btn" />
            Inicio
          </button>
          <img className="home-profile" src={IcoProfile} alt="ico-profile" />
        </div>
      </header>
      {children}
    </StyledContainerLayout>
  );
}

HeaderLayout.propTypes = {
  children: PropTypes.node
};

export default HeaderLayout;
