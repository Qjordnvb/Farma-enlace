import {Navigate, Outlet, useLocation} from 'react-router-dom';

import {LOGIN} from 'config/paths';
import {useAuthContext} from 'contexts/authContext';

export default function PrivateRoute() {
  const {isAuthenticated} = useAuthContext();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={LOGIN} replace state={{from: location}} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
