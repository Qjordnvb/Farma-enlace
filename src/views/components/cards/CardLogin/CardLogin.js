import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
// Hooks
import {useAuthContext} from 'contexts/authContext';
// Components
import LoadingComponent from 'views/components/utils/LoadingComponent';
// assets
import ArrowGreen from '../../../../assets/img/arrow-green.png';
import Logo from '../../../../assets/img/logo.png';
// styled components
import {
  StyledBackground,
  StyledContainerBackground,
  StyledContainerFormLogin,
  StyledContainerLogin
} from './CardLogin.Styled';

function CardLogin({isLoading}) {
  const {login, token, userLogin} = useAuthContext();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (!token) {
      login('externo', 'Externo.2019*');
    }
  }, [login, token]);

  function handleInputUser(event) {
    setUser(event.target.value);
  }

  function handleInputPassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    userLogin(user, password, 'SMH', token);
  }

  return (
    <StyledContainerLogin isLoading={isLoading}>
      <StyledBackground>
        <StyledContainerBackground></StyledContainerBackground>
      </StyledBackground>
      <StyledContainerFormLogin isLoading={isLoading} className="flex flex-col items-center">
        <img src={Logo} alt="img-logo" />
        <h1 className="text-login pb-20 pt-6">Bienvenido</h1>
        {!isLoading ? (
          <>
            {' '}
            <p>Ingrese sus datos</p>
            <div className="flex items-center h-2/5">
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <input type="text" placeholder="JORDAN" value={user} onChange={handleInputUser} />
                <input
                  className="mt-4"
                  type="password"
                  value={password}
                  onChange={handleInputPassword}
                  name="password"
                  autoComplete="on"
                />
                <button type="submit">
                  <img src={ArrowGreen} alt="arrow-green" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div>
            <LoadingComponent />
          </div>
        )}
      </StyledContainerFormLogin>
    </StyledContainerLogin>
  );
}

CardLogin.propTypes = {
  isLoading: PropTypes.bool,
  hoverButton: PropTypes.any
};

CardLogin.defaultProps = {
  isLoading: false
};

export default CardLogin;
