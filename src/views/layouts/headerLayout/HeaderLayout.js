import React from 'react';
import PropTypes from 'prop-types';

import IcoBtn from '../../../assets/img/ico-btn.png';
import IcoProfile from '../../../assets/img/ico-profile.png';
import Logo from '../../../assets/img/logo.png';

import {StyledContainerLayout} from './HeaderLayout.Styled';

function HeaderLayout({children}) {
  const handleLogout = () => {
    if (window.localStorage.getItem('MY_AUTH_APP')) {
      window.localStorage.removeItem('MY_AUTH_APP');
      window.location.replace('/');
    }
  };

  const goBack = () => {
    window.history.back();
  };

  return (
    <StyledContainerLayout>
      <header>
        <img src={Logo} alt="logo" />
        <div className="flex items-center">
          <button onClick={goBack}>
            <img src={IcoBtn} alt="ico-btn" />
            Inicio
          </button>
          <img className="home-profile mr-4" src={IcoProfile} alt="ico-profile" />
          <button className="bg-transparent" onClick={handleLogout}>
            Cerrar sesion
          </button>
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
