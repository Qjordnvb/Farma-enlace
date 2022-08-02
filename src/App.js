import {Suspense} from 'react';
import {createMemoryHistory} from 'history';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

//routes
import {LOGIN, PRIVATE, DATA} from 'config/paths';
import AuthContextProvider from 'contexts/authContext';
import PrivateRoute from 'routes/PrivateRoute';
import PublicRoute from 'routes/PublicRoute';

//views
import useViews from 'views';
import LoadingComponent from 'views/components/utils/LoadingComponent';

function App() {
  const {useScreens} = useViews();
  const {LoginPage, HomePrivate, DataGridParameters, DataGridOrders} = useScreens();
  const history = createMemoryHistory();
  return (
    <AuthContextProvider>
      <BrowserRouter location={history.location} navigator={history}>
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route path={PRIVATE} element={<PrivateRoute />}>
              <Route index element={<HomePrivate />} />
              <Route path={`${DATA}parameters/*`} element={<DataGridParameters />} />

              <Route path={`${DATA}orders/*`} element={<DataGridOrders />} />
            </Route>
            <Route path="/" element={<PublicRoute />}>
              <Route path={LOGIN} element={<LoginPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
