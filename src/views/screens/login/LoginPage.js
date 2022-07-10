import React from 'react';
import {useAuthContext} from 'contexts/authContext';

import CardLogin from 'views/components/cards/CardLogin';

function LoginPage() {
  const {isAuthenticated} = useAuthContext();
  return (
    <>
      <CardLogin isLoading={isAuthenticated} />
    </>
  );
}

export default LoginPage;
