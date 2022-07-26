import React from 'react';
import PropTypes from 'prop-types';
import {useNavigate} from 'react-router';
import IcoBtn from '../../../assets/img/ico-btn.png';
import Logo from '../../../assets/img/logo.png';
// import IcoProfile from '../../../assets/img/user-solid.svg';

import {StyledContainerLayout} from './HeaderLayout.Styled';

function HeaderLayout({children}) {
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.localStorage.getItem('MY_AUTH_APP')) {
      window.localStorage.removeItem('MY_AUTH_APP');
      window.location.replace('/');
    }
  };

  const goBack = () => {
    navigate('/');
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

          <svg className="home-profile" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
          </svg>
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
